import mongoose from "mongoose";

const MinorProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    techStack: { type: [String], default: [] },
    github: { type: String, default: "" },
    demo: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.MinorProject ||
  mongoose.model("MinorProject", MinorProjectSchema);
