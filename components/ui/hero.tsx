"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

interface HeroAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  actions?: HeroAction[];
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
}

/** Dark "lamp" spotlight hero — a conic-gradient beam over a black backdrop. */
const Hero = React.forwardRef<HTMLElement, HeroProps>(
  ({ className, title, subtitle, actions, titleClassName, subtitleClassName, actionsClassName, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative z-0 flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-black sm:min-h-[70vh]",
          className,
        )}
        {...props}
      >
        <div className="absolute top-0 isolate z-0 flex w-full flex-1 items-start justify-center">
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-white/60 opacity-80 blur-3xl" />

          <motion.div
            initial={{ width: "8rem" }}
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
            whileInView={{ width: "16rem" }}
            className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-white/60 blur-2xl"
          />

          <motion.div
            initial={{ width: "15rem" }}
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
            whileInView={{ width: "30rem" }}
            className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-white/60"
          />

          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            style={{ backgroundImage: "conic-gradient(from 70deg at center top, rgba(255,255,255,0.6), transparent, transparent)" }}
            className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible"
          >
            <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-black [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-black [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            style={{ backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, rgba(255,255,255,0.6))" }}
            className="absolute inset-auto left-1/2 h-56 w-[30rem]"
          >
            <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-black [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-black [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 60, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="relative z-50 flex w-full flex-1 flex-col justify-center gap-4 px-5 -translate-y-10 md:px-10"
        >
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className={cn("text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl", titleClassName)}>
              {title}
            </h1>
            {subtitle && (
              <p className={cn("text-lg text-white/50 md:text-xl", subtitleClassName)}>{subtitle}</p>
            )}
            {actions && actions.length > 0 && (
              <div className={cn("flex gap-4", actionsClassName)}>
                {actions.map((action) => (
                  <Button
                    key={action.label}
                    href={action.href}
                    variant={action.variant ?? "secondary"}
                    className={
                      action.variant === "outline"
                        ? "border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10 hover:text-white"
                        : undefined
                    }
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </section>
    );
  },
);
Hero.displayName = "Hero";

export { Hero };
