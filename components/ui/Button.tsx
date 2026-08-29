import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-[transform,box-shadow,background-color,border-color,color] duration-200 [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap motion-reduce:transition-none";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 active:translate-y-0",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/70 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-border bg-background text-foreground hover:border-accent hover:text-accent hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-foreground hover:bg-secondary",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonElementProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

interface LinkElementProps extends BaseProps {
  href: string;
  external?: boolean;
}

export type ButtonProps = ButtonElementProps | LinkElementProps;

function styles(variant: Variant = "primary", size: Size = "md", className?: string): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, href, external } = props;
    const classes = styles(variant, size, className);
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant, size, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={styles(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
