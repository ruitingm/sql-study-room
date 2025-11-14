import { useState } from "react";
import { Eye } from "lucide-react";
import type { problemFilter } from "../types";

export default function ProblemPanel() {
  const [filter, setFilter] = useState<problemFilter>("All");
  const problems = [
    { id: 1, title: "SQL JOIN Practice", reviewed: true },
    { id: 2, title: "Window Functions", reviewed: false },
    { id: 3, title: "Subqueries", reviewed: true },
    { id: 4, title: "Group By", reviewed: false },
  ];
  const filteredProblems = problems.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Reviewed") return p.reviewed === true;
    return p.reviewed === false;
  });
  const filterOptions: problemFilter[] = ["All", "Reviewed", "Unreviewed"];
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 shadow-sm h-[600px]">
      <div className="flex gap-3 mb-4">
        {filterOptions.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as problemFilter)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === f
                ? "bg-sky-700 text-white"
                : "bg-stone-300 text-stone-700 hover:bg-stone-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex flex-col">
        <table className="w-full text-center table-fixed">
          <thead className="bg-stone-200 text-stone-700">
            <tr>
              <th className="p-3">Question ID</th>
              <th className="p-3">Question Title</th>
              <th className="p-3">Reviewed Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
        </table>
        <div className="flex flex-1 overflow-y-auto">
          <table className="w-full text-center table-fixed">
            <tbody>
              {filteredProblems.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-stone-200 hover:bg-stone-100"
                >
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">
                    {p.reviewed ? (
                      <span className="text-emerald-700">Reviewed</span>
                    ) : (
                      <span className="text-rose-700">Not Reviewed</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center items-center">
                      <button className="text-sky-700 hover:text-sky-900 hover:cursor-pointer">
                        <Eye size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
