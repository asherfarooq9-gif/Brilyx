import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/ui/hero";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ServiceImage } from "@/components/ui/ServiceImage";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "AI, Web & App Development Services | Brilyx",
  description:
    "AI/ML, mobile apps, Next.js sites, AI automations, and custom chatbots — five disciplines, one team, fixed-scope builds shipped to production.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services" },
          ]}
        />
      </div>
      <Hero
        title="Engineering across the full stack of intelligence."
        subtitle="From model training to the interface your users touch — scoped as fixed engagements with clear deliverables."
        actions={[
          { label: "Start a project", href: whatsappUrl(), variant: "secondary" },
          { label: "See our work", href: "/work", variant: "outline" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className={cn(
                  "group grid items-center gap-8 border-t border-border py-12 first:border-t-0 md:grid-cols-2 md:gap-12 lg:gap-16",
                  index % 2 === 1 && "md:[&>*:first-child]:order-2",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
                  <ServiceImage
                    src={service.image}
                    alt={`${service.title} illustration`}
                    sizes="(max-width: 768px) 100vw, 560px"
                    imageClassName="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    fallback={<span className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                    <ServiceIcon slug={service.slug} />
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {service.included.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground">
                    Full details
                    <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Not sure which one you need?"
        description="Describe the outcome you're after. We'll tell you what it takes and where to start."
      />
    </>
  );
}
