"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/animations/Reveal";
import Chip from "@/components/ui/Chip";
import { useTilt } from "@/hooks/useTilt";

function ProjectRow({ project, index }) {
  const tiltRef = useTilt({ max: 4 });
  const targetUrl = project.liveDemo || `/projects/${project.slug}`;
  const isExternal = Boolean(project.liveDemo);

  return (
    <Reveal delay={0.05 * index}>
      <a
        href={targetUrl}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        data-cursor-label={isExternal ? "Open" : "View"}
        className="group block"
        aria-label={`${project.title} — ${isExternal ? "open live link" : "view case study"}`}
      >
        <article
          ref={tiltRef}
          className="tilt-wrap card-surface sweep-border relative overflow-hidden rounded-3xl p-8 transition-colors duration-500 md:p-12"
        >
          {/* Accent wash that blooms on hover */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: `radial-gradient(80% 100% at 85% 0%, ${project.accent}1f, transparent 60%)`,
            }}
          />

          <div className="tilt-child relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {project.status}
                </span>
              </div>

              <h3 className="mt-4 font-display text-[clamp(1.6rem,4.5vw,3rem)] font-bold tracking-tight text-cream transition-colors duration-500 group-hover:text-ember">
                {project.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-cream-dim md:text-base">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
                {project.technologies.length > 6 && (
                  <Chip>+{project.technologies.length - 6}</Chip>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-cream">
                {isExternal ? "Live Project" : "Case study"}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-cream-dim transition-all duration-500 group-hover:rotate-45 group-hover:border-ember group-hover:text-ember">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </div>
        </article>
      </a>
    </Reveal>
  );
}

export default function FeaturedProjects({ projects }) {
  const rootRef = useRef(null);

  return (
    <section ref={rootRef} className="mx-auto max-w-6xl px-6 py-28 md:py-36" aria-label="Featured projects">
      <SectionHeading
        index="04"
        eyebrow="Selected work"
        title="Projects with"
        accent="real users"
        description="Production platforms spanning AI, streaming, publishing and developer tools."
      />

      <div className="space-y-6">
        {projects.map((project, i) => (
          <ProjectRow key={project._id || project.slug} project={project} index={i} />
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12 text-center">
        <Link
          href="/projects"
          className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ember"
        >
          All projects <ArrowUpRight size={13} />
        </Link>
      </Reveal>
    </section>
  );
}
