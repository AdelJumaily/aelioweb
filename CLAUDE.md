# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build (also type-checks)
npm run lint     # ESLint
```

No test suite is configured. TypeScript type errors surface during `npm run build`.

## Architecture

**Next.js 16 App Router** site for Aelio Studio, a web/app development agency. React 19, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, and Lenis smooth scroll.

### Route structure

| Route | Description |
|---|---|
| `/` | Home: Hero → FeaturedWork → StatsRow → ServicesAccordion → ContactCTA → FAQ |
| `/work` | Portfolio grid (empty file — content comes from `lib/content/projects.ts`) |
| `/work/[slug]` | Individual project detail (empty file) |
| `/pricing` | Three-tier pricing for Web Design + Hosting plans |
| `/agency` | About/team page |
| `/contact` | Contact page |
| `/solutions/web-development` | Detailed solution page with sub-sections |
| `/solutions/digital-marketing` | Solution page (Coming Soon) |
| `/solutions/other-services` | Solution page (Coming Soon) |
| `/solutions/[slug]` | Generic solution detail (fallback) |
| `/services/[slug]` | Individual service detail |

### Content layer (`lib/content/`)

Static data files drive most of the site — no CMS or database:

- `projects.ts` — `Project[]` with `slug`, `title`, `summary`, `thumbnail`, `tags`, and full detail fields. Add new portfolio items here.
- `services.ts` — `Service[]` with `id`, `number`, `title`, `description`, `deliverables`, `timeline`, `techStack`, `tags`.
- `faqs.ts` — FAQ entries.
- `testimonials.ts` — Testimonial entries.
- `lib/solutions-data.ts` — `solutionsData` keyed by slug for the solutions route.

### Animation conventions

Two animation libraries coexist:

- **GSAP + ScrollTrigger** — preferred for scroll-driven animations (hero entrance, cards staggering on scroll). Always register plugins inside `if (typeof window !== "undefined")` guards and clean up with `gsap.context().revert()` in `useEffect` returns.
- **Framer Motion** — used for component-level hover/mount animations (`ProjectCard`, etc.). Variants are in `lib/animations.ts` (`fadeInUp`, `containerVariants`, `itemVariants`, etc.).
- **Lenis** — wraps the entire app via `SmoothScroll` in `layout.tsx`. The Lenis instance is exposed globally as `window.lenis` so other components can call `lenis.scrollTo()`.

### Layout & navigation

- `SmoothScroll` (`app/components/animations/SmoothScroll.tsx`) wraps all children in the root layout.
- `Navbar` is a floating oval-shaped nav rendered per-page (not in root layout). Individual pages import and render it directly — do not add it to `layout.tsx`.
- `SiteFooter` is also rendered per-page inside each page's `<main>`.

### Contact flow

`ContactModal` (`app/components/ContactModal.tsx`) is a three-step GSAP-animated modal (company info → personal info → calendar scheduling). It posts to `/api/contact` which uses **Resend** to email `info@aelio.dev`. The `RESEND_API_KEY` environment variable must be set.

### Design system

Defined in `app/globals.css` as CSS custom properties:

- Background: `#F5F1E8` (warm cream), white for card sections
- Foreground: `#2C1810` (dark brown)
- Accent/CTA: `#FF5722` (orange-red) — used for links and primary buttons
- Gold accent: `#D4AF37` — used sparingly for decorative elements
- `cn()` utility in `lib/utils.ts` merges Tailwind classes (`clsx` + `tailwind-merge`)

Path alias `@/*` maps to the repo root, so imports like `@/lib/content/projects` work from anywhere.
