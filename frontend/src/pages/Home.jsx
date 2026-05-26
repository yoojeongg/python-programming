import { useState } from "react";
import "../styles/Home.css";
import logo from "../images/logo.png";
import data from "../data/information_final.json";

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

  const getRecommend = () => {
    let filtered = [...data];

    // 지역
    if (form.region !== "전체") {
      filtered = filtered.filter((item) =>
        item.지역명?.includes(form.region)
      );
    }

    // 카테고리
    if (form.category !== "전체") {
      filtered = filtered.filter(
        (item) => item.업태명 === form.category
      );
    }

    // 제로식당
    if (form.zero_restaurant) {
      filtered = filtered.filter(
        (item) => item.제로식당 === "♻️"
      );
    }

    // 주차
    if (form.parking !== "상관없음") {
      filtered = filtered.filter((item) =>
        form.parking === "유"
          ? item.주차가능 === "Y"
          : item.주차가능 === "N"
      );
    }

    // 와이파이
    if (form.wifi !== "상관없음") {
      filtered = filtered.filter((item) =>
        form.wifi === "유"
          ? item.와이파이제공 === "Y"
          : item.와이파이제공 === "N"
      );
    }

    setResult(filtered);
    setCurrentPage(1);
  };

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
        <img src={logo} alt="logo" className="logo" />
      </div>

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
              <option value="상관없음">
                전체
              </option>
              <option value="유">
                있음
              </option>
              <option value="무">
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
              <option value="상관없음">
                전체
              </option>
              <option value="유">
                있음
              </option>
              <option value="무">
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
              <option value="상관없음">
                전체
              </option>
              <option value="유">
                있음
              </option>
              <option value="무">
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
              <option value="상관없음">
                전체
              </option>
              <option value="유">
                있음
              </option>
              <option value="무">
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
              <option value="상관없음">
                전체
              </option>
              <option value="유">
                있음
              </option>
              <option value="무">
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
              <option value="전체">
                전체
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
                        <td><button className="more_btn" onClick={() => setSelectedItem(item)}>더보기</button></td>
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
  <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      
      <h3>{selectedItem.식당명}</h3>
      <p2><b>카테고리:</b> {selectedItem.업태명}</p2>
      <p2><b>대표음식:</b> {selectedItem.주된음식}</p2>
      <p2><b>주소:</b> {selectedItem.소재지도로명}</p2>
      <p2><b>전화번호:</b> {selectedItem.소재지전화번호}</p2>
      <p2><b>해시태그:</b> {selectedItem.해시태그?.split(",").map(tag => `#${tag}`).join(" ")}</p2>
      <p2><b>식당 면적:</b> {selectedItem["영업장면적(평)"]}</p2>

      <button className="close_btn" onClick={() => setSelectedItem(null)}>
        닫기
      </button>
    </div>
  </div>
)}
            </>
          )}
        </div>
      </div>
    </div>
  
);
}

export default Home;