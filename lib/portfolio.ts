import type { ServiceSlug } from "@/lib/services";
import { getService } from "@/lib/services";

export interface Project {
  slug: string;
  name: string;
  /** Which line of work this project belongs to — drives grouping on /work. */
  category: ServiceSlug;
  /** Client or brand the site was built for. Omit for internal / self-initiated work. */
  client?: string;
  /** One or two sentences shown on the card. */
  summary: string;
  /** Live site URL. When set, the whole card links out to it in a new tab. */
  url?: string;
  /** Stack / feature pills, e.g. "Next.js", "Stripe". */
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
    slug: "dynamic-enterprises",
    name: "Dynamic Enterprises",
    category: "web-development",
    client: "Dynamic Enterprises",
    summary:
      "Marketing and portfolio site for a Karachi design-and-production studio spanning interior design, FF&E supply, corporate film, and uniforms — a portfolio-led structure that presents all four disciplines as one team.",
    url: "https://www.dynamicenterprises.pk/",
    tags: ["Next.js", "Marketing site", "Portfolio"],
    image: "/work/dynamic-enterprises.jpg",
    featured: true,
  },
  {
    slug: "al-quran-academy",
    name: "Al Quran Academy",
    category: "web-development",
    client: "Al Quran Academy",
    summary:
      "Marketing and booking site for an online Quran academy — trial sign-ups, class scheduling across timezones, and WhatsApp enrolment for a global student base.",
    url: "https://www.alquranacademy.click/",
    tags: ["Next.js", "Marketing site", "Booking"],
    image: "/work/al-quran-academy.jpg",
    featured: true,
  },
  {
    slug: "faisal-hayat-traders",
    name: "Faisal Hayat Traders",
    category: "web-development",
    client: "Faisal Hayat Traders",
    summary:
      "Marketing and catalog site for a Rawalpindi tyre and alloy-wheel shop — a rim-size matcher tool, five brands in one catalog, and WhatsApp enquiry as the checkout.",
    url: "https://faisal-hayat-traders.vercel.app/",
    tags: ["Next.js", "Catalog", "Automotive"],
    image: "/work/faisal-hayat-traders.jpg",
    featured: true,
  },
] as const;

/** Category display order on the /work page. */
const CATEGORY_ORDER: readonly ServiceSlug[] = [
  "web-development",
  "app-development",
  "ai-automations",
  "chatbots",
  "ai-ml",
];

export interface ProjectGroup {
  slug: ServiceSlug;
  title: string;
  projects: readonly Project[];
}

/** Projects grouped by category, in `CATEGORY_ORDER`, skipping empty groups. */
export function getProjectGroups(): readonly ProjectGroup[] {
  return CATEGORY_ORDER.map((slug) => ({
    slug,
    title: getService(slug)?.title ?? slug,
    projects: PROJECTS.filter((project) => project.category === slug),
  })).filter((group) => group.projects.length > 0);
}

export function getFeaturedProjects(): readonly Project[] {
  return PROJECTS.filter((project) => project.featured);
}

export function getCategoryLabel(category: ServiceSlug): string {
  return getService(category)?.title ?? category;
}
