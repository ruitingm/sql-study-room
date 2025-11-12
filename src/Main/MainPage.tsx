import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../Nagivation/Navigation";
import Profile from "../Profile/Profile";
import Setting from "../Setting/Setting";
import Analysis from "../Report/Report";
import AIChat from "../AIChat/AIChat";
import AllProblems from "../Problem/AllProblems";
import ProblemEdit from "../Problem/ProblemEdit";

export default function MainPage() {
  return (
    <div id="main-page" className="h-screen flex">
      <NavigationBar />
      <div
        id="main-content"
        className="ml-[calc(2rem)] w-full my-4 mx-2 rounded-xl bg-stone-100 overflow-hidden"
      >
        <Routes>
          <Route path="/" element={<Navigate to="allproblems" />} />
          <Route path="settings" element={<Setting />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="allproblems" element={<AllProblems />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="problems/:qid" element={<ProblemEdit />} />
        </Routes>
      </div>
    </div>
  );
}
