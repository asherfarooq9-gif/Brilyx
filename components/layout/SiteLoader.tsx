"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";

const MIN_DISPLAY_MS = 900;

export function SiteLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0.15 : 0.5, ease: "easeInOut" }}
          aria-hidden
        >
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: [0, 1, 0.6, 1], scale: 1 }
            }
            transition={
              prefersReduced
                ? { duration: 0.15 }
                : { duration: 1.4, ease: "easeInOut", times: [0, 0.4, 0.7, 1], repeat: Infinity }
            }
          >
            <Image
              src="/brilyx-logo.png"
              alt={SITE.name}
              width={72}
              height={72}
              priority
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
