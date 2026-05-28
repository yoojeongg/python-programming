import json
import os

DATA_PATH = os.path.join(
    os.path.dirname(__file__),
    "data",
    "users.json"
)

# 파일 없으면 생성
if not os.path.exists(DATA_PATH):
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump([], f, ensure_ascii=False, indent=2)


# 전체 유저 불러오기
def load_users():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


# 유저 저장
def save_user(user):
    users = load_users()

    # 중복 아이디 체크
    for u in users:
        if u["username"] == user["username"]:
            return {
                "success": False,
                "message": "이미 존재하는 아이디"
            }

    users.append(user)

    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(
            users,
            f,
            ensure_ascii=False,
            indent=2
        )

    return {
        "success": True,
        "user": user
    }


# 특정 유저 찾기
def get_user(username):
    users = load_users()

    for user in users:
        if user["username"] == username:
            return user

    return None