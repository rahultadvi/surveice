import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/db.js";
import authRout from "./router/authrouter.js"



dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: () => {
      
    },
    credentials: true
  })
);
app.use('/auth',authRout)




app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
