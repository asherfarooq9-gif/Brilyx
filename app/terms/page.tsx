import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use | Brilyx",
  description:
    "Terms for using the Brilyx website and engaging Brilyx for software, AI, and web development services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />
      </div>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Terms of Use</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: 17 September 2026</p>
        <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
          <p>
            By using {SITE.url}, you agree to these terms. Project work is governed by a separate written proposal
            or contract when one is signed.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Website content</h2>
          <p>
            Site content is for general information. We aim for accuracy but do not warrant that every description
            is complete or current. Portfolio examples describe real engagements without inventing performance metrics.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Services</h2>
          <p>
            Statements on this site about process, stack, or timelines are illustrative. Binding scope, fees, IP,
            and delivery terms are only those in an agreed statement of work.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Acceptable use</h2>
          <p>
            Do not misuse the site (scraping that degrades service, attempting unauthorized access, or submitting
            malicious content). We may block abusive traffic.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Limitation</h2>
          <p>
            To the fullest extent permitted by law, {SITE.name} is not liable for indirect or consequential damages
            arising from use of this website. Client engagements may set different liability terms in writing.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>
            {SITE.email} · WhatsApp {SITE.phone}.
          </p>
        </div>
      </article>
    </>
  );
}
