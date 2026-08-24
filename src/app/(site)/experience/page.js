import PageHeader from "@/components/PageHeader";
import Reveal from "@/animations/Reveal";
import Chip from "@/components/ui/Chip";
import { getExperience } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { CheckCircle2, Milestone } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "Experience",
  description:
    "Professional timeline of Azahruddin Hassan — production platforms, AI integrations and full stack engineering.",
};

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <>
      <PageHeader
        eyebrow="Track record"
        title="Where I've"
        accent="been"
        description="Two years of production work — compressed learning, real deadlines, shipped software."
      />

      <div className="mx-auto max-w-4xl px-6 pb-28">
        <ol className="relative space-y-10 border-l border-line pl-8 md:pl-12">
          {experience.map((item, i) => (
            <li key={item._id || i} className="relative">
              <span
                aria-hidden
                className="absolute -left-[45px] top-2 flex h-7 w-7 items-center justify-center rounded-full border border-ember/40 bg-ink md:-left-[61px]"
              >
                {item.type === "milestone" ? (
                  <Milestone size={12} className="text-gold" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-ember" />
                )}
              </span>

              <Reveal delay={i * 0.08}>
                <article className="card-surface sweep-border rounded-2xl p-7 transition-colors duration-500 md:p-9">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">
                      {formatDate(item.startDate)} — {item.current ? "Present" : formatDate(item.endDate)}
                    </p>
                    {item.current && (
                      <Chip active>
                        <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Current
                      </Chip>
                    )}
                  </div>

                  <h2 className="mt-3 font-display text-2xl font-bold text-cream md:text-3xl">
                    {item.role}
                  </h2>
                  <p className="mt-1 text-sm text-cream-dim">
                    {item.company} · {item.location}
                  </p>

                  <p className="mt-5 text-sm leading-relaxed text-cream-dim md:text-base">
                    {item.description}
                  </p>

                  {item.highlights?.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm text-cream-dim">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-ember" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.technologies?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Chip key={tech}>{tech}</Chip>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
