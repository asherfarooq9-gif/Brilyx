import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Brilyx",
  description:
    "How Brilyx collects, uses, and protects information when you visit www.brilyx.com or contact us about a project.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy" }]} />
      </div>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: 17 September 2026</p>
        <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
          <p>
            This policy explains how {SITE.name} (&quot;we&quot;, &quot;us&quot;) handles information when you use{" "}
            <a className="font-medium text-foreground underline-offset-4 hover:underline" href={SITE.url}>{SITE.url}</a>{" "}
            or contact us by email, WhatsApp, or the contact form.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Information we collect</h2>
          <p>
            We may collect your name, email address, phone number, company name, and project details when you
            message us. Server logs may include IP address, user agent, and pages requested. We do not sell personal data.
          </p>
          <h2 className="text-xl font-semibold text-foreground">How we use information</h2>
          <p>
            We use contact details to reply to inquiries, prepare proposals, deliver contracted work, and improve
            the website. Analytics tools, if enabled, help us understand aggregate traffic — not to sell ads against your identity.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Sharing</h2>
          <p>
            We use processors such as hosting (Vercel), email, and messaging providers to operate the site and
            communicate with you. They process data under their own terms. We share client project data only as needed to deliver the engagement.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Retention &amp; rights</h2>
          <p>
            Inquiry messages are kept as long as needed for sales and delivery records. You may email{" "}
            <a className="font-medium text-foreground underline-offset-4 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
            to request access, correction, or deletion of personal data we hold about you, subject to legal obligations.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>
            Questions about this policy: {SITE.email} · WhatsApp {SITE.phone}.
          </p>
        </div>
      </article>
    </>
  );
}
