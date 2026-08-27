import Hero from "@/sections/Hero";
import About from "@/sections/About";
import ExperiencePreview from "@/sections/ExperiencePreview";
import SkillsPreview from "@/sections/SkillsPreview";
import FeaturedProjects from "@/sections/FeaturedProjects";
import TechMarquee from "@/sections/TechMarquee";
import LearningSection from "@/sections/LearningSection";
import Journey from "@/sections/Journey";
import ContactCTA from "@/sections/ContactCTA";
import {
  getProfile,
  getProjects,
  getSkillCategories,
  getMinorSkills,
  getLearning,
  getExperience,
} from "@/lib/data";

export default function HomePage() {
  const profile = getProfile();
  const projects = getProjects({ featuredOnly: true });
  const skillCategories = getSkillCategories();
  const minorSkills = getMinorSkills();
  const learning = getLearning();
  const experience = getExperience();

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />
      <ExperiencePreview experience={experience} />
      <SkillsPreview categories={skillCategories} />
      <FeaturedProjects projects={projects} />
      <TechMarquee minorSkills={minorSkills} />
      <LearningSection learning={learning} />
      <Journey experience={experience} />
      <ContactCTA profile={profile} />
    </>
  );
}
