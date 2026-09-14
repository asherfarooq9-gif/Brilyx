import { getFeaturedProjects, getCategoryLabel } from "@/lib/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import ScrollableCardStack from "@/components/ui/scrollable-card-stack";

export function WorkShowcase() {
  const projects = getFeaturedProjects();

  if (projects.length === 0) return null;

  const cards = projects.map((project) => ({
    id: project.slug,
    name: project.name,
    category: getCategoryLabel(project.category),
    badge: project.name.charAt(0).toUpperCase(),
    image: project.image,
    href: `/work/${project.slug}`,
  }));

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
            description="A selection of the websites and applications we've designed and built for clients. Scroll, swipe, or use the arrow keys."
          />
        </Reveal>

        <Reveal className="mt-12" delay={0.05}>
          <ScrollableCardStack cardHeight={300} perspective={1200} transitionDuration={200} items={cards} />
        </Reveal>

        <Reveal className="mt-10 flex justify-center" delay={0.1}>
          <Button href="/work" variant="outline">
            See all work
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
