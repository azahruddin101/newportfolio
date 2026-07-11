"use client";

/**
 * Client-side theme helpers. The source of truth is the `theme`
 * cookie (read server-side in the root layout, so SSR html already
 * carries the right data-theme — no init script, no flash, no
 * hydration mismatch). localStorage is kept in sync for good measure.
 */

export function getCurrentTheme() {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function applyTheme(next) {
  document.documentElement.dataset.theme = next;
  document.cookie = `theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export function toggleTheme() {
  const next = getCurrentTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}
