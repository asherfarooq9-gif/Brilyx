import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

/** Brand red-to-orange gradient applied to inline text. */
export function GradientText({ children, className }: GradientTextProps) {
  return <span className={cn("brand-text-gradient", className)}>{children}</span>;
}
