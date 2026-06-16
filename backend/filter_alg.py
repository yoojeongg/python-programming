from opendata_set import information_final

def recommend_restaurant(data):
    region = data.get("region", "전체")
    parking = data.get("parking", "전체")
    wifi = data.get("wifi", "전체")
    category = data.get("category", "전체")
    multilingual = data.get("multilingual", "전체")
    playroom = data.get("playroom", "전체")
    restroom = data.get("restroom", "전체")
    zero_restaurant = data.get("zero_restaurant", "전체")
    df = information_final.copy()

    # 지역
    if region != "전체":
        df = df[df["지역명"] == region]
    # 주차
    if parking != "전체":
        df = df[df["주차가능"] == parking]
    # 와이파이
    if wifi != "전체":
        df = df[df["와이파이제공"] == wifi]
    # 놀이방
    if playroom != "전체":
        df = df[df["놀이방"] == playroom]
    # 다국어 메뉴판
    if multilingual != "전체":
        df = df[df["다국어메뉴판"] == multilingual]
    # 화장실
    if restroom != "전체":
        df = df[df["화장실"] == restroom]
    # 카테고리
    if category != "전체":
        df = df[df["업태명"] == category]
    # 제로식당
    if zero_restaurant:
        df = df[df["제로식당"] == "Y"]
    return df