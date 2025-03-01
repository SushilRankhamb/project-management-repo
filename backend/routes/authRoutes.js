import express from "express";
import { registerUser, loginUser, getUserProfile, refreshToken } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

// Get User Profile (Protected Route)
router.get("/profile", authMiddleware, getUserProfile);

// Refresh Token Route
router.post("/refresh-token", refreshToken);

export default router;
