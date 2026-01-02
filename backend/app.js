import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./db/db.js";
import authRout from "./router/authrouter.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// DB connect
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors(
    {
    origin: [
      "http://localhost:5173",
      "https://surveice-frontend.onrender.com"
    ],
    credentials: true,
  }
)
);

// routes
app.use("/auth", authRout);

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server started on port", PORT);
});
