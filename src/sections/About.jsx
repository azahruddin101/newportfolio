import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/animations/Reveal";
import Counter from "@/animations/Counter";

export default function About({ profile }) {
  const paragraphs = (profile.about || "").split("\n\n");

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36" aria-label="About me">
      <SectionHeading index="01" eyebrow="About" title="Code with" accent="conviction" />

      <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-base leading-relaxed text-cream-dim md:text-lg first-letter:font-serif first-letter:italic first-letter:text-ember">
                {para}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
              {profile.location} — {profile.availability}
            </p>
          </Reveal>
        </div>

        <Reveal stagger={0.12} className="grid grid-cols-2 gap-4 self-start">
          {(profile.stats || []).map((stat) => (
            <div
              key={stat.label}
              className="card-surface sweep-border rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
            >
              <p className="font-display text-4xl font-bold text-ember md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
