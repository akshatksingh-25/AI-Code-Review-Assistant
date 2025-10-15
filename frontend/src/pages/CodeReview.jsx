import React, { useState } from "react";
import "../App.css";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import Markdown from "react-markdown";
import DotLoader from "react-spinners/DotLoader";
import { fetchReview } from "../api";


const CodeReview = () => {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "typescript", label: "TypeScript" },
    { value: "rust", label: "Rust" },
    { value: "dart", label: "Dart" },
    { value: "scala", label: "Scala" },
    { value: "perl", label: "Perl" },
    { value: "haskell", label: "Haskell" },
    { value: "elixir", label: "Elixir" },
    { value: "r", label: "R" },
    { value: "matlab", label: "MATLAB" },
    { value: "bash", label: "Bash" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#18181b", // dark background (similar to bg-zinc-900)
      borderColor: "#3f3f46",
      color: "#fff",
      width: "100%",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#18181b", // dropdown bg
      color: "#fff",
      width: "100%",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff", // selected option text
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#27272a" : "#18181b", // hover effect
      color: "#fff",
      cursor: "pointer",
      // width: "30%"
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
      width: "100%",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#a1a1aa", // placeholder text color
      width: "100%",
    }),
  };

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function reviewCode() {
    if (!code) {
      alert("Please enter code first");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const review = await fetchReview(code, selectedOption.value);
      setResponse(review);
    } catch (err) {
      console.error(err);
      setResponse("Error fetching review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>

      <div
        className="main flex justify-between gap-4"
        style={{ height: "calc(100vh - 70px" }}
      >
        <div className="left h-[87.5%] w-[50%] bg-black">
          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex items-center gap-[10px]">
            <Select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e);
              }}
              options={options}
              styles={customStyles}
            />
            <button className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">
              Fix Code
            </button>
            <button
              onClick={() => {
                if (code === ""){
                  alert("Please enter code first");
                  return;
                }
                else reviewCode(); // This now calls backend
              }}
              className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800"
            >
              Review
            </button>
          </div>

          <Editor
            height="100%"
            theme="vs-dark"
            language={selectedOption.value}
            value={code}
            onChange={(e) => {
              setCode(e);
            }}
          />
        </div>

        <div className="right overflow-scroll !p-[10px] bg-zinc-900 w-[50%] h-[101%] relative">
          <div className="topTab border-b-[1px] border-t-[1px] border-[#ffffff] flex items-center justify-center h-[60px] bg-black">
            <p className="font-[700] text-[17px]" style={{ color: "white" }}>
              Response
            </p>
          </div>

          {/* Loader Overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <DotLoader color="#9333ea" />
            </div>
          )}

          {/* Response */}
          <div className={`${loading ? "opacity-50" : "opacity-100"}`}>
            <Markdown>{response}</Markdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeReview;
