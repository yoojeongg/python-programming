import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../images/logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [sex, setSex] = useState([]);
  const [age, setAge] = useState([]);
  const [foods, setFoods] = useState([]);
  const [nfoods, setNfoods] = useState([]);
  const [needFoodInput, setNeedFoodInput] = useState(false);

  const navigate = useNavigate();

  // 토글 함수
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

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    if (data.exists) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
      return;
    }

    setNeedFoodInput(true);
    alert("신규 사용자입니다. 정보 입력해주세요");
  };

  // 회원가입
  const handleSignup = async () => {
    if (foods.length === 0) {
      alert("선호 음식을 선택해주세요");
      return;
    }

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        favorite_foods: foods,
        avoid_foods: nfoods,
      }),
    });

    const data = await res.json();

    if (data.success || data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <img src={logo} alt="logo" className="logo" />

        <input
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {needFoodInput && (
          <>
          {/* 성별 */}
            <div className="filter-row">
              <p>성별</p>

              <h>
                {["남성","여성"].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={sex.includes(item)}
                      onChange={() => toggleValue(setSex, item)}
                    />
                    {item}
                  </label>
                ))}
              </h>
            </div>
            {/* 나이 */}
            <div className="filter-row">
              <p>나이</p>

              <h>
                {["10대","20대"].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={age.includes(item)}
                      onChange={() => toggleValue(setAge, item)}
                    />
                    {item}
                  </label>
                ))}
              </h>
            </div>



            {/* 선호 음식 */}
            <div className="filter-row">
              <p>선호</p>

              <h>
                {["한식","중식","일식","양식","동남아","분식","주점","뷔페"].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={foods.includes(item)}
                      onChange={() => toggleValue(setFoods, item)}
                    />
                    {item}
                  </label>
                ))}
              </h>
            </div>

            {/* 싫어하는 음식 */}
            <div className="filter-row">
              <p>비선호</p>

              <h>
                {["매움","자극적","향신료","해산물","견과류","밀가루","유제품"].map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={nfoods.includes(item)}
                      onChange={() => toggleValue(setNfoods, item)}
                    />
                    {item}
                  </label>
                ))}
              </h>
            </div>

          </>
        )}

        <button onClick={needFoodInput ? handleSignup : handleLogin}>
          {needFoodInput ? "가입하기" : "시작하기"}
        </button>

      </div>
    </div>
  );
}