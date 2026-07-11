import mongoose from "mongoose";

const LearningSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    category: { type: String, default: "" },
    startedDate: { type: Date },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Learning ||
  mongoose.model("Learning", LearningSchema);
