import React from "react";
import { useNavigate } from "react-router-dom";

const HomeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] text-center text-white bg-zinc-900 px-5">
      <h1 className="text-4xl font-bold mb-6 text-purple-400">
        AI Code Review Assistant
      </h1>
      <p className="text-gray-400 max-w-[700px] mb-12">
        Automatically review your code or files using AI. Get feedback on structure,
        quality, and improvements instantly.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => navigate("/code-review")}
          className="btnNormal bg-purple-600 hover:bg-purple-700 min-w-[220px]"
        >
          ✍️ Write Code & Get Review
        </button>

        <button
          onClick={() => navigate("/file-review")}
          className="btnNormal bg-purple-600 hover:bg-purple-700 min-w-[220px]"
        >
          📂 Upload File & Get Review
        </button>

        <button
          onClick={() => navigate("/history")}
          className="btnNormal bg-purple-600 hover:bg-purple-700 min-w-[220px]"
        >
          📜 View History
        </button>
      </div>
    </div>
  );
};

export default HomeDashboard;
