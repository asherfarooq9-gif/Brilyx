import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { TEAM } from "@/lib/team";
import { TeamAvatar } from "@/components/ui/TeamAvatar";

export const metadata: Metadata = buildMetadata({
  title: "About Brilyx: Engineering Studio & Team",
  description:
    "Brilyx pairs machine learning engineers with product builders to ship production systems, not demos. Remote-first from Pakistan, working with clients worldwide. Meet the team and how we work.",
  path: "/about",
});

const STORY = [
  {
    label: "The pattern",
    body: "We kept getting called in to rescue machine learning projects that had lost momentum right after the first demo.",
  },
  {
    label: "The gap",
    body: "It was always the same story: no evaluation, no monitoring, no clear owner once the prototype worked.",
  },
  {
    label: "The fix",
    body: "So we built a studio that treats deployment, observability, and handover as part of the work, not an afterthought.",
  },
];

const VALUES = [
  {
    title: "Production or nothing",
    body: "A model in a notebook isn't done. We measure success by what runs, monitored, in front of real users.",
  },
  {
    title: "Own your code",
    body: "Every engagement ends with documentation and a handover. No lock-in, no mystery infrastructure.",
  },
  {
    title: "Scope honestly",
    body: "We'd rather tell you something is a bad idea early than bill you to discover it later.",
  },
  {
    title: "Small teams, tight loops",
    body: "Few people, direct communication, short iterations. You talk to the people building your system.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
                <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "About" },
          ]}
        />
      </div>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-12 sm:px-6 sm:pt-28 lg:px-8">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="We started Brilyx to close the gap between a demo and a product"
            description="Too many AI projects stall after the proof of concept. Brilyx exists to carry them the rest of the way: into production, with monitoring, and back into your team's hands."
          />
        </Reveal>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Our story</h2>
            <ul className="flex flex-col gap-4">
              {STORY.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">{item.label}.</span> {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="flex flex-col gap-4" delay={0.1}>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Our mission</h2>
            <p className="rounded-xl border border-border bg-card p-6 text-base leading-relaxed text-foreground">
              To help teams put intelligent systems into production responsibly, and to
              leave every client more capable than we found them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <SectionHeading title="How we work" />
        </Reveal>
        <Stagger className="mt-10 grid gap-x-10 gap-y-8 border-t border-border pt-8 sm:grid-cols-2">
          {VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <div className="flex gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden />
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{value.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Team"
              title="The people behind the work"
              description="Engineers who take projects from a rough idea to a deployed, measured system."
            />
          </Reveal>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <StaggerItem key={member.slug}>
                <div className="group flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-foreground/20">
                  <TeamAvatar member={member} className="h-16 w-16" />
                  <span className="text-sm font-semibold text-foreground">{member.name}</span>
                  <span className="text-xs text-muted-foreground">{member.role}</span>
                  <p className="text-xs leading-relaxed text-muted-foreground">{member.blurb}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Where we work</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Brilyx is remote-first, based in Pakistan, and delivers for clients internationally.
            Same-day overlap with South Asia and flexible hours for US, UK, EU, and Middle East teams.
            We do not lock you into a black-box platform — you own the codebase.
          </p>
        </Reveal>
      </section>

      <CtaBanner />
    </>
  );
}
