/**
 * Data access layer — reads from the static portfolio data.
 * Same function signatures as before so page-level code barely changes.
 */

import {
  profile,
  projects,
  minorProjects,
  skillCategories,
  minorSkills,
  learning,
  experience,
} from "@/data/portfolio";

export function getProfile() {
  return profile;
}

export function getProjects({ featuredOnly = false } = {}) {
  if (featuredOnly) return projects.filter((p) => p.featured);
  return projects;
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getMinorProjects() {
  return minorProjects;
}

export function getSkillCategories() {
  return skillCategories;
}

export function getMinorSkills() {
  return minorSkills;
}

export function getLearning() {
  return learning;
}

export function getExperience() {
  return experience;
}
