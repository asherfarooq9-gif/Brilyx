import type { Metadata } from "next";
import { PROJECTS } from "@/lib/portfolio";
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
    "Websites and applications Brilyx has designed and built — storefronts, dashboards, and marketing sites.",
  path: "/work",
});

export default function WorkPage() {
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
            description="Every project below is a real product we designed, built, and handed back with documentation."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBanner
        title="Want work like this?"
        description="Tell us what you're building. We'll scope it and show you where to start."
      />
    </>
  );
}
