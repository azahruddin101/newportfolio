import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100, default: 80 },
    note: { type: String, default: "" },
  },
  { _id: false }
);

const SkillCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
    skills: { type: [SkillSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.SkillCategory ||
  mongoose.model("SkillCategory", SkillCategorySchema);
