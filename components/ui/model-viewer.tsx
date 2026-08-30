"use client";

import { useEffect, useState } from "react";

// Google's <model-viewer> web component, loaded from the CDN so no bundler has to
// process it. Far lighter than a full Spline runtime and built for mobile.
const MV_SRC =
  "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.0.0/dist/model-viewer.min.js";

let mvPromise: Promise<void> | null = null;

function loadModelViewer(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.customElements?.get("model-viewer")) return Promise.resolve();
  if (mvPromise) return mvPromise;

  mvPromise = new Promise<void>((resolve, reject) => {
    const inject = () => {
      const script = document.createElement("script");
      script.type = "module";
      script.src = MV_SRC;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load model-viewer"));
      document.head.appendChild(script);
    };
    const ric = (
      window as typeof window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
      }
    ).requestIdleCallback;
    if (typeof ric === "function") ric(inject, { timeout: 2500 });
    else window.setTimeout(inject, 300);
  });
  return mvPromise;
}

interface ModelViewerProps {
  src: string;
  poster?: string;
  className?: string;
  /** Rendered while the component script is still loading or if it fails. */
  fallback?: React.ReactNode;
}

export function ModelViewer({ src, poster, className, fallback }: ModelViewerProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    loadModelViewer()
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

  if (status !== "ready") return <>{fallback ?? null}</>;

  return (
    // @ts-expect-error — custom element registered at runtime by the CDN script.
    <model-viewer
      src={src}
      poster={poster}
      alt="Brilyx 3D robot"
      camera-controls
      auto-rotate
      auto-rotate-delay="0"
      rotation-per-second="18deg"
      interaction-prompt="none"
      disable-zoom
      loading="lazy"
      reveal="auto"
      touch-action="pan-y"
      class={className}
      style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
    />
  );
}
