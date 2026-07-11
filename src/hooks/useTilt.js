"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";

/** 3D card tilt following the cursor. Attach ref to a .tilt-wrap element. */
export function useTilt({ max = 8 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rxTo = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power2.out" });
    const ryTo = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power2.out" });
    gsap.set(el, { transformPerspective: 900 });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rxTo(-py * max);
      ryTo(px * max);
    };
    const onLeave = () => {
      rxTo(0);
      ryTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max]);

  return ref;
}
