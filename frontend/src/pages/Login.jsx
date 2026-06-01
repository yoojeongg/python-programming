import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../images/logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [foods, setFoods] = useState([]);
  const [nfoods, setNfoods] = useState([]);
  const [needFoodInput, setNeedFoodInput] = useState(false);

  const navigate = useNavigate();

  // 체크박스 토글
  const toggleValue = (setState, value) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  // 로그인
  const handleLogin = async () => {
    if (!username.trim()) {
      alert("아이디 입력해주세요");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,sex,age,favorite_foods: foods,avoid_foods: nfoods,
        }),
      });

      const data = await res.json();

      // 기존 회원
      if (data.exists) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        navigate("/home");
        return;
      }

      // 신규 회원
      setNeedFoodInput(true);
      alert("신규 사용자입니다. 정보를 입력해주세요.");
    } catch (err) {
      console.error(err);
      alert("서버 연결 실패");
    }
  };

  // 회원가입
  const handleSignup = async () => {
    if (!sex) {
  alert("성별을 선택해주세요");
  return;
}

if (!age) {
  alert("나이대를 선택해주세요");
  return;
}

if (foods.length === 0) {
  alert("선호 음식 하나 이상 선택해주세요");
  return;
}
    if (foods.length === 0) {
      alert("선호 음식 하나 이상 선택해주세요");
      return;
    }

    try {
      // signup API 따로 사용
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,sex,age,favorite_foods: foods,avoid_foods: nfoods,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("회원가입 완료");
        navigate("/home");
      } else {
        alert(data.message || "회원가입 실패");
      }
    } catch (err) {
      console.error(err);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="logo" className="logo" />

        {/* 아이디 */}
        <input
          placeholder="아이디"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          disabled={needFoodInput} // 회원가입 단계에서는 수정 불가
        />

        {needFoodInput && (
          <>
          {/* 성별 */}
<div className="filter-row">
  <p>성별</p>

  <div className="radio-group">
    {["남성", "여성"].map((item) => (
      <label
        key={item}
        className={sex === item ? "selected" : ""}
      >
        <input
          type="radio"
          name="sex"
          value={item}
          checked={sex === item}
          onChange={(e) =>
            setSex(e.target.value)
          }
        />
        <span>{item}</span>
      </label>
    ))}
  </div>
</div>

{/* 나이대 */}
<div className="filter-row">
  <p>나이대</p>

  <div className="radio-group">
    {[
      "10대",
      "20대",
      "30대",
      "40대",
      "50대",
      "60대 이상",
    ].map((item) => (
      <label
        key={item}
        className={age === item ? "selected" : ""}
      >
        <input
          type="radio"
          name="age"
          value={item}
          checked={age === item}
          onChange={(e) =>
            setAge(e.target.value)
          }
        />
        <span>{item}</span>
      </label>
    ))}
  </div>
</div>
            {/* 선호 음식 */}
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
                      checked={foods.includes(item)}
                      onChange={() =>
                        toggleValue(setFoods, item)
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
                      checked={nfoods.includes(item)}
                      onChange={() =>
                        toggleValue(setNfoods, item)
                      }
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          onClick={
            needFoodInput
              ? handleSignup
              : handleLogin
          }
        >
          {needFoodInput
            ? "회원가입"
            : "시작하기"}
        </button>
      </div>
    </div>
  );
}