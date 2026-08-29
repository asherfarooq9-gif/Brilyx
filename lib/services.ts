export type ServiceSlug =
  | "ai-ml"
  | "app-development"
  | "web-development"
  | "ai-automations"
  | "chatbots";

export interface Service {
  slug: ServiceSlug;
  title: string;
  short: string;
  description: string;
  included: readonly string[];
  /**
   * Card background image at `public/services/<slug>.jpg`. If the file is missing
   * the carousel falls back to a grey gradient — safe to leave pointed at a file
   * that doesn't exist yet.
   */
  image: string;
}

export const SERVICES: readonly Service[] = [
  {
    slug: "ai-ml",
    title: "AI / ML Development",
    short: "Custom models, data pipelines, and inference that hold up in production.",
    description:
      "We design, train, and deploy machine learning systems end to end — from framing the problem and preparing data to serving models with monitoring and retraining built in.",
    included: [
      "Model selection, training, and evaluation",
      "Data pipelines and feature engineering",
      "LLM fine-tuning, RAG, and evaluation harnesses",
      "Deployment, monitoring, and drift detection",
    ],
    image: "/services/ai-ml.jpg",
  },
  {
    slug: "app-development",
    title: "App Development",
    short: "Cross-platform mobile apps with native feel and a maintainable core.",
    description:
      "Native and cross-platform applications for iOS and Android, built around a clean architecture so features ship quickly without the codebase turning brittle.",
    included: [
      "iOS and Android delivery from one codebase",
      "Offline-first data and sync",
      "App Store and Play Store release pipelines",
      "Analytics, crash reporting, and A/B testing",
    ],
    image: "/services/app-development.jpg",
  },
  {
    slug: "web-development",
    title: "Web Development",
    short: "Fast, accessible web platforms on a modern React stack.",
    description:
      "Marketing sites, dashboards, and full products built with Next.js, TypeScript, and a design system — optimized for Core Web Vitals and easy to hand back to your team.",
    included: [
      "Next.js App Router and server components",
      "Design systems and component libraries",
      "SEO, performance, and accessibility baked in",
      "CI/CD and preview deployments",
    ],
    image: "/services/web-development.jpg",
  },
  {
    slug: "ai-automations",
    title: "AI Automations",
    short: "Workflows that remove repetitive work from your team's day.",
    description:
      "We connect your tools and add AI where it earns its place — document processing, routing, summarization, and internal agents that act with guardrails and human review.",
    included: [
      "Workflow mapping and opportunity sizing",
      "Integrations across your existing tools",
      "Agentic pipelines with guardrails",
      "Human-in-the-loop review and audit trails",
    ],
    image: "/services/ai-automations.jpg",
  },
  {
    slug: "chatbots",
    title: "Chatbots",
    short: "Support and sales assistants grounded in your own content.",
    description:
      "Conversational assistants for support, onboarding, and lead capture — grounded in your knowledge base, escalated to humans when needed, and measured against real resolution rates.",
    included: [
      "Retrieval grounded in your documentation",
      "Channel delivery: web, WhatsApp, Slack",
      "Human handoff and escalation rules",
      "Conversation analytics and quality scoring",
    ],
    image: "/services/chatbots.jpg",
  },
] as const;

export function getService(slug: ServiceSlug): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
