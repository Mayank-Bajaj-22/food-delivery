import express from "express";

// dotenv package allow to access things written in env file    
import dotenv from "dotenv";
dotenv.config()
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)

app.listen(port, () => {
    connectDB()
    console.log(`Server started at ${port} running on http://localhost:${port}/`)
})

// mayankbajaj672_db_user
// qZQZo5TrZ0mzYExE