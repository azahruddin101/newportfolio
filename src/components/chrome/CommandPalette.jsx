"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home, FolderKanban, Sparkles, Briefcase, Mail,
  Copy, FileDown, Search, CornerDownLeft, LockKeyhole, SunMoon,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { toast } from "sonner";
import { gsap } from "@/animations/gsap";
import { toggleTheme } from "@/lib/theme-client";
import { cn } from "@/lib/utils";

const EMAIL = "azahruddin101@gmail.com";

/** ⌘K / Ctrl+K command palette with keyboard navigation. */
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  const commands = useMemo(
    () => [
      { group: "Navigate", label: "Home", icon: Home, run: () => router.push("/") },
      { group: "Navigate", label: "Projects", icon: FolderKanban, run: () => router.push("/projects") },
      { group: "Navigate", label: "Skills", icon: Sparkles, run: () => router.push("/skills") },
      { group: "Navigate", label: "Experience", icon: Briefcase, run: () => router.push("/experience") },
      { group: "Navigate", label: "Contact", icon: Mail, run: () => router.push("/contact") },
      {
        group: "Actions",
        label: "Toggle light / dark theme",
        icon: SunMoon,
        run: () => {
          const next = toggleTheme();
          toast.success(`Switched to ${next} mode`);
        },
      },
      {
        group: "Actions",
        label: "Copy email address",
        icon: Copy,
        run: async () => {
          await navigator.clipboard.writeText(EMAIL);
          toast.success("Email copied to clipboard");
        },
      },
      {
        group: "Actions",
        label: "Download resume",
        icon: FileDown,
        run: () => {
          const link = document.createElement("a");
          link.href = "/Azahruddin_Software_Engineer_Full_Stack_Developer.pdf";
          link.download = "Azahruddin_Software_Engineer_Full_Stack_Developer.pdf";
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      },
      {
        group: "Social",
        label: "GitHub — azahruddin101",
        icon: FiGithub,
        run: () => window.open("https://github.com/azahruddin101", "_blank"),
      },
      {
        group: "Social",
        label: "LinkedIn — azhar619",
        icon: FiLinkedin,
        run: () => window.open("https://www.linkedin.com/in/azhar619", "_blank"),
      },
      { group: "System", label: "Admin dashboard", icon: LockKeyhole, run: () => router.push("/admin") },
    ],
    [router]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const close = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return setOpen(false);
    gsap.to(panel, {
      autoAlpha: 0,
      scale: 0.96,
      y: -8,
      duration: 0.18,
      onComplete: () => setOpen(false),
    });
  }, []);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) close();
    };
    const onToggle = () => setOpen((v) => !v);
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-palette:toggle", onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-palette:toggle", onToggle);
    };
  }, [open, close]);

  // Open animation + focus
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    window.__lenis?.stop();
    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, scale: 0.96, y: -8 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.25, ease: "power3.out" }
    );
    inputRef.current?.focus();
    return () => window.__lenis?.start();
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onInputKey = (e) => {
    if (e.key === "Tab") {
      // Keep focus inside the palette — it's a single-input dialog
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      filtered[active].run();
      close();
    }
  };

  if (!open) return null;

  let lastGroup = null;

  return (
    <div
      className="fixed inset-0 z-[350] flex items-start justify-center bg-ink/70 px-4 pt-[18vh] backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl glass shadow-2xl shadow-black/60"
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search size={16} className="text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Type a command or search…"
            className="w-full bg-transparent py-4 text-sm text-cream placeholder:text-muted focus:outline-none"
            aria-label="Search commands"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">
            ESC
          </kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center font-mono text-xs text-muted">
              No matches for “{query}”
            </li>
          )}
          {filtered.map((cmd, i) => {
            const showGroup = cmd.group !== lastGroup;
            lastGroup = cmd.group;
            const Icon = cmd.icon;
            return (
              <li key={cmd.label} role="option" aria-selected={i === active}>
                {showGroup && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    {cmd.group}
                  </p>
                )}
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    cmd.run();
                    close();
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    i === active ? "bg-ember-soft text-ember" : "text-cream-dim"
                  )}
                >
                  <Icon size={15} />
                  <span className="flex-1">{cmd.label}</span>
                  {i === active && <CornerDownLeft size={13} className="opacity-60" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
