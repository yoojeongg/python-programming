import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const savedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [username] = useState(
    savedUser.username || ""
  );

  const [sex, setSex] = useState(
    savedUser.sex || ""
  );

  const [age, setAge] = useState(
    savedUser.age || ""
  );

  const [foods, setFoods] = useState(
    savedUser.favorite_foods || []
  );

  const [nfoods, setNfoods] = useState(
    savedUser.avoid_foods || []
  );

  // 체크 토글
  const toggleValue = (setState, value) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  // 저장
  const saveUser = () => {
    const updatedUser = {
      username,
      sex,
      age,
      favorite_foods: foods,
      avoid_foods: nfoods,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("수정 완료");
    navigate("/home");
  };

  return (
    <div className="profile-container">
      <div className="profile-box">

        <div className="profile-title">내 정보 수정</div>

        {/* 아이디 */}
        <input
          value={username}
          disabled
        />

        {/* 성별 */}
        <div className="filter-row">
          <p>성별</p>

          <div className="radio-group">
            {["남성", "여성"].map(
              (item) => (
                <label
                  key={item}
                  className={
                    sex === item
                      ? "selected"
                      : ""
                  }
                >
                  <input
                    type="radio"
                    name="sex"
                    value={item}
                    checked={sex === item}
                    onChange={(e) =>
                      setSex(
                        e.target.value
                      )
                    }
                  />
                  <span>{item}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* 나이 */}
        <div className="filter-row">
          <p>나이대</p>

          <div className="radio-group">
            {[
              "10대",
              "20대",
              "30대",
              "40대",
              "50대",
              "60대이상",
            ].map((item) => (
              <label
                key={item}
                className={
                  age === item
                    ? "selected"
                    : ""
                }
              >
                <input
                  type="radio"
                  name="age"
                  value={item}
                  checked={age === item}
                  onChange={(e) =>
                    setAge(
                      e.target.value
                    )
                  }
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 선호 */}
        <div className="filter-row">
          <p>선호 음식</p>

          <div className="checkbox-group">
            {[
              "한식",
              "중식",
              "일식",
              "양식",
              "동남아",
              "분식",
              "주점",
              "뷔페",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={foods.includes(
                    item
                  )}
                  onChange={() =>
                    toggleValue(
                      setFoods,
                      item
                    )
                  }
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 비선호 */}
        <div className="filter-row">
          <p>비선호 음식</p>

          <div className="checkbox-group">
            {[
              "매움",
              "자극적",
              "향신료",
              "해산물",
              "견과류",
              "밀가루",
              "유제품",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={nfoods.includes(
                    item
                  )}
                  onChange={() =>
                    toggleValue(
                      setNfoods,
                      item
                    )
                  }
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <button onClick={saveUser}>
          저장
        </button>
      </div>
    </div>
  );
}