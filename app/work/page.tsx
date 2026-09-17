import type { Metadata } from "next";
import { getProjectGroups, PROJECTS, getCategoryLabel } from "@/lib/portfolio";
import { buildMetadata } from "@/lib/seo";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroCarousel, type HeroCarouselItem } from "@/components/ui/hero-carousel";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SITE } from "@/lib/site";

const ACCENTS = ["#3b4a6b", "#2f6b5e", "#6b4a2f", "#4a3b6b"];

const HERO_ITEMS: HeroCarouselItem[] = PROJECTS.map((project, i) => ({
  id: project.slug,
  title: project.name.replace(/ (?=[^ ]*$)/, "\n"),
  image: project.image,
  credit: project.client ? `BY ${project.client.toUpperCase()}` : undefined,
  meta: [
    getCategoryLabel(project.category).toUpperCase(),
    project.status === "in-progress" ? "IN PROGRESS" : "LIVE",
  ],
  accent: ACCENTS[i % ACCENTS.length],
  href: `/work/${project.slug}`,
}));

export const metadata: Metadata = buildMetadata({
  title: "Web, App & AI Case Studies | Brilyx",
  description:
    "Case studies from Brilyx — marketing sites, mobile apps, and AI systems for clinics and local businesses, grouped by discipline.",
  path: "/work",
});

export default function WorkPage() {
  const groups = getProjectGroups();

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
                <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Work" },
          ]}
        />
      </div>
      <h1 className="sr-only">Work we&apos;ve put into the world</h1>
      <HeroCarousel items={HERO_ITEMS} brand={SITE.name} className="h-[85vh] min-h-[520px]" />

      <section className="mx-auto max-w-6xl px-4 pt-16 pb-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Work"
            title="Every discipline, one team"
            description="Grouped by discipline: websites, apps, AI automations, chatbots, and ML. Every project is a real product we designed, built, and handed back with documentation."
          />
        </Reveal>
      </section>

      {groups.map((group) => (
        <section
          key={group.slug}
          id={group.slug}
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8"
        >
          <Reveal>
            <SectionHeading title={group.title} />
          </Reveal>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.projects.map((project) => (
              <StaggerItem key={project.slug} className="h-full">
                <ProjectCard project={project} showCategory={false} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ))}

      <div className="pt-8">
        <CtaBanner
          title="Want work like this?"
          description="Tell us what you're building. We'll scope it and show you where to start."
        />
      </div>
    </>
  );
}
