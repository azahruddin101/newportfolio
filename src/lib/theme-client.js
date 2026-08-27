"use client";

/**
 * Client-side theme helpers. The source of truth is the `theme`
 * cookie (read server-side in the root layout, so SSR html already
 * carries the right data-theme — no init script, no flash, no
 * hydration mismatch). localStorage is kept in sync for good measure.
 */

export function getCurrentTheme() {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return "dark";
}

export function updateThemeColorMeta(theme) {
  if (typeof document === "undefined") return;
  const color = theme === "light" ? "#f2f1f0" : "#000000";
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", color);
}

export function applyTheme(next) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = next;
  document.documentElement.style.colorScheme = next;
  document.cookie = `theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
  try {
    localStorage.setItem("theme", next);
  } catch {}
  updateThemeColorMeta(next);
}

export function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}
