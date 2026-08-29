"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TEAM, getInitials, type TeamMember } from "@/lib/team";
import { cn } from "@/lib/cn";

// Preset scattered slots on the photo canvas (desktop only), one per member.
const SLOTS = [
  { top: "0%", left: "4%", width: 210, rotate: -4 },
  { top: "24%", left: "40%", width: 250, rotate: 3 },
  { top: "6%", left: "70%", width: 200, rotate: -3 },
  { top: "52%", left: "14%", width: 220, rotate: 5 },
  { top: "46%", left: "62%", width: 205, rotate: -6 },
] as const;

function Portrait({ member, className }: { member: TeamMember; className?: string }) {
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
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <span
            className={cn("absolute inset-0 bg-gradient-to-b", member.gradient)}
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

export function TeamShowcase() {
  const prefersReduced = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState(TEAM[0].slug);
  const activeMember = TEAM.find((m) => m.slug === activeSlug) ?? TEAM[0];

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
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          {/* Photo canvas (desktop) */}
          <div className="relative hidden min-h-[520px] lg:block" aria-hidden>
            {TEAM.map((member, index) => {
              const slot = SLOTS[index % SLOTS.length];
              const isActive = member.slug === activeSlug;
              return (
                <motion.div
                  key={member.slug}
                  className="absolute"
                  style={{ top: slot.top, left: slot.left, width: slot.width }}
                  initial={false}
                  animate={
                    prefersReduced
                      ? { opacity: isActive ? 1 : 0 }
                      : {
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0.92,
                          rotate: isActive ? slot.rotate : slot.rotate - 2,
                        }
                  }
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Portrait member={member} className="aspect-[4/5] w-full shadow-xl" />
                  <span className="mt-2 block text-sm font-medium text-foreground">
                    {member.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: single active portrait */}
          <div className="lg:hidden">
            <Portrait
              member={activeMember}
              className="mx-auto aspect-[4/5] w-56 shadow-lg"
            />
            <p className="mt-3 text-center text-sm font-medium text-foreground">
              {activeMember.name} — {activeMember.role}
            </p>
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
                        isActive ? "bg-foreground" : "bg-secondary group-hover:bg-muted-foreground/40",
                      )}
                      aria-hidden
                    />
                    <span className="flex flex-col">
                      <span
                        className={cn(
                          "text-xl font-semibold tracking-tight transition-colors sm:text-2xl",
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
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
