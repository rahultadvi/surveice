import express from "express";
import {
  signup,
  verifyOTP,
  resendOTP,
  login,
  logout
} from "../controllers/authcontroller.js";

const router = express.Router();

/* ================= AUTH ROUTES ================= */

// Admin Signup + Send OTP
router.post("/signup", signup);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Resend OTP
router.post("/resend-otp", resendOTP);

// Login (only after OTP verification)
router.post("/login", login);

// Logout
router.post("/logout", logout);

export default router;
