import mongoose from "mongoose";

const MinorSkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.MinorSkill ||
  mongoose.model("MinorSkill", MinorSkillSchema);
