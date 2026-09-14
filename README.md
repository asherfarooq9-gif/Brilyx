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
- Contact → click-to-chat WhatsApp deep link (`whatsappUrl()` in `lib/site.ts`)
- Hero → WebGL "volumetric studio" spotlight room (see `components/ui/volumetric-studio.tsx`),
  built on `@react-three/fiber` + `@react-three/drei`, with a flicker-on lighting intro and
  a scroll-driven parallax exit. Skips the flicker and scroll transforms under
  `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev                  # http://localhost:3000
```

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
                        ServiceHighlights, AboutBrief, Testimonials, CtaBanner
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
3. Set the production domain and update `SITE.url` in `lib/site.ts` to match.
