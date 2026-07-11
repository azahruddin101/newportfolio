"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { getCurrentTheme, toggleTheme } from "@/lib/theme-client";

/**
 * Light/dark toggle backed by the `theme` cookie (SSR reads it, so
 * the correct theme paints first — no init script needed).
 */
export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  const onToggle = () => setTheme(toggleTheme());

  return (
    <button
      onClick={onToggle}
      suppressHydrationWarning
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream-dim transition-colors hover:border-ember hover:text-ember ${className}`}
    >
      {theme === null ? (
        <Moon size={16} className="opacity-40" />
      ) : theme === "dark" ? (
        <Sun size={16} />
      ) : (
        <Moon size={16} />
      )}
    </button>
  );
}
