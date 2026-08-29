import type { MetadataRoute } from "next";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return NAV_LINKS.map((link) => ({
    url: link.href === "/" ? SITE.url : `${SITE.url}${link.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
