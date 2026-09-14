"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_TIMEOUT_OFFSET = 100;
const MIN_SCROLL_INTERVAL = 300;
const SCROLL_THRESHOLD = 20;
const TOUCH_SCROLL_THRESHOLD = 100;
const SCALE_FACTOR = 0.08;
const MIN_SCALE = 0.08;
const MAX_SCALE = 2;
const HOVER_SCALE_MULTIPLIER = 1.02;
const CARD_PADDING = 100;
const CARD_ASPECT_RATIO = 16 / 10;
const VIEWPORT_GUTTER = 32;

interface CardItem {
  badge: string;
  category: string;
  href: string;
  id: string;
  image: string;
  name: string;
}

export interface ScrollableCardStackProps {
  cardHeight?: number;
  className?: string;
  items: CardItem[];
  perspective?: number;
  transitionDuration?: number;
}

const ScrollableCardStack: React.FC<ScrollableCardStackProps> = ({
  items,
  cardHeight = 384,
  perspective = 1000,
  transitionDuration = 180,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const lastScrollTime = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? Number.POSITIVE_INFINITY : window.innerWidth,
  );

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Cards are fixed-height with a 16:10 aspect ratio, so a large cardHeight
  // prop can render wider than a phone screen. Clamp the effective height so
  // the card's derived width always fits within the viewport.
  const effectiveCardHeight = Math.min(cardHeight, (viewportWidth - VIEWPORT_GUTTER) / CARD_ASPECT_RATIO);

  const totalItems = items.length;
  const maxIndex = totalItems - 1;

  const FRAME_OFFSET = -30;
  const FRAMES_VISIBLE_LENGTH = 3;
  const SNAP_DISTANCE = 50;

  const clamp = useCallback(
    (val: number, [min, max]: [number, number]): number => Math.min(Math.max(val, min), max),
    [],
  );

  const scrollToCard = useCallback(
    (direction: 1 | -1) => {
      if (isScrolling) return;

      const now = Date.now();
      if (now - lastScrollTime.current < MIN_SCROLL_INTERVAL) return;

      const newIndex = clamp(currentIndex + direction, [0, maxIndex]);

      if (newIndex !== currentIndex) {
        lastScrollTime.current = now;
        setIsScrolling(true);
        setCurrentIndex(newIndex);
        scrollY.set(newIndex * SNAP_DISTANCE);

        setTimeout(() => setIsScrolling(false), transitionDuration + SCROLL_TIMEOUT_OFFSET);
      }
    },
    [currentIndex, maxIndex, scrollY, isScrolling, transitionDuration, clamp],
  );

  const handleScroll = useCallback(
    (deltaY: number) => {
      if (isDragging || isScrolling) return;
      if (Math.abs(deltaY) < SCROLL_THRESHOLD) return;
      scrollToCard(deltaY > 0 ? 1 : -1);
    },
    [isDragging, isScrolling, scrollToCard],
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    },
    [handleScroll],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft": {
          e.preventDefault();
          scrollToCard(-1);
          break;
        }
        case "ArrowDown":
        case "ArrowRight": {
          e.preventDefault();
          scrollToCard(1);
          break;
        }
        case "Home": {
          e.preventDefault();
          if (currentIndex !== 0) {
            setIsScrolling(true);
            setCurrentIndex(0);
            scrollY.set(0);
            setTimeout(() => setIsScrolling(false), transitionDuration + SCROLL_TIMEOUT_OFFSET);
          }
          break;
        }
        case "End": {
          e.preventDefault();
          if (currentIndex !== maxIndex) {
            setIsScrolling(true);
            setCurrentIndex(maxIndex);
            scrollY.set(maxIndex * SNAP_DISTANCE);
            setTimeout(() => setIsScrolling(false), transitionDuration + SCROLL_TIMEOUT_OFFSET);
          }
          break;
        }
        default:
          break;
      }
    },
    [currentIndex, maxIndex, scrollY, isScrolling, scrollToCard, transitionDuration],
  );

  const touchStartY = useRef(0);
  const touchMoved = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchMoved.current = false;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || isScrolling) return;

      const deltaY = touchStartY.current - e.touches[0].clientY;

      if (Math.abs(deltaY) > TOUCH_SCROLL_THRESHOLD && !touchMoved.current) {
        scrollToCard(deltaY > 0 ? 1 : -1);
        touchMoved.current = true;
      }
    },
    [isDragging, isScrolling, scrollToCard],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    touchMoved.current = false;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    if (!isDragging) scrollY.set(currentIndex * SNAP_DISTANCE);
  }, [currentIndex, isDragging, scrollY]);

  const getCardTransform = useCallback(
    (index: number) => {
      const offsetIndex = index - currentIndex;
      const isBehindCurrent = currentIndex > index;
      const blur = !shouldReduceMotion && isBehindCurrent ? 2 : 0;
      const opacity = currentIndex > index ? 0 : 1;
      const scale = shouldReduceMotion ? 1 : clamp(1 - offsetIndex * SCALE_FACTOR, [MIN_SCALE, MAX_SCALE]);
      const y = shouldReduceMotion
        ? 0
        : clamp(offsetIndex * FRAME_OFFSET, [FRAME_OFFSET * FRAMES_VISIBLE_LENGTH, Number.POSITIVE_INFINITY]);
      const zIndex = items.length - index;

      return { blur, opacity, scale, y, zIndex };
    },
    [currentIndex, items.length, clamp, shouldReduceMotion],
  );

  return (
    <section
      aria-atomic="true"
      aria-label="Scrollable card stack"
      aria-live="polite"
      className={cn("relative mx-auto h-fit w-fit min-w-[300px]", className)}
    >
      <div
        aria-label="Scrollable card container"
        className="h-full w-full"
        onKeyDown={handleKeyDown}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={containerRef}
        role="application"
        style={{
          minHeight: `${effectiveCardHeight + CARD_PADDING}px`,
          perspective: `${perspective}px`,
          perspectiveOrigin: "center 60%",
          touchAction: "none",
        }}
        tabIndex={0}
      >
        {items.map((item, i) => {
          const transform = getCardTransform(i);
          const isActive = i === currentIndex;
          const isHovered = hoveredIndex === i;

          return (
            <motion.div
              animate={
                shouldReduceMotion
                  ? { x: "-50%" }
                  : { scale: transform.scale, x: "-50%", y: `calc(-50% + ${transform.y}px)` }
              }
              aria-hidden={!isActive}
              className="absolute top-1/2 left-1/2 w-max max-w-[100vw] overflow-hidden rounded-2xl border bg-background shadow-lg"
              data-active={isActive}
              initial={false}
              key={`scrollable-card-${item.id}`}
              onBlur={() => setHoveredIndex(null)}
              onFocus={() => isActive && setHoveredIndex(i)}
              onMouseEnter={() => isActive && setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                borderWidth: `${2 / transform.scale}px`,
                filter: `blur(${transform.blur}px)`,
                height: `${effectiveCardHeight}px`,
                opacity: transform.opacity,
                pointerEvents: isActive ? "auto" : "none",
                transformOrigin: "center center",
                transitionDuration: shouldReduceMotion ? "0ms" : "200ms",
                transitionProperty: shouldReduceMotion ? "none" : "opacity, filter",
                transitionTimingFunction: "cubic-bezier(0.645, 0.045, 0.355, 1)",
                willChange: shouldReduceMotion ? undefined : "opacity, filter, transform",
                zIndex: transform.zIndex,
              }}
              tabIndex={isActive ? 0 : -1}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { damping: 20, duration: 0.25, mass: 0.5, stiffness: 250, type: "spring" as const }
              }
              whileHover={
                shouldReduceMotion || !isActive
                  ? {}
                  : {
                      scale: transform.scale * HOVER_SCALE_MULTIPLIER,
                      transition: { damping: 20, duration: 0.25, mass: 0.5, stiffness: 250, type: "spring" as const },
                    }
              }
            >
              <div
                className={cn(
                  "flex aspect-16/10 w-full flex-col rounded-xl bg-background transition-all duration-200",
                  isHovered && "shadow-xl",
                  isScrolling && isActive && "ring-2 ring-foreground/50",
                )}
                style={{ height: `${effectiveCardHeight}px` }}
              >
                {isScrolling && isActive ? (
                  <div className="absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-foreground opacity-75" />
                ) : null}

                <div className="relative w-full flex-1 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`${item.name} screenshot`}
                    className="absolute inset-0 h-full w-full object-cover"
                    decoding="async"
                    draggable={false}
                    src={item.image}
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  />
                </div>

                <Link
                  aria-label={`View ${item.name} case study`}
                  className="flex items-center justify-center gap-2 bg-background/95 p-3 text-inherit no-underline backdrop-blur-sm transition-colors duration-200"
                  href={item.href}
                >
                  <span
                    aria-hidden
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[0.6rem] font-bold text-background"
                  >
                    {item.badge}
                  </span>
                  <span className="font-medium text-foreground text-sm leading-none">{item.name}</span>
                  <span className="font-normal text-foreground/70 text-sm">{item.category}</span>
                </Link>
              </div>
            </motion.div>
          );
        })}

        <div
          aria-label="Card navigation"
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2"
          role="tablist"
        >
          {Array.from({ length: items.length }, (_, i) => (
            <motion.button
              aria-label={`Go to card ${i + 1} of ${items.length}`}
              aria-selected={i === currentIndex}
              className={cn(
                "h-2 w-2 cursor-pointer rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-foreground focus:ring-offset-1",
                i === currentIndex ? "scale-125 bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              key={`scrollable-indicator-${items[i]?.id || i}`}
              onClick={() => {
                if (i !== currentIndex && !isScrolling) {
                  setIsScrolling(true);
                  setCurrentIndex(i);
                  scrollY.set(i * SNAP_DISTANCE);
                  setTimeout(() => setIsScrolling(false), transitionDuration + SCROLL_TIMEOUT_OFFSET);
                }
              }}
              role="tab"
              transition={{ damping: 20, mass: 0.5, stiffness: 250, type: "spring" as const }}
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <div aria-live="polite" className="sr-only">
          {`Card ${currentIndex + 1} of ${items.length} selected. Use arrow keys to navigate one card at a time, or click the dots below.`}
        </div>
      </div>
    </section>
  );
};

export default ScrollableCardStack;
