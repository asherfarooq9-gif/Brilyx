import type { ReactNode } from "react";
import Link from "next/link";

/** Minimal markdown renderer for trusted static blog bodies (no user HTML). */
export function MarkdownBody({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\n+/);
  return (
    <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={index} className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {inline(trimmed.slice(4))}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {inline(trimmed.slice(3))}
            </h2>
          );
        }
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split(/\n/).filter((l) => l.startsWith("- "));
          return (
            <ul key={index} className="flex flex-col gap-2 pl-1">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{inline(item.slice(2))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="text-pretty">
            {inline(trimmed.replace(/\n/g, " "))}
          </p>
        );
      })}
    </div>
  );
}

function inline(text: string): Array<string | ReactNode> {
  const nodes: Array<string | ReactNode> = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={key++} className="font-semibold text-foreground">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key++} className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-foreground">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const m = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (m) {
        const href = m[2];
        const external = href.startsWith("http");
        nodes.push(
          external ? (
            <a key={key++} href={href} className="font-medium text-foreground underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
              {m[1]}
            </a>
          ) : (
            <Link key={key++} href={href} className="font-medium text-foreground underline-offset-4 hover:underline">
              {m[1]}
            </Link>
          ),
        );
      }
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
