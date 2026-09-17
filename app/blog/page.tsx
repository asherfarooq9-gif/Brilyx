import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = buildMetadata({
  title: "Blog: AI, Chatbots & Web Engineering | Brilyx",
  description:
    "Practical guides from Brilyx on clinic WhatsApp chatbots, custom AI vs SaaS, and Next.js delivery — written for buyers who need production systems.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog" },
          ]}
        />
      </div>
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-20 lg:px-8">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Blog"
            title="Guides for shipping AI, chatbots, and web platforms"
            description="Practical writing for clinics, local businesses, and product teams who need production systems — not demos."
          />
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Reveal>
                <article className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {post.date}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-4">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {post.description}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Read article
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <CtaBanner
        title="Have a project in mind?"
        description="Tell us what you are building. We will reply with a scope, timeline, and fixed estimate."
      />
    </>
  );
}
