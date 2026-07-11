import mongoose from "mongoose";

const SocialLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, default: "" },
  },
  { _id: false }
);

const StatSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: "" },
  },
  { _id: false }
);

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    about: { type: String, default: "" },
    shortAbout: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    availability: { type: String, default: "" },
    socialLinks: { type: [SocialLinkSchema], default: [] },
    stats: { type: [StatSchema], default: [] },
    keywords: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
