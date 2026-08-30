import type { Metadata } from "next";
import { getProjectGroups } from "@/lib/portfolio";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientText } from "@/components/ui/GradientText";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = buildMetadata({
  title: "Our Work",
  description:
    "Websites, apps, AI automations, and chatbots Brilyx has designed and built — grouped by the kind of work.",
  path: "/work",
});

export default function WorkPage() {
  const groups = getProjectGroups();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-8 sm:px-6 sm:pt-28 lg:px-8">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Our Work"
            title={
              <>
                Work we&apos;ve <GradientText>put into the world</GradientText>
              </>
            }
            description="Grouped by discipline — websites, apps, AI automations, chatbots, and ML. Every project is a real product we designed, built, and handed back with documentation."
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
            <SectionHeading eyebrow={`${group.projects.length} project${group.projects.length === 1 ? "" : "s"}`} title={group.title} />
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
