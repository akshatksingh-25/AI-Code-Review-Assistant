import { GoogleGenAI } from "@google/genai";
import Review from "../models/Review.js";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

// ✅ Create GenAI client using API key
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_KEY, // must be set in backend/.env
});

// POST /api/review
export const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res
        .status(400)
        .json({ error: "Code and language are required" });
    }

    // Keep your prompt exactly as requested
    const prompt = `
You are an expert software engineer performing a professional code review. Analyze the following ${language} code thoroughly and provide a structured, visually appealing report.  

Focus on:
- ✅ Readability
- 🛠 Modularity
- ⚠️ Potential bugs
- 🏆 Best practices
- 💡 Actionable improvement suggestions

Format your response as a **well-designed Markdown report** with headings, subheadings, bullet points, spacing, and optional code snippets. Use emojis, indentation, and spacing to make it easy to read.

Structure your response as follows and adding a horizontal break after each numbered section::

---

# 1) Code Summary
- Explain what the code does step by step, in clear simple terms.
- Keep it concise and numbered if possible.

# 2) Quality Rating
- Rate overall code quality: **Excellent / Good / Fair / Poor**
- Give a clear justification for the rating.

# 3) Readability & Modularity
- Discuss naming conventions, indentation, clarity, and comments.
- Evaluate function structure, separation of concerns, and reusability.

# 4) Best Practices
- Highlight adherence or violations of ${language} best practices.
- Suggest modern syntax, patterns, or conventions if applicable.

# 5) Potential Bugs / Issues
- Identify syntax errors, logical errors, inefficiencies, or edge cases.
- Use bullet points for clarity.

# 6) Suggestions for Improvement
- Provide actionable recommendations to enhance code quality, readability, or performance.
- Number or bullet them for clarity.

# 7) Example Fix (Optional)
- Rewrite a small section of code applying the improvements you suggested.
- Include it in a code block for clarity.

---

Make sure your output is **professional, visually clear, and easy to follow**, like a formal code review report for a developer team.


Code: ${code}
`;

    // ✅ Call GenAI
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const reviewText = response.text;

    // ✅ Save review to MongoDB
    const newReview = await Review.create({
      code,
      language,
      review: reviewText,
    });

    // ✅ Return to frontend
    res.json({ review: reviewText, id: newReview._id });
  } catch (err) {
    console.error("Error in reviewCode:", err);

    // If Google API fails
    if (err.response?.status) {
      return res.status(err.response.status).json({ error: err.message });
    }

    res.status(500).json({ error: "Something went wrong" });
  }
};

// GET /api/review - fetch all past reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("Error in getReviews:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
