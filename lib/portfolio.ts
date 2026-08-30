export interface Project {
  slug: string;
  name: string;
  /** Client or brand the site was built for. Omit for internal / self-initiated work. */
  client?: string;
  /** One or two sentences shown on the card. */
  summary: string;
  /** Live site URL. When set, the whole card links out to it in a new tab. */
  url?: string;
  /** Stack / category pills, e.g. "Next.js", "E-commerce". */
  tags: readonly string[];
  /**
   * Screenshot at `public/work/<slug>.jpg`. If the file is missing the card
   * falls back to a gradient — safe to leave pointed at a file that doesn't
   * exist yet.
   */
  image: string;
  year?: number;
  /** Featured projects appear in the homepage "Our Work" section. */
  featured?: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "example-storefront",
    name: "Example Storefront",
    client: "Placeholder Co.",
    summary:
      "Headless e-commerce storefront with a custom checkout, built for fast page loads and easy catalog updates.",
    url: "https://example.com",
    tags: ["Next.js", "E-commerce", "Stripe"],
    image: "/work/example-storefront.jpg",
    year: 2025,
    featured: true,
  },
  {
    slug: "example-dashboard",
    name: "Example Analytics Dashboard",
    client: "Placeholder Labs",
    summary:
      "Internal analytics dashboard with role-based access, live charts, and export — replacing a pile of spreadsheets.",
    url: "https://example.com",
    tags: ["React", "Dashboard", "Data viz"],
    image: "/work/example-dashboard.jpg",
    year: 2025,
    featured: true,
  },
  {
    slug: "example-marketing-site",
    name: "Example Marketing Site",
    client: "Placeholder Studio",
    summary:
      "Marketing site with a CMS-backed blog, scroll-driven animation, and a 100 Lighthouse performance score.",
    url: "https://example.com",
    tags: ["Next.js", "CMS", "Marketing"],
    image: "/work/example-marketing-site.jpg",
    year: 2024,
    featured: true,
  },
] as const;

export function getFeaturedProjects(): readonly Project[] {
  return PROJECTS.filter((project) => project.featured);
}
