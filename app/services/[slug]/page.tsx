import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getService, type ServiceSlug } from "@/lib/services";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getServicePageContent, SERVICE_PAGE_SEO } from "@/lib/service-page-content";
import { BLOG_POSTS } from "@/lib/blog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ServiceImage } from "@/components/ui/ServiceImage";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const SERVICE_SLUGS = new Set(SERVICES.map((service) => service.slug));

function isServiceSlug(slug: string): slug is ServiceSlug {
  return SERVICE_SLUGS.has(slug as ServiceSlug);
}

export function generateStaticParams(): { slug: ServiceSlug }[] {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};
  const seo = SERVICE_PAGE_SEO[slug];

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  const service = getService(slug);
  if (!service) notFound();

  const content = getServicePageContent(slug);
  const relatedServices = content.relatedServiceSlugs
    .map((relatedSlug) => getService(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: content.seo.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "Worldwide",
    url: `${SITE.url}/services/${service.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-20 pb-8 sm:px-6 sm:pt-28 lg:px-8">
        <Reveal>
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: service.title },
            ]}
          />
          <p className="mb-6 text-sm text-muted-foreground">
            <Link href="/services" className="font-medium text-foreground underline-offset-4 hover:underline">
              All services
            </Link>
          </p>
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
            description={content.intro[0]}
          />
        </Reveal>
        {content.intro.slice(1).map((paragraph) => (
          <Reveal key={paragraph.slice(0, 48)}>
            <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
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

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-14">
          {content.sections.map((section) => (
            <Reveal key={section.heading}>
              <div className="max-w-3xl">
                <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 64)}
                    className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-5 flex flex-col gap-3">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground sm:text-base">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.ordered ? (
                  <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-foreground sm:text-base">
                    {section.ordered.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            See related product work on{" "}
            <Link href="/work" className="font-medium text-foreground underline-offset-4 hover:underline">
              Work
            </Link>
            {slug === "ai-ml" || slug === "app-development" || slug === "chatbots" ? (
              <>
                , including{" "}
                <Link
                  href="/work"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  SmartRide NEMT
                </Link>
              </>
            ) : null}
            . How we think about demos vs products:{" "}
            <Link href="/about" className="font-medium text-foreground underline-offset-4 hover:underline">
              About
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Related services"
            title={
              <>
                Other disciplines on the <GradientText>same team</GradientText>
              </>
            }
            description="Fixed-scope builds across AI, apps, web, automations, and chat — one delivery team."
          />
        </Reveal>
        <Stagger className="mt-8 flex flex-wrap gap-3">
          {relatedServices.map((related) => (
            <StaggerItem key={related.slug}>
              <Link
                href={`/services/${related.slug}`}
                className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-transparent hover:bg-secondary"
              >
                {related.title}
              </Link>
            </StaggerItem>
          ))}
          <StaggerItem>
            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-transparent hover:bg-secondary"
            >
              All services
            </Link>
          </StaggerItem>
        </Stagger>
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title={`Questions about ${service.title}`} />
          </Reveal>
          <div className="mt-8 grid gap-4">
            {content.faqs.map((faq) => (
              <Reveal key={faq.question}>
                <details className="group rounded-xl border border-border bg-card px-5 py-4">
                  <summary className="cursor-pointer list-none text-base font-semibold text-foreground outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-ring">
                    <span className="flex items-start justify-between gap-4">
                      {faq.question}
                      <span className="text-muted-foreground transition-transform group-open:rotate-45" aria-hidden>
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      {(() => {
        const relatedPosts = BLOG_POSTS.filter((post) =>
          post.relatedServiceSlugs.includes(service.slug),
        ).slice(0, 3);
        if (relatedPosts.length === 0) return null;
        return (
          <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">From the blog</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-base font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              <Link href="/blog" className="font-medium text-foreground underline-offset-4 hover:underline">
                See all articles
              </Link>
            </p>
          </section>
        );
      })()}

      <CtaBanner
        title={content.cta.title}
        description={`${content.cta.body} Contact Brilyx, WhatsApp ${SITE.phone}, or email ${SITE.email}.`}
      />
    </>
  );
}
