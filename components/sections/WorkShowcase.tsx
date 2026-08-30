import { getFeaturedProjects } from "@/lib/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientText } from "@/components/ui/GradientText";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function WorkShowcase() {
  const projects = getFeaturedProjects();

  if (projects.length === 0) return null;

  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Work"
            title={
              <>
                Sites and products we&apos;ve <GradientText>shipped</GradientText>
              </>
            }
            description="A selection of the websites and applications we've designed and built for clients."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10" delay={0.1}>
          <Button href="/work" variant="outline">
            See all work
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
