import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServiceCarousel } from "@/components/sections/ServiceCarousel";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { TeamShowcase } from "@/components/sections/TeamShowcase";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({ title: SITE.tagline, path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCarousel />
      <WorkShowcase />
      <AboutBrief />
      <TeamShowcase />
      <CtaBanner />
    </>
  );
}
