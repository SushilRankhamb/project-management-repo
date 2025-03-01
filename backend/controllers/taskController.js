import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    console.log("🔹 getTasks function called"); // Debugging log
    console.log("🔹 Logged-in User ID:", req.user?.id); // Check if user ID is correctly passed

    // Fetch tasks for the logged-in user
    const tasks = await Task.find({ user: req.user.id });

    console.log("📌 Fetched Tasks from DB:", tasks); // Log fetched tasks
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Error fetching tasks:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate } = req.body;
    const task = new Task({ title, description, project, assignedTo, dueDate });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get tasks for a project
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate("assignedTo", "username email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.remove();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
