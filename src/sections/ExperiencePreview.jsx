import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/animations/Reveal";
import Chip from "@/components/ui/Chip";
import { formatDate } from "@/lib/utils";

export default function ExperiencePreview({ experience }) {
  const work = experience.filter((e) => e.type === "work");

  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:py-36" aria-label="Experience">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Shipped in"
        accent="production"
        description="Real platforms, real users — from AI consultation flows to streaming infrastructure."
      />

      <div className="space-y-5">
        {work.map((job, i) => (
          <Reveal key={job._id || i} delay={i * 0.1}>
            <article className="card-surface sweep-border group relative overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:border-line-strong md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                    {formatDate(job.startDate)} — {job.current ? "Present" : formatDate(job.endDate)}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-cream md:text-3xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-cream-dim">
                    {job.company} · {job.location}
                  </p>
                </div>
                {job.current && (
                  <Chip active>
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Current
                  </Chip>
                )}
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream-dim md:text-base">
                {job.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {(job.technologies || []).map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15} className="mt-10">
        <Link
          href="/experience"
          className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ember"
        >
          Full timeline <ArrowUpRight size={13} />
        </Link>
      </Reveal>
    </section>
  );
}
