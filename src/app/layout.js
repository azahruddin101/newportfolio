import { Syne, Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Azahruddin Hassan — Full Stack JavaScript Developer",
    template: "%s — Azahruddin Hassan",
  },
  description:
    "Full Stack JavaScript Developer building scalable web apps with React, Next.js, Node.js, MongoDB and AI — LangChain, LangGraph, OpenAI. Based in Lucknow, India.",
  keywords: [
    "Full Stack Developer", "JavaScript", "React", "Next.js", "Node.js",
    "MongoDB", "GenAI", "LangChain", "Portfolio", "Lucknow",
  ],
  authors: [{ name: "Azahruddin Mohammad Hassan", url: SITE_URL }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Azahruddin Hassan — Portfolio",
    title: "Azahruddin Hassan — Full Stack JavaScript Developer",
    description:
      "Production web apps where crafted frontends meet intelligent backends. React, Next.js, Node.js, MongoDB & AI.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azahruddin Hassan — Full Stack JavaScript Developer",
    description:
      "Production web apps where crafted frontends meet intelligent backends.",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Azahruddin Mohammad Hassan",
  alternateName: "Azhar",
  jobTitle: "Full Stack JavaScript Developer",
  url: SITE_URL,
  email: "mailto:azahruddin101@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/azahruddin101",
    "https://www.linkedin.com/in/azhar619",
  ],
  knowsAbout: [
    "React.js", "Next.js", "Node.js", "Express.js", "MongoDB",
    "LangChain", "LangGraph", "OpenAI", "REST APIs", "Socket.IO",
  ],
};

export default async function RootLayout({ children }) {
  // Theme comes from a cookie so the server renders the correct
  // data-theme directly — no init script, no flash, nothing for React
  // to mismatch on. First-time visitors have no cookie: CSS falls back
  // to their system preference (see globals.css).
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const theme = themeCookie === "light" || themeCookie === "dark" ? themeCookie : undefined;

  return (
    <html
      lang="en"
      data-theme={theme}
      suppressHydrationWarning
      className={`${syne.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="grain min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--ink-2)",
              border: "1px solid var(--line)",
              color: "var(--cream)",
            },
          }}
        />
      </body>
    </html>
  );
}
