"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fade + slide-up on scroll into view. `whileInView` is Framer Motion's
 * built-in IntersectionObserver — no manual observer needed. Falls back to a
 * static render when the user prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
