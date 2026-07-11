import { cn } from "@/lib/utils";

export default function Chip({ children, active = false, className = "", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-300",
        active
          ? "border-ember bg-ember-soft text-ember"
          : "border-line text-cream-dim hover:border-line-strong hover:text-cream",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
