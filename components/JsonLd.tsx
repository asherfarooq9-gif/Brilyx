/**
 * Renders a `<script type="application/ld+json">` tag from a plain object built
 * server-side from static site data (never user input) — the standard Next.js
 * pattern for structured data. Centralized here so every JSON-LD block goes
 * through one audited call site instead of a raw `dangerouslySetInnerHTML`.
 */
export function JsonLd({ data }: { data: Readonly<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
