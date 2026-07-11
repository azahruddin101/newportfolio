/* Seeds MongoDB with the canonical portfolio content.
 *
 *   node scripts/seed.mjs          # upserts content (wipes each collection first)
 *
 * Reads MONGODB_URI from .env.local / .env or the environment.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import mongoose from "mongoose";

// Minimal .env loader (no extra dependency needed)
for (const file of [".env.local", ".env"]) {
  const path = resolve(process.cwd(), file);
  if (!existsSync(path)) continue;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
}

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";

const { seedData } = await import("../src/lib/seed-data.js");
const { default: Profile } = await import("../src/models/Profile.js");
const { default: Project } = await import("../src/models/Project.js");
const { default: MinorProject } = await import("../src/models/MinorProject.js");
const { default: SkillCategory } = await import("../src/models/SkillCategory.js");
const { default: MinorSkill } = await import("../src/models/MinorSkill.js");
const { default: Learning } = await import("../src/models/Learning.js");
const { default: Experience } = await import("../src/models/Experience.js");

console.log(`→ Connecting to ${MONGODB_URI.replace(/\/\/[^@]+@/, "//***@")}`);
await mongoose.connect(MONGODB_URI);

const jobs = [
  [Profile, [seedData.profile]],
  [Project, seedData.projects],
  [MinorProject, seedData.minorProjects],
  [SkillCategory, seedData.skillCategories],
  [MinorSkill, seedData.minorSkills],
  [Learning, seedData.learning],
  [Experience, seedData.experience],
];

for (const [Model, docs] of jobs) {
  await Model.deleteMany({});
  await Model.insertMany(docs);
  console.log(`✓ ${Model.modelName}: ${docs.length} document(s)`);
}

await mongoose.disconnect();
console.log("✓ Seed complete");
