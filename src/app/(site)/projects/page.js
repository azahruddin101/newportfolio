import PageHeader from "@/components/PageHeader";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { getProjects, getMinorProjects } from "@/lib/data";

export const metadata = {
  title: "Projects",
  description:
    "Production platforms and experiments — AI products, OTT streaming, publishing systems and developer tools built by Azahruddin Hassan.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  const minorProjects = getMinorProjects();

  return (
    <>
      <PageHeader
        eyebrow="The work"
        title="Things I've"
        accent="shipped"
        description="Every project here ran (or runs) in front of real users. Filter by category or search by technology."
      />
      <ProjectsExplorer projects={projects} minorProjects={minorProjects} />
    </>
  );
}
