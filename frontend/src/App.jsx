import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ai from "./pages/Ai";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/" element={<Login />} />

        {/* 필터링 페이지 */}
        <Route path="/home" element={<Home />} />
        
        {/* AI 페이지 */}
        <Route path="/ai" element={<Ai />} />

        {/* 프로필 페이지 */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;