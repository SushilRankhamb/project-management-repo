import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
});

export default mongoose.model("Project", ProjectSchema);
