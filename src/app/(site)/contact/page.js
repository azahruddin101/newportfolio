import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/animations/Reveal";
import { getProfile } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Azahruddin Hassan — full stack developer open to full-time roles and freelance projects.",
};

export default async function ContactPage() {
  const profile = await getProfile();

  const details = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone?.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: Clock, label: "Availability", value: profile.availability },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Let's"
        accent="talk"
        description="A role, a product idea, or just a question about something I've built — the form goes straight to my inbox."
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-28 md:grid-cols-[1fr_360px]">
        <ContactForm />

        <aside className="space-y-4 self-start">
          {details.map(({ icon: Icon, label, value, href }, i) =>
            value ? (
              <Reveal key={label} delay={i * 0.08}>
                <div className="card-surface flex items-start gap-4 rounded-2xl p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-soft text-ember">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="link-underline mt-1 block truncate text-sm text-cream hover:text-ember">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-cream">{value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ) : null
          )}

          <Reveal delay={0.35}>
            <div className="card-surface rounded-2xl p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Elsewhere</p>
              <div className="mt-3 flex gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream-dim transition-all hover:-translate-y-0.5 hover:border-ember hover:text-ember"
                >
                  <FiGithub size={15} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream-dim transition-all hover:-translate-y-0.5 hover:border-ember hover:text-ember"
                >
                  <FiLinkedin size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </>
  );
}
