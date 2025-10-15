import React, { useState } from "react";
import { fetchReview } from "../api";
import Markdown from "react-markdown";
import DotLoader from "react-spinners/DotLoader";

const FileUploadReview = () => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse("");
  };

  const detectLanguage = (filename) => {
    const ext = filename.split(".").pop();
    const map = {
      js: "javascript",
      py: "python",
      java: "java",
      cpp: "cpp",
      cs: "csharp",
      php: "php",
      rb: "ruby",
      go: "go",
      ts: "typescript",
    };
    return map[ext] || "plaintext";
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file first");
      return;
    }

    setLoading(true);
    setResponse("");

    const reader = new FileReader();
    reader.onload = async (e) => {
      const code = e.target.result;
      const lang = detectLanguage(file.name);
      setLanguage(lang);

      try {
        const review = await fetchReview(code, lang);
        setResponse(review);
      } catch (err) {
        console.error(err);
        setResponse("Error fetching review");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] text-white">
      <h2 className="text-3xl font-bold mb-6">Upload File & Get AI Review</h2>

      <input
        type="file"
        accept=".js,.py,.java,.cpp,.ts,.cs,.php,.rb,.go,.txt"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleSubmit}
        className="btnNormal bg-purple-600 hover:bg-purple-700 px-6 py-2"
      >
        Get Review
      </button>

      {loading && (
        <div className="mt-10">
          <DotLoader color="#9333ea" />
        </div>
      )}

      {!loading && response && (
        <div className="bg-zinc-900 border border-zinc-800 mt-8 p-5 w-[80%] max-h-[60vh] overflow-auto rounded-lg">
          <Markdown>{response}</Markdown>
        </div>
      )}
    </div>
  );
};

export default FileUploadReview;
