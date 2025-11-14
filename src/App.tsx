import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import MainPage from "./MainPage/MainPage";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div id="sql-study-room" className="bg-stone-50 min-h-screen">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/main/*" element={<MainPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
