/**
 * Chat interface to use LLM assistant  
 * - Maintains message history in state and shows chat UI 
 * - Supports a route for creating new problems via LLM ("/llm-problem-creation")  
 * 
 * TODO:
 * Right now uses local component state. Need to connect this to backend and LLM
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Plus } from "lucide-react";
import LLMProblemCreation from "./LLMProblemCreation";

export default function AIChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: "user", text: "Hello there!" },
    { sender: "ai", text: "Hi, How can I help you?" },
    { sender: "user", text: "Give me a SQL question using JOIN." },
    {
      sender: "ai",
      text: `Tables:

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
Write a SQL query to list all customers and their total amount spent, including customers who haven’t placed any orders yet.`,
    },
  ]);

  const model = "GPT";
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Auto-focus input on component mount
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const currentInput = input;
    
    // Clear input immediately to prevent typing issues
    setInput("");
    
    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    // Add loading message
    const loadingMessage = { sender: "ai", text: "🤔 Generating SQL query..." };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const API_BASE = process.env.NODE_ENV === 'development' 
        ? 'http://127.0.0.1:8001'
        : 'https://sql-study-room-2025.uw.r.appspot.com';
        
      const response = await fetch(`${API_BASE}/nl2sql/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentInput,
          account_number: 1 // Default for testing
        }),
      });

      const data = await response.json();
      
      // Remove loading message and add response
      setMessages((prev) => prev.slice(0, -1));
      
      if (data.error) {
        const errorMessage = {
          sender: "ai",
          text: `❌ Error: ${data.error}\n\nGenerated SQL: ${data.sql || 'None'}`
        };
        setMessages((prev) => [...prev, errorMessage]);
      } else {
        const successMessage = {
          sender: "ai",
          text: `✅ Query executed successfully!\n\n📝 Generated SQL:\n${data.sql}\n\n📊 Results (${data.row_count} rows):\n${JSON.stringify(data.results, null, 2)}`
        };
        setMessages((prev) => [...prev, successMessage]);
      }
    } catch (error) {
      // Remove loading message and add error
      setMessages((prev) => prev.slice(0, -1));
      
      // If quota exceeded, show demo response
      if (error instanceof Error && error.message.includes('429')) {
        const demoMessage = {
          sender: "ai",
          text: `🔧 Demo Mode (Quota Exceeded)\n\n📝 Generated SQL:\nSELECT p.Problem_ID, p.Problem_description, d.Difficulty_level\nFROM PROBLEM p\nJOIN TAG t ON p.Tag_ID = t.Tag_ID\nJOIN DIFFICULTY_TAG d ON t.Difficulty_ID = d.Difficulty_ID\nWHERE d.Difficulty_level = 'EASY'\nLIMIT 50;\n\n📊 Results: [Demo data - API quota exceeded]`
        };
        setMessages((prev) => [...prev, demoMessage]);
      } else {
        const errorMessage = {
          sender: "ai",
          text: `❌ Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    }
  };
  const handleKeyPress = useCallback((e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }, [input]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);
  const ChatInterface = () => (
    <div className="flex flex-col h-full rounded-xl bg-stone-100 shadow-lg chat-container">
      <div className="bg-neutral-400 text-stone-800 text-center py-4 font-semibold text-xl rounded-t-xl flex flex-row items-center">
        <div className="flex-1">{model} Chat Assistant</div>
        <div className="me-5 text-sm">
          <button
            onClick={() => navigate("llm-problem-creation")}
            className="bg-neutral-300 text-stone-700 px-4 py-2 rounded-md hover:ring-rose-700 hover:ring-2  transition flex flex-row items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add New Problem</span>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-3 bg-stone-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2 rounded-xl text-md ${
              msg.sender === "user"
                ? "bg-neutral-600 text-stone-50 self-end rounded-br-none"
                : "bg-stone-200 text-stone-800 self-start rounded-bl-none"
            }`}
          >
            {msg.sender == "ai" && (
              <pre className="text-md font-sans whitespace-pre-wrap">
                {msg.text}
              </pre>
            )}
            {msg.sender == "user" && <div>{msg.text}</div>}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="border-t border-gray-300 p-4 bg-stone-50 flex items-center rounded-bl-xl rounded-br-xl">
        <input
          ref={inputRef}
          id="chat-input"
          name="message"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-md focus:outline-none"
          autoComplete="off"
          spellCheck="false"
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route index element={<ChatInterface />} />
      <Route path="llm-problem-creation" element={<LLMProblemCreation />} />
    </Routes>
  );
}
