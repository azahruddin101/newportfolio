import PageHeader from "@/components/PageHeader";
import SkillsExplorer from "@/components/skills/SkillsExplorer";
import { getSkillCategories, getMinorSkills } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "Skills",
  description:
    "Frontend, backend, database, AI and DevOps — the full toolkit of Azharuddin Hassan, Full Stack JavaScript Developer.",
};

export default async function SkillsPage() {
  const [categories, minorSkills] = await Promise.all([
    getSkillCategories(),
    getMinorSkills(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="Tools of the"
        accent="trade"
        description="From pixel to database to prompt — pick a discipline to see where I'm strongest."
      />
      <SkillsExplorer categories={categories} minorSkills={minorSkills} />
    </>
  );
}
