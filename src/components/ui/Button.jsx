"use client";

import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary:
    "bg-ember text-ink hover:bg-ember-bright shadow-[0_8px_32px_-8px_rgba(163,94,71,0.55)]",
  outline:
    "border border-line-strong text-cream hover:border-ember hover:text-ember bg-transparent",
  ghost: "text-cream-dim hover:text-cream hover:bg-ink-3",
  danger: "bg-ember-deep/15 text-ember-deep border border-ember-deep/30 hover:bg-ember-deep/25",
};

const SIZES = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

/**
 * Magnetic button with a click ripple. Renders a Link when `href`
 * is provided. `magnetic={false}` disables the hover physics.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  magnetic = true,
  className = "",
  onClick,
  ...props
}) {
  const ref = useMagnetic({ strength: magnetic ? 0.3 : 0 });

  const handleClick = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const d = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple-ink";
    ripple.style.width = ripple.style.height = `${d}px`;
    ripple.style.left = `${e.clientX - rect.left - d / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - d / 2}px`;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
    onClick?.(e);
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-mono uppercase tracking-[0.12em] font-medium transition-colors duration-300 active:scale-[0.97] select-none",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <Link
        ref={ref}
        href={href}
        className={classes}
        onClick={handleClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
