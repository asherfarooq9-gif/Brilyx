export const SITE = {
  name: "Brilyx",
  tagline: "Engineering Intelligence. Building Tomorrow.",
  description:
    "Brilyx is an engineering studio building AI/ML systems, applications, web platforms, automations, and chatbots for teams that want to ship faster.",
  url: "https://brilyx.com",
  email: "brilyx.0@gmail.com",
  /** Local display format. */
  phone: "0339 5224149",
  /** E.164 for `tel:` links and structured data. */
  phoneE164: "+923395224149",
  /** Digits only, country code first — for wa.me links. */
  whatsappNumber: "923395224149",
  /** Prefilled text for WhatsApp deep links. */
  whatsappMessage: "Hi Brilyx, I saw your website and I'd like to discuss a project.",
  locale: "en_US",
} as const;

/** Build a WhatsApp click-to-chat URL with a prefilled message. */
export function whatsappUrl(message: string = SITE.whatsappMessage): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

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
