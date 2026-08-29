"use client";

import { useEffect, useRef, useState } from "react";

// Official Spline web-component build, loaded from the CDN so no bundler has to
// resolve its WebGL/DRACO assets. Pinned to a specific version for stability.
const VIEWER_SRC = "https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js";

let viewerPromise: Promise<void> | null = null;

function loadViewer(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.customElements?.get("spline-viewer")) return Promise.resolve();
  if (viewerPromise) return viewerPromise;

  viewerPromise = new Promise<void>((resolve, reject) => {
    const inject = () => {
      const script = document.createElement("script");
      script.type = "module";
      script.src = VIEWER_SRC;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Spline viewer"));
      document.head.appendChild(script);
    };
    // Defer to idle time so it never competes with first paint / hydration.
    const ric = (
      window as typeof window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
      }
    ).requestIdleCallback;
    if (typeof ric === "function") {
      ric(inject, { timeout: 2500 });
    } else {
      window.setTimeout(inject, 300);
    }
  });
  return viewerPromise;
}

/**
 * The Spline web component renders a "Built with Spline" badge inside its shadow
 * DOM. Strip it once the element mounts. Note: on Spline's free tier their terms
 * ask you to keep the attribution — remove it only if your plan allows it.
 */
function stripSplineBadge(host: HTMLElement) {
  const remove = () => {
    const root = host.shadowRoot;
    if (!root) return false;
    const badge = root.querySelector<HTMLElement>("#logo, a[href*='spline.design']");
    if (badge) {
      badge.remove();
      return true;
    }
    return false;
  };

  if (remove()) return;
  const observer = new MutationObserver(() => {
    if (remove()) observer.disconnect();
  });
  if (host.shadowRoot) observer.observe(host.shadowRoot, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 8000);
}

interface SplineSceneProps {
  scene: string;
  className?: string;
  /** When false the scene renders + idle-animates but ignores pointer/touch, so
   *  it never traps page scrolling (used on mobile / coarse pointers). */
  interactive?: boolean;
}

export function SplineScene({ scene, className, interactive = true }: SplineSceneProps) {
  const hostRef = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    loadViewer()
      .then(() => {
        if (!cancelled) setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status === "ready" && hostRef.current) {
      stripSplineBadge(hostRef.current);
    }
  }, [status]);

  return (
    <div className={className} style={interactive ? undefined : { touchAction: "pan-y" }}>
      {status === "ready" ? (
        // @ts-expect-error — custom element registered at runtime by the CDN script.
        <spline-viewer
          ref={hostRef}
          url={scene}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: interactive ? undefined : "none",
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {status === "error" ? (
            <span className="text-6xl" aria-hidden>
              🤖
            </span>
          ) : (
            <span
              className="h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-white"
              role="status"
              aria-label="Loading 3D scene"
            />
          )}
        </div>
      )}
    </div>
  );
}
