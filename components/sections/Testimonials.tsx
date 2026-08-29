import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

// Placeholder testimonials — swap for real client quotes before launch.
const TESTIMONIALS = [
  {
    quote:
      "Placeholder quote. Brilyx took our model from a notebook to a monitored service in weeks, and documented every part of it.",
    name: "Client name",
    role: "VP Engineering, Company",
  },
  {
    quote:
      "Placeholder quote. The automation they built removed a full day of manual work from our operations team each week.",
    name: "Client name",
    role: "Head of Operations, Company",
  },
  {
    quote:
      "Placeholder quote. Our support chatbot now resolves the majority of tickets before a human ever sees them.",
    name: "Client name",
    role: "Founder, Company",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Testimonials"
          title="Placeholder social proof"
          description="Real client quotes will land here after launch."
        />
      </Reveal>

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <StaggerItem key={item.role}>
            <figure className="flex h-full flex-col gap-6 rounded-xl border border-border bg-card p-6">
              <blockquote className="text-sm leading-relaxed text-foreground">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-muted-foreground"
                  aria-hidden
                >
                  {item.name.charAt(0)}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
