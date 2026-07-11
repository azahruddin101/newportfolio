"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/animations/Reveal";
import { formatDate } from "@/lib/utils";

/** "Currently compiling" — progress toward the next set of skills. */
export default function LearningSection({ learning }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-learn-bar]").forEach((bar) => {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${bar.dataset.progress}%`,
            duration: 1.6,
            ease: "power3.inOut",
            scrollTrigger: { trigger: bar, start: "top 92%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [learning]);

  return (
    <section ref={rootRef} className="mx-auto max-w-6xl px-6 py-28 md:py-36" aria-label="Currently learning">
      <SectionHeading
        index="05"
        eyebrow="Currently compiling"
        title="Always"
        accent="learning"
        description="The stack never stands still — neither do I. What I'm actively leveling up right now."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {learning.map((item, i) => (
          <Reveal key={item._id || item.skill} delay={(i % 2) * 0.08}>
            <div className="card-surface group rounded-2xl p-6 transition-colors duration-500 hover:border-line-strong">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-bold text-cream">
                  {item.skill}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {item.category}
                </span>
              </div>
              {item.description && (
                <p className="mt-2 text-sm text-cream-dim">{item.description}</p>
              )}
              <div className="mt-5 flex items-center gap-3">
                <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-ink-3">
                  <div
                    data-learn-bar
                    data-progress={item.progress}
                    className="h-full rounded-full bg-gradient-to-r from-gold to-ember"
                    style={{ width: 0 }}
                  />
                </div>
                <span className="font-mono text-xs text-ember">{item.progress}%</span>
              </div>
              {item.startedDate && (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                  Since {formatDate(item.startedDate)}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
