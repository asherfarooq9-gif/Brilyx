"use client";

import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

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

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (delta < -40) go(active + 1);
    else if (delta > 40) go(active - 1);
  };

  const activeService = SERVICES[active];

  return (
    <section className="overflow-hidden bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-6 bg-accent" aria-hidden />
            What we do
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Five capabilities, one delivery team
          </h2>
          <p className="max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
            Previous, next, or tap a dot to see what each engagement covers.
          </p>
          <nav aria-label="All services" className="mt-2">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 sm:mt-14">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous service"
              className="rounded-lg bg-secondary px-4 py-2 font-medium text-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === SERVICES.length - 1}
              aria-label="Next service"
              className="rounded-lg bg-secondary px-4 py-2 font-medium text-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
            >
              Next
            </button>
          </div>

          <div
            role="tablist"
            aria-label="Services"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative touch-pan-y overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.button
                key={activeService.slug}
                type="button"
                role="tab"
                id={`service-tab-${activeService.slug}`}
                aria-selected
                aria-controls="service-panel"
                onClick={() => go(active)}
                initial={prefersReduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: prefersReduced ? 0 : 0.25 }}
                className="relative block h-64 w-full cursor-default overflow-hidden sm:h-80"
              >
                <ServiceImage
                  src={activeService.image}
                  alt={`${activeService.title} illustration`}
                  sizes="(max-width: 640px) 100vw, 42rem"
                  imageClassName="object-cover"
                  overlayClassName="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent"
                  fallback={
                    <>
                      <span
                        className={cn(
                          "absolute inset-0 bg-gradient-to-b",
                          CARD_GRADIENTS[active % CARD_GRADIENTS.length],
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
                <span className="relative flex h-full flex-col items-center justify-end gap-2 p-5">
                  <ServiceIcon slug={activeService.slug} className="size-6 text-white/90" />
                  <span className="text-center text-sm font-semibold leading-snug text-white">
                    {activeService.title}
                  </span>
                </span>
              </motion.button>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {SERVICES.map((service, index) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${service.title}`}
                aria-current={index === active}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full transition-colors",
                  index === active ? "bg-accent" : "bg-foreground/20 hover:bg-foreground/40",
                )}
              />
            ))}
          </div>
        </div>

        {/* Active service info */}
        <div
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`service-tab-${activeService.slug}`}
          className="mt-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.slug}
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                  <ServiceIcon slug={activeService.slug} className="size-5 text-foreground" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">{activeService.title}</h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {activeService.description}
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {activeService.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={`/services/${activeService.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
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
