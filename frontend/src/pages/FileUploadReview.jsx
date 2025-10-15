import React, { useState } from "react";
import { fetchReview } from "../api";
import Markdown from "react-markdown";
import GridLoader from "react-spinners/GridLoader";

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
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      cs: "csharp",
      php: "php",
      rb: "ruby",
      go: "go",
      swift: "swift",
      kt: "kotlin",
      rs: "rust",
      dart: "dart",
      scala: "scala",
      pl: "perl",
      hs: "haskell",
      ex: "elixir",
      r: "r",
      m: "matlab",
      sh: "bash",
      bash: "bash",
      html: "html",
      css: "css",
      scss: "scss",
      less: "less",
      json: "json",
      xml: "xml",
      yaml: "yaml",
      yml: "yaml",
      sql: "sql",
      txt: "plaintext",
      md: "markdown",
      lua: "lua",
      ts: "typescript",
      coffee: "coffeescript",
      vb: "vbnet",
      ps1: "powershell",
      dart: "dart",
      bat: "batch",
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
    <div
      className="flex flex-col items-center justify-start h-[90vh] text-white px-5 pt-10"
      style={{ marginTop: 60 }}
    >
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-4 text-purple-400">Upload Files</h2>

      {/* Description */}
      <p
        className="text-xl text-gray-400 text-center max-w-[600px] mb-8"
        style={{ paddingTop: 10, paddingBottom: 20 }}
      >
        Upload your code file and get an AI-powered review instantly. The
        assistant will analyze your code and provide feedback on quality,
        readability, and best practices.
      </p>

      {/* Upload Button */}
      <div className="flex flex-col items-center gap-2 mb-6 w-full max-w-[200px]">
        <label className="cursor-pointer  bg-zinc-800 hover:bg-zinc-600 text-white px-6 py-3 rounded-lg transition-all text-lg w-full text-center">
          Choose File
          <input
            type="file"
            accept=".js,.py,.java,.cpp,.ts,.cs,.php,.rb,.go,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <span className="text-gray-400 text-center w-full">
          {file ? file.name : "No file selected"}
        </span>
      </div>

      {/* Review Button */}
      <button
        onClick={handleSubmit}
        className="btnNormal bg-purple-600 hover:bg-purple-700 px-8 py-2 mb-8" style={{marginTop:15}}
      >
        Get Review
      </button>

      {/* Loader */}
      {loading && (
        <div className="mb-8" style={{marginTop:30}}>
          <GridLoader color="#9333ea" />
        </div>
      )}

      {/* Response */}
      {!loading && response && (
        <div className="bg-zinc-900 border border-zinc-800 p-6 w-[80%] max-h-[60vh] overflow-auto rounded-lg" style={{marginTop:50}}>
          <Markdown>{response}</Markdown>
        </div>
      )}
    </div>
  );
};

export default FileUploadReview;
