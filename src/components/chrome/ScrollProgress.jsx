"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";

/** Thin ember progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.set(barRef.current, { scaleX: self.progress });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed left-0 top-0 z-[250] h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-ember to-ember-deep"
    />
  );
}
