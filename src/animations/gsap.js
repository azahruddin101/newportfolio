"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

export { gsap, ScrollTrigger, SplitText };

export const EASE = {
  out: "power3.out",
  inOut: "power4.inOut",
  expo: "expo.out",
  elastic: "elastic.out(1, 0.6)",
};

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
