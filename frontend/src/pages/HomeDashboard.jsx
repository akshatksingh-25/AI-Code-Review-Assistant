import React from "react";
import { useNavigate } from "react-router-dom";

const HomeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start h-[90vh] text-center text-white bg-zinc-900 px-5" style={{marginTop:100}}>
      <h1 className="text-5xl font-bold mb-6 text-purple-400">
        AI Code Review Assistant
      </h1>
      <p className="text-gray-400 text-xl max-w-[700px] mb-12" style={{padding:20}}>
        Effortlessly analyze your code or uploaded files using AI. Get instant feedback on structure, readability, potential issues, and suggestions for improvement. Whether you are coding solo or collaborating in a team, maintain high-quality code and accelerate your development workflow.  
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
