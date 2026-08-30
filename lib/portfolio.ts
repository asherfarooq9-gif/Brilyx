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
    slug: "example-storefront",
    name: "Example Storefront",
    category: "web-development",
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
    slug: "example-marketing-site",
    name: "Example Marketing Site",
    category: "web-development",
    client: "Placeholder Studio",
    summary:
      "Marketing site with a CMS-backed blog, scroll-driven animation, and a 100 Lighthouse performance score.",
    url: "https://example.com",
    tags: ["Next.js", "CMS", "Marketing"],
    image: "/work/example-marketing-site.jpg",
    year: 2024,
  },
  {
    slug: "example-delivery-app",
    name: "Example Delivery App",
    category: "app-development",
    client: "Placeholder Logistics",
    summary:
      "Cross-platform iOS and Android app for drivers — offline-first routing, proof of delivery, and live dispatch.",
    url: "https://example.com",
    tags: ["React Native", "Offline-first", "Maps"],
    image: "/work/example-delivery-app.jpg",
    year: 2025,
    featured: true,
  },
  {
    slug: "example-ops-automation",
    name: "Example Ops Automation",
    category: "ai-automations",
    client: "Placeholder Labs",
    summary:
      "Document intake pipeline that classifies, extracts, and routes invoices with human review on low-confidence cases.",
    url: "https://example.com",
    tags: ["Workflow", "OCR", "Human-in-the-loop"],
    image: "/work/example-ops-automation.jpg",
    year: 2025,
  },
  {
    slug: "example-support-assistant",
    name: "Example Support Assistant",
    category: "chatbots",
    client: "Placeholder SaaS",
    summary:
      "Support chatbot grounded in the client's help centre — answers on web and WhatsApp, escalates to a human on request.",
    url: "https://example.com",
    tags: ["RAG", "WhatsApp", "Escalation"],
    image: "/work/example-support-assistant.jpg",
    year: 2025,
    featured: true,
  },
  {
    slug: "example-forecasting-model",
    name: "Example Forecasting Model",
    category: "ai-ml",
    client: "Placeholder Retail",
    summary:
      "Demand forecasting model with a retraining pipeline and drift monitoring, served behind an internal API.",
    url: "https://example.com",
    tags: ["Forecasting", "MLOps", "Monitoring"],
    image: "/work/example-forecasting-model.jpg",
    year: 2024,
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
