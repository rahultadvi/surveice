import express from "express";
import {
  signup,
  login,
  logout
} from "../controllers/authcontroller.js";

const router = express.Router();

/* ================= AUTH ROUTES ================= */

// Admin Signup + Send OTP
router.post("/signup", signup);

// Verify OTP

// Resend OTP

// Login (only after OTP verification)
router.post("/login", login);

// Logout
router.post("/logout", logout);

export default router;
