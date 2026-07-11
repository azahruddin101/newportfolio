"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";

/** Animated statistic counter that counts up when scrolled into view. */
export default function Counter({ value, suffix = "", duration = 2, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isFloat = !Number.isInteger(value);
    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: () => {
          el.textContent = `${isFloat ? counter.n.toFixed(1) : Math.round(counter.n)}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
