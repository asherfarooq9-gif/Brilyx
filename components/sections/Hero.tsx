"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SITE, whatsappUrl } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { VolumetricStudio } from "@/components/ui/volumetric-studio";

export function Hero() {
  const prefersReduced = useReducedMotion();
  const words = SITE.tagline.split(" ");

  // Drop the WebGL spotlight beams once the hero is off-screen — no point paying
  // the GPU/battery cost for a canvas nobody can see.
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "200px 0px" });

  const entrance = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <VolumetricStudio
        skipFlicker={!!prefersReduced}
        renderCanvas={isInView}
        className="min-h-[560px] sm:min-h-[720px] lg:min-h-[820px]"
      >
        <div className="flex h-full min-h-[560px] w-full flex-col items-center justify-center px-4 text-center sm:min-h-[720px] lg:min-h-[820px]">
          <motion.span
            {...entrance(1.3)}
            className="pointer-events-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/50 sm:px-4 sm:text-xs sm:tracking-[0.18em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden />
            {SITE.name} · Engineering studio
          </motion.span>

          <h1 className="mb-6 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
            {words.map((word, index) => (
              <motion.span key={`${word}-${index}`} className="mr-[0.25em] inline-block" {...entrance(1.5 + index * 0.08)}>
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            {...entrance(1.9)}
            className="mb-10 max-w-2xl text-pretty text-base font-medium leading-relaxed text-white/50 sm:text-lg"
          >
            {SITE.description}
          </motion.p>

          <motion.div
            {...entrance(2.1)}
            className="pointer-events-auto flex w-full flex-col gap-3 sm:w-auto sm:flex-row [&>*]:w-full sm:[&>*]:w-auto"
          >
            <Button href={whatsappUrl()} external size="lg" variant="secondary">
              Start a project
            </Button>
            <Button
              href="/services"
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              Explore services
            </Button>
          </motion.div>
        </div>
      </VolumetricStudio>
    </section>
  );
}
