def recommend_restaurant(
    df,
    region='전체',
    parking='상관없음',
    wifi='상관없음',
    playroom='상관없음',
    multilingual='상관없음',
    restroom='상관없음',
    category='전체',
    zero_restaurant=False
):

    result = df.copy()

    filters = {
        '지역명': region,
        '주차가능': parking,
        '와이파이제공': wifi,
        '놀이방': playroom,
        '다국어메뉴판': multilingual,
        '화장실': restroom,
        '업태명': category
    }

    for column, condition in filters.items():

        if condition in ['상관없음', '전체']:
            continue

        elif condition == '유':
            result = result[result[column] == 'Y']

        elif condition == '무':
            result = result[result[column] == 'N']

        else:
            result = result[
                result[column]
                .astype(str)
                .str.contains(
                    str(condition),
                    na=False
                )
            ]

    # 제로식당 체크 시 필터링
    if zero_restaurant:
        result = result[
            result['제로식당'] == '♻️'
        ]

    return result[
        [
            '식당명',
            '지역명',
            '해시태그',
            '소재지도로명',
            '업태명',
            '주된음식',
            '영업장면적(평)',
            '행정동명',
            '소재지전화번호',
            '제로식당'
        ]
    ]