import type { Project } from "@/lib/portfolio";
import { ServiceImage } from "@/components/ui/ServiceImage";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const meta = [project.client, project.year].filter(Boolean).join(" · ");

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

      <div className="relative -mx-6 -mt-6 mb-1 h-44 overflow-hidden">
        <ServiceImage
          src={project.image}
          alt=""
          sizes="(max-width: 768px) 100vw, 460px"
          imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
          overlayClassName="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent"
          fallback={
            <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted p-6 text-center font-display text-lg font-semibold text-muted-foreground">
              {project.name}
            </span>
          }
        />
      </div>

      {meta ? (
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {meta}
        </span>
      ) : null}
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{project.name}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

      {project.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {project.url ? (
        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-foreground">
          Visit site
          <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
            &rarr;
          </span>
        </span>
      ) : null}
    </article>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} — opens the live site in a new tab`}
        className="block h-full rounded-xl focus-visible:outline-none"
      >
        {body}
      </a>
    );
  }
  return body;
}
