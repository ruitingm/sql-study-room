import { Check, X, Undo2 } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";

export default function ProblemEdit() {
  const { qid } = useParams();
  const qTitle = "Calculate Amount Spent";
  const qDescription = `Tables:
customers
customer_id | name | city
1 | Alice | New York
2 | Bob | Chicago
3 | Charlie | Los Angeles

orders
order_id | customer_id | order_date | total_amount
101 | 1 | 2024-06-15 | 150.00
102 | 2 | 2024-07-01 | 200.00
103 | 1 | 2024-07-10 | 300.00
104 | 3 | 2024-07-11 | 250.00

Question:
Write a SQL query to list all customers and their total amount spent, including customers who haven’t placed any orders yet.`;
  const qSolution = `SELECT c.name, COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name;`;
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);
  const [solutionVisible, setSolutionVisible] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    setSubmitted(true);
    const success = Math.random() > 0.5;
    setPassed(success);
    setSolutionVisible(true);
  };

  return (
    <div className="flex h-screen bg-stone-100 text-stone-800 overflow-hidden">
      <div className="w-1/2 flex flex-col border-r border-stone-200 bg-stone-50 p-6 overflow-y-auto">
        <div className="flex mb-4 text-stone-800">
          <Link to="/main/allproblems">
            <div className="flex items-center justify-center bg-neutral-200 rounded-3xl px-2 ">
              <Undo2 size={17} className="me-2" />
              <span>Back to Questions</span>
            </div>
          </Link>
        </div>
        <h2 className="text-2xl font-semibold mb-2 ms-2">
          {qid}.&nbsp;{qTitle}
        </h2>
        <div className="bg-stone-100 rounded-lg p-4 text-md text-stone-700 mb-4 mt-2">
          <pre className="whitespace-pre-wrap wrap-break-word font-sans text-stone-700">
            {qDescription}
          </pre>
        </div>
        {submitted && (
          <div
            className={`p-3 rounded-lg font-medium mb-4 ${
              passed
                ? "bg-emerald-100 text-emerald-900 border border-emerald-400"
                : "bg-rose-100 text-rose-800 border border-rose-400"
            }`}
          >
            {passed && (
              <div className="flex items-center space-x-2 mx-2">
                <Check size={20} className="text-emerald-700" />
                <span>Test Case Passed</span>
              </div>
            )}
            {!passed && (
              <div className="flex items-center space-x-2 mx-2">
                <X size={20} />
                <span>Test Case Failed</span>
              </div>
            )}
          </div>
        )}
        {solutionVisible && (
          <div className="mt-4 border-t border-stone-300 pt-3">
            <h3 className="text-lg font-semibold text-stone-700 mb-2 ms-1">
              Solution
            </h3>
            <pre className="bg-stone-900 text-stone-50 rounded-lg p-4 text-sm overflow-x-auto shadow-inner mb-7">
              {qSolution}
            </pre>
          </div>
        )}
      </div>
      <div className="w-1/2 flex flex-col bg-stone-200 p-6 relative">
        <h2 className="text-lg font-semibold text-stone-700 mb-3">
          Your SQL Code
        </h2>
        <div className="flex-1 overflow-y-auto rounded-lg shadow-inner">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your SQL query here..."
            className="w-full h-full min-h-[400px] bg-stone-800 text-stone-50 font-mono text-md rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div className="sticky bottom-0 bg-stone-200 py-3 flex justify-end mb-1">
          <button
            onClick={handleSubmit}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
