import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import MainPage from "./Main/MainPage";

function App() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/main/*" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
