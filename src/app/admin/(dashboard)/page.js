"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban, FolderGit2, Sparkles, Tags, GraduationCap, Briefcase, Inbox, ArrowUpRight,
} from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";

const CARDS = [
  { key: "projects", label: "Major Projects", endpoint: "/api/projects", href: "/admin/projects", icon: FolderKanban },
  { key: "minorProjects", label: "Minor Projects", endpoint: "/api/minor-projects", href: "/admin/minor-projects", icon: FolderGit2 },
  { key: "skills", label: "Skill Categories", endpoint: "/api/skills", href: "/admin/skills", icon: Sparkles },
  { key: "minorSkills", label: "Minor Skills", endpoint: "/api/minor-skills", href: "/admin/minor-skills", icon: Tags },
  { key: "learning", label: "Learning", endpoint: "/api/learning", href: "/admin/learning", icon: GraduationCap },
  { key: "experience", label: "Experience", endpoint: "/api/experience", href: "/admin/experience", icon: Briefcase },
  { key: "messages", label: "Messages", endpoint: "/api/contact", href: "/admin/messages", icon: Inbox },
];

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all(
      CARDS.map(async (card) => {
        try {
          const res = await fetch(card.endpoint);
          const json = await res.json();
          return [card.key, Array.isArray(json.data) ? json.data.length : 0];
        } catch {
          return [card.key, "—"];
        }
      })
    ).then((entries) => {
      setCounts(Object.fromEntries(entries));
      setLoaded(true);
    });
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-cream">
        Control <em className="font-serif italic font-normal text-ember">room</em>
      </h1>
      <p className="mt-1 font-mono text-xs text-muted">
        Everything on the site is editable from here — no redeploys needed.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map(({ key, label, href, icon: Icon }) => (
          <Link key={key} href={href} className="group">
            <div className="card-surface flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember-soft text-ember">
                  <Icon size={17} />
                </span>
                <ArrowUpRight size={16} className="text-muted transition-all group-hover:rotate-45 group-hover:text-ember" />
              </div>
              {loaded ? (
                <p className="mt-5 font-display text-4xl font-bold text-cream">{counts[key]}</p>
              ) : (
                <Skeleton className="mt-5 h-10 w-16" />
              )}
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="card-surface mt-8 rounded-2xl p-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Tips</p>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-cream-dim">
          <li>Run <code className="rounded bg-ink-3 px-1.5 py-0.5 font-mono text-xs text-ember">npm run seed</code> to load the starter content into MongoDB.</li>
          <li>Public pages revalidate every 60 seconds — edits appear within a minute.</li>
          <li>Featured projects (max 4–5) drive the home page&apos;s Selected Work section.</li>
        </ul>
      </div>
    </div>
  );
}
