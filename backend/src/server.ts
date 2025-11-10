import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import userDataRoutes from "./routes/userData.routes";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userDataRoutes);

// DO NOT listen here. Instead, export the app for Vercel.
export default app;