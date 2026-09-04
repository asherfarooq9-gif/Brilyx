import type { Metadata } from "next";
import { SITE } from "@/lib/site";

interface PageSeoInput {
  title: string;
  description?: string;
  path?: string;
}

/**
 * Build per-page metadata with consistent Open Graph / Twitter tags and a
 * canonical URL. `metadataBase` is set once on the root layout.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
}: PageSeoInput): Metadata {
  const url = path === "/" ? SITE.url : `${SITE.url}${path}`;
  const fullTitle = path === "/" ? `${SITE.name} — ${SITE.tagline}` : `${title} · ${SITE.name}`;

  return {
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: fullTitle,
      description,
      url,
      locale: SITE.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
