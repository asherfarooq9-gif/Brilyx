import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { GradientText } from "@/components/ui/GradientText";

export function AboutBrief() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            About Brilyx
          </span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <GradientText>A small team that ships production systems, not prototypes</GradientText>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Brilyx pairs machine learning engineers with product builders. We take
            projects from a rough idea to a deployed, measured system — and we leave
            you with a codebase your own team can own.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Read our story
            <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
