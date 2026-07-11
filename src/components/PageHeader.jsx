import TextReveal from "@/animations/TextReveal";
import Reveal from "@/animations/Reveal";

/** Shared inner-page hero: eyebrow, giant display title, lede. */
export default function PageHeader({ eyebrow, title, accent, description }) {
  return (
    <header className="mx-auto max-w-6xl px-6 pt-36 pb-16 md:pt-44 md:pb-20">
      <Reveal y={16} duration={0.7}>
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-ember">
          <span aria-hidden className="inline-block h-px w-10 bg-ember/50" />
          {eyebrow}
        </p>
      </Reveal>
      <TextReveal
        as="h1"
        type="words"
        className="mt-5 font-display text-[clamp(2.25rem,7.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-cream"
      >
        {title}{" "}
        {accent && <em className="font-serif italic font-normal text-ember">{accent}</em>}
      </TextReveal>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-dim md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </header>
  );
}
