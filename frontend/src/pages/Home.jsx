import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../images/logo.png";
import Ai from "./Ai";

function Home() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("filter");
  const user =
    JSON.parse(localStorage.getItem("user")) || {};
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const [form, setForm] = useState({
    region: "전체",
    parking: "전체",
    wifi: "전체",
    playroom: "전체",
    multilingual: "전체",
    restroom: "전체",
    category: "전체",
    zero_restaurant: false,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };
//main의 filter_alg 호출
  const getRecommend = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/recommend",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    setResult(data.result || []);
    setCurrentPage(1);

  } catch (error) {
    console.error("추천 오류:", error);
  }
};
  const saveSatisfaction = (
  value
) => {
  setSatisfaction(value);

  const satisfactionData =
    JSON.parse(
      localStorage.getItem(
        "restaurantSatisfaction"
      )
    ) || {};

  const key =
    `${user.username}_${selectedItem.식당명}`;

  satisfactionData[key] =
    value;

  localStorage.setItem(
    "restaurantSatisfaction",
    JSON.stringify(
      satisfactionData
    )
  );
};
const saveRating = (star) => {
  setRating(star);

  const ratings =
    JSON.parse(
      localStorage.getItem(
        "restaurantRatings"
      )
    ) || {};

  const key =
    `${user.username}_${selectedItem.식당명}`;

  ratings[key] = star;

  localStorage.setItem(
    "restaurantRatings",
    JSON.stringify(ratings)
  );
};
const getAverageRating = (
  restaurantName
) => {
  const ratings =
    JSON.parse(
      localStorage.getItem(
        "restaurantRatings"
      )
    ) || {};

  const values = Object.entries(
    ratings
  )
    .filter((entry) =>
      entry[0].endsWith(
        `_${restaurantName}`
      )
    )
    .map((entry) =>
      Number(entry[1])
    );

  if (values.length === 0) {
    return "-";
  }

  const avg =
    values.reduce(
      (a, b) => a + b,
      0
    ) / values.length;

  return avg.toFixed(1);
};
  const [satisfaction, setSatisfaction] = useState(null);
  const [rating, setRating] = useState(0);

  // 페이지네이션
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = result.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(result.length / itemsPerPage);
  const pageGroup = Math.ceil(currentPage / 5);
  const startPage = (pageGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <div className="container">
      <div className="title-box">
        <div className="title-box-left">
        <img src={logo} alt="logo" className="home-logo" />
        <button
    className={`search_btn ${
      mode === "filter" ? "active" : "inactive"
    }`}
    onClick={() => setMode("filter")}
  >
    필터링 수동 검색
  </button>

  <button
  className={`ai_btn ${
    mode === "ai" ? "active" : "inactive"
  }`}
  onClick={() => setMode("ai")}
>
  AI 자동 추천
</button>
        </div>
        <div className="title-box-right">
        <span
          className="username"
          onClick={() => navigate("/profile")}
        >
          {user.username} 님
        </span>
        <button className="logout_btn" onClick={logout}>
          로그아웃
        </button></div>
      </div>

      {mode === "filter" && (
      <div className="main-layout">
        {/* 왼쪽 */}
        <div className="filter-section">
          <h1>필터링 선택</h1>

          <div className="filter-box">

            {/* 지역 */}
            <div className="filter-row">
            <p>지역</p>
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
            >
              <option value="전체">
                전체
              </option>

              <option value="강남구">강남구</option>
              <option value="강동구">강동구</option>
              <option value="강북구">강북구</option>
              <option value="강서구">강서구</option>
              <option value="관악구">관악구</option>
              <option value="광진구">광진구</option>
              <option value="구로구">구로구</option>
              <option value="금천구">금천구</option>
              <option value="노원구">노원구</option>
              <option value="도봉구">도봉구</option>
              <option value="동대문구">동대문구</option>
              <option value="동작구">동작구</option>
              <option value="마포구">마포구</option>
              <option value="서대문구">서대문구</option>
              <option value="서초구">서초구</option>
              <option value="성동구">성동구</option>
              <option value="성북구">성북구</option>
              <option value="송파구">송파구</option>
              <option value="양천구">양천구</option>
              <option value="영등포구">영등포구</option>
              <option value="용산구">용산구</option>
              <option value="은평구">은평구</option>
              <option value="종로구">종로구</option>
              <option value="중구">중구</option>
              <option value="중랑구">중랑구</option>
            </select></div>

            {/* 주차 */}
            <div className="filter-row">
            <p>주차장</p>
            <select
              name="parking"
              value={form.parking}
              onChange={handleChange}
            >
              <option value="전체">
                전체
              </option>
              <option value="Y">
                있음
              </option>
              <option value="N">
                없음
              </option>
            </select></div>

            {/* 와이파이 */}
            <div className="filter-row">
            <p>와이파이</p>
            <select
              name="wifi"
              value={form.wifi}
              onChange={handleChange}
            >
              <option value="전체">
                전체
              </option>
              <option value="Y">
                있음
              </option>
              <option value="N">
                없음
              </option>
            </select></div>

            {/* 놀이방 */}
            <div className="filter-row">
            <p>놀이방</p>
            <select
              name="playroom"
              value={form.playroom}
              onChange={handleChange}
            >
              <option value="전체">
                전체
              </option>
              <option value="Y">
                있음
              </option>
              <option value="N">
                없음
              </option>
            </select></div>

            {/* 다국어 */}
            <div className="filter-row">
            <p>다국어메뉴</p>
            <select
              name="multilingual"
              value={form.multilingual}
              onChange={handleChange}
            >
              <option value="전체">
                전체
              </option>
              <option value="Y">
                있음
              </option>
              <option value="N">
                없음
              </option>
            </select></div>

            {/* 화장실 */}
            <div className="filter-row">
            <p>화장실</p>
            <select
              name="restroom"
              value={form.restroom}
              onChange={handleChange}
            >
              <option value="전체">
                전체
              </option>
              <option value="Y">
                있음
              </option>
              <option value="N">
                없음
              </option>
            </select></div>

            {/* 카테고리 */}
            <div className="filter-row">
            <p>카테고리</p>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="전체">전체</option>
              <option value="한식">한식</option>
              <option value="중식">중식</option>
              <option value="일식">일식</option>
              <option value="양식">양식</option>
              <option value="아시안음식">아시안음식</option>
              <option value="분식">분식</option>
              <option value="주점">주점</option>
              <option value="뷔페">뷔페</option>
              <option value="기타">기타</option>
            </select></div>

            <div className="checkbox-box">
  <label>
    <input
      type="checkbox"
      name="zero_restaurant"
      checked={form.zero_restaurant}
      onChange={handleChange}
    />
    제로식당만 보기
  </label>
</div>
            <button onClick={getRecommend}>
              검색
            </button>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="result-section">
          <h2>추천 식당 ({result.length}곳)</h2>

          {result.length === 0 ? (
            <p>조건에 맞는 식당이 없어요.</p>
          ) : (
            <>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>식당명</th>
                      <th>카테고리</th>
                      <th>주소</th>
                      <th>전화번호</th>
                      <th>별점</th>
                      <th>더보기</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>{indexOfFirst + index + 1}</td>
                        <td>{item.식당명}</td>
                        <td>{item.업태명}</td>
                        <td>{item.소재지도로명}</td>
                        <td>{item.소재지전화번호}</td>
                        <td className="th_star">{getAverageRating(item.식당명)}</td>
                        <td>
  <button
    className="more_btn"
    onClick={() => {
      setSelectedItem(item);

      // 별점 데이터
      const ratingData =
        JSON.parse(
          localStorage.getItem(
            "restaurantRatings"
          )
        ) || {};

      // 만족/불만족 데이터
      const satisfactionData =
        JSON.parse(
          localStorage.getItem(
            "restaurantSatisfaction"
          )
        ) || {};

      const key =
        `${user.username}_${item.식당명}`;

      // 기존 별점 불러오기
      setRating(
        ratingData[key] || 0
      );

      // 기존 만족도 불러오기
      setSatisfaction(
        satisfactionData[key] || null
      );
    }}
  >
    더보기
  </button>
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(startPage - 1)}
                  disabled={startPage === 1}
                >
                  ◀
                </button>

                {Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
                ).map((page) => (
                  <button
                    key={page}
                    className={currentPage === page ? "active-page" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(endPage + 1)}
                  disabled={endPage >= totalPages}
                >
                  ▶
                </button>
              </div>

              {selectedItem && (
  <div
  className="modal-overlay"
  onClick={() => setSelectedItem(null)}
>
  <div
    className="modal"
    onClick={(e) => e.stopPropagation()}
  >
    <h3>{selectedItem.식당명}</h3>

    <p><b>카테고리</b> {selectedItem.업태명}</p>
    <p><b>대표음식</b> {selectedItem.주된음식}</p>
    <p><b>주소</b> {selectedItem.소재지도로명}</p>
    <p><b>전화번호</b> {selectedItem.소재지전화번호}</p>

    <p>
      <b>해시태그</b>{" "}
      {selectedItem.해시태그
        ?.split(",")
        .map((tag) => `#${tag}`)
        .join(" ")}
    </p>

    <p>
      <b>식당 면적</b>{" "}
      {selectedItem["영업장면적(평)"]}
    </p>

    <div className="rating-box">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      type="button"
      className={
        rating >= star
          ? "star active"
          : "star"
      }
      onClick={() =>
        saveRating(star)
      }
    >
      ★
    </span>
  ))}

    {/* 만족도 */}
    <div className="satisfaction-box">

      <button
        className={
          satisfaction === "만족"
            ? "selected"
            : ""
        }
        onClick={() =>
          saveSatisfaction("만족")
        }
      >
        😊 만족
      </button>

      <button
        className={
          satisfaction === "불만족"
            ? "selected"
            : ""
        }
        onClick={() =>
          saveSatisfaction("불만족")
        }
      >
        😢 불만족
      </button>
    </div>
    </div>

    <div className="modal-btns">

      <button
        className="close_btn"
        onClick={() =>
          setSelectedItem(null)
        }
      >
        닫기
      </button>
    </div>
  </div>
</div>
)}
            </>
          )}
        </div>
      </div>)}

      {mode === "ai" && (
  <Ai />
)}

     

    </div>
  
);
}

export default Home;