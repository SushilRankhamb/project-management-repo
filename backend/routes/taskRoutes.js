import express from "express";
import { getTasks, createTask, updateTaskStatus, deleteTask } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware(), getTasks); // Any logged-in user can view their tasks
router.post("/", authMiddleware("user"), createTask); // Only users can create tasks
router.put("/:id", authMiddleware(), updateTaskStatus); // Any logged-in user can update their tasks
router.delete("/:id", authMiddleware("admin"), deleteTask); // Only admin can delete tasks

export default router;
