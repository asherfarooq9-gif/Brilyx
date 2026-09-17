import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPost } from "@/lib/blog";
import { getService } from "@/lib/services";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MarkdownBody } from "@/components/blog/MarkdownBody";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | Brilyx`,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.relatedServiceSlugs
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/org-logo.png` },
    },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title },
          ]}
        />
      </div>
      <article className="mx-auto max-w-3xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {post.date} · {post.primaryKeyword}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {post.description}
          </p>
        </Reveal>
        <div className="mt-10">
          <MarkdownBody source={post.body} />
        </div>
        {related.length > 0 ? (
          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-foreground">Related services</p>
            <ul className="mt-3 flex flex-col gap-2">
              {related.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
      <CtaBanner
        title="Want this built for your team?"
        description="Tell Brilyx what you need. We reply within two business days with scope, timeline, and a fixed estimate."
      />
    </>
  );
}
