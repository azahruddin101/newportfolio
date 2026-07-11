"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";

/**
 * Two-part custom cursor. The dot is pinned 1:1 to the pointer via a
 * rAF-driven quickSetter (zero perceptible lag); the ring trails with
 * a smooth lerp and swells over interactive elements. Disabled on
 * touch devices and under reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.classList.add("custom-cursor");
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let visible = false;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      // Dot sticks to the pointer exactly — updated outside the lerp
      setDotX(pos.x);
      setDotY(pos.y);
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
        ringPos.x = pos.x;
        ringPos.y = pos.y;
      }
    };

    // Ring trails via frame-rate-independent lerp
    const trail = (_time, deltaTime) => {
      const alpha = 1 - Math.pow(0.001, deltaTime / 1000); // ~smooth at any fps
      ringPos.x += (pos.x - ringPos.x) * alpha;
      ringPos.y += (pos.y - ringPos.y) * alpha;
      setRingX(ringPos.x);
      setRingY(ringPos.y);
    };
    gsap.ticker.add(trail);

    const onOver = (e) => {
      const interactive = e.target.closest(
        "a, button, [data-cursor], input, textarea, select, [role='button'], [role='tab'], label"
      );
      const label = e.target.closest("[data-cursor-label]")?.dataset.cursorLabel;
      gsap.to(ring, {
        scale: interactive ? 2.1 : 1,
        backgroundColor: interactive ? "rgba(163,94,71,0.14)" : "transparent",
        duration: 0.3,
        overwrite: "auto",
      });
      gsap.to(dot, { scale: interactive ? 0.5 : 1, duration: 0.3, overwrite: "auto" });
      const labelEl = ring.firstElementChild;
      if (labelEl) {
        if (label) labelEl.textContent = label;
        gsap.to(labelEl, { autoAlpha: label ? 1 : 0, duration: 0.2 });
      }
    };

    const hide = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 });
    };
    const onDown = () => gsap.to(ring, { scale: 0.75, duration: 0.15, overwrite: "auto" });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.35, ease: "elastic.out(1,0.5)", overwrite: "auto" });
    const onBlur = () => hide();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onBlur);
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      document.body.classList.remove("custom-cursor");
      gsap.ticker.remove(trail);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onBlur);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, []);

  // These render as direct children of <body> (the site layout is a
  // fragment), so nothing can hijack their fixed positioning.
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[520] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[510] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ember/70 opacity-0"
      >
        <span className="font-mono text-[8px] uppercase tracking-widest text-ember opacity-0" />
      </div>
    </>
  );
}
