import type { Metadata } from "next";
import { SITE } from "@/lib/site";

interface PageSeoInput {
  title: string;
  description?: string;
  path?: string;
  /** Force absolute title (no layout `%s · Brilyx` template). Auto when title already includes `| Brilyx` or `Brilyx:`. */
  absolute?: boolean;
}

const OG_IMAGE = "/opengraph-image";

function shouldUseAbsoluteTitle(title: string, absolute: boolean | undefined, path: string): boolean {
  if (absolute !== undefined) return absolute;
  if (path === "/") return true;
  return title.includes("| Brilyx") || title.includes("Brilyx:");
}

/**
 * Build per-page metadata with consistent Open Graph / Twitter tags and a
 * canonical URL. `metadataBase` is set once on the root layout.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  absolute,
}: PageSeoInput): Metadata {
  const url = path === "/" ? SITE.url : `${SITE.url}${path}`;
  const useAbsolute = shouldUseAbsoluteTitle(title, absolute, path);
  const displayTitle = useAbsolute ? title : `${title} · ${SITE.name}`;

  return {
    title: useAbsolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: displayTitle,
      description,
      url,
      locale: SITE.locale,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: displayTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
