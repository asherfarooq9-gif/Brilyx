import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  name: string;
  /** Absolute path on this site, e.g. `/services`. Omit only when unknown. */
  href?: string;
}

function toAbsolute(path: string): string {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

function breadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const entry: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      };
      if (item.href) {
        entry.item = toAbsolute(item.href);
      }
      return entry;
    }),
  };
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: readonly BreadcrumbItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className={cn("text-sm text-muted-foreground", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.name}-${index}`} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <span aria-hidden className="text-muted-foreground/60">
                    /
                  </span>
                ) : null}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    className={cn(isLast && "text-foreground")}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
