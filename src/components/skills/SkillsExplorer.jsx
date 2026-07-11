"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Layout, Server, Database, Sparkles, Wrench } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import Chip from "@/components/ui/Chip";
import Reveal from "@/animations/Reveal";
import { cn } from "@/lib/utils";

const ICONS = { layout: Layout, server: Server, database: Database, sparkles: Sparkles, wrench: Wrench };

/**
 * Interactive skill visualization: pick a discipline on the left,
 * its skills sweep in on the right with animated proficiency bars.
 */
export default function SkillsExplorer({ categories, minorSkills }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const panelRef = useRef(null);
  const active = categories[activeIdx];

  const minorGroups = useMemo(() => {
    const groups = {};
    for (const skill of minorSkills) {
      const key = skill.category || "Other";
      (groups[key] ||= []).push(skill);
    }
    return groups;
  }, [minorSkills]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (!prefersReducedMotion()) {
      gsap.fromTo(
        panel.querySelectorAll("[data-skill-row]"),
        { autoAlpha: 0, x: 32 },
        { autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.05, ease: "power3.out", overwrite: true }
      );
    }
    panel.querySelectorAll("[data-skill-bar]").forEach((bar) => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: bar.dataset.level / 100, duration: 1.1, delay: 0.15, ease: "power3.inOut", overwrite: true }
      );
    });
  }, [activeIdx]);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-28">
      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        {/* Discipline picker — a tablist: Arrow keys move, Home/End jump */}
        <div
          role="tablist"
          aria-label="Skill categories"
          aria-orientation="vertical"
          className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible"
          onKeyDown={(e) => {
            const max = categories.length - 1;
            let next = null;
            if (e.key === "ArrowDown" || e.key === "ArrowRight") next = activeIdx >= max ? 0 : activeIdx + 1;
            else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = activeIdx <= 0 ? max : activeIdx - 1;
            else if (e.key === "Home") next = 0;
            else if (e.key === "End") next = max;
            if (next !== null) {
              e.preventDefault();
              setActiveIdx(next);
              e.currentTarget.querySelectorAll("[role='tab']")[next]?.focus();
            }
          }}
        >
          {categories.map((cat, i) => {
            const Icon = ICONS[cat.icon] || Sparkles;
            const isActive = i === activeIdx;
            return (
              <button
                key={cat._id || cat.title}
                onClick={() => setActiveIdx(i)}
                role="tab"
                id={`skill-tab-${i}`}
                aria-selected={isActive}
                aria-controls="skill-panel"
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-2xl border px-5 py-4 text-left transition-all duration-300",
                  isActive
                    ? "border-ember/50 bg-ember-soft text-ember"
                    : "border-line text-cream-dim hover:border-line-strong hover:text-cream"
                )}
              >
                <Icon size={17} />
                <span className="font-display text-sm font-bold">{cat.title}</span>
                <span className="ml-auto hidden font-mono text-[10px] text-muted md:block">
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active category detail */}
        <div
          ref={panelRef}
          id="skill-panel"
          role="tabpanel"
          aria-labelledby={`skill-tab-${activeIdx}`}
          className="card-surface rounded-3xl p-8 md:p-10"
          aria-live="polite"
        >
          <h2 className="font-display text-2xl font-bold text-cream">
            {active?.title}{" "}
            <em className="font-serif italic font-normal text-ember">proficiency</em>
          </h2>
          <ul className="mt-8 space-y-6">
            {active?.skills.map((skill) => (
              <li key={skill.name} data-skill-row>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium text-cream">{skill.name}</span>
                  <span className="font-mono text-xs text-ember">{skill.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-ink-3">
                  <div
                    data-skill-bar
                    data-level={skill.level}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-ember-deep via-ember to-gold"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>
                {skill.note && <p className="mt-1.5 text-xs text-muted">{skill.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Minor skills cloud */}
      <div className="mt-24">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-cream md:text-3xl">
            The supporting <em className="font-serif italic font-normal text-ember">cast</em>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-cream-dim">
            Libraries, services and tools that round out the day-to-day toolkit.
          </p>
        </Reveal>
        <div className="mt-10 space-y-8">
          {Object.entries(minorGroups).map(([group, skills], gi) => (
            <Reveal key={group} delay={gi * 0.06}>
              <div className="flex flex-col gap-3 border-l-2 border-ember/30 pl-5 md:flex-row md:items-center md:gap-8">
                <p className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Chip key={skill._id || skill.name} className="px-4 py-1.5 hover:border-ember/60 hover:text-ember">
                      {skill.name}
                    </Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
