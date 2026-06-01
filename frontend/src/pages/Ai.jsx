import "../styles/Ai.css";
import { useState } from "react";

export default function AI() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [purpose, setPurpose] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [atmosphere, setAtmosphere] = useState("");
  const [result, setResult] = useState(null);

  /* -----------------------------
     mapping
  ----------------------------- */
  const sexMap = { 여성: 0, 남성: 1 };

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
    "단체 모임": 5,
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

  /* -----------------------------
     필터 구조 (핵심 개선)
  ----------------------------- */
  const filters = [
    {
      label: "동행인",
      state: purpose,
      setState: setPurpose,
      name: "purpose",
      items: ["혼자", "연인", "친구", "회사 동료", "가족", "단체 모임"],
    },
    {
      label: "방문 시간",
      state: time,
      setState: setTime,
      name: "time",
      items: ["아침", "점심", "저녁"],
    },
    {
      label: "가격대",
      state: price,
      setState: setPrice,
      name: "price",
      items: ["만원 이하", "1만원-2만원", "2만원-3만원", "3만원 이상"],
    },
    {
      label: "분위기",
      state: atmosphere,
      setState: setAtmosphere,
      name: "atmosphere",
      items: ["조용함", "감성", "시끌벅적"],
    },
  ];

  /* -----------------------------
     API 요청
  ----------------------------- */
  const handlePredict = async () => {
    if (!purpose || !price || !time || !atmosphere) {
      alert("모든 항목을 선택해주세요.");
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
      const res = await fetch("http://127.0.0.1:8000/api/airecommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("서버 연결 실패");
    }
  };

  return (
    <div className="ai-container">

      {/* 제목 */}
      <div className="title">
        🤖 AI가 랜덤포레스트 모델을 기반으로 식당 만족도를 예측합니다 🤖
      </div>

      {/* 필터 UI */}
      {filters.map((filter) => (
        <div className="filter-row" key={filter.name}>
          <p>{filter.label}</p>

          <div className="radio-group">
            {filter.items.map((item) => (
              <label
                key={item}
                className={filter.state === item ? "selected" : ""}
              >
                <input
                  type="radio"
                  name={filter.name}
                  value={item}
                  checked={filter.state === item}
                  onChange={(e) => filter.setState(e.target.value)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* 버튼 */}
      <button onClick={handlePredict}>결과보기</button>

      {/* 결과 */}
      {result && (
        <div className="ai-result-table">
          <table>
            <thead>
              <tr>
                <th>식당명</th>
                <th>카테고리</th>
                <th>메뉴</th>
                <th>주소</th>
                <th>예상 만족도</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>스패뉴</td>
                <td>양식</td>
                <td>스테이크, 파스타, 리조또</td>
                <td>서울특별시 중구 세종대로 82, (태평로2가,(지상2층))</td>
                <td>{result.spanyu}%</td>
              </tr>

              <tr>
                <td>굴다리전주콩나물국밥</td>
                <td>한식</td>
                <td>콩나물국밥</td>
                <td>서울특별시 광진구 자양로 160, (구의동)</td>
                <td>{result.kong}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}