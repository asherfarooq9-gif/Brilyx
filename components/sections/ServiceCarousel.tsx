"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { cn } from "@/lib/cn";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ServiceImage } from "@/components/ui/ServiceImage";

const CARD_GRADIENTS = [
  "from-zinc-600 to-zinc-900",
  "from-zinc-500 to-zinc-800",
  "from-zinc-700 to-zinc-950",
  "from-zinc-600 to-zinc-950",
  "from-zinc-500 to-zinc-900",
];

export function ServiceCarousel() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(Math.floor(SERVICES.length / 2));
  const [wide, setWide] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const clamp = (n: number) => Math.max(0, Math.min(SERVICES.length - 1, n));
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

  const activeService = SERVICES[active];
  const transition = prefersReduced
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="overflow-hidden bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            <span className="h-px w-6 bg-zinc-600" aria-hidden />
            What we do
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Five capabilities, one delivery team
          </h2>
          <p className="max-w-xl text-pretty text-sm text-zinc-400 sm:text-base">
            Pick a card to see what each engagement covers.
          </p>
        </div>

        {/* Fanned cards */}
        <div
          ref={listRef}
          role="tablist"
          aria-label="Services"
          onKeyDown={onKeyDown}
          className="relative mx-auto mt-12 h-[340px] w-full max-w-xl sm:mt-14 sm:h-[500px]"
        >
          {SERVICES.map((service, index) => {
            const offset = index - active;
            const isActive = index === active;
            const spread = wide ? 58 : 34;
            const x = offset * spread;
            const y = Math.abs(offset) * (wide ? 24 : 16);
            const rotate = offset * (wide ? 7 : 5);
            const scale = isActive ? 1 : 0.9;

            return (
              <motion.button
                key={service.slug}
                type="button"
                role="tab"
                id={`service-tab-${service.slug}`}
                aria-selected={isActive}
                aria-controls="service-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(index)}
                className={cn(
                  "absolute left-1/2 top-0 h-[280px] w-[150px] origin-bottom overflow-hidden rounded-[22px] border border-white/10 outline-none sm:h-[440px] sm:w-[224px] sm:rounded-[26px]",
                  "focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                  !isActive && "brightness-[0.62] saturate-[0.85]",
                )}
                style={{ zIndex: 20 - Math.abs(offset) }}
                animate={{ x: `calc(-50% + ${x}px)`, y, rotate, scale }}
                transition={transition}
              >
                <ServiceImage
                  src={service.image}
                  alt=""
                  sizes="(max-width: 640px) 150px, 224px"
                  imageClassName="object-cover"
                  overlayClassName="absolute inset-0 bg-black/45"
                  fallback={
                    <>
                      <span
                        className={cn(
                          "absolute inset-0 bg-gradient-to-b",
                          CARD_GRADIENTS[index % CARD_GRADIENTS.length],
                        )}
                        aria-hidden
                      />
                      <span
                        className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:16px_16px]"
                        aria-hidden
                      />
                    </>
                  }
                />
                <span className="relative flex h-full flex-col items-center justify-between p-6">
                  <ServiceIcon slug={service.slug} className="size-7 text-white/90" />
                  <span className="text-center text-sm font-semibold leading-snug text-white">
                    {service.title}
                  </span>
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
            aria-label="Previous service"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-30"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <div className="flex items-center gap-2">
            {SERVICES.map((service, index) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${service.title}`}
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
            disabled={active === SERVICES.length - 1}
            aria-label="Next service"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-30"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>

        {/* Active service info */}
        <div
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`service-tab-${activeService.slug}`}
          className="mx-auto mt-12 max-w-2xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.slug}
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                  <ServiceIcon slug={activeService.slug} className="size-5 text-white" />
                </span>
                <h3 className="text-lg font-semibold text-white">{activeService.title}</h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {activeService.description}
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {activeService.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={`/services#${activeService.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                Full details
                <span aria-hidden>&rarr;</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
