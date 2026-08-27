"use client";

import { useEffect, useRef, useState } from "react";
import { Send, RotateCcw } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { Field, Input, Textarea } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

const INITIAL = { name: "", email: "", subject: "", message: "" };

export default function ContactForm({ email: recipientEmail }) {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);
  const successRef = useRef(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Success choreography: card pops in, checkmark draws itself
  useEffect(() => {
    if (!sent || prefersReducedMotion()) return;
    const root = successRef.current;
    const path = root.querySelector("[data-check]");
    const circle = root.querySelector("[data-circle]");
    const len = path.getTotalLength();
    const circleLen = circle.getTotalLength();

    const tl = gsap.timeline();
    tl.fromTo(root, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" })
      .fromTo(
        circle,
        { strokeDasharray: circleLen, strokeDashoffset: circleLen },
        { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
        "-=0.2"
      )
      .fromTo(
        path,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        root.querySelectorAll("[data-success-text]"),
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.2"
      );
    return () => tl.kill();
  }, [sent]);

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || "Portfolio Contact");
    const body = encodeURIComponent(
      `Hi Azhar,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:${recipientEmail}?subject=${subject}&body=${body}`, "_self");
    setSent(true);
  };

  if (sent) {
    return (
      <div
        ref={successRef}
        className="card-surface flex flex-col items-center rounded-3xl px-8 py-16 text-center"
        role="status"
      >
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden>
          <circle data-circle cx="48" cy="48" r="42" stroke="var(--ember)" strokeWidth="2.5" strokeLinecap="round" />
          <path
            data-check
            d="M30 49 L43 62 L67 36"
            stroke="var(--ember)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 data-success-text className="mt-8 font-display text-3xl font-bold text-cream">
          Message <em className="font-serif italic font-normal text-ember">opened.</em>
        </h3>
        <p data-success-text className="mt-3 max-w-sm text-sm leading-relaxed text-cream-dim">
          Your email client should have opened with a pre-filled message. If it didn&apos;t,
          you can email me directly at{" "}
          <a href={`mailto:${recipientEmail}`} className="text-ember hover:underline">{recipientEmail}</a>.
        </p>
        <button
          data-success-text
          onClick={() => {
            setForm(INITIAL);
            setSent(false);
          }}
          className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-cream"
        >
          <RotateCcw size={13} /> Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-surface space-y-6 rounded-3xl p-8 md:p-10" aria-label="Contact form">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" id="name">
          <Input id="name" required maxLength={120} placeholder="Jane Doe" value={form.name} onChange={set("name")} autoComplete="name" />
        </Field>
        <Field label="Email" id="email">
          <Input id="email" type="email" required placeholder="jane@company.com" value={form.email} onChange={set("email")} autoComplete="email" />
        </Field>
      </div>
      <Field label="Subject" id="subject">
        <Input id="subject" maxLength={200} placeholder="Project, role, collaboration…" value={form.subject} onChange={set("subject")} />
      </Field>
      <Field label="Message" id="message">
        <Textarea id="message" required maxLength={5000} rows={6} placeholder="Tell me about it…" value={form.message} onChange={set("message")} />
      </Field>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send message <Send size={14} />
      </Button>
    </form>
  );
}
