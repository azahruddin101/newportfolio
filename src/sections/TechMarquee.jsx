/**
 * Dual-direction tech marquee. Pure CSS animation (pauses on hover),
 * so it costs nothing on the main thread.
 */
export default function TechMarquee({ minorSkills }) {
  const names = minorSkills.map((s) => s.name);
  const half = Math.ceil(names.length / 2);
  const rowA = names.slice(0, half);
  const rowB = names.slice(half);

  const Row = ({ items, reverse = false, duration = "36s" }) => (
    <div className="group/marquee marquee-mask overflow-hidden py-3">
      <div
        className="animate-marquee flex w-max items-center gap-4"
        style={{
          "--marquee-duration": duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((name, i) => (
          <span
            key={`${name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-4 whitespace-nowrap font-display text-2xl font-semibold text-cream-dim transition-colors hover:text-ember md:text-4xl"
          >
            {name}
            <span className="text-ember/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section className="border-y border-line bg-ink-2/40 py-14" aria-label="Technologies and tools">
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
        Tools &amp; integrations in my orbit
      </p>
      <Row items={rowA} duration="38s" />
      <Row items={rowB} reverse duration="46s" />
    </section>
  );
}
