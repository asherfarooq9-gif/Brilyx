export const SITE = {
  name: "Brilyx",
  tagline: "Engineering Intelligence. Building Tomorrow.",
  description:
    "Brilyx is an engineering studio building AI/ML systems, applications, web platforms, automations, and chatbots for teams that want to ship faster.",
  url: "https://brilyx.com",
  email: "hello@brilyx.com",
  locale: "en_US",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export interface SocialLink {
  label: string;
  href: string;
}

// Placeholder URLs — replace with the real profiles before launch.
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "GitHub", href: "https://github.com/asherfarooq9-gif" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/brilyx" },
  { label: "X", href: "https://x.com/brilyx" },
] as const;
