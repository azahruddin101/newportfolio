"use client";

import { Copy, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Reveal from "@/animations/Reveal";
import TextReveal from "@/animations/TextReveal";

export default function ContactCTA({ profile }) {
  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    toast.success("Email copied to clipboard");
  };

  return (
    <section className="relative overflow-hidden py-32 md:py-44" aria-label="Contact call to action">
      {/* Ember bloom */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, rgba(163,94,71,0.16), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal y={20}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ember">
            07 — Contact
          </p>
        </Reveal>

        <TextReveal
          as="h2"
          type="words"
          className="mt-6 font-display text-[clamp(2.25rem,7.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-cream"
        >
          Got an idea? Let&apos;s make it{" "}
          <em className="font-serif italic font-normal text-ember">real.</em>
        </TextReveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-lg text-base text-cream-dim md:text-lg">
            I&apos;m currently {profile.availability?.toLowerCase() || "open to opportunities"}.
            The inbox is always open — I usually reply within a day.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" size="lg">
            Start a conversation <ArrowUpRight size={15} />
          </Button>
          <Button onClick={copyEmail} variant="outline" size="lg">
            <Copy size={14} /> {profile.email}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
