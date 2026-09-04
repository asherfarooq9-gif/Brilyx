"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS, SITE, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/cn";
import { NotchLeftWing, NotchRightWing } from "@/components/ui/adaptive-notch-navigation-bar";

function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Brand() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2 rounded-full pl-1 pr-2 font-semibold tracking-tight text-zinc-50 outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-md brand-gradient text-xs font-bold text-white">
        B
      </span>
      <span className="text-sm">{SITE.name}</span>
    </Link>
  );
}

function CtaLink({ className }: { className?: string }) {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-zinc-50 px-3.5 text-xs font-semibold text-zinc-950 outline-none transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950",
        className,
      )}
    >
      Start a project
    </a>
  );
}

export function NotchNavbar() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the drawer on route change — adjust state during render, not in an effect.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const activeLink = NAV_LINKS.find((link) => isActivePath(pathname, link.href)) ?? NAV_LINKS[0];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      {/* Desktop / tablet: single notch with brand, links, and CTA. */}
      <nav
        aria-label="Main navigation"
        className="pointer-events-auto relative hidden h-11 items-center gap-1 rounded-b-[24px] bg-zinc-950 px-3 text-zinc-50 md:flex"
      >
        <NotchLeftWing />
        <NotchRightWing />

        <Brand />
        <span className="mx-1 h-4 w-px bg-zinc-800" aria-hidden />

        <LayoutGroup id="notch-nav">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-8 items-center rounded-full px-3 text-sm font-medium outline-none transition-colors select-none",
                      "focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950",
                      active ? "font-semibold text-zinc-950" : "text-zinc-400 hover:text-zinc-100",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="notch-active-pill"
                        className="absolute inset-0 rounded-full bg-zinc-50"
                        transition={
                          prefersReduced
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 400, damping: 30 }
                        }
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </LayoutGroup>

        <span className="mx-1 h-4 w-px bg-zinc-800" aria-hidden />
        <CtaLink />
      </nav>

      {/* Mobile: compact notch with a dropdown of routes. */}
      <div
        ref={containerRef}
        className="pointer-events-auto relative flex flex-col rounded-b-[24px] bg-zinc-950 px-3 text-zinc-50 md:hidden"
      >
        <NotchLeftWing />
        <NotchRightWing />

        <div className="flex h-11 items-center justify-between gap-2">
          <Brand />

          <button
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="menu"
            aria-controls="notch-mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((v) => !v)}
            className="flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-zinc-50 outline-none transition-colors hover:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            <span className="leading-none">{activeLink.label}</span>
            <ChevronDown
              className={cn(
                "size-3.5 text-zinc-400 transition-transform duration-200",
                isOpen && "rotate-180",
              )}
              aria-hidden
            />
          </button>
        </div>

        <div
          id="notch-mobile-menu"
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
            "motion-reduce:transition-none",
            isOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-0.5 pb-3 pt-1.5">
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-xl px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400",
                        active
                          ? "bg-zinc-50 font-semibold text-zinc-950"
                          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-1.5">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-zinc-50 px-3 py-2 text-center text-sm font-semibold text-zinc-950"
                >
                  Start a project
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
