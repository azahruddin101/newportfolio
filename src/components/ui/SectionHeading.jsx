import TextReveal from "@/animations/TextReveal";
import Reveal from "@/animations/Reveal";
import { cn } from "@/lib/utils";

/**
 * Standard section header: numbered mono eyebrow + big display
 * headline where the *emphasized* word renders in italic serif ember.
 */
export default function SectionHeading({
  eyebrow,
  index,
  title,
  accent,
  description,
  align = "left",
  className = "",
}) {
  return (
    <div className={cn("mb-14 md:mb-20", align === "center" && "text-center", className)}>
      {eyebrow && (
        <Reveal y={20} duration={0.8}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember mb-4 flex items-center gap-3">
            {index && <span className="text-muted">{index}</span>}
            <span aria-hidden className="inline-block h-px w-10 bg-ember/50" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <TextReveal
        as="h2"
        type="words"
        className={cn(
          "font-display text-[clamp(1.9rem,6vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-cream",
          align === "center" && "mx-auto"
        )}
      >
        {title}{" "}
        {accent && (
          <em className="font-serif italic font-normal text-ember">{accent}</em>
        )}
      </TextReveal>
      {description && (
        <Reveal y={24} delay={0.15}>
          <p className={cn("mt-6 max-w-xl text-base md:text-lg text-cream-dim leading-relaxed", align === "center" && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
