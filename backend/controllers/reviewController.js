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
You are an expert software engineer acting as a code reviewer.

Analyze the following ${language} code thoroughly and provide a structured, professional review. 
Your review should be detailed yet clear enough for a developer to immediately understand and improve the code.
Keep gap between each of the response.
Please include the following sections in your response:

# 1. Code Summary
Explain what the code does in simple terms (step-by-step).

# 2. Quality Rating
Rate the overall code quality as one of: Excellent, Good, Fair, or Poor — and justify your rating.

# 3. Readability & Modularity
Comment on readability (naming, indentation, clarity) and modularity (functions, separation of logic, reusability).

# 4. Best Practices
Highlight adherence to or violations of best practices in ${language}.
Include suggestions for modern syntax, patterns, or conventions.

### 5. Potential Bugs / Issues
Identify any syntax or logical errors, inefficiencies, or edge cases that could fail.

# 6. Suggestions for Improvement
List specific, actionable recommendations to enhance code quality, performance, or maintainability. Give in points.

### 7. Example Fix (optional)
If possible, rewrite a small section of the code using your recommendations.

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
