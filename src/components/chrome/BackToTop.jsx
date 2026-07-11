"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { gsap } from "@/animations/gsap";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.to(ref.current, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 16,
      duration: 0.4,
    });
  }, [visible]);

  const scrollTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={ref}
      onClick={scrollTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-[240] flex h-11 w-11 items-center justify-center rounded-full glass text-cream-dim opacity-0 transition-colors hover:text-ember hover:border-ember/40"
    >
      <ArrowUp size={18} />
    </button>
  );
}
