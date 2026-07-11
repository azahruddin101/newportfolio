"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";

/**
 * First-visit loading screen: counts to 100 while the monogram
 * draws in, then the whole curtain peels away with a clip-path wipe.
 * Skipped for the rest of the session and under reduced motion.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (sessionStorage.getItem("preloaded")) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const root = rootRef.current;
    const counter = { n: 0 };
    const numEl = root.querySelector("[data-counter]");

    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("preloaded", "1");
        document.documentElement.style.overflow = "";
        setShow(false);
      },
    });

    tl.fromTo(
      root.querySelectorAll("[data-line]"),
      { yPercent: 120 },
      { yPercent: 0, duration: 0.8, stagger: 0.12, ease: "power4.out" }
    )
      .to(counter, {
        n: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => (numEl.textContent = String(Math.round(counter.n)).padStart(3, "0")),
      }, "<")
      .to(root.querySelectorAll("[data-line]"), {
        yPercent: -120,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.in",
      })
      .to(root, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.9,
        ease: "power4.inOut",
      });

    return () => tl.kill();
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-ink"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="overflow-hidden">
        <p data-line className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream">
          Azharuddin <em className="font-serif italic font-normal text-ember">Hassan</em>
        </p>
      </div>
      <div className="overflow-hidden mt-3">
        <p data-line className="font-mono text-xs uppercase tracking-[0.4em] text-muted">
          Full Stack · AI · Craft
        </p>
      </div>
      <div className="absolute bottom-10 right-10 overflow-hidden">
        <span data-line data-counter className="block font-mono text-5xl text-ember/80">
          000
        </span>
      </div>
    </div>
  );
}
