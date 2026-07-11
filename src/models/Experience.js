import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    type: { type: String, enum: ["work", "milestone"], default: "work" },
    location: { type: String, default: "" },
    startDate: { type: Date },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Experience ||
  mongoose.model("Experience", ExperienceSchema);
