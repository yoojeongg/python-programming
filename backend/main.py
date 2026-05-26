from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from read_csv import information_final
from filter_alg import recommend_restaurant

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
        zero_restaurant=data.get(
        "zero_restaurant",
        False
    ),
    )

    return {
        "count": len(result_df),
        "data": result_df.to_dict(orient="records")
    }