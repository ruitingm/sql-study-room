import { useState } from "react";
import { Eye, PencilLine } from "lucide-react";
import type { problemFilter } from "../Problem/problemType";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

export default function ProblemPanel({
  onCreate,
  onEdit,
}: {
  onCreate: () => void;
  onEdit: (pId: number) => void;
}) {
  const [filter, setFilter] = useState<problemFilter>("All");
  const problems = useSelector(
    (state: RootState) => state.problemReducer.problems
  );
  const filteredProblems = problems?.filter((p) => {
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
              {filteredProblems?.map((p) => (
                <tr
                  key={p.pId}
                  className="border-b border-stone-200 hover:bg-stone-100"
                >
                  <td className="p-3">{p.pId}</td>
                  <td className="p-3">{p.pTitle}</td>
                  <td className="p-3">
                    {p.reviewed ? (
                      <span className="text-emerald-700">Reviewed</span>
                    ) : (
                      <span className="text-rose-700">Not Reviewed</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center items-center">
                      {!p.reviewed && (
                        <div>
                          <button
                            className="text-sky-700 hover:text-sky-900 hover:cursor-pointer"
                            onClick={onCreate}
                          >
                            <Eye size={20} />
                          </button>
                        </div>
                      )}
                      {p.reviewed && (
                        <div>
                          <button
                            className="text-emerald-700 hover:text-emerald-900 hover:cursor-pointer"
                            onClick={() => onEdit(p.pId)}
                          >
                            <PencilLine size={20} />
                          </button>
                        </div>
                      )}
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
