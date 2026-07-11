"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, User, FolderKanban, FolderGit2, Sparkles,
  Tags, GraduationCap, Briefcase, Inbox, LogOut, ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/projects", label: "Major Projects", icon: FolderKanban },
  { href: "/admin/minor-projects", label: "Minor Projects", icon: FolderGit2 },
  { href: "/admin/skills", label: "Major Skills", icon: Sparkles },
  { href: "/admin/minor-skills", label: "Minor Skills", icon: Tags },
  { href: "/admin/learning", label: "Learning", icon: GraduationCap },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await api.post("/api/auth/logout");
    toast.success("Signed out");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex w-full shrink-0 flex-row gap-1 overflow-x-auto border-b border-line bg-ink-2 p-3 lg:min-h-svh lg:w-60 lg:flex-col lg:border-b-0 lg:border-r lg:p-5">
      <Link href="/" className="mb-0 hidden items-center justify-between px-3 py-2 lg:mb-6 lg:flex">
        <span className="font-display text-base font-bold text-cream">
          azhar<span className="text-ember">.</span>admin
        </span>
        <ExternalLink size={13} className="text-muted" />
      </Link>

      {LINKS.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-ember-soft text-ember"
                : "text-cream-dim hover:bg-ink-3 hover:text-cream"
            )}
          >
            <Icon size={16} />
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        );
      })}

      <button
        onClick={logout}
        className="mt-0 flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream-dim transition-colors hover:bg-ember-deep/10 hover:text-ember-deep lg:mt-auto"
      >
        <LogOut size={16} /> Sign out
      </button>
    </aside>
  );
}
