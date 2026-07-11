"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/animations/gsap";

/**
 * Route-change transition for public pages. Lives inside the (site)
 * segment so it wraps ONLY page content — fixed chrome (custom
 * cursor, navbar, scroll progress) must stay outside any transformed
 * ancestor, otherwise position:fixed anchors to the page and scrolls
 * with it. clearProps removes the transform once the tween finishes
 * for the same reason.
 */
export default function Template({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    // Land every route at the top, in sync with Lenis
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          onComplete: () => ScrollTrigger.refresh(),
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
