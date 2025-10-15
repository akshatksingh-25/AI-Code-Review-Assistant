# 🖥️ AI Code Review Assistant

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.17.1-green?logo=node.js)
![Vite](https://img.shields.io/badge/Vite-7.1.7-orange?logo=vite)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19.1-green?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-blue?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-blue)
<br><br>

## 🌟 Project Overview

**AI Code Review Assistant** is a **modern full-stack web application** that leverages AI to provide **professional, structured code reviews** for multiple programming languages.  

💡 **Why Use It?**  
- ✍️ Write code directly in-browser and get AI-powered feedback.  
- 📂 Upload code files for instant AI reviews.  
- 📜 View and manage the history of all past reviews.  
- 🎯 Supports JS, Python, Java, C#, C++, PHP, Ruby, Go, Swift, Kotlin, TypeScript, Rust, and more.  
- 🖥️ Sleek dark-themed UI with syntax highlighting.  

<br>

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + Vite | UI & SPA Routing |
| Styling | TailwindCSS | Modern & responsive design |
| Code Editor | @monaco-editor/react | Rich code editing experience |
| Markdown Rendering | react-markdown | Display AI reviews |
| Backend | Node.js + Express | REST API server |
| Database | MongoDB + Mongoose | Store code & reviews |
| AI Integration | @google/genai | Generate AI code reviews |

<br>

## ✨ Features

### 1️⃣ Write & Review Code
- Select language from dropdown.  
- Type or paste code in Monaco editor.  
- Click **Review** → Receive structured AI feedback including: ✅ Readability, 🛠 Modularity, ⚠️ Potential Bugs, 🏆 Best Practices, 💡 Suggestions.

### 2️⃣ File Upload Review
- Upload `.js`, `.py`, `.java`, `.cpp`, `.ts`, etc.  
- AI auto-detects language and generates structured review instantly.  

### 3️⃣ Review History
- View all past reviews with timestamps.  
- Click **View** to expand the full AI-generated report.  
