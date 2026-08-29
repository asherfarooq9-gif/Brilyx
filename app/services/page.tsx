import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "AI/ML development, app development, web development, AI automations, and chatbots — delivered to production by the Brilyx team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-8 sm:px-6 sm:pt-28 lg:px-8">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title={
              <>
                Engineering across the <GradientText>full stack of intelligence</GradientText>
              </>
            }
            description="From model training to the interface your users touch — scoped as fixed engagements with clear deliverables."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <Stagger className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug} id={service.slug} className="h-full scroll-mt-24">
              <ServiceCard service={service} detailed />
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
