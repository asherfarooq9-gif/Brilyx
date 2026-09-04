"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";

const SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function Hero() {
  const prefersReduced = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  // The scene mounts only while the hero is on screen and unmounts on scroll, so
  // the WebGL render loop and GPU context are freed once you scroll past.
  const sceneInView = useInView(sceneRef, { margin: "200px 0px" });
  // On a coarse pointer (touch) the scene is display-only — pointer-events:none so
  // a drag can't trap page scroll. Fine pointers get drag-to-rotate.
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
      <Card className="relative w-full overflow-hidden rounded-2xl shadow-sm">
        <div className="flex flex-col md:min-h-[520px] md:flex-row">
          {/* Left: name + tagline */}
          <div className="relative z-10 flex flex-1 flex-col justify-center gap-5 p-6 sm:gap-6 sm:p-12">
            <motion.span
              {...entrance(0)}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground sm:px-4 sm:text-xs sm:tracking-[0.18em]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" aria-hidden />
              {SITE.name} · Engineering studio
            </motion.span>

            <h1 className="max-w-xl text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl sm:leading-[1.05] lg:text-6xl">
              <span className="sr-only">AI/ML, web &amp; app development studio — </span>
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
              className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
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
              <Button href="/services" size="lg" variant="outline">
                Explore services
              </Button>
            </motion.div>
          </div>

          {/* Right: 3D robot (same on mobile and desktop) */}
          <div
            ref={sceneRef}
            className="relative h-[240px] w-full overflow-hidden sm:h-[340px] md:h-auto md:min-h-[520px] md:flex-1"
          >
            <div className="absolute inset-0 dot-grid opacity-[0.14]" aria-hidden />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_62%_42%,rgba(161,161,170,0.22),transparent_62%)]"
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
              <div className="relative flex h-32 w-32 items-center justify-center sm:h-44 sm:w-44">
                <span className="absolute inset-0 rounded-[36%] border border-border" />
                <span className="absolute inset-4 rounded-[36%] border border-border/60" />
                <span className="brand-text-gradient font-mono text-xl font-semibold tracking-tight sm:text-2xl">
                  AI
                </span>
              </div>
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
                  className="pointer-events-none absolute bottom-0 right-0 z-10 h-12 w-40 bg-card"
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
