"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, FolderGit2 } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import Chip from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

/**
 * Client-side project explorer: category filter + text search with
 * an animated re-flow whenever the result set changes.
 */
export default function ProjectsExplorer({ projects, minorProjects }) {
  const categories = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects]
  );
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const gridRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [projects, category, query]);

  // Animate cards in whenever the filter changes
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const cards = gridRef.current?.querySelectorAll("[data-project-card]");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 32, scale: 0.98 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", overwrite: true }
    );
  }, [filtered]);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-28">
      {/* Controls */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} aria-pressed={category === cat}>
              <Chip active={category === cat} className="cursor-pointer py-2 px-4">
                {cat}
              </Chip>
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tech…"
            aria-label="Search projects"
            className="w-full rounded-full border border-line bg-ink-2 py-3 pl-11 pr-4 text-sm text-cream placeholder:text-muted transition-colors focus:border-ember focus:outline-none"
          />
        </div>
      </div>

      {/* Major projects */}
      {filtered.length === 0 ? (
        <div className="card-surface rounded-3xl py-24 text-center">
          <p className="font-display text-2xl font-bold text-cream">Nothing matches</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
            Try a different search or category
          </p>
        </div>
      ) : (
        <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
          {filtered.map((project, i) => (
            <Link
              key={project._id || project.slug}
              href={`/projects/${project.slug}`}
              data-project-card
              data-cursor-label="Open"
              className={cn("group", i % 3 === 0 && "md:col-span-2")}
            >
              <article className="card-surface sweep-border relative h-full overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 md:p-10">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(70% 90% at 90% 10%, ${project.accent}1c, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: project.accent }}>
                      {project.category}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream-dim transition-all duration-500 group-hover:rotate-45 group-hover:border-ember group-hover:text-ember">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold text-cream transition-colors duration-300 group-hover:text-ember md:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {project.timeline} · {project.status}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Minor projects */}
      {minorProjects.length > 0 && (
        <div className="mt-24">
          <h2 className="mb-8 flex items-center gap-3 font-display text-2xl font-bold text-cream">
            <FolderGit2 size={20} className="text-ember" />
            Smaller experiments
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {minorProjects.map((mini) => (
              <article
                key={mini._id || mini.title}
                className="card-surface group rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong"
              >
                <h3 className="font-display text-lg font-bold text-cream">{mini.title}</h3>
                <p className="mt-2 text-sm text-cream-dim">{mini.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {mini.techStack.map((tech) => (
                    <span key={tech} className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      {tech}
                      <span className="mx-1.5 text-ember/50">/</span>
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-4">
                  {mini.github && (
                    <a
                      href={mini.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${mini.title} on GitHub`}
                      className="text-cream-dim transition-colors hover:text-ember"
                    >
                      <FiGithub size={16} />
                    </a>
                  )}
                  {mini.demo && (
                    <a
                      href={mini.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${mini.title} live demo`}
                      className="text-cream-dim transition-colors hover:text-ember"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
