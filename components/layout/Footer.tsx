import Link from "next/link";
import { NAV_LINKS, SITE, SOCIAL_LINKS, whatsappUrl } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-md brand-gradient text-sm font-bold text-white">
              B
            </span>
            <span className="text-lg">{SITE.name}</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {SITE.tagline}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            {SITE.email}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            WhatsApp {SITE.phone}
          </a>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Pages
          </span>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Services" className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Services
          </span>
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {service.title}
            </Link>
          ))}
        </nav>

        <nav aria-label="Social links" className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Elsewhere
          </span>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>
            &copy; {year} {SITE.name}. All rights reserved.
          </span>
          <span className="flex flex-wrap items-center gap-3">
            <Link href="/privacy" className="hover:text-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="/blog" className="hover:text-foreground hover:underline underline-offset-4">
              Blog
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
