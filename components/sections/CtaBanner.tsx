import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

interface CtaBannerProps {
  title?: string;
  description?: string;
}

export function CtaBanner({
  title = "Have a project in mind?",
  description = "Tell us what you're building. We'll come back with a scope, a timeline, and a fixed estimate.",
}: CtaBannerProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <Reveal className="relative overflow-hidden rounded-2xl border border-border bg-primary px-6 py-14 text-center sm:px-12">
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full brand-gradient opacity-30 blur-2xl"
          aria-hidden
        />
        <h2 className="relative text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
          {description}
        </p>
        <div className="relative mt-8 flex justify-center">
          <Button href="/contact" size="lg" variant="secondary">
            Start a project
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
