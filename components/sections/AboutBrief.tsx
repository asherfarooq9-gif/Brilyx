import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

const POINTS = [
  "ML engineers paired with product builders on every project",
  "Every system ships with monitoring and documentation",
  "You leave with a codebase your own team can own",
];

export function AboutBrief() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <Reveal className="flex flex-col gap-5">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            About Brilyx
          </span>
          <h2 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
            A small team that ships production systems, not prototypes
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Brilyx pairs machine learning engineers with product builders. We take
            projects from a rough idea to a deployed, measured system, and we leave
            you with a codebase your own team can own.
          </p>
          <Link
            href="/about"
            className="inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Read our story
            <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>

        <Reveal className="flex flex-col gap-4 sm:border-l sm:border-border sm:pl-10" delay={0.1}>
          {POINTS.map((point) => (
            <div key={point} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden />
              <p className="text-sm leading-relaxed text-foreground">{point}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
