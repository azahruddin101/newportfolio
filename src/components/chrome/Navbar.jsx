"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Menu, X } from "lucide-react";
import { gsap } from "@/animations/gsap";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/chrome/ThemeToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

/**
 * Floating pill navbar: sits in its own margin band (pages pad for
 * it via pt-28+), hides on scroll-down, returns on scroll-up.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > lastY.current && !open);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Mobile menu: open animation, focus management, Escape to close
  useEffect(() => {
    const menu = menuRef.current;
    if (open && menu) {
      window.__lenis?.stop();
      gsap.fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.7,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        menu.querySelectorAll("a"),
        { y: 48, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07, delay: 0.25, ease: "power3.out" }
      );
      menu.querySelector("a")?.focus();

      const onKey = (e) => {
        if (e.key === "Escape") {
          setOpen(false);
          toggleRef.current?.focus();
        }
        // Rudimentary focus trap
        if (e.key === "Tab") {
          const focusables = menu.querySelectorAll("a, button");
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    window.__lenis?.start();
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("command-palette:toggle"));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-3 top-3 z-[260] transition-transform duration-500 md:inset-x-6 md:top-4",
          hidden ? "-translate-y-[130%]" : "translate-y-0"
        )}
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-4 py-2.5 pl-6 transition-all duration-500",
            scrolled
              ? "glass shadow-lg shadow-black/20"
              : "border-transparent bg-transparent"
          )}
        >
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-cream"
            aria-label="Azhar — home"
          >
            azhar<span className="text-ember">.</span>dev
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "link-underline font-mono text-xs uppercase tracking-[0.18em] transition-colors",
                      active ? "text-ember" : "text-cream-dim hover:text-cream"
                    )}
                  >
                    {link.label}
                  </Link>
                  {active && (
                    <span
                      aria-hidden
                      className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ember animate-pulse-soft"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <button
              onClick={openPalette}
              aria-label="Open command palette (Cmd+K)"
              className="hidden items-center gap-2 rounded-full border border-line px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:border-ember/60 hover:text-cream lg:flex"
            >
              <Command size={12} />
              <span>K</span>
            </button>
            <ThemeToggle />
            {/* Wrapped: the Button's own inline-flex class would out-cascade
                a `hidden` utility placed directly on it */}
            <span className="hidden lg:block">
              <Button href="/contact" size="sm">
                Hire me
              </Button>
            </span>
            <button
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      {open && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[255] flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {LINKS.map((link, i) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-baseline gap-4 py-3"
                  onClick={() => setOpen(false)}
                >
                  <span className="font-mono text-xs text-ember">0{i + 1}</span>
                  <span
                    className={cn(
                      "font-display text-[clamp(1.75rem,7vw,2.5rem)] font-bold transition-colors group-hover:text-ember",
                      active ? "text-ember" : "text-cream"
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Lucknow, India — open to work
          </p>
        </div>
      )}
    </>
  );
}
