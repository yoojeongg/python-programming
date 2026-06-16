from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from userdata_set import save_user, get_user
from pydantic import BaseModel
from typing import List
from filter_alg import recommend_restaurant
class UserInput(BaseModel):
    sex: int
    age: int
    companion: int
    price: int
    time: int
    atmosphere: int
    korean: int
    chinese: int
    japanese: int
    western: int
    southeast: int
    bunsik: int
    pub: int
    buffet: int
    spicy: int
    strong: int
    spice: int
    seafood: int
    nuts: int
    flour: int
    dairy: int

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 모델 
class LoginRequest(BaseModel):
    username: str
class SignupRequest(BaseModel):
    username: str
    sex: str
    age: str
    favorite_foods: List[str]
    avoid_foods: List[str]

# 로그인  
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

# 회원가입 
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

# 필터링 검색
information_final = pd.read_csv("information_final.csv")
import joblib
@app.post("/api/recommend")
def recommend(data: dict):
    try:
        result_df = recommend_restaurant(data)

        return {
            "result":
            result_df.to_dict(
                orient="records"
            )
        }
    except Exception as e:
        print("추천 오류:", e)
        return {
            "error": str(e)
        }

# AI 추천
import joblib
spanyu_model = joblib.load("user_sample_dataset_500.pkl")
kong_model = joblib.load("user_sample_dataset_500_2.pkl")
@app.post("/api/airecommend")
def airecommend(req: UserInput):
    user_data = [
        req.sex,
        req.age,
        req.companion,
        req.price,
        req.time,
        req.atmosphere,
        req.korean,
        req.chinese,
        req.japanese,
        req.western,
        req.southeast,
        req.bunsik,
        req.pub,
        req.buffet,
        req.spicy,
        req.strong,
        req.spice,
        req.seafood,
        req.nuts,
        req.flour,
        req.dairy
    ]
    spanyu = spanyu_model.predict_proba(
        [user_data]
    )[0][1]
    kong = kong_model.predict_proba(
        [user_data]
    )[0][1]
    return {
        "spanyu": round(spanyu * 100, 1),
        "kong": round(kong * 100, 1)
    }