"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { Card } from "@/components/ui/card";

export function Hero() {
  const prefersReduced = useReducedMotion();
  const words = SITE.tagline.split(" ");

  const entrance = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        };

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:px-8">
      <Card className="relative w-full overflow-hidden rounded-2xl border-zinc-800 bg-zinc-950 shadow-[0_30px_80px_-40px_rgba(10,10,10,0.55)]">
        <div className="flex flex-col md:min-h-[520px] md:flex-row">
          {/* Left: name + tagline */}
          <div className="relative z-10 flex flex-1 flex-col justify-center gap-5 p-6 sm:gap-6 sm:p-12">
            <motion.span
              {...entrance(0)}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-zinc-400 sm:px-4 sm:text-xs sm:tracking-[0.18em]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" aria-hidden />
              {SITE.name} · Engineering studio
            </motion.span>

            <h1 className="max-w-xl text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl sm:leading-[1.05] lg:text-6xl">
              {words.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  className="mr-[0.25em] inline-block"
                  {...entrance(0.1 + index * 0.06)}
                >
                  {index >= words.length - 1 ? <GradientText>{word}</GradientText> : word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...entrance(0.35)}
              className="max-w-md text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg"
            >
              We build AI/ML systems, applications, web platforms, automations, and
              chatbots — shipped to production with the monitoring and craft to keep them
              there.
            </motion.p>

            <motion.div
              {...entrance(0.45)}
              className="flex flex-col gap-3 sm:flex-row [&>*]:w-full sm:[&>*]:w-auto"
            >
              <Button href="/contact" size="lg" variant="secondary">
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

          {/* Right: static brand visual (no JS / WebGL) */}
          <div className="relative h-[220px] w-full overflow-hidden border-t border-zinc-800 sm:h-[320px] md:h-auto md:min-h-[520px] md:flex-1 md:border-l md:border-t-0">
            <div className="absolute inset-0 dot-grid opacity-[0.14]" aria-hidden />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(161,161,170,0.22),transparent_62%)]"
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
              <div className="relative flex h-40 w-40 items-center justify-center sm:h-56 sm:w-56">
                <span className="absolute inset-0 rounded-[36%] border border-white/10" />
                <span className="absolute inset-4 rounded-[36%] border border-white/10" />
                <span className="absolute inset-8 rounded-[36%] border border-white/[0.07]" />
                <span className="brand-text-gradient font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
                  AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
