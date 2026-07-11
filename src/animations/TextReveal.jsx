"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/animations/gsap";

/**
 * Splits text into chars/words/lines and reveals them on scroll
 * with a masked rise. Falls back to visible text on reduced motion.
 */
export default function TextReveal({
  children,
  as: Tag = "div",
  type = "words",
  stagger = 0.04,
  duration = 0.9,
  delay = 0,
  y = "110%",
  rotate = 6,
  start = "top 85%",
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    let split;
    const ctx = gsap.context(() => {
      split = new SplitText(el, { type });
      const targets =
        type.includes("chars") ? split.chars : type.includes("words") ? split.words : split.lines;

      gsap.from(targets, {
        yPercent: parseFloat(y) || 110,
        rotate,
        duration,
        delay,
        stagger,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [type, stagger, duration, delay, y, rotate, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
