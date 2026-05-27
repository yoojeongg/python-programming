import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "users.json")

# 초기 파일 생성
if not os.path.exists(DATA_PATH):
    with open(DATA_PATH, "w") as f:
        json.dump([], f, ensure_ascii=False, indent=2)


# 유저 전체 불러오기
def load_users():
    with open(DATA_PATH, "r") as f:
        return json.load(f)


# 유저 저장
def save_user(user):
    users = load_users()

    for u in users:
        if u["username"] == user["username"]:
            return {"success": False, "msg": "이미 존재"}

    users.append(user)

    with open(DATA_PATH, "w") as f:
        json.dump(users, f, ensure_ascii=False, indent=2)

    return {
        "success": True,
        "user": user
    }
    users = load_users()

    # 중복 아이디 체크
    for u in users:
        if u["username"] == user["username"]:
            return {"success": False, "msg": "이미 존재하는 아이디"}

    users.append(user)

    with open(DATA_PATH, "w") as f:
        json.dump(users, f, ensure_ascii=False, indent=2)

    return {"success": True, "user": user}


# 특정 유저 찾기 (나중 추천용)
def get_user(username):
    users = load_users()

    for u in users:
        if u["username"] == username:
            return u

    return None