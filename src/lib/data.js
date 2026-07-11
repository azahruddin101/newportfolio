import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";
import Project from "@/models/Project";
import MinorProject from "@/models/MinorProject";
import SkillCategory from "@/models/SkillCategory";
import MinorSkill from "@/models/MinorSkill";
import Learning from "@/models/Learning";
import Experience from "@/models/Experience";
import { seedData } from "@/lib/seed-data";

const serialize = (doc) => JSON.parse(JSON.stringify(doc));

/**
 * Server-side data access with graceful fallback: if MongoDB is
 * unreachable (e.g. local dev without a database), the site renders
 * from the canonical seed content instead of crashing.
 */
async function safeQuery(fn, fallback) {
  try {
    await connectDB();
    const result = await fn();
    if (result === null || (Array.isArray(result) && result.length === 0)) {
      return fallback;
    }
    return serialize(result);
  } catch {
    return fallback;
  }
}

export function getProfile() {
  return safeQuery(() => Profile.findOne({}).lean(), seedData.profile);
}

export function getProjects({ featuredOnly = false } = {}) {
  const filter = featuredOnly ? { featured: true } : {};
  const fallback = featuredOnly
    ? seedData.projects.filter((p) => p.featured)
    : seedData.projects;
  return safeQuery(
    () => Project.find(filter).sort({ order: 1, createdAt: -1 }).lean(),
    fallback
  );
}

export function getProjectBySlug(slug) {
  return safeQuery(
    () => Project.findOne({ slug }).lean(),
    seedData.projects.find((p) => p.slug === slug) || null
  );
}

export function getMinorProjects() {
  return safeQuery(
    () => MinorProject.find({}).sort({ order: 1 }).lean(),
    seedData.minorProjects
  );
}

export function getSkillCategories() {
  return safeQuery(
    () => SkillCategory.find({}).sort({ order: 1 }).lean(),
    seedData.skillCategories
  );
}

export function getMinorSkills() {
  return safeQuery(
    () => MinorSkill.find({}).sort({ order: 1 }).lean(),
    seedData.minorSkills
  );
}

export function getLearning() {
  return safeQuery(
    () => Learning.find({}).sort({ order: 1 }).lean(),
    seedData.learning
  );
}

export function getExperience() {
  return safeQuery(
    () => Experience.find({}).sort({ order: 1 }).lean(),
    seedData.experience
  );
}
