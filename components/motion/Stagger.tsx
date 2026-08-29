"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

/** Parent container that reveals its <StaggerItem> children in sequence. */
export function Stagger({ children, className }: StaggerProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function StaggerItem({ children, className, id }: StaggerItemProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    );
  }

  return (
    <motion.div className={className} id={id} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
