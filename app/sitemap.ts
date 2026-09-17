import type { MetadataRoute } from "next";
import { NAV_LINKS, SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { BLOG_POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const navEntries = NAV_LINKS.map((link) => ({
    url: link.href === "/" ? SITE.url : `${SITE.url}${link.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.8,
  }));

  const serviceEntries = SERVICES.map((service) => ({
    url: `${SITE.url}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const trustEntries = ["/privacy", "/terms"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...navEntries, ...serviceEntries, ...blogEntries, ...trustEntries];
}
