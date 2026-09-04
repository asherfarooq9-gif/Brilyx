import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE, SOCIAL_LINKS, whatsappUrl } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Start an AI, Web or App Project",
  description:
    "Tell Brilyx what you're building and we'll reply within two business days with a scope, a timeline, and a fixed estimate for your project.",
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
          description="Message us on WhatsApp and we'll reply within two business days."
        />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-8">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </span>
          <h3 className="text-lg font-semibold text-foreground">Chat with us on WhatsApp</h3>
          <p className="text-sm text-muted-foreground">
            Tell us what you&apos;re building and we&apos;ll reply within two business days with
            a scope, a timeline, and a fixed estimate.
          </p>
          <Button href={whatsappUrl()} external size="lg">
            Start a project
          </Button>
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
              Phone &amp; WhatsApp
            </span>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-foreground underline-offset-4 hover:underline"
            >
              {SITE.phone}
            </a>
            <a
              href={`tel:${SITE.phoneE164}`}
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Call {SITE.phoneE164}
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
