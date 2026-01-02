import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

import UserModel from "../model/user.model.js";
import CompanyModel from "../model/company.model.js";

/* ================= EMAIL SETUP ================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

/* ================= HELPERS ================= */

const generateJWT = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

const generateOTP = () =>
  crypto.randomInt(100000, 999999).toString(); // 6-digit OTP

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

/* =========================================================
   1️⃣ ADMIN SIGNUP + COMPANY CREATE + OTP SEND (FAST)
========================================================= */

export const signup = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    // Validation
    if (!name || !email || !password || !companyName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Existing user check
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create company (ONLY ONCE)
    const company = await CompanyModel.create({ name: companyName });

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Create admin user (NOT verified)
    const adminUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      companyId: company._id,
      isVerified: false,
      otp,
      otpExpiry,
      otpAttempts: 0,
    });

    company.createdBy = adminUser._id;
    await company.save();

    // 🚀 RESPOND FAST (DO NOT WAIT FOR EMAIL)
    res.status(201).json({
      message: "Signup successful. OTP sent to email.",
    });

    // 📧 SEND EMAIL IN BACKGROUND
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Email Verification",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    }).catch(err => {
      console.error("EMAIL ERROR:", err.message);
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

/* =========================================================
   2️⃣ VERIFY OTP
========================================================= */

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Rate limit
    if (user.otpAttempts >= 5) {
      return res.status(429).json({
        message: "Too many wrong attempts. Please resend OTP.",
      });
    }

    if (!user.otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.otp !== otp) {
      user.otpAttempts += 1;
      await user.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ OTP verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.otpAttempts = 0;

    await user.save();

    res.json({
      message: "OTP verified successfully. You can now login.",
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({ message: "Server error during OTP verification" });
  }
};

/* =========================================================
   3️⃣ RESEND OTP
========================================================= */

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    user.otpAttempts = 0;

    await user.save();

    res.json({ message: "OTP resent successfully" });

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Resend OTP",
      text: `Your new OTP is ${otp}. It is valid for 10 minutes.`,
    }).catch(err => {
      console.error("EMAIL ERROR:", err.message);
    });

  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    res.status(500).json({ message: "Server error while resending OTP" });
  }
};

/* =========================================================
   4️⃣ LOGIN (BLOCKED UNTIL VERIFIED)
========================================================= */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified. Please verify OTP.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateJWT({
      userId: user._id,
      role: user.role,
      companyId: user.companyId,
    });

    res.cookie("token", token, cookieOptions);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

/* =========================================================
   5️⃣ LOGOUT
========================================================= */

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
