import { Hero } from "@/components/sections/Hero";
import { ServiceCarousel } from "@/components/sections/ServiceCarousel";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { TeamShowcase } from "@/components/sections/TeamShowcase";
import { CtaBanner } from "@/components/sections/CtaBanner";

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
