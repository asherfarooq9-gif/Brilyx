import Link from "next/link";
import type { Service } from "@/lib/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ServiceImage } from "@/components/ui/ServiceImage";
import { cn } from "@/lib/cn";

interface ServiceCardProps {
  service: Service;
  href?: string;
  detailed?: boolean;
  className?: string;
}

export function ServiceCard({ service, href, detailed = false, className }: ServiceCardProps) {
  const body = (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 transition-[transform,box-shadow,border-color] duration-300 motion-reduce:transition-none",
        "hover:-translate-y-1 hover:border-transparent hover:shadow-[0_18px_40px_-18px_rgba(10,10,10,0.25)]",
        "group-focus-visible:-translate-y-1 group-focus-visible:border-transparent group-focus-visible:shadow-[0_18px_40px_-18px_rgba(10,10,10,0.25)]",
        className,
      )}
    >
      <span
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 brand-gradient transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden
      />

      {detailed ? (
        <div className="relative -mx-6 -mt-6 mb-1 h-40 overflow-hidden">
          <ServiceImage
            src={service.image}
            alt={`${service.title} illustration`}
            sizes="(max-width: 768px) 100vw, 460px"
            imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
            overlayClassName="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-card/10"
            fallback={
              <span className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
            }
          />
        </div>
      ) : null}

      <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
        <ServiceIcon slug={service.slug} />
      </span>
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{service.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {detailed ? service.description : service.short}
      </p>

      {detailed ? (
        <ul className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
          {service.included.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-foreground">
          Learn more
          <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
            &rarr;
          </span>
        </span>
      )}
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full rounded-xl focus-visible:outline-none">
        {body}
      </Link>
    );
  }
  return body;
}
