"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TEAM, getInitials, type TeamMember } from "@/lib/team";
import { cn } from "@/lib/cn";

// Loose horizontal cluster on the photo canvas (desktop only), one per member —
// staggered heights + sizes, slightly overlapping, roughly centred.
const SLOTS = [
  { top: "40%", left: "0%", width: 150 },
  { top: "14%", left: "16%", width: 172 },
  { top: "0%", left: "39%", width: 192 },
  { top: "30%", left: "60%", width: 170 },
  { top: "56%", left: "31%", width: 166 },
] as const;

function Portrait({
  member,
  className,
  active = false,
}: {
  member: TeamMember;
  className?: string;
  active?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(member.photo) && !failed;

  return (
    <div className={cn("relative overflow-hidden rounded-[22px] bg-zinc-900", className)}>
      {showPhoto ? (
        <Image
          src={member.photo as string}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="260px"
          className={cn(
            "object-cover transition-[filter] duration-500",
            active ? "grayscale-0" : "grayscale",
          )}
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <span
            className={cn(
              "absolute inset-0 bg-gradient-to-b transition-[filter] duration-500",
              member.gradient,
              active ? "grayscale-0" : "grayscale",
            )}
            aria-hidden
          />
          <span className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-white/90">
            {getInitials(member.name)}
          </span>
        </>
      )}
    </div>
  );
}

/** Mobile row — colourises its portrait when it scrolls to the viewport centre. */
function MobileTeamPortrait({
  member,
  active,
  onEnter,
}: {
  member: TeamMember;
  active: boolean;
  onEnter: (slug: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(member.slug);
  }, [inView, member.slug, onEnter]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-xs">
      <Portrait member={member} active={active} className="aspect-[4/5] w-full shadow-lg" />
      <p className="mt-3 text-center text-sm font-medium text-foreground">
        {member.name}
        <span className="text-muted-foreground"> — {member.role}</span>
      </p>
    </div>
  );
}

export function TeamShowcase() {
  const prefersReduced = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState(TEAM[0].slug);

  return (
    <section className="overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-6 bg-accent" aria-hidden />
            The team
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The people behind the work
          </h2>
          <p className="max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
            Hover, tap, or scroll to bring a portrait into colour.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
          {/* Photo canvas (desktop) — every portrait shown at once */}
          <div className="relative hidden min-h-[560px] lg:block" aria-hidden>
            {TEAM.map((member, index) => {
              const slot = SLOTS[index % SLOTS.length];
              const isActive = member.slug === activeSlug;
              return (
                <motion.div
                  key={member.slug}
                  className="absolute"
                  style={{
                    top: slot.top,
                    left: slot.left,
                    width: slot.width,
                    zIndex: isActive ? 30 : 10 + index,
                  }}
                  initial={false}
                  animate={prefersReduced ? {} : { scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className={cn(
                      "absolute -top-3 left-2 z-10 flex items-center gap-1.5 rounded-full bg-background px-1.5 py-0.5 text-xs font-medium shadow-sm transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-3 w-4 rounded-full",
                        isActive ? "bg-foreground" : "bg-secondary",
                      )}
                    />
                    {member.name}
                  </span>
                  <Portrait
                    member={member}
                    active={isActive}
                    className={cn(
                      "aspect-[4/5] w-full transition-shadow duration-300",
                      isActive ? "shadow-2xl" : "shadow-lg",
                    )}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: vertical stack — each portrait colourises as it scrolls to centre */}
          <div className="flex flex-col gap-10 lg:hidden">
            {TEAM.map((member) => (
              <MobileTeamPortrait
                key={member.slug}
                member={member}
                active={member.slug === activeSlug}
                onEnter={setActiveSlug}
              />
            ))}
          </div>

          {/* Name list */}
          <ul className="flex flex-col">
            {TEAM.map((member) => {
              const isActive = member.slug === activeSlug;
              return (
                <li key={member.slug} className="border-b border-border last:border-0">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveSlug(member.slug)}
                    onFocus={() => setActiveSlug(member.slug)}
                    onClick={() => setActiveSlug(member.slug)}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex w-full items-center gap-4 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      className={cn(
                        "h-4 w-7 shrink-0 rounded-full transition-colors",
                        isActive
                          ? "bg-foreground"
                          : "bg-secondary group-hover:bg-muted-foreground/40",
                      )}
                      aria-hidden
                    />
                    <span className="flex flex-col">
                      <span
                        className={cn(
                          "text-xl font-semibold tracking-tight transition-colors sm:text-2xl",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        {member.name}
                      </span>
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                        {member.role}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
