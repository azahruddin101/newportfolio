"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/animations/gsap";

/**
 * Scroll-triggered reveal wrapper. Children fade + rise into view.
 * `stagger` animates direct children individually.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  y = 48,
  delay = 0,
  duration = 1,
  stagger = 0,
  start = "top 85%",
  className = "",
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const targets = stagger ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, stagger, start, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
