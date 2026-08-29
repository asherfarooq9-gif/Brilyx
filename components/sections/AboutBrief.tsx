import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

const STATS = [
  { value: "5", label: "Core capabilities" },
  { value: "100%", label: "Code handed back to you" },
  { value: "24/7", label: "Production monitoring" },
];

export function AboutBrief() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:px-8">
        <Reveal className="flex flex-col gap-5">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            About Brilyx
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A small team that ships production systems, not prototypes
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

        <Reveal className="grid grid-cols-3 gap-4 self-center" delay={0.1}>
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5"
            >
              <span className="text-2xl font-semibold text-foreground sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs leading-snug text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
