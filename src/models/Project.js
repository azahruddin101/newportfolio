import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    features: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    solutions: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    github: { type: String, default: "" },
    liveDemo: { type: String, default: "" },
    category: { type: String, default: "Full Stack" },
    timeline: { type: String, default: "" },
    teamSize: { type: String, default: "" },
    role: { type: String, default: "" },
    status: {
      type: String,
      enum: ["In Production", "In Development", "Completed", "Archived"],
      default: "Completed",
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    accent: { type: String, default: "#a35e47" },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
