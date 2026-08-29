"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps every route. Next.js remounts `template.tsx` on navigation, so this
 * fades + slides page content in on each route change.
 */
export default function Template({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
