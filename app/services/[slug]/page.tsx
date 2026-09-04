import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, type ServiceSlug } from "@/lib/services";
import { PROJECTS } from "@/lib/portfolio";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ServiceImage } from "@/components/ui/ServiceImage";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/JsonLd";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: ServiceSlug }[] {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.short,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) notFound();

  const relatedProjects = PROJECTS.filter((project) => project.category === service.slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "Worldwide",
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-20 pb-8 sm:px-6 sm:pt-28 lg:px-8">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title={
              <>
                <ServiceIcon
                  slug={service.slug}
                  className="mb-3 inline-flex size-8 text-accent"
                />
                <br />
                {service.title}
              </>
            }
            description={service.description}
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <ul className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="relative min-h-[220px] overflow-hidden rounded-xl">
            <ServiceImage
              src={service.image}
              alt={`${service.title} illustration`}
              sizes="(max-width: 1024px) 100vw, 460px"
              imageClassName="object-cover"
              fallback={
                <span className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
              }
            />
          </Reveal>
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow="Related work"
                title={
                  <>
                    <GradientText>{service.title}</GradientText> we&apos;ve shipped
                  </>
                }
              />
            </Reveal>
            <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <StaggerItem key={project.slug} className="h-full">
                  <ProjectCard project={project} showCategory={false} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <CtaBanner
        title={`Need ${service.title}?`}
        description="Describe the outcome you're after. We'll tell you what it takes and where to start."
      />
    </>
  );
}
