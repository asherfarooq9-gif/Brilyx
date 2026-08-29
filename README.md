# Brilyx

Marketing site for Brilyx — an engineering studio building AI/ML systems, apps, web
platforms, automations, and chatbots.

**Tagline:** Engineering Intelligence. Building Tomorrow.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19, React Compiler)
- TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- Framer Motion (scroll reveals, page transitions, micro-interactions, notch nav pill)
- `lucide-react` icons
- Space Grotesk (headings) + Inter (body) + JetBrains Mono (labels) via `next/font`
- Monochrome palette — neutral grey accent, no brand colour
- Contact form → [Formspree](https://formspree.io)
- Hero 3D scene → Spline `<spline-viewer>` web component, loaded from the unpkg CDN
  at runtime (see `components/ui/splite.tsx`). No build-time WebGL/DRACO assets; the
  scene URL is `SPLINE_SCENE` in `components/sections/Hero.tsx`. Falls back to a static
  placeholder under `prefers-reduced-motion` or if the CDN script fails.

> The Spline viewer is the one external runtime dependency. If you add a Content
> Security Policy, allow `script-src https://unpkg.com` and the `connect-src` /
> `worker-src` origins Spline needs (`https://unpkg.com`, `https://prod.spline.design`).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_FORMSPREE_ID
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ID` | for the contact form | Formspree form ID (the segment after `/f/`). Without it, the form shows a "not connected" message and never posts. |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Project structure

```
app/
  layout.tsx            Root layout: fonts, navbar, footer, base metadata, JSON-LD
  template.tsx          Per-route page-transition wrapper
  page.tsx              Home
  services/ about/ contact/   Route pages
  sitemap.ts robots.ts opengraph-image.tsx
  globals.css           Design tokens (@theme) + brand utilities
components/
  layout/               NotchNavbar (floating notch nav, routing-aware), Footer
  ui/                   Button, ServiceCard, SectionHeading, GradientText, ServiceIcon,
                        card, spotlight, splite (Spline viewer),
                        adaptive-notch-navigation-bar (notch primitives)
  motion/               Reveal, Stagger (Framer Motion helpers)
  sections/             Hero (text + 3D Spline showcase card, no copy on the card),
                        ServiceHighlights, AboutBrief, Testimonials, CtaBanner, ContactForm
lib/
  site.ts               Name, tagline, nav links, socials
  services.ts           Single source of truth for the five services
  seo.ts                buildMetadata() helper
  motion.ts             Shared animation variants
  cn.ts                 className joiner
```

## Editing content

- **Services:** `lib/services.ts`
- **Site name / nav / socials / email:** `lib/site.ts`
- **Testimonials:** `components/sections/Testimonials.tsx` (currently placeholders)
- **Team:** `app/about/page.tsx` (`TEAM` array — currently `TBD` placeholders)
- **Colors / radius / gradient:** CSS variables at the top of `app/globals.css`

## Accessibility & motion

- All animations respect `prefers-reduced-motion` and fall back to static renders.
- Hero pointer-parallax is also disabled on coarse (touch) pointers.
- Semantic landmarks, skip link, visible focus rings, labelled form fields.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel — framework preset is detected automatically.
3. Add `NEXT_PUBLIC_FORMSPREE_ID` under Project → Settings → Environment Variables.
4. Set the production domain and update `SITE.url` in `lib/site.ts` to match.
