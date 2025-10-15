import express from "express";
import { reviewCode, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", reviewCode);   // Create review
router.get("/", getReviews);    // Get all reviews

export default router;
