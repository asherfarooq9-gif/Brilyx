import { SERVICES } from "@/lib/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function ServiceHighlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="What we do"
          title="Five capabilities, one delivery team"
          description="Each engagement is scoped, estimated, and handed back with documentation — no black boxes."
        />
      </Reveal>

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <StaggerItem key={service.slug} className="h-full">
            <ServiceCard service={service} href={`/services#${service.slug}`} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
