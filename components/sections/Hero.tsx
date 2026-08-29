"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";

const SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function Hero() {
  const prefersReduced = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  // Only run the WebGL scene while the hero is on screen — unmounting it when
  // scrolled away frees the GPU context and stops its render loop.
  const sceneInView = useInView(sceneRef, { margin: "300px 0px" });
  // The scene renders on mobile too, but display-only there — a coarse pointer gets
  // pointer-events:none so a touch-drag can't trap page scroll (see SplineScene).
  // Extra cost on phones (WebGL + CDN viewer) is accepted; load is idle-deferred and
  // the scene unmounts when scrolled away.
  const [isFinePointer, setIsFinePointer] = useState(false);
  const words = SITE.tagline.split(" ");

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setIsFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const entrance = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        };

  const showScene = sceneInView && !prefersReduced;

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:px-8">
      <Card className="relative w-full overflow-hidden rounded-2xl border-zinc-800 bg-zinc-950 shadow-[0_30px_80px_-40px_rgba(10,10,10,0.55)]">
        {!prefersReduced && (
          <Spotlight className="-top-40 left-0 md:-top-24 md:left-1/3" size={320} />
        )}

        <div className="flex flex-col md:min-h-[560px] md:flex-row">
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

          {/* Right: interactive 3D robot */}
          <div
            ref={sceneRef}
            className="relative h-[260px] w-full sm:h-[380px] md:h-auto md:flex-1"
          >
            <div
              className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_60%_45%,rgba(161,161,170,0.16),transparent_60%)]"
              aria-hidden
            >
              <span className="text-5xl opacity-40 sm:text-6xl">🤖</span>
            </div>

            {showScene ? (
              <>
                <SplineScene
                  scene={SPLINE_SCENE}
                  interactive={isFinePointer}
                  className="absolute inset-0 h-full w-full"
                />
                {/* Mask the "Built with Spline" badge corner. */}
                <span
                  className="pointer-events-none absolute bottom-0 right-0 z-10 h-12 w-40 bg-zinc-950"
                  aria-hidden
                />
              </>
            ) : null}
          </div>
        </div>
      </Card>
    </section>
  );
}
