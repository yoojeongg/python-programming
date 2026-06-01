import { useState } from "react";

export default function AI() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [purpose, setPurpose] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [atmosphere, setAtmosphere] = useState("");
  const [result, setResult] = useState(null);
  const sexMap = {
  여성: 0,
  남성: 1,
};

const ageMap = {
  "10대": 0,
  "20대": 1,
  "30대": 2,
  "40대": 3,
  "50대": 4,
  "60대이상": 5,
};

const companionMap = {
  혼자: 0,
  연인: 1,
  친구: 2,
  "회사 동료": 3,
  가족: 4,
  단체모임: 5,
};

const priceMap = {
  "만원 이하": 0,
  "1만원-2만원": 1,
  "2만원-3만원": 2,
  "3만원 이상": 3,
};

const timeMap = {
  아침: 0,
  점심: 1,
  저녁: 2,
};

const moodMap = {
  조용함: 0,
  감성: 1,
  시끌벅적: 2,
};
  const handlePredict = async () => {
    if (!purpose) {
      alert("식사목적을 선택해주세요.");
      return;
    }
    if (!price) {
      alert("가격대를 선택해주세요.");
      return;
    }
    if (!time) {
      alert("방문 시간대를 선택해주세요.");
      return;
    }
    if (!atmosphere) {
      alert("매장 분위기를 선택해주세요.");
      return;
    }

    const body = {
  sex: sexMap[user.sex],
  age: ageMap[user.age],

  companion: companionMap[purpose],
  price: priceMap[price],
  time: timeMap[time],
  atmosphere: moodMap[atmosphere],

  korean: user.favorite_foods?.includes("한식") ? 1 : 0,
  chinese: user.favorite_foods?.includes("중식") ? 1 : 0,
  japanese: user.favorite_foods?.includes("일식") ? 1 : 0,
  western: user.favorite_foods?.includes("양식") ? 1 : 0,
  southeast: user.favorite_foods?.includes("동남아") ? 1 : 0,
  bunsik: user.favorite_foods?.includes("분식") ? 1 : 0,
  pub: user.favorite_foods?.includes("주점") ? 1 : 0,
  buffet: user.favorite_foods?.includes("뷔페") ? 1 : 0,

  spicy: user.avoid_foods?.includes("매움") ? 1 : 0,
  strong: user.avoid_foods?.includes("자극적") ? 1 : 0,
  spice: user.avoid_foods?.includes("향신료") ? 1 : 0,
  seafood: user.avoid_foods?.includes("해산물") ? 1 : 0,
  nuts: user.avoid_foods?.includes("견과류") ? 1 : 0,
  flour: user.avoid_foods?.includes("밀가루") ? 1 : 0,
  dairy: user.avoid_foods?.includes("유제품") ? 1 : 0,
};

try {
  const res = await fetch(
    "http://127.0.0.1:8000/api/airecommend",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  setResult(data);

} catch (err) {
  console.error(err);
  alert("서버 연결 실패");
}
  };

  return (
    <div>
      
      <h2>AI 추천</h2>

      <select
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      >
        <option value="">동행인</option>
        <option value="혼자">혼자</option>
        <option value="친구">친구</option>
        <option value="연인">연인</option>
        <option value="회사 동료">회사 동료</option>
        <option value="가족">가족</option>
        <option value="단체모임">단체 모임</option>
      </select>

      <br /><br />

      <select
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      >
        <option value="">가격대</option>
        <option value="만원 이하">10,000원 이하</option>
        <option value="1만원-2만원">10,000~20,000원</option>
        <option value="2만원-3만원">20,000~30,000원</option>
        <option value="3만원 이상">30,000원 이상</option>
      </select>

      <br /><br />

      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="">방문 시간대</option>
        <option value="아침">아침</option>
        <option value="점심">점심</option>
        <option value="저녁">저녁</option>
      </select>

      <br /><br />

      <select
        value={atmosphere}
        onChange={(e) => setAtmosphere(e.target.value)}
      >
        <option value="">분위기</option>
        <option value="조용함">조용함</option>
        <option value="감성">감성</option>
        <option value="시끌벅적">시끌벅적</option>
      </select>

      <button onClick={handlePredict}>
        결과보기
      </button>

      {result && (
  <div>
    <h3>
      스패뉴 만족도 : {result.spanyu}%
    </h3>

    <h3>
      콩나물국밥 만족도 : {result.kong}%
    </h3>

    <h2>
      추천 식당 :
      {result.spanyu > result.kong
        ? " 스패뉴"
        : " 콩나물국밥"}
    </h2>
  </div>
)}
    </div>
  );
}