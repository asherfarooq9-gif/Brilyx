import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE, SOCIAL_LINKS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Tell Brilyx what you're building. We'll come back with a scope, a timeline, and a fixed estimate.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 lg:px-8">
      <Reveal>
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s talk about <GradientText>what you&apos;re building</GradientText>
            </>
          }
          description="Send a few details and we'll reply within two business days."
        />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Email
            </span>
            <a
              href={`mailto:${SITE.email}`}
              className="text-lg font-medium text-foreground underline-offset-4 hover:underline"
            >
              {SITE.email}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Social
            </span>
            <ul className="flex flex-col gap-1.5">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Where we are
            </span>
            <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary/50 dot-grid">
              <span className="rounded-md bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur">
                Remote-first · working worldwide
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
