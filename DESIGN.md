---
name: Brilyx
description: Engineering Intelligence. Building Tomorrow.
colors:
  ink: "#0a0a0a"
  paper: "#ffffff"
  ink-dark: "#ededed"
  paper-dark: "#0a0a0a"
  surface: "#ffffff"
  surface-dark: "#101012"
  panel: "#f4f4f5"
  panel-dark: "#1c1c1f"
  muted-text: "#71717a"
  muted-text-dark: "#a1a1aa"
  signal: "#52525b"
  signal-dark: "#a1a1aa"
  signal-soft: "#a1a1aa"
  signal-soft-dark: "#52525b"
  line: "#e4e4e7"
  line-dark: "#262629"
typography:
  display:
    fontFamily: "Space Grotesk, Inter, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.875rem, 1.5rem + 2vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.2em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
spacing:
  sm: "1rem"
  md: "1.5rem"
  lg: "3rem"
  xl: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "0 1.5rem"
    height: "2.75rem"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 1.5rem"
    height: "2.75rem"
  card-project:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "1.5rem"
---

# Design System: Brilyx

## 1. Overview

**Creative North Star: "The Blueprint Room"**

Brilyx is an engineering studio's proof-of-work site, not an agency showreel. The system reads like a precise drafting room: one ink color, one sheet of paper, a single grey signal used for everything that needs attention. Nothing is drenched, nothing glows, nothing performs. Credibility comes from what's shown (real client work, real stacks, real links) and from the discipline of the frame around it, not from decoration.

This explicitly rejects flashy agency/Awwwards portfolio tropes (scroll-hijacking, gradient hero blobs, motion for its own sake) and the generic dev-portfolio template look (identical icon-card grids, tech-tag pill soup with no hierarchy). It also rejects every AI-slop tell by default: no eyebrow label on every section, no em-dashes, no gradient text, no side-stripe borders.

**Key Characteristics:**
- Monochrome ink-on-paper, one grey signal color, no brand hue.
- Flat by default; elevation is a hover/focus response, never a resting state.
- Mono labels (JetBrains Mono, uppercase, wide tracking) mark metadata, never prose.
- Soft-but-tight radius scale (0.5–1rem) applied consistently: buttons tighter than cards.
- Motion is a 150–300ms state response (translate + shadow), not a scroll-driven set piece.

## 2. Colors

Two neutrals and one signal grey, each with a light and dark value; no accent hue is introduced anywhere in the system.

### Primary
- **Ink** (`#0a0a0a` / dark paper `#ededed`): primary text, primary button fill, headings.

### Neutral
- **Paper** (`#ffffff` / dark `#0a0a0a`): page background.
- **Surface** (`#ffffff` / dark `#101012`): card and panel background, one step above paper in dark mode only.
- **Panel** (`#f4f4f5` / dark `#1c1c1f`): secondary section backgrounds (e.g. band sections behind card grids).
- **Muted text** (`#71717a` / dark `#a1a1aa`): captions, metadata, body copy that must recede.
- **Signal grey** (`#52525b` / dark `#a1a1aa`, soft variant `#a1a1aa` / dark `#52525b`): the one "accent" in the system — used only for the top-border sheen on hover, small status dots, and link/hover states on outline buttons. It is grey, not a hue; it never becomes a brand color.
- **Line** (`#e4e4e7` / dark `#262629`): all borders and dividers.

### Named Rules
**The One Ink Rule.** There is exactly one dark value (ink) and one light value (paper) per theme. Nothing else is introduced as a "pop" color. If a Work section needs to differentiate categories, do it with layout, mono labels, or imagery — never with a second hue.

## 3. Typography

**Display Font:** Space Grotesk (falls back to Inter, then system sans)
**Body Font:** Inter (falls back to system sans)
**Label/Mono Font:** JetBrains Mono (falls back to system mono)

**Character:** Space Grotesk gives headings a slightly geometric, drafted edge without going display-decorative; Inter carries body copy in full readability mode; JetBrains Mono flags anything that is metadata (category, year, stack tag) rather than sentence copy.

### Hierarchy
- **Display** (600, `clamp(1.875rem, 1.5rem + 2vw, 2.75rem)`, 1.1 line-height, −0.02em tracking): page and section H1/H2 (`SectionHeading` title).
- **Body** (400, 1rem–1.125rem, 1.6 line-height, max 65–75ch): descriptions, summaries, paragraph copy.
- **Label** (500, 0.65–0.75rem, 0.16–0.2em tracking, uppercase, mono): eyebrows, category tags, stack chips, "In progress" badges.

### Named Rules
**The One Eyebrow Rule.** `SectionHeading`'s `eyebrow` prop is optional for a reason. Use it on at most one section in every three; a mono eyebrow above every single section header is the single most common AI-generated-site tell and the system currently over-uses it. When two adjacent sections would both want one, drop the second and let the heading alone carry it.

## 4. Elevation

Flat by default. The system has no resting shadows anywhere; every shadow is a state response to hover or focus, and always tinted (never pure black).

### Shadow Vocabulary
- **Card hover lift** (`box-shadow: 0 18px 40px -18px rgba(10,10,10,0.25)` + `-translate-y-1`): `ProjectCard` on hover/focus-visible. Signals "this is clickable" without a resting shadow cluttering the grid.
- **Primary button hover** (`shadow-lg` tinted `shadow-primary/20` + `-translate-y-0.5`): buttons on hover, reverting on active.

### Named Rules
**The Flat-At-Rest Rule.** No card, button, or panel carries a shadow while idle. Depth is earned only by interaction.

## 5. Components

### Buttons
- **Shape:** `rounded-md` (0.5rem), heights 2.25rem/2.75rem/3rem across sm/md/lg.
- **Primary:** ink fill, paper text; hover lifts 2px and gains a tinted shadow; active returns to rest.
- **Outline:** paper fill, ink text, line border; hover border and text shift to signal grey, lifts 2px.
- **Ghost:** transparent, hover fills panel.
- **Feel:** tactile and quiet — every state change is a small lift, never a color swap or a bounce.

### Cards (Project / Work)
- **Corner Style:** `rounded-xl` (1rem).
- **Background:** surface, 1px line border.
- **Shadow Strategy:** flat at rest; hover triggers the Card hover lift (see Elevation) plus a 2px signal-gradient sheen that scales in from the left along the top edge.
- **Border:** 1px line, becomes transparent on hover (the sheen line reads as the border instead).
- **Internal Padding:** 1.5rem, image bleeds edge-to-edge above the padded content (`-mx-6 -mt-6`).
- **Feel:** tactile and quiet — image scales 1.05x slowly on hover under the lift, nothing else moves.

### Chips (stack / category tags)
- **Style:** transparent background, line border, mono label text, fully rounded (pill).
- **State:** static; no selected/unselected variants exist yet (informational only, not filters).

### Navigation (Work grid → detail)
- Category groups are plain `SectionHeading` blocks with a project-count eyebrow; project count is real data, not decoration, so it does not fall under the One Eyebrow Rule the same way a purely decorative eyebrow would — but it still counts toward the per-page eyebrow budget.

### Scrollable Card Stack (signature component)
The homepage Work section's `ScrollableCardStack`: a perspective-stacked deck of project cards users can wheel/arrow/drag through, each card an image over a compact identity bar (badge + name + category). Distinctive to Brilyx; the only place in the system where cards physically stack rather than sitting in a grid. Keep this pattern unique to the homepage teaser — the full `/work` page uses grouped grids instead, so the stack doesn't get diluted by repetition.

## 6. Do's and Don'ts

### Do:
- **Do** keep every Work surface (homepage teaser, `/work` index, case-study detail) to the same two neutrals + one signal grey; no category, tag, or status gets its own color.
- **Do** let real screenshots and real client names carry credibility; a project card with no image is a placeholder, not a finished card.
- **Do** cap eyebrows at one per three sections on the `/work` page (Named Rule: The One Eyebrow Rule) — currently every group section on `/work` repeats the "N projects" eyebrow, which reads as templated.
- **Do** keep card and button radii on their respective scale steps (`rounded-md` for buttons, `rounded-xl` for cards) — never mix in a third radius.
- **Do** treat the Scrollable Card Stack as a homepage-only signature; the `/work` index page should stay grid-based so the two don't compete.

### Don't:
- **Don't** introduce a gradient hero blob, scroll-hijacked pinned sections, or Awwwards-style choreography on the Work pages — that is an explicit anti-reference in PRODUCT.md.
- **Don't** ship an em-dash anywhere in Work copy (e.g. the current "In development — launching soon" strings); use a period or comma instead.
- **Don't** stack three or more identical `sm:grid-cols-2 lg:grid-cols-3` card-grid sections back to back without varying the composition — it reads as the generic dev-portfolio template the brand explicitly rejects.
- **Don't** add a second accent hue to distinguish project categories or status badges; use mono labels, icons, or layout instead.
- **Don't** give any card or panel a resting shadow; shadows are hover/focus-only per the Flat-At-Rest Rule.
