import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getCategoryLabel } from "@/lib/portfolio";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceImage } from "@/components/ui/ServiceImage";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/JsonLd";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return {};

  return buildMetadata({
    title: project.name,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();

  const categoryLabel = getCategoryLabel(project.category);
  const otherProjects = PROJECTS.filter((item) => item.slug !== project.slug).slice(0, 3);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    ...(project.client ? { about: project.client } : {}),
    ...(project.url ? { url: project.url } : {}),
    ...(project.year ? { dateCreated: String(project.year) } : {}),
  };

  return (
    <>
      <JsonLd data={projectJsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-20 pb-8 sm:px-6 sm:pt-28 lg:px-8">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow={categoryLabel}
            title={project.name}
            description={project.summary}
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="relative min-h-[260px] overflow-hidden rounded-xl border border-border">
            <ServiceImage
              src={project.image}
              alt={`Screenshot of the ${project.name} website`}
              sizes="(max-width: 1024px) 100vw, 640px"
              imageClassName="object-cover"
              fallback={
                <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted p-6 text-center font-display text-lg font-semibold text-muted-foreground">
                  {project.name}
                </span>
              }
            />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Discipline
              </span>
              <span className="text-sm text-foreground">{categoryLabel}</span>
            </div>

            {project.client ? (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Client
                </span>
                <span className="text-sm text-foreground">{project.client}</span>
              </div>
            ) : null}

            {project.tags.length > 0 ? (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Stack
                </span>
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.url ? (
              <Button href={project.url} external variant="outline" className="w-fit">
                Visit live site
              </Button>
            ) : (
              <span className="text-sm text-muted-foreground">In development — launching soon</span>
            )}
          </Reveal>
        </div>
      </section>

      {otherProjects.length > 0 ? (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading eyebrow="More work" title="Other projects" />
            </Reveal>
            <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((item) => (
                <StaggerItem key={item.slug} className="h-full">
                  <ProjectCard project={item} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <CtaBanner
        title="Want work like this?"
        description="Tell us what you're building. We'll scope it and show you where to start."
      />
    </>
  );
}
