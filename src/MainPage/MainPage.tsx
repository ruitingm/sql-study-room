import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../Nagivation/Navigation";
import Profile from "../Profile/Profile";
import Setting from "../Setting/Setting";
import AIChat from "../AIChat/AIChat";
import Report from "../Report/Report";
import AllProblems from "../Problem/AllProblems";
import ProblemEdit from "../Problem/ProblemEdit";
import AdminControl from "../AdminControl/AdminControl";
import { useState } from "react";

export default function MainPage() {
  const [isAdmin] = useState(true);
  return (
    <div
      id="main-page"
      className="grid h-screen grid-cols-1 md:grid-cols-[5rem_1fr] gap-2"
    >
      <div className="hidden md:block">
        <NavigationBar />
      </div>

      <div className="bg-stone-100 rounded-xl my-4 mx-2 overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="allproblems" />} />
          <Route path="settings" element={<Setting />} />
          <Route path="profile" element={<Profile />} />
          <Route path="report" element={<Report />} />
          <Route path="allproblems" element={<AllProblems />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="problems/:qid" element={<ProblemEdit />} />
          {isAdmin && <Route path="admin-control" element={<AdminControl />} />}
        </Routes>
      </div>
    </div>
  );
}
