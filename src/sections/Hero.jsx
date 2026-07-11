"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, SplitText, prefersReducedMotion } from "@/animations/gsap";
import Button from "@/components/ui/Button";

// Three.js loads only on the client, after the critical text paints.
const HeroScene = dynamic(() => import("@/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const PARTICLES = [
  { left: "8%", size: 3, duration: 16, delay: 0, opacity: 0.4, drift: 30 },
  { left: "22%", size: 2, duration: 21, delay: 3, opacity: 0.3, drift: -24 },
  { left: "45%", size: 4, duration: 14, delay: 6, opacity: 0.35, drift: 18 },
  { left: "68%", size: 2, duration: 19, delay: 1.5, opacity: 0.3, drift: -30 },
  { left: "82%", size: 3, duration: 17, delay: 5, opacity: 0.4, drift: 22 },
  { left: "93%", size: 2, duration: 23, delay: 8, opacity: 0.25, drift: -16 },
];

export default function Hero({ profile }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = rootRef.current;

    let split;
    const ctx = gsap.context(() => {
      split = new SplitText("[data-hero-title]", { type: "chars" });

      const tl = gsap.timeline({ delay: sessionStorage.getItem("preloaded") ? 0.1 : 3.2 });
      tl.from(split.chars, {
        yPercent: 115,
        rotate: 8,
        duration: 1.1,
        stagger: 0.03,
        ease: "power4.out",
      })
        .from("[data-hero-fade]", {
          autoAlpha: 0,
          y: 28,
          duration: 0.9,
          stagger: 0.12,
        }, "-=0.6")
        .from("[data-hero-scene]", { autoAlpha: 0, scale: 0.92, duration: 1.4 }, "-=1");

      // Parallax layers on scroll
      gsap.to("[data-hero-scene]", {
        yPercent: 18,
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-content]", {
        yPercent: -10,
        autoAlpha: 0.15,
        scrollTrigger: { trigger: root, start: "top top", end: "80% top", scrub: true },
      });
    }, root);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Ambient gradient lighting */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 35%, rgba(163,94,71,0.11), transparent 65%), radial-gradient(45% 40% at 15% 80%, rgba(70,70,70,0.10), transparent 60%)",
        }}
      />

      {/* Floating CSS particles */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              "--p-duration": `${p.duration}s`,
              "--p-delay": `${p.delay}s`,
              "--p-opacity": p.opacity,
              "--p-drift": `${p.drift}px`,
            }}
          />
        ))}
      </div>

      {/* 3D scene — right side on large screens, dim backdrop below lg
          so it never fights the headline for contrast */}
      <div
        data-hero-scene
        className="absolute inset-y-0 right-0 w-full opacity-30 lg:w-[58%] lg:opacity-100"
      >
        <HeroScene />
      </div>

      <div data-hero-content className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24">
        <p data-hero-fade className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ember sm:text-xs sm:tracking-[0.3em]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
          </span>
          {profile.availability || "Open to opportunities"}
        </p>

        <h1
          data-hero-title
          className="max-w-4xl font-display text-[clamp(1.7rem,9.5vw,6rem)] font-extrabold leading-[1.02] tracking-tight text-cream"
        >
          Full Stack
          <br />
          <span className="text-outline">JavaScript</span>
          <br />
          Developer<span className="text-ember ember-glow">.</span>
        </h1>

        <p data-hero-fade className="mt-6 max-w-xl text-xs leading-relaxed text-cream-dim sm:mt-8 sm:text-sm md:text-base lg:text-lg">
          I&apos;m{" "}
          <em className="font-serif italic text-base text-ember sm:text-lg md:text-xl lg:text-2xl">
            {profile.name?.split(" ")[0] || "Azhar"}
          </em>{" "}
          — {profile.tagline}
        </p>

        <div data-hero-fade className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button href="/projects" size="lg" className="w-full sm:w-auto">
            View my work <ArrowUpRight size={15} />
          </Button>
          <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
            Get in touch
          </Button>
          <Button
            href={profile.resumeUrl || "/resume.pdf"}
            variant="ghost"
            size="lg"
            className="w-full border border-ember/60 bg-ember/10 !text-ember hover:bg-ember/20 hover:border-ember sm:w-auto"
          >
            Resume <ArrowDown size={14} />
          </Button>
        </div>

        <div data-hero-fade className="mt-14 hidden gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:flex">
          <span>React · Next.js</span>
          <span>Node · MongoDB</span>
          <span>LangChain · OpenAI</span>
          <span>{profile.location?.split(",")[0]}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-fade
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <div className="flex h-9 w-5 justify-center rounded-full border border-line-strong pt-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember animate-scroll-dot" />
        </div>
        <ArrowDown size={12} className="text-muted" />
      </div>
    </section>
  );
}
