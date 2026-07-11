import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Flame, Lightbulb } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { getProjectBySlug, getProjects } from "@/lib/data";
import Reveal from "@/animations/Reveal";
import TextReveal from "@/animations/TextReveal";
import Chip from "@/components/ui/Chip";
import Button from "@/components/ui/Button";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);
  if (!project) notFound();

  const index = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(index + 1) % allProjects.length];

  const meta = [
    ["Role", project.role],
    ["Timeline", project.timeline],
    ["Team", project.teamSize],
    ["Status", project.status],
    ["Category", project.category],
  ].filter(([, v]) => v);

  return (
    <article className="relative">
      {/* Accent atmosphere derived from the project's color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background: `radial-gradient(55% 45% at 70% 20%, ${project.accent}14, transparent 65%)`,
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-24 md:pt-40">
        <Reveal y={12} duration={0.6}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-ember"
          >
            <ArrowLeft size={13} /> All projects
          </Link>
        </Reveal>

        <header className="mt-10">
          <Reveal y={16}>
            <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: project.accent }}>
              {project.category} · {project.status}
            </p>
          </Reveal>
          <TextReveal
            as="h1"
            type="chars"
            stagger={0.02}
            className="mt-4 font-display text-[clamp(2.25rem,7.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-cream"
          >
            {project.title}
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-dim">
              {project.description}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-4">
            {project.liveDemo && (
              <Button href={project.liveDemo} size="md">
                Live demo <ArrowUpRight size={14} />
              </Button>
            )}
            {project.github && (
              <Button href={project.github} variant="outline" size="md">
                <FiGithub size={14} /> Source
              </Button>
            )}
          </Reveal>
        </header>

        {/* Meta strip */}
        <Reveal className="mt-14">
          <dl className="card-surface grid grid-cols-2 gap-6 rounded-2xl p-7 sm:grid-cols-3 md:grid-cols-5">
            {meta.map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</dt>
                <dd className="mt-1.5 text-sm font-medium text-cream">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Long description */}
        {project.longDescription && (
          <section className="mt-16" aria-label="Overview">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-cream md:text-3xl">
                Over<em className="font-serif italic font-normal text-ember">view</em>
              </h2>
            </Reveal>
            <div className="mt-6 space-y-5">
              {project.longDescription.split("\n\n").map((para, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-base leading-relaxed text-cream-dim">{para}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Features */}
        {project.features?.length > 0 && (
          <section className="mt-16" aria-label="Key features">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-cream md:text-3xl">
                What it <em className="font-serif italic font-normal text-ember">does</em>
              </h2>
            </Reveal>
            <Reveal stagger={0.07} className="mt-7 grid gap-3 md:grid-cols-2">
              {project.features.map((feature) => (
                <div key={feature} className="card-surface flex items-start gap-3 rounded-xl p-5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-ember" />
                  <p className="text-sm leading-relaxed text-cream-dim">{feature}</p>
                </div>
              ))}
            </Reveal>
          </section>
        )}

        {/* Challenges & solutions */}
        {(project.challenges?.length > 0 || project.solutions?.length > 0) && (
          <section className="mt-16 grid gap-6 md:grid-cols-2" aria-label="Challenges and solutions">
            <Reveal>
              <div className="card-surface h-full rounded-2xl p-7">
                <h3 className="flex items-center gap-2.5 font-display text-xl font-bold text-cream">
                  <Flame size={18} className="text-ember-deep" /> Challenges
                </h3>
                <ul className="mt-5 space-y-4">
                  {project.challenges.map((c) => (
                    <li key={c} className="border-l-2 border-ember-deep/40 pl-4 text-sm leading-relaxed text-cream-dim">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-surface h-full rounded-2xl p-7">
                <h3 className="flex items-center gap-2.5 font-display text-xl font-bold text-cream">
                  <Lightbulb size={18} className="text-gold" /> Solutions
                </h3>
                <ul className="mt-5 space-y-4">
                  {project.solutions.map((s) => (
                    <li key={s} className="border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-cream-dim">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>
        )}

        {/* Tech stack */}
        <section className="mt-16" aria-label="Technologies used">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-cream md:text-3xl">
              Built <em className="font-serif italic font-normal text-ember">with</em>
            </h2>
          </Reveal>
          <Reveal stagger={0.04} className="mt-7 flex flex-wrap gap-2.5">
            {project.technologies.map((tech) => (
              <Chip key={tech} className="px-4 py-2 text-xs">{tech}</Chip>
            ))}
          </Reveal>
        </section>

        {/* Next project */}
        {nextProject && nextProject.slug !== project.slug && (
          <Reveal className="mt-24">
            <Link href={`/projects/${nextProject.slug}`} className="group block" data-cursor-label="Next">
              <div className="card-surface sweep-border flex items-center justify-between rounded-3xl p-8 transition-colors duration-500 md:p-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    Next project
                  </p>
                  <p className="mt-2 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-cream transition-colors group-hover:text-ember">
                    {nextProject.title}
                  </p>
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line text-cream-dim transition-all duration-500 group-hover:rotate-45 group-hover:border-ember group-hover:text-ember">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  );
}
