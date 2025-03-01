import Project from "../models/Project.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const project = new Project({ name, description, owner: req.user.id, members });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all projects for a user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ $or: [{ owner: req.user.id }, { members: req.user.id }] })
      .populate("owner", "username email")
      .populate("members", "username email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("members", "username email");
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await project.remove();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
