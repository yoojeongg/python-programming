import { useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import logo from "../images/logo.png";

function Home() {
  const [form, setForm] = useState({
    region: "전체",
    parking: "상관없음",
    wifi: "상관없음",
    playroom: "상관없음",
    multilingual: "상관없음",
    restroom: "상관없음",
    category: "전체",
    zero_restaurant: false,
  });

  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const handleChange = (e) => {
  const { name, value, type, checked } =
    e.target;

  setForm({
    ...form,
    [name]:
      type === "checkbox"
        ? checked
        : value,
  });
};

  const getRecommend = () => {
    axios
      .post("http://127.0.0.1:8000/api/recommend", form)
      .then((res) => {
        console.log("응답 데이터:", res.data);

        setResult(res.data.data || []);
        setCurrentPage(1); // 새 검색 시 1페이지
      })
      .catch((err) => {
        console.log("API 에러:", err);
      });
  };

  // 페이지네이션
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = result.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    result.length / itemsPerPage
  );
  // 페이지 버튼 5개씩 그룹화
const pageGroup = Math.ceil(currentPage / 5);
const startPage = (pageGroup - 1) * 5 + 1;
const endPage = Math.min(
  startPage + 4,
  totalPages
);

  return (
    <div className="container">

      {/* 로고 */}
      <div className="title-box">
        <img
          src={logo}
          alt="logo"
          className="logo"
        />
      </div>

      <div className="main-layout">

        {/* 왼쪽 필터 */}
        <div className="filter-section">
          <h1>필터링 선택</h1>

          <div className="filter-box">

            {/* 지역 */}
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
            >
              <option value="전체">
                지역 선택
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
            </select>

            {/* 주차 */}
            <select
              name="parking"
              value={form.parking}
              onChange={handleChange}
            >
              <option value="상관없음">
                주차장
              </option>
              <option value="유">
                있음
              </option>
              <option value="무">
                없음
              </option>
            </select>

            {/* 와이파이 */}
            <select
              name="wifi"
              value={form.wifi}
              onChange={handleChange}
            >
              <option value="상관없음">
                와이파이
              </option>
              <option value="유">
                있음
              </option>
              <option value="무">
                없음
              </option>
            </select>

            {/* 놀이방 */}
            <select
              name="playroom"
              value={form.playroom}
              onChange={handleChange}
            >
              <option value="상관없음">
                놀이방
              </option>
              <option value="유">
                있음
              </option>
              <option value="무">
                없음
              </option>
            </select>

            {/* 다국어 */}
            <select
              name="multilingual"
              value={form.multilingual}
              onChange={handleChange}
            >
              <option value="상관없음">
                다국어 메뉴판
              </option>
              <option value="유">
                있음
              </option>
              <option value="무">
                없음
              </option>
            </select>

            {/* 화장실 */}
            <select
              name="restroom"
              value={form.restroom}
              onChange={handleChange}
            >
              <option value="상관없음">
                가게 내부 화장실
              </option>
              <option value="유">
                있음
              </option>
              <option value="무">
                없음
              </option>
            </select>

            {/* 카테고리 */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="전체">
                음식 카테고리
              </option>
              <option value="한식">한식</option>
              <option value="중식">중식</option>
              <option value="일식">일식</option>
              <option value="양식">양식</option>
              <option value="아시안음식">
                아시안음식
              </option>
              <option value="분식">분식</option>
              <option value="주점">주점</option>
              <option value="뷔페">뷔페</option>
            </select>

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
              추천받기
            </button>
          </div>
        </div>

        {/* 오른쪽 결과 */}
        {/* 오른쪽 결과 */}
<div className="result-section">

  <h2>
    추천 식당 ({result.length}곳)
  </h2>

  {result.length === 0 ? (
    <p>
      조건에 맞는 식당이 없어요.
    </p>
  ) : (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>식당명</th>
              <th>카테고리</th>
              <th>대표 음식</th>
              <th>주소</th>
              <th>전화번호</th>
              <th>♻️</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map(
              (item, index) => (
                <tr key={index}>
                  <td>
                    {indexOfFirst +
                      index +
                      1}
                  </td>
                  <td>{item.식당명}</td>
                  <td>{item.업태명}</td>
                  <td>{item.주된음식}</td>
                  <td>{item.소재지도로명}</td>
                  <td>{item.소재지전화번호}</td>
                  <td>{item.제로식당}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">

        {/* 이전 그룹 */}
        <button
          onClick={() =>
            setCurrentPage(
              startPage - 1
            )
          }
          disabled={startPage === 1}
        >
          ◀
        </button>

        {/* 페이지 버튼 */}
        {Array.from(
          {
            length:
              endPage -
              startPage +
              1
          },
          (_, i) => startPage + i
        ).map((page) => (
          <button
            key={page}
            className={
              currentPage === page
                ? "active-page"
                : ""
            }
            onClick={() =>
              setCurrentPage(page)
            }
          >
            {page}
          </button>
        ))}

        {/* 다음 그룹 */}
        <button
          onClick={() =>
            setCurrentPage(
              endPage + 1
            )
          }
          disabled={
            endPage >= totalPages
          }
        >
          ▶
        </button>

      </div>
    </>
  )}
</div>
      </div>
    </div>
  );
}

export default Home;