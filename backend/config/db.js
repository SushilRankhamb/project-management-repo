import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/project-management", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Local MongoDB...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export default connectDB;
