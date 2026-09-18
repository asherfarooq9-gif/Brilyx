import type { NextConfig } from "next";

const WORK_CASE_SLUGS = [
  "dynamic-enterprises",
  "al-quran-academy",
  "faisal-hayat-traders",
  "smartride-nemt",
] as const;

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      ...WORK_CASE_SLUGS.map((slug) => ({
        source: `/work/${slug}`,
        destination: "/work",
        permanent: true,
      })),
      {
        source: "/blog/whatsapp-chatbot-for-clinics",
        destination: "/blog/whatsapp-chatbot-development-company",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
