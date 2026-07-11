"use client";

import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-sm text-cream placeholder:text-muted transition-colors duration-300 focus:border-ember focus:outline-none focus:ring-1 focus:ring-ember/40";

export function Label({ children, htmlFor, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-cream-dim",
        className
      )}
    >
      {children}
    </label>
  );
}

export function Input({ className = "", ...props }) {
  return <input className={cn(base, className)} {...props} />;
}

export function Textarea({ className = "", rows = 5, ...props }) {
  return <textarea rows={rows} className={cn(base, "resize-y", className)} {...props} />;
}

export function Select({ className = "", children, ...props }) {
  return (
    <select className={cn(base, "appearance-none", className)} {...props}>
      {children}
    </select>
  );
}

export function Field({ label, id, hint, children }) {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}
