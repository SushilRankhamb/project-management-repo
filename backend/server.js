import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks",taskRoutes);

// Catch all undefined routes and return JSON instead of HTML
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if DB connection fails
});


app.listen(5000, () => console.log("Server running on port 5000"));
