"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowUpRight, Copy, Check, MessageSquare, Sparkles } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/animations/Reveal";
import { getProfile } from "@/lib/data";

export default function ContactPage() {
  const profile = getProfile();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
        toast.success("Email copied to clipboard");
      } else if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
        toast.success("Phone number copied to clipboard");
      }
    } catch {
      toast.error("Failed to copy");
    }
  };

  const directChannels = [
    {
      title: "WhatsApp",
      subtitle: "Instant messages & quick chat",
      value: "+91 63896 55708",
      href: profile.whatsapp || `https://wa.me/${profile.phone?.replace(/[^0-9]/g, "")}`,
      icon: FaWhatsapp,
      actionText: "Chat on WhatsApp",
      badge: "Fastest response",
      accent: "#25D366",
      bgHover: "hover:border-[#25D366]/40",
      accentBg: "bg-[#25D366]/10 text-[#25D366]",
    },
    {
      title: "Email",
      subtitle: "Project inquiries & opportunities",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      actionText: "Send an Email",
      badge: "Usually replies in ~12 hrs",
      accent: "#a35e47",
      bgHover: "hover:border-ember/40",
      accentBg: "bg-ember-soft text-ember",
      copyable: profile.email,
      copyType: "email",
    },
    {
      title: "LinkedIn",
      subtitle: "Professional network & connection",
      value: "azhar619",
      href: profile.linkedin,
      icon: FiLinkedin,
      actionText: "View Profile",
      badge: "Active daily",
      accent: "#0A66C2",
      bgHover: "hover:border-[#0A66C2]/40",
      accentBg: "bg-[#0A66C2]/10 text-[#0A66C2]",
    },
    {
      title: "Phone Call",
      subtitle: "Direct voice conversation",
      value: profile.phone,
      href: `tel:${profile.phone?.replace(/\s/g, "")}`,
      icon: Phone,
      actionText: "Call directly",
      accent: "#e07a5f",
      bgHover: "hover:border-ember/40",
      accentBg: "bg-ember-soft text-ember",
      copyable: profile.phone,
      copyType: "phone",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Direct contact"
        title="Let's connect"
        accent="directly"
        description="Skip the lengthy forms. Reach out to me directly on WhatsApp, email, or LinkedIn for roles, consulting, or project collaborations."
      />

      <div className="mx-auto max-w-6xl px-6 pb-28">
        {/* Main channels grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {directChannels.map((channel, i) => {
            const Icon = channel.icon;
            const isCopied = channel.copyType === "email" ? copiedEmail : copiedPhone;

            return (
              <Reveal key={channel.title} delay={i * 0.08}>
                <div
                  className={`card-surface sweep-border group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 ${channel.bgHover}`}
                >
                  {/* Subtle hover bloom */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: `radial-gradient(70% 80% at 90% 10%, ${channel.accent}14, transparent 65%)`,
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${channel.accentBg}`}>
                        <Icon size={22} />
                      </span>
                      {channel.badge && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-2 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cream-dim">
                          <Sparkles size={11} className="text-ember" />
                          {channel.badge}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-6 font-display text-2xl font-bold text-cream group-hover:text-ember transition-colors duration-300">
                      {channel.title}
                    </h2>
                    <p className="mt-1 text-sm text-cream-dim">{channel.subtitle}</p>
                    <p className="mt-3 font-mono text-sm font-medium text-cream">{channel.value}</p>
                  </div>

                  <div className="relative mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-line/50">
                    {channel.href && (
                      <a
                        href={channel.href}
                        target={channel.href.startsWith("http") ? "_blank" : undefined}
                        rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:bg-ember hover:text-ink-0"
                      >
                        {channel.actionText} <ArrowUpRight size={14} />
                      </a>
                    )}
                    {channel.copyable && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(channel.copyable, channel.copyType)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-2 px-4 py-2.5 font-mono text-xs text-cream-dim transition-colors hover:border-ember hover:text-cream"
                        aria-label={`Copy ${channel.title}`}
                      >
                        {isCopied ? (
                          <>
                            <Check size={13} className="text-green-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={13} /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Additional information strip */}
        <Reveal delay={0.35} className="mt-10">
          <div className="card-surface rounded-3xl p-8 md:p-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-soft text-ember">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Location</p>
                  <p className="mt-1 text-sm font-medium text-cream">{profile.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-soft text-ember">
                  <Clock size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Availability</p>
                  <p className="mt-1 text-sm font-medium text-cream">{profile.availability}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-soft text-ember">
                  <FiGithub size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Code & Repos</p>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-1 inline-flex items-center gap-1 text-sm font-medium text-cream hover:text-ember"
                  >
                    github.com/azahruddin101 <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-soft text-ember">
                  <MessageSquare size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Preferred Mode</p>
                  <p className="mt-1 text-sm font-medium text-cream">WhatsApp / Email</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
