"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";

/**
 * Scroll-driven storytelling timeline: an ember line draws itself
 * down the page as each chapter of the journey ignites into view.
 */
export default function Journey({ experience }) {
  const rootRef = useRef(null);
  // Oldest first — read like a story
  const chapters = [...experience].sort(
    (a, b) => new Date(a.startDate || 0) - new Date(b.startDate || 0)
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-journey-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-journey-track]",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray("[data-journey-item]").forEach((item, i) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: i % 2 ? 60 : -60 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 80%" },
          }
        );
        const dot = item.querySelector("[data-journey-dot]");
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: item, start: "top 78%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [experience]);

  return (
    <section
      ref={rootRef}
      // overflow-x-clip: items sit shifted ±60px before their scroll
      // reveal — don't let that widen the page
      className="overflow-x-clip border-t border-line bg-ink-2/40 py-28 md:py-36"
      aria-label="My journey"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          index="06"
          eyebrow="The journey"
          title="From first commit to"
          accent="production"
          align="center"
        />

        <div data-journey-track className="relative mt-8">
          {/* Drawn spine */}
          <div aria-hidden className="absolute left-4 top-0 h-full w-px bg-line md:left-1/2">
            <div
              data-journey-line
              className="h-full w-px origin-top bg-gradient-to-b from-ember via-ember to-ember-deep"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol className="space-y-16">
            {chapters.map((item, i) => (
              <li
                key={item._id || i}
                data-journey-item
                className={`relative pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"
                }`}
              >
                <span
                  data-journey-dot
                  aria-hidden
                  className={`absolute top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-ember/40 bg-ink left-0 ${
                    i % 2 ? "md:-left-4" : "md:left-auto md:-right-4"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-ember" />
                </span>

                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">
                  {formatDate(item.startDate)} — {item.current ? "Now" : formatDate(item.endDate)}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-cream md:text-2xl">
                  {item.role}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
