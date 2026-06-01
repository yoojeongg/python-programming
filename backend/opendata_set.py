import pandas as pd
import os

# =========================
# 1. 경로 설정
# =========================
BASE_DIR = os.path.join(os.path.dirname(__file__), "data")

files = [
    "dobong", "dongjak", "eunpyeong", "gangdong", "seongdong",
    "seocho", "nowon", "gwangjin", "songpa", "gangseo",
    "yongsan", "gangnam", "guro", "yangcheon", "seongbuk",
    "geumcheon", "jung", "jongno", "yeongdeungpo", "gwanak",
    "mapo", "gangbuk", "dongdaemun", "jungnang", "seodaemun"
]

# ========================
# 2. 지역 CSV 전체 로드 + 합치기
# =========================
data = {}

for f in files:
    path = os.path.join(BASE_DIR, f + ".csv")
    data[f] = pd.read_csv(path, encoding="cp949")

sub_information = pd.concat(data.values(), ignore_index=True)

# =========================
# 3. 추가 데이터 로드
# =========================
information = pd.read_csv(
    os.path.join(BASE_DIR, "information.csv"),
    encoding="cp949"
)
zero_restaurant = pd.read_csv(
    os.path.join(BASE_DIR, "zero_restaurant.csv"),
    encoding="cp949"
)

# =========================
# 4. 결측치 처리
# =========================
information = information.dropna(subset=['식당명', '지역명'])
sub_information = sub_information.dropna(subset=['소재지도로명', '업태명'])

information = information.fillna('-')
sub_information = sub_information.fillna('-')

# =========================
# 5. 면적 처리 (㎡ → 평)
# =========================
sub_information['영업장면적(㎡)'] = sub_information['영업장면적(㎡)'].fillna(0)
sub_information['영업장면적(㎡)'] = sub_information['영업장면적(㎡)'].astype(float)
sub_information['영업장면적(㎡)'] = round(sub_information['영업장면적(㎡)'] * 0.3025, 1)

sub_information = sub_information.rename(columns={
    '영업장면적(㎡)': '영업장면적(평)',
    '업소명': '식당명'
})
print("sub_information 데이터 프레임 결측치 제거 후 개수 : ", sub_information.shape[0])
print("information 데이터 프레임 결측치 제거 후 개수 : ", information.shape[0])
# =========================
# 6. 문자열 정리
# =========================
information['식당명'] = information['식당명'].astype(str).str.strip()
sub_information['식당명'] = sub_information['식당명'].astype(str).str.strip()
sub_information['소재지전화번호'] = sub_information['소재지전화번호'].astype(str).str.replace(' ', '')
sub_information['구'] = sub_information['소재지도로명'].str.extract(r'(\S+구)')

# =========================
# 7. 업태명 카테고리 매핑
# =========================
category_map = {
    '한식': '한식',
    '탕류(보신용)': '한식',
    '냉면집': '한식',
    '식육(숯불구이)': '한식',
    '중식': '중식',
    '중국식': '중식',
    '일식': '일식',
    '횟집': '일식',
    '복어취급': '일식',
    '양식': '양식',
    '경양식': '양식',
    '패밀리레스트랑': '양식',
    '아시안음식': '아시안음식',
    '외국음식전문점(인도,태국등)': '아시안음식',
    '분식': '분식',
    '김밥(도시락)': '분식',
    '주점': '주점',
    '호프/통닭': '주점',
    '감성주점': '주점',
    '정종/대포집/소주방': '주점',
    '뷔페': '뷔페',
    '뷔페식': '뷔페',
    '기타': '기타'
}

sub_information['업태명'] = (
    sub_information['업태명']
    .map(category_map)
    .fillna('기타')
)

#머지
information = pd.merge(
    information,
    sub_information[['식당명','구', '소재지도로명','업태명','주된음식','영업장면적(평)','행정동명','소재지전화번호']],
    left_on=['식당명', '지역명'],
    right_on=['식당명', '구'],
    how='inner'
).drop(columns=['구'])

# =========================
# 8. 제로식당 처리
# =========================
information['제로식당'] = " "

zero_restaurant['구'] = zero_restaurant['도로명주소'].str.extract(r'(\S+구)')

information['key'] = information['식당명'].astype(str) + "_" + information['지역명'].astype(str)
zero_restaurant['key'] = zero_restaurant['식당명'].astype(str) + "_" + zero_restaurant['구'].astype(str)

information.loc[
    information['key'].isin(zero_restaurant['key']),
    '제로식당'
] = "Y"

information = information.drop(columns=['key'])

# =========================
# 9. 최종 결과 데이터
# =========================
sub_information_final = sub_information
information=information.drop_duplicates(subset=['소재지도로명'])
information_final = information.drop_duplicates()
information_final.to_csv(
    "information_final.csv",
    index=False,
    encoding="utf-8-sig"
)
information_final.to_json(
    "information_final.json",
    orient="records",
    force_ascii=False
)
print("information 데이터 개수 : ",information.shape[0])
# 제로식당 = 'Y' 인 식당 개수 출력
zero_restaurant_count=(information_final['제로식당']== "Y").sum()
print("zero_restaurant 데이터 개수 : ",zero_restaurant_count)
print(information_final.columns.tolist())

