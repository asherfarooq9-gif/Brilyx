import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Hero } from "@/components/ui/hero";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "AI, Web & App Development Services",
  description:
    "AI/ML development, app development, web development, AI automations, and chatbots — five disciplines, one delivery team, fixed-scope engagements.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Engineering across the full stack of intelligence."
        subtitle="From model training to the interface your users touch — scoped as fixed engagements with clear deliverables."
        actions={[
          { label: "Start a project", href: whatsappUrl(), variant: "secondary" },
          { label: "See our work", href: "/work", variant: "outline" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Stagger className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard service={service} href={`/services/${service.slug}`} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBanner
        title="Not sure which one you need?"
        description="Describe the outcome you're after. We'll tell you what it takes and where to start."
      />
    </>
  );
}
