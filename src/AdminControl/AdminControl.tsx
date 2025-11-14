import { useState } from "react";
import UserPanel from "./UserPanel";
import ProblemPanel from "./ProblemPanel";

export default function AdminControl() {
  const [tab, setTab] = useState<"users" | "problems">("users");

  return (
    <div className="w-full h-screen bg-stone-100 text-stone-800 p-6">
      <h1 className="text-3xl font-semibold mb-6">Administrator Dashboard</h1>
      <div className="flex gap-4 border-b border-stone-300 pb mb-6">
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 font-medium rounded-t-lg ${
            tab === "users"
              ? "bg-stone-300 text-stone-900"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setTab("problems")}
          className={`px-4 py-2 font-medium rounded-t-lg ${
            tab === "problems"
              ? "bg-stone-300 text-stone-900"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          Problems
        </button>
      </div>
      {tab === "users" ? <UserPanel /> : <ProblemPanel />}
    </div>
  );
}
