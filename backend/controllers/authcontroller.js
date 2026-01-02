import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

/* =========================================================
   1️⃣ ADMIN SIGNUP + COMPANY CREATE (NO OTP)
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

    // Create admin user (DIRECTLY VERIFIED)
    const adminUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      companyId: company._id,
      isVerified: true,
    });

    company.createdBy = adminUser._id;
    await company.save();

    // 🚀 RESPOND FAST
    res.status(201).json({
      message: "Signup successful. You can login now.",
    });

    // 📧 SEND WELCOME EMAIL IN BACKGROUND
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to the Platform",
      text: `Hello ${name},\n\nYour account has been successfully created.\nYou can now login and start using the system.\n\nThank you!`,
    }).catch(err => {
      console.error("EMAIL ERROR:", err.message);
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

/* =========================================================
   2️⃣ LOGIN (NO VERIFICATION BLOCK)
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
   3️⃣ LOGOUT
========================================================= */

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
