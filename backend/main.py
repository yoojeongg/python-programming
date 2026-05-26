from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from filter_alg import recommend_restaurant

app = FastAPI()

# CORS (프론트 연결용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5178"],  # 또는 "*" (개발용)
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CSV 직접 로딩 (read_csv 파일 제거)
information_final = pd.read_csv("information_final.csv")

# 중복 제거 (안전장치)
information_final = information_final.drop_duplicates()

print("✅ 데이터 로딩 완료:", len(information_final))


@app.post("/api/recommend")
def recommend(data: dict):

    result_df = recommend_restaurant(
        df=information_final,
        region=data.get("region", "전체"),
        parking=data.get("parking", "상관없음"),
        wifi=data.get("wifi", "상관없음"),
        playroom=data.get("playroom", "상관없음"),
        multilingual=data.get("multilingual", "상관없음"),
        restroom=data.get("restroom", "상관없음"),
        category=data.get("category", "전체"),
        zero_restaurant=data.get("zero_restaurant", False),
    )

    return {
        "count": len(result_df),
        "data": result_df.to_dict(orient="records")
    }