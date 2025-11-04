import express from "express";

// dotenv package allow to access things written in env file    
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config()

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    connectDB()
    console.log(`Server started at ${port} running on http://localhost:${port}/`)
})

// mayankbajaj672_db_user
// qZQZo5TrZ0mzYExE