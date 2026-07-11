import { cn } from "@/lib/utils";

export default function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-xl bg-ink-3", className)}
    />
  );
}
