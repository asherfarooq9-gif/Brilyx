import type { ServiceSlug } from "@/lib/services";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceSection {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  ordered?: readonly string[];
}

export interface ServicePageSeo {
  title: string;
  description: string;
}

export interface ServicePageContent {
  seo: ServicePageSeo;
  intro: readonly string[];
  sections: readonly ServiceSection[];
  faqs: readonly ServiceFaq[];
  cta: {
    title: string;
    body: string;
  };
  relatedServiceSlugs: readonly ServiceSlug[];
}

export const SERVICE_PAGE_SEO: Record<ServiceSlug, ServicePageSeo> = {
  "ai-ml": {
    title: "Custom AI / ML Development Agency | Brilyx",
    description:
      "Production AI/ML from Brilyx: custom models, RAG, data pipelines, evals, and monitoring — so demos become systems your team can own and run.",
  },
  "app-development": {
    title: "Custom Mobile App Development Company | Brilyx",
    description:
      "Cross-platform mobile apps with a maintainable core, store-ready delivery, and analytics — Brilyx ships iOS/Android products, not throwaway prototypes.",
  },
  "web-development": {
    title: "Next.js Web Development Agency | Brilyx",
    description:
      "Fast, accessible Next.js and TypeScript sites for local businesses and product teams — App Router, performance-minded builds, clean codebase handover.",
  },
  "ai-automations": {
    title: "AI Automation Agency — Workflows & Ops | Brilyx",
    description:
      "AI workflow automation that cuts repetitive work: intake, follow-ups, document routing, and CRM handoff — fixed-scope builds for clinics and SMBs.",
  },
  chatbots: {
    title: "Chatbot Development Company — Web & WhatsApp | Brilyx",
    description:
      "Custom AI chatbots grounded in your content — web and WhatsApp assistants for clinics and local businesses, with human handoff and full build ownership.",
  },
};

export const SERVICE_PAGE_CONTENT: Record<ServiceSlug, ServicePageContent> = {
  "ai-ml": {
    seo: SERVICE_PAGE_SEO["ai-ml"],
    intro: [
      "Most AI projects do not fail because the model cannot answer a demo question. They stall because nobody owns evaluation, monitoring, data boundaries, or what happens after the prototype impresses the first meeting. Brilyx is a custom AI development agency built for that gap: we design, ship, and hand over production AI/ML systems your team can run — not slide decks and notebooks that expire when the contractor leaves.",
    ],
    sections: [
      {
        heading: "Who this is for",
        paragraphs: [
          "We work with three kinds of buyers who need more than a weekend chatbot demo:",
        ],
        bullets: [
          "Clinics and healthcare-adjacent operators who want assistants, triage helpers, or document workflows grounded in their own policies — without pretending a generic SaaS covers every edge case.",
          "Local and ops-heavy businesses that need classification, routing, forecasting, or content-grounded answers tied to real CRMs, calendars, and staff escalation.",
          "Product teams that already have a proof of concept and need an AI ML development company to harden it: eval harnesses, latency budgets, observability, and a maintainable codebase.",
        ],
      },
      {
        heading: "What we build as a custom AI development agency",
        paragraphs: [
          "Typical engagements land in one or more of these shapes:",
        ],
        bullets: [
          "RAG and LLM assistants grounded in your docs, SOPs, FAQs, and product knowledge — with citation patterns, refusal behavior, and human handoff when confidence is low.",
          "Classical ML and decision systems when structured prediction fits better than a chat UI: classification, ranking, ETA/risk-style models, and feature pipelines you can retrain.",
          "Agents and tool-using workflows that call your APIs, CRMs, calendars, or ticketing tools under explicit guardrails — not open-ended “do anything” agents.",
          "Data pipelines and feature stores so training and inference use the same definitions of “customer,” “appointment,” or “ticket.”",
          "Evals, monitoring, and feedback loops so quality is measured in production, not guessed from a happy-path demo.",
        ],
      },
      {
        heading: "How we take demos to production",
        ordered: [
          "Discovery & constraints — Map users, failure modes, data sources, privacy boundaries, and what “good” means in measurable terms (accuracy on a gold set, escalation rate, latency, cost per request).",
          "Scoped MVP — Ship a narrow vertical slice that solves one real workflow end-to-end: ingest → retrieve/infer → act or answer → log → escalate.",
          "Harden — Add evals, rate limits, auth, retries, fallbacks, red-team prompts for jailbreaks and unsafe advice, and operational runbooks.",
          "Monitor & hand over — Dashboards for quality and cost, alert hooks, documentation, and codebase ownership so your team is not locked to us.",
        ],
        paragraphs: [
          "Fixed-scope proposals are preferred when the problem is clear. If discovery shows the problem is still fuzzy, we say so early rather than burning budget on unbounded R&D.",
        ],
      },
      {
        heading: "Deliverables",
        bullets: [
          "Production-ready application code and infrastructure definitions (not a notebook-only delivery)",
          "Retrieval / model / pipeline components with configuration you can change",
          "Evaluation suite and baseline scores on an agreed gold set",
          "Logging, tracing, and basic quality/cost monitoring hooks",
          "Runbooks for common failures and escalation paths",
          "Handover session and written docs for your engineers or ops leads",
          "Optional retainer for iteration once the system is live",
        ],
      },
      {
        heading: "Stack & delivery",
        paragraphs: [
          "We are stack-pragmatic: Python services (FastAPI and similar), modern LLM/RAG stacks, classical ML where it fits, and product UIs when the assistant needs a surface (web, WhatsApp, or admin tools). Delivery is remote-first for clients worldwide. You own the code and the data boundaries we agree in writing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you build proofs of concept or production systems?",
        answer:
          "Both can exist, but we price and scope for production. A POC that never gets evals, monitoring, or an owner is the pattern we started Brilyx to avoid. If you only need a throwaway spike, we will say so and keep it small.",
      },
      {
        question: "Who owns the data and the model artifacts?",
        answer:
          "You do, within the contracts and third-party API terms we use. We do not treat your domain documents as training fodder for unrelated clients. Storage, retention, and deletion rules are part of discovery.",
      },
      {
        question: "How long does a scoped RAG assistant take?",
        answer:
          "Timelines depend on corpus quality, integrations, and languages. A narrow FAQ/RAG bot with one channel and a clear gold set is often weeks, not quarters. Messy documents, multiple systems of record, or regulated advice workflows take longer — we estimate after we see the data.",
      },
      {
        question: "Do you fine-tune models or mostly use APIs?",
        answer:
          "We use hosted APIs when they meet quality, cost, and privacy constraints. We fine-tune or train classical models when the domain needs it and you can support data and evaluation. The decision is written into the scope, not sold as a buzzword.",
      },
    ],
    cta: {
      title: "Start a scoped AI build",
      body: "Tell us what workflow should work in production — not just what the demo should say. We reply with questions that sharpen scope, then a fixed estimate when the problem is clear enough to ship.",
    },
    relatedServiceSlugs: ["ai-automations", "chatbots", "web-development", "app-development"],
  },

  "ai-automations": {
    seo: SERVICE_PAGE_SEO["ai-automations"],
    intro: [
      "Repetitive ops work rarely needs a science project. It needs clear triggers, reliable integrations, and guardrails when something looks wrong. Brilyx is an AI automation agency for clinics, local businesses, and product teams that want business process automation they own — intake, reminders, document routing, CRM updates, and WhatsApp handoff — without renting a black-box “AI ops” product forever.",
      "We build AI workflow automation as software: fixed-scope systems with logs, retries, and human escalation. If a no-code Zap can do the job safely, we will say so. If you need custom logic, language understanding, or multi-system orchestration, we build it.",
    ],
    sections: [
      {
        heading: "Workflows we automate",
        bullets: [
          "Intake and triage — Capture forms, emails, or chat; classify urgency or category; create the right ticket, lead, or appointment request.",
          "Reminders and follow-ups — Appointment, payment, or renewal nudges with quiet hours, language preferences, and stop rules.",
          "Document routing — File uploads, prescriptions-adjacent paperwork, invoices, or photos → extract fields → file in the right folder/CRM with exceptions for humans.",
          "CRM and staff handoff — Enrich records, assign owners, and escalate to WhatsApp or email when confidence drops or the customer asks for a person.",
          "Internal digests — Daily summaries of open loops for managers without forcing them to live in five dashboards.",
        ],
        paragraphs: [
          "We do not sell vague “AI that runs your business.” We sell named workflows with owners, SLAs, and failure modes you can read before you buy.",
        ],
      },
      {
        heading: "Clinics & local business examples",
        paragraphs: [
          "Clinic ops automation (custom, not a US EHR SaaS claim): new-patient FAQ deflection; appointment request intake; no-show reminder sequences; routing lab or insurance documents to the right staff queue; WhatsApp replies grounded in clinic policies with a clear “talk to reception” path.",
          "Local businesses: lead capture from web or WhatsApp → CRM; quote-request parsing; inventory or catalog questions with human review on pricing; after-hours capture that creates tomorrow’s worklist instead of losing the message.",
          "Product / internal teams: support ticket enrichment, content moderation queues, or ops bots that call your own APIs under rate limits.",
          "We do not claim HIPAA product certification or invent compliance badges. If your environment has regulatory constraints, we design for them explicitly in discovery — or we decline work we cannot support responsibly.",
        ],
      },
      {
        heading: "How a fixed-scope build works",
        ordered: [
          "Workflow map — List triggers, systems, happy path, and the five failure cases that matter (bad input, duplicate, timeout, ambiguous language, angry customer).",
          "Scope lock — One vertical slice: channels, data fields, escalation rules, and definition of done. No open-ended “automate everything.”",
          "Build & integrate — Connect APIs, webhooks, WhatsApp/Meta where relevant, and any AI steps (classification, extraction, drafting) behind validation.",
          "Shadow & ship — Run alongside staff where useful, compare outcomes, then cut over with monitoring and a rollback plan.",
          "Handover — Docs, credentials in your accounts, and optional retainer for new workflows.",
        ],
      },
      {
        heading: "Deliverables",
        bullets: [
          "Documented workflow map and decision rules",
          "Working automation services / workers with structured logs",
          "Integration connectors under your API keys and accounts where possible",
          "Human escalation paths (WhatsApp, email, ticket) with clear ownership",
          "Basic dashboards or exports for volume, failures, and handoff rate",
          "Runbooks for common exceptions",
          "Codebase and config handover",
        ],
      },
      {
        heading: "Integrations",
        paragraphs: [
          "We connect to the tools you already use when APIs or webhooks exist: CRMs, calendars, helpdesks, spreadsheets as a transitional source of truth, email, and WhatsApp Business / Meta Cloud API patterns. Prefer your tenant and your keys. If an integration is fragile or undocumented, we flag risk before build, not after.",
        ],
      },
      {
        heading: "Related services & honesty on proof",
        paragraphs: [
          "Brilyx ships production systems across AI, web, apps, and chat. The public Work index highlights web and app case studies (including SmartRide NEMT for ML-in-the-loop product work). We do not invent automation case metrics or fake logos. Ask on a call for relevant workflow examples and references appropriate to your industry.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this the same as buying a clinic AI receptionist SaaS?",
        answer:
          "No. Those products optimize for booking and voice at scale with their own roadmap. We are an AI automation agency that builds custom workflows around your tools, languages, and escalation rules — useful when off-the-shelf does not fit or you need ownership.",
      },
      {
        question: "What if we only need a simple reminder sequence?",
        answer:
          "We will say so. Simple sequences may belong in your existing CRM or a lightweight automation tool. We take projects where custom logic, AI extraction, multi-system orchestration, or WhatsApp policy grounding justify a software build.",
      },
      {
        question: "How do you keep automations from sending the wrong message?",
        answer:
          "Templates, allowlists, confidence thresholds, quiet hours, dry-run modes, and mandatory human review on high-risk categories. “Fully autonomous” is not the default for clinics and local businesses.",
      },
      {
        question: "Do we own the automation after launch?",
        answer:
          "Yes for the code and configs we deliver under the engagement terms. Third-party SaaS you plug into remains under those vendors’ terms. We prefer architectures you can keep running without us — retainers are optional, not a hostage model.",
      },
    ],
    cta: {
      title: "Map a workflow with us",
      body: "Bring one painful process (intake, reminders, routing, or handoff). We will tell you whether it is a two-week slice, a phased program, or something you should not automate yet.",
    },
    relatedServiceSlugs: ["chatbots", "ai-ml", "web-development", "app-development"],
  },

  chatbots: {
    seo: SERVICE_PAGE_SEO.chatbots,
    intro: [
      "Brilyx is a chatbot development company for teams that need assistants grounded in their content — not a rented white-label bot with someone else’s roadmap. We build web and WhatsApp chatbot experiences for clinics and local businesses, plus product teams that want a custom RAG assistant with human escalation and full ownership of the build.",
      "If you are shopping for a reseller dashboard to flip bots to clients, we are the wrong vendor. If you want software that answers from your policies, books or qualifies the right next step, and hands off to staff cleanly, keep reading.",
    ],
    sections: [
      {
        heading: "Web vs WhatsApp assistants",
        paragraphs: [
          "Web assistants sit on your site or app: product FAQs, onboarding help, internal knowledge for staff, or lead qualification before a form. They fit longer reading, richer UI (cards, links, authenticated sessions), and analytics you already have.",
          "WhatsApp chatbot development meets customers where they already message you. It works well for appointment questions, hours, pricing ranges, order status patterns, and after-hours capture — especially for clinics and local businesses in markets where WhatsApp is the default inbox. We design for Meta/WhatsApp Business patterns: templates where required, clear opt-in, and staff takeover in the same thread when a human should reply.",
          "Many engagements ship both channels sharing one knowledge layer so answers stay consistent.",
        ],
      },
      {
        heading: "Built for clinics & local businesses",
        paragraphs: [
          "Clinic chatbot patterns we implement carefully:",
        ],
        bullets: [
          "Answers grounded in your FAQs, prep instructions, and location/hours copy",
          "Appointment requests and reminder flows (with staff confirmation when booking systems require it)",
          "Escalation phrases that always reach reception",
          "Explicit refusal on medical advice the clinic does not want a bot to give",
        ],
      },
      {
        heading: "Custom vs off-the-shelf / white-label SaaS",
        paragraphs: [
          "Agency SERPs for “AI chatbot for business” are crowded with white-label SaaS aimed at resellers. Those tools optimize for speed-to-demo and monthly seats. Brilyx optimizes for ownership, grounding, escalation, and fit — clinic and SMB workflows, bilingual needs when scoped, and integrations to your CRM/calendar.",
          "Choose SaaS when you want self-serve configuration and vendor-hosted everything. Choose a chatbot development company when the bot is part of your product or operations stack and must evolve with you.",
        ],
      },
      {
        heading: "What’s included",
        bullets: [
          "Conversation design (intents, refusal rules, escalation triggers)",
          "RAG or FAQ retrieval over an agreed corpus",
          "Web widget and/or WhatsApp Business integration",
          "Admin path to update content without a full redeploy (when scoped)",
          "Logging for quality review and unanswered questions",
          "Handover docs and a training session for staff who will monitor the inbox",
          "Optional analytics events into your existing stack",
        ],
      },
      {
        heading: "Process",
        ordered: [
          "Goals & risk — Deflection topics, never-answer list, languages, channels, success metrics (e.g., handoff rate, unanswered rate — measured after launch, not promised as vanity numbers).",
          "Corpus & integrations — Clean source docs; connect booking/CRM if in scope.",
          "Build — Retrieval, prompts, UI/WhatsApp flows, auth if needed.",
          "Eval & soft launch — Gold-question set; staff shadowing; fix gaps.",
          "Operate — Monitoring, content update path, optional iteration retainer.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you build WhatsApp and web from one knowledge base?",
        answer:
          "Yes. That is the usual recommendation so answers do not drift between channels. Channel-specific tone and template rules still apply on WhatsApp.",
      },
      {
        question: "Will the bot invent answers?",
        answer:
          "We design for grounded responses and safe refusals. No stack eliminates hallucination entirely; evals, retrieval quality, and human handoff are how we manage risk. High-stakes clinical advice stays with staff.",
      },
      {
        question: "How is this different from buying a white-label chatbot platform?",
        answer:
          "You are hiring builders for a custom system and ownership model, not licensing a multi-tenant reseller product. Tradeoff: more upfront build discipline; less “change color and resell tomorrow.”",
      },
      {
        question: "What do you need from us to start?",
        answer:
          "A prioritized FAQ or document set, who handles escalations, which channel matters first, and examples of bad answers you never want. Booking/CRM API access if automation is in scope.",
      },
    ],
    cta: {
      title: "Start a chatbot build",
      body: "Share your channel priority (WhatsApp, web, or both) and the top ten questions customers already ask. Remote-first delivery worldwide — we do not invent a city headquarters to sound local.",
    },
    relatedServiceSlugs: ["ai-ml", "ai-automations", "web-development", "app-development"],
  },

  "app-development": {
    seo: SERVICE_PAGE_SEO["app-development"],
    intro: [
      "Native and cross-platform applications for iOS and Android, built around a clean architecture so features ship quickly without the codebase turning brittle.",
    ],
    sections: [
      {
        heading: "Cross-platform apps built for production",
        paragraphs: [
          "Brilyx works as a custom mobile app development company for clinics, local operators, and product teams that need iOS and Android from one maintainable core — not a throwaway prototype. We favor cross-platform app development (including Flutter when it fits the product, as on SmartRide NEMT) with a real backend, auth, and operational concerns baked in from the first scoped milestone.",
          "You get product software: navigation that matches the job to be done, role-aware screens (patient vs facility vs driver, staff vs customer), and APIs your web admin or partners can share. Native-only work is on the table when a platform capability demands it; we do not force a stack for blog optics.",
        ],
      },
      {
        heading: "Store release, analytics & offline/sync",
        paragraphs: [
          "Shipping to the App Store and Google Play is part of delivery, not a surprise week at the end. A typical production path includes:",
        ],
        bullets: [
          "Store listings, screenshots, and review-ready builds",
          "Versioning, crash reporting hooks, and release notes your team can maintain",
          "Analytics events for the funnels that matter (activation, booking, dispatch actions) — wired to tools you choose",
          "Offline / sync where field work needs it: queue local writes, conflict rules, and clear UX when the network returns",
          "Push notifications with consent and quiet-hour discipline where relevant",
        ],
      },
      {
        heading: "What we deliver",
        bullets: [
          "Cross-platform (or native) client codebase with a clear module layout",
          "Backend/API integration (we often pair with FastAPI or your existing services)",
          "Auth, roles, and environment configs (dev/staging/prod)",
          "Store submission support for the initial release",
          "Basic analytics and crash reporting integration",
          "Handover docs and a walkthrough for your engineers or a future vendor",
        ],
      },
      {
        heading: "How we ship",
        ordered: [
          "Product slice — One primary user journey end-to-end (not thirty half-built screens).",
          "Hardening — Auth, empty/error states, performance on mid-range devices, accessibility basics.",
          "Release — TestFlight / internal testing → store review → monitoring.",
          "Handover — Repo access, credentials in your accounts, backlog of next milestones.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you build Flutter, React Native, or native?",
        answer:
          "We pick based on team skills, timeline, and device needs. Flutter is a proven choice for us on multi-sided products like SmartRide; we will recommend native when platform depth outweighs shared UI.",
      },
      {
        question: "Can you take an existing app and harden it?",
        answer:
          "Yes, when the codebase is salvageable. Discovery includes a short technical read before we promise store-ready timelines.",
      },
      {
        question: "Do you handle App Store and Play Console accounts?",
        answer:
          "You should own the developer accounts. We guide setup, prepare builds, and support submission. We do not hold your store identity hostage.",
      },
      {
        question: "How do apps relate to your AI work?",
        answer:
          "Many products need both: mobile clients plus models or automations in the backend. We scope them as one system when that is the real product.",
      },
    ],
    cta: {
      title: "Scope a production mobile build",
      body: "Ready to ship iOS and Android with a maintainable core? Tell us the primary user journey and we will propose a fixed-scope first slice.",
    },
    relatedServiceSlugs: ["ai-ml", "ai-automations", "chatbots", "web-development"],
  },

  "web-development": {
    seo: SERVICE_PAGE_SEO["web-development"],
    intro: [
      "Marketing sites, dashboards, and full products built with Next.js, TypeScript, and a design system — optimized for Core Web Vitals and easy to hand back to your team.",
    ],
    sections: [
      {
        heading: "Next.js for local businesses and product teams",
        paragraphs: [
          "Brilyx is a Next.js web development agency for teams that want fast, accessible sites and product UIs on App Router and TypeScript — not a theme with plugins bolted on. We build marketing sites, enquiry-led business sites, and admin/product surfaces with performance and handover in mind.",
          "Engagements favor a clean codebase your engineers (or a future vendor) can extend: clear routes, reusable components, and documentation for content edits and deploys.",
        ],
      },
      {
        heading: "What we typically ship",
        bullets: [
          "Next.js App Router sites with TypeScript and a design system",
          "SEO foundations: metadata, sitemap, canonicals, structured data where useful",
          "Performance-minded builds (Core Web Vitals as a delivery concern, not a slide)",
          "Accessibility basics and responsive layouts",
          "CI/CD and preview deployments when scoped",
          "Content and deploy handover so you are not locked to us",
        ],
      },
      {
        heading: "How we work",
        ordered: [
          "Scope the pages and flows that matter for launch — not an unbounded redesign.",
          "Build on a maintainable component structure with real content, not lorem.",
          "Harden for performance, SEO metadata, and accessibility checks.",
          "Hand over repo access, env docs, and a short walkthrough.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you only use Next.js?",
        answer:
          "Next.js and TypeScript are our default for marketing and product web. If you already have a stack that fits, we can meet you there when it is the right engineering call.",
      },
      {
        question: "Can you redesign an existing site?",
        answer:
          "Yes. We prefer a scoped migration or rebuild with clear page inventory and SEO redirects rather than an open-ended visual-only refresh.",
      },
      {
        question: "Do you handle hosting?",
        answer:
          "We can set up modern hosting and previews under accounts you own. You keep the keys and the billing relationship.",
      },
      {
        question: "How does this connect to AI or chatbots?",
        answer:
          "Many sites need a grounded assistant or an automation behind a form. We scope web and AI together when that is the real product — see Chatbots and AI Automations.",
      },
    ],
    cta: {
      title: "Start a Next.js build",
      body: "Share the site type (marketing, enquiry, product UI) and any must-have pages. We reply with scope questions and a fixed estimate when the brief is clear.",
    },
    relatedServiceSlugs: ["app-development", "chatbots", "ai-automations", "ai-ml"],
  },
};

export function getServicePageContent(slug: ServiceSlug): ServicePageContent {
  return SERVICE_PAGE_CONTENT[slug];
}
