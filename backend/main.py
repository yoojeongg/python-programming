from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from userdata_set import save_user, get_user
from pydantic import BaseModel
from typing import List
from filter_alg import recommend_restaurant

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- 모델 ----------

class LoginRequest(BaseModel):
    username: str


class SignupRequest(BaseModel):
    username: str
    sex: str
    age: str
    favorite_foods: List[str]
    avoid_foods: List[str]


# ---------- 로그인 ----------

@app.post("/login")
def login(data: LoginRequest):

    user = get_user(data.username)

    # 기존 회원
    if user:
        return {
            "exists": True,
            "user": user
        }

    # 신규 회원
    return {
        "exists": False
    }


# ---------- 회원가입 ----------

@app.post("/signup")
def signup(data: SignupRequest):

    user = {
        "username": data.username,
        "sex": data.sex,
        "age": data.age,
        "favorite_foods": data.favorite_foods,
        "avoid_foods": data.avoid_foods
    }

    return save_user(user)


# ---------- 음식점 추천 ----------

information_final = pd.read_csv("information_final.csv")
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