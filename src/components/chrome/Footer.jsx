import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { getProfile } from "@/lib/data";
import Reveal from "@/animations/Reveal";

export default function Footer() {
  const profile = getProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Giant watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-8 select-none text-center font-display text-[18vw] font-bold leading-none text-outline opacity-40"
      >
        AZHAR
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember">
            What&apos;s next
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,6vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-cream">
            Let&apos;s build something{" "}
            <em className="font-serif italic font-normal text-ember">worth shipping</em>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${profile.email}`}
              className="link-underline inline-flex items-center gap-2 font-mono text-sm text-cream-dim hover:text-cream"
            >
              {profile.email} <ArrowUpRight size={14} />
            </a>
            <span className="text-muted">·</span>
            <span className="font-mono text-sm text-muted">{profile.location}</span>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
          <p className="font-mono text-xs text-muted">
            © {year} {profile.name}. Crafted with Next.js, GSAP &amp; Three.js.
          </p>
          <nav aria-label="Social links" className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream-dim transition-all hover:-translate-y-1 hover:border-ember hover:text-ember"
            >
              <FiGithub size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream-dim transition-all hover:-translate-y-1 hover:border-ember hover:text-ember"
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream-dim transition-all hover:-translate-y-1 hover:border-ember hover:text-ember"
            >
              <Mail size={16} />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
