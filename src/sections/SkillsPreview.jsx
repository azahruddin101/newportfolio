"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Layout, Server, Database, Sparkles, Wrench } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/animations/Reveal";

const ICONS = { layout: Layout, server: Server, database: Database, sparkles: Sparkles, wrench: Wrench };

export default function SkillsPreview({ categories }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-skill-bar]").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: bar.dataset.level / 100,
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: { trigger: bar, start: "top 90%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [categories]);

  return (
    <section ref={rootRef} className="relative border-y border-line bg-ink-2/50 py-28 md:py-36" aria-label="Skills">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          title="A stack built for"
          accent="shipping"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = ICONS[cat.icon] || Sparkles;
            return (
              <Reveal key={cat._id || cat.title} delay={(i % 3) * 0.1}>
                <div className="card-surface sweep-border h-full rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember-soft text-ember">
                      <Icon size={17} />
                    </span>
                    <h3 className="font-display text-lg font-bold text-cream">{cat.title}</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {cat.skills.slice(0, 5).map((skill) => (
                      <li key={skill.name}>
                        <div className="mb-1.5 flex items-baseline justify-between">
                          <span className="text-sm text-cream-dim">{skill.name}</span>
                          <span className="font-mono text-[10px] text-muted">{skill.level}%</span>
                        </div>
                        <div className="h-[3px] overflow-hidden rounded-full bg-ink-3">
                          <div
                            data-skill-bar
                            data-level={skill.level}
                            className="h-full origin-left rounded-full bg-gradient-to-r from-ember-deep to-ember"
                            style={{ transform: "scaleX(0)" }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <Link
            href="/skills"
            className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ember"
          >
            Explore the full arsenal <ArrowUpRight size={13} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
