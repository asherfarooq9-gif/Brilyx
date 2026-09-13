"use client";

import { SITE, whatsappUrl } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import GlyphPortal, { type GlyphPortalStyle } from "@/components/ui/glyph-portal";

const PORTAL_STYLE: GlyphPortalStyle = {
  "--gp-paper": "var(--background)",
  "--gp-ink": "var(--foreground)",
  "--gp-field": "var(--foreground)",
  "--gp-foreground": "var(--background)",
};

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_30px_80px_-40px_rgba(10,10,10,0.35)]">
        <style>{`
          [data-brilyx-portal] [data-gp-hint]{display:none;}
          [data-brilyx-portal] [data-gp-caption]{inset:calc(var(--gp-word-bottom,55%) + 88px) 24px auto;justify-content:center;}
          [data-brilyx-portal] [data-gp-enter]{min-height:44px;padding:0 18px;gap:14px;background:var(--secondary);border:1px solid var(--border);border-radius:9999px;color:var(--secondary-foreground);font-family:var(--font-sans);font-size:13px;font-weight:600;box-shadow:0 1px 2px rgba(10,10,10,.15);transition:transform .18s,background-color .18s;}
          [data-brilyx-portal] [data-gp-enter]:hover{background:var(--muted);transform:translateY(-1px);}
          [data-brilyx-portal] [data-gp-enter]:focus-visible{outline:2px solid var(--ring);outline-offset:4px;}
          [data-brilyx-portal] [data-gp-touch-picker]{top:auto;bottom:16px;left:50%;}
          [data-brilyx-portal] [data-gp-select]{border-color:var(--border);border-radius:8px;font-family:var(--font-sans);font-size:12px;color:var(--muted-foreground);}
          [data-brilyx-header]{position:absolute;inset:clamp(20px,4cqw,32px) clamp(20px,4cqw,32px) auto;display:flex;align-items:center;gap:16px;}
          [data-brilyx-badge]{display:inline-flex;align-items:center;gap:8px;border-radius:9999px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);padding:6px 14px;font-family:var(--font-mono);font-size:0.65rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.7);}
          [data-brilyx-eyebrow]{position:absolute;inset:auto 5% calc(100% - var(--gp-word-top,35%) + 20px);margin:0 auto;max-width:36rem;text-align:center;font-family:var(--font-display);font-weight:600;font-size:clamp(1.1rem,1vw + 1rem,1.65rem);line-height:1.2;color:rgba(255,255,255,.92);}
          [data-brilyx-support]{position:absolute;inset:calc(var(--gp-word-bottom,55%) + 20px) 6% auto;margin:0 auto;max-width:32rem;text-align:center;font-family:var(--font-sans);font-size:15px;line-height:1.6;color:rgba(255,255,255,.6);}
          [data-brilyx-actions]{position:absolute;inset:calc(var(--gp-word-bottom,55%) + 96px) 5% auto;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;}
          @container(max-height:479px){[data-brilyx-header]{top:16px;}[data-brilyx-eyebrow]{font-size:1rem;}[data-brilyx-support]{display:none;}[data-brilyx-actions]{inset:calc(var(--gp-word-bottom,55%) + 26px) 5% auto;}[data-brilyx-portal] [data-gp-caption]{inset:calc(var(--gp-word-bottom,55%) + 78px) 24px auto;}}
          [data-brilyx-reveal]{display:flex;width:min(100%,64rem);margin:auto;flex-direction:column;align-items:flex-start;gap:clamp(1.75rem,4svh,3rem);}
          [data-brilyx-reveal] h2{max-width:36rem;margin:0;font-family:var(--font-display);font-weight:600;font-size:clamp(1.5rem,1rem + 2vw,2.25rem);line-height:1.2;letter-spacing:-0.01em;}
          [data-brilyx-caps]{display:grid;width:100%;grid-template-columns:1fr;gap:1.5rem;}
          [data-brilyx-cap]{border-top:1px solid rgba(255,255,255,.16);padding-top:1rem;}
          [data-brilyx-cap] h3{margin:0;font-family:var(--font-sans);font-size:1.0625rem;font-weight:600;}
          [data-brilyx-cap] p{margin:.5rem 0 0;font-family:var(--font-sans);font-size:.9375rem;line-height:1.55;color:rgba(255,255,255,.65);}
          @container(min-width:768px){[data-brilyx-caps]{grid-template-columns:repeat(3,minmax(0,1fr));gap:2.5rem;}}
        `}</style>
        <GlyphPortal
          word={SITE.name.toUpperCase()}
          fontFamily="var(--font-display)"
          fontWeight={700}
          scrollLength={2.2}
          interactive
          annotations={false}
          enterLabel="Step inside"
          className="brilyx-portal"
          style={{ ...PORTAL_STYLE, containerType: "size" }}
          background={
            <div
              className="absolute inset-0"
              style={{
                transform: "scale(var(--gp-field-scale,1))",
                background:
                  "radial-gradient(circle at 24% 18%, rgba(161,161,170,0.28), transparent 55%), radial-gradient(circle at 80% 78%, rgba(82,82,91,0.32), transparent 60%), linear-gradient(135deg, #0a0a0a 0%, #18181b 55%, #0a0a0a 100%)",
              }}
            />
          }
          front={
            <>
              <div data-brilyx-header>
                <span data-brilyx-badge>{SITE.name} · Engineering studio</span>
              </div>
              <h1 data-brilyx-eyebrow>{SITE.tagline}</h1>
              <p data-brilyx-support>
                We build AI/ML systems, applications, web platforms, automations, and
                chatbots, shipped to production with the monitoring and craft to keep
                them there.
              </p>
              <div data-brilyx-actions>
                <Button href={whatsappUrl()} external size="lg" variant="secondary">
                  Start a project
                </Button>
                <Button
                  href="/services"
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  Explore services
                </Button>
              </div>
            </>
          }
        >
          <div data-brilyx-reveal>
            <h2>Everywhere your product needs intelligence, we&apos;ve already shipped it.</h2>
            <div data-brilyx-caps>
              <div data-brilyx-cap>
                <h3>AI / ML systems</h3>
                <p>Models, pipelines, and inference that hold up in production.</p>
              </div>
              <div data-brilyx-cap>
                <h3>Web &amp; app development</h3>
                <p>Fast, accessible products on Next.js, React, and native stacks.</p>
              </div>
              <div data-brilyx-cap>
                <h3>Automations &amp; chatbots</h3>
                <p>Workflows and assistants that remove repetitive work from your day.</p>
              </div>
            </div>
          </div>
        </GlyphPortal>
      </div>
    </section>
  );
}
