# Azhar — Developer Portfolio

Premium full-stack developer portfolio for **Azahruddin Mohammad Hassan**, built with Next.js (App Router, JavaScript), MongoDB, GSAP and Three.js. Every piece of content is served from MongoDB and editable through a JWT-protected admin dashboard — no hardcoded portfolio data.

## Stack

- **Frontend** — Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP (ScrollTrigger + SplitText), React Three Fiber + Drei, Lenis smooth scrolling, Lucide icons, Sonner toasts
- **Backend** — Next.js Route Handlers, Mongoose 9, JWT (httpOnly cookie) auth, Nodemailer
- **Design** — "Ink & Ember": warm near-black, ember-orange accent, Syne display type, Instrument Serif italics, JetBrains Mono details

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit values
npm run seed                 # load starter content into MongoDB
npm run dev                  # http://localhost:3000
```

> No MongoDB running? The public site still renders — data reads fall back to the canonical seed content in `src/lib/seed-data.js`. The admin dashboard and contact form need a real database.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (local or Atlas) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (SEO, sitemap, OG) |
| `JWT_SECRET` | Secret for signing admin session tokens |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin credentials — password may be plain or a bcrypt hash |
| `SMTP_HOST/PORT/USER/PASS`, `CONTACT_EMAIL` | Optional — email delivery for contact form (messages always persist to MongoDB) |

## Pages

| Route | Description |
| --- | --- |
| `/` | Animated landing — Three.js hero, about, experience, skills, featured projects, tech marquee, learning, journey timeline, contact CTA |
| `/projects` | Filter + search across major projects, plus smaller experiments |
| `/projects/[slug]` | Case study — overview, features, challenges/solutions, stack |
| `/skills` | Interactive skill visualization by discipline |
| `/experience` | Full professional timeline |
| `/contact` | Contact form → MongoDB + optional email, with success animation |
| `/admin` | JWT-protected dashboard — full CRUD on every collection |

## API

REST route handlers under `src/app/api`:

- `POST /api/auth/login` · `POST /api/auth/logout` · `GET /api/auth/me`
- `GET|PUT /api/profile`
- `GET|POST /api/projects` · `GET|PUT|DELETE /api/projects/[id]` (id or slug)
- Same CRUD shape for `minor-projects`, `skills`, `minor-skills`, `learning`, `experience`
- `POST /api/contact` (public) · `GET /api/contact`, `PATCH|DELETE /api/contact/[id]` (admin)

Public `GET`s are open; every mutation requires the admin session cookie.

## Project structure

```
src/
  app/            routes: (site) public pages, admin dashboard, api handlers
  sections/       home page sections (Hero, About, Journey, …)
  components/     ui primitives, chrome (navbar/cursor/palette), feature components
  animations/     gsap setup + Reveal / TextReveal / Counter
  hooks/          useMagnetic, useTilt
  lib/            db, auth, crud factory, email, data access, seed data
  models/         Mongoose models (8 collections)
  three/          R3F hero scene
scripts/seed.mjs  database seeder
```

## Deploying to Vercel

1. Push to GitHub and import the repo in Vercel.
2. Set the env vars above (`MONGODB_URI` → MongoDB Atlas, strong `JWT_SECRET`/`ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL` → production URL).
3. Deploy, then run `npm run seed` locally pointed at Atlas (or add content through `/admin`).

## Notes

- Drop your resume at `public/resume.pdf` (linked from the hero, command palette and footer).
- Reduced-motion preferences disable decorative animation globally.
- Public pages use ISR (60s), so admin edits go live within a minute.
