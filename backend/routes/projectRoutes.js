import express from "express";
import { getProjects, createProject, deleteProject } from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware(), getProjects); // Any logged-in user can view projects
router.post("/", authMiddleware("admin"), createProject); // Only admin can create
router.delete("/:id", authMiddleware("admin"), deleteProject); // Only admin can delete

export default router;
