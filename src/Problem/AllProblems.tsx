import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import Problem, { type ProblemProps } from "./Problem";

export default function AllProblems() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const problems: ProblemProps[] = [
    {
      id: 1,
      title: "Recyclable and Low Fat Products",
      difficulty: "Easy",
      concept: "Join",
      solved: true,
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      concept: "Aggregation",
      solved: true,
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      concept: "Conditional",
      solved: false,
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      concept: "Subquery",
      solved: false,
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      concept: "Join",
      solved: false,
    },
  ];

  const categories = [
    "Basic",
    "Join",
    "Aggregation",
    "Window Function",
    "Conditional",
    "Set Operation",
    "Join",
    "Aggregation",
    "Window Function",
    "Conditional",
    "Set Operation",
  ];

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-stone-100 text-stone-900 rounded-xl p-4 overflow-hidden space-y-5">
      <div className="relative flex items-center mb-8">
        <div
          ref={scrollRef}
          className="flex flex-row gap-3 overflow-x-auto no-scrollbar scroll-smooth pr-12 w-[calc(100%-2.5rem)]"
        >
          {categories.map((topic, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors text-nowrap ${
                topic === "Basic"
                  ? "bg-stone-600 text-white"
                  : "bg-gray-300 hover:bg-stone-400 text-stone-800"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 bg-stone-200 hover:bg-stone-300 p-1 rounded-full shadow-sm"
        >
          <ChevronRight className="text-stone-700" size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-stone-200 px-3 py-1 rounded-3xl w-1/2">
          <input
            type="text"
            placeholder="Search questions..."
            className="bg-transparent w-full focus:outline-none text-stone-700 placeholder-stone-700"
          />
          <Link to="/main/chat">
            <button className="py-2 px-3 rounded-3xl border border-sky-500 bg-stone-300 text-sm font-semibold text-stone-700 text-nowrap hover:bg-sky-700 hover:text-stone-50">
              Ask AI for New Questions
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto rounded-lg ">
        {problems.map((problem) => (
          <Problem key={problem.id} {...problem} />
        ))}
      </div>
    </div>
  );
}
