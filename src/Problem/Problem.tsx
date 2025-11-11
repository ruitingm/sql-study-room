export type ProblemProps = {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  concept: string;
  solved: boolean;
};

import { Check } from "lucide-react";
export default function Problem({
  id,
  title,
  difficulty,
  solved,
}: ProblemProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-600";
      case "Medium":
        return "text-amber-500";
      case "Hard":
        return "text-rose-600";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="flex justify-between items-center ps-2 pe-5 py-3 rounded-lg transition odd:bg-stone-50 even:bg-stone-200 mb-1 hover:cursor-pointer ">
      <div className="w-5 flex justify-center me-2">
        {solved && <Check size={15} className="text-emerald-700" />}
      </div>
      <div className="flex items-center gap-3 flex-1">
        <span className="font-medium">
          {id}. {title}
        </span>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <span className={`${getDifficultyColor()} font-semibold`}>
          {difficulty}
        </span>
      </div>
    </div>
  );
}
