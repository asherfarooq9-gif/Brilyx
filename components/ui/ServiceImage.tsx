"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";

interface ServiceImageProps {
  src: string;
  alt: string;
  sizes: string;
  /** Rendered instead of the image when `src` is empty or fails to load. */
  fallback: ReactNode;
  imageClassName?: string;
  overlayClassName?: string;
}

/**
 * `next/image` fill layer that degrades to a fallback node when the file is
 * missing — lets us reference `/services/<slug>.jpg` before the assets exist.
 */
export function ServiceImage({
  src,
  alt,
  sizes,
  fallback,
  imageClassName = "object-cover",
  overlayClassName,
}: ServiceImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={imageClassName}
        onError={() => setFailed(true)}
      />
      {overlayClassName ? <span className={overlayClassName} aria-hidden /> : null}
    </>
  );
}
