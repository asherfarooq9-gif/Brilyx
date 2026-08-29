"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TEAM, getInitials } from "@/lib/team";
import { cn } from "@/lib/cn";

export function TeamCarousel() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(Math.floor(TEAM.length / 2));
  const listRef = useRef<HTMLDivElement>(null);

  const clamp = (n: number) => Math.max(0, Math.min(TEAM.length - 1, n));
  const go = (next: number) => setActive(clamp(next));

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
    }
  };

  const member = TEAM[active];
  const transition = prefersReduced
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            <span className="h-px w-6 bg-zinc-600" aria-hidden />
            The team
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            The people behind the work
          </h2>
          <p className="max-w-xl text-pretty text-sm text-zinc-400 sm:text-base">
            Pick a card to meet each engineer.
          </p>
        </div>

        {/* Fanned cards */}
        <div
          ref={listRef}
          role="tablist"
          aria-label="Team members"
          onKeyDown={onKeyDown}
          className="relative mx-auto mt-14 h-[420px] w-full max-w-xl sm:h-[500px]"
        >
          {TEAM.map((person, index) => {
            const offset = index - active;
            const isActive = index === active;
            const x = offset * 58;
            const y = Math.abs(offset) * 24;
            const rotate = offset * 7;
            const scale = isActive ? 1 : 0.9;

            return (
              <motion.button
                key={person.slug}
                type="button"
                role="tab"
                id={`team-tab-${person.slug}`}
                aria-selected={isActive}
                aria-controls="team-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "absolute left-1/2 top-0 h-[360px] w-[188px] origin-bottom overflow-hidden rounded-[26px] border border-white/10 outline-none sm:h-[440px] sm:w-[224px]",
                  "focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                  !isActive && "opacity-80",
                )}
                style={{ zIndex: 20 - Math.abs(offset) }}
                animate={{ x: `calc(-50% + ${x}px)`, y, rotate, scale }}
                transition={transition}
              >
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={`${person.name}, ${person.role}`}
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                ) : (
                  <span
                    className={cn("absolute inset-0 bg-gradient-to-b", person.gradient)}
                    aria-hidden
                  />
                )}
                <span
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent"
                  aria-hidden
                />
                {!person.photo && (
                  <span className="absolute inset-0 flex items-center justify-center text-5xl font-semibold text-white/90">
                    {getInitials(person.name)}
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-5 text-left">
                  <span className="text-base font-semibold text-white">{person.name}</span>
                  <span className="text-xs text-white/70">{person.role}</span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous member"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-30"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <div className="flex items-center gap-2">
            {TEAM.map((person, index) => (
              <button
                key={person.slug}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${person.name}`}
                aria-current={index === active}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === active ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === TEAM.length - 1}
            aria-label="Next member"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-30"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>

        {/* Active member info */}
        <div
          id="team-panel"
          role="tabpanel"
          aria-labelledby={`team-tab-${member.slug}`}
          className="mx-auto mt-12 max-w-xl text-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={member.slug}
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-zinc-400">{member.role}</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                {member.blurb}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
