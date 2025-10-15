import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeDashboard from "./pages/HomeDashboard";
import CodeReview from "./pages/CodeReview";
import FileUploadReview from "./pages/FileUploadReview";
import History from "./pages/History";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/code-review" element={<CodeReview />} />
        <Route path="/file-review" element={<FileUploadReview />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
