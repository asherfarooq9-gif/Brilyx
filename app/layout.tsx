import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE, SOCIAL_LINKS } from "@/lib/site";
import { NotchNavbar } from "@/components/layout/NotchNavbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { JsonLd } from "@/components/JsonLd";
import { SiteLoader } from "@/components/layout/SiteLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.homeTitle,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "AI development",
    "machine learning",
    "app development",
    "web development",
    "AI automation",
    "chatbots",
    "software studio",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: SITE.homeTitle,
    description: SITE.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE.homeTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.homeTitle,
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  // A versioned URL prompts search engines to fetch the new mark instead of
  // retaining a previously cached favicon at the same address.
  icons: {
    icon: [
      { url: "/favicon.ico?v=20260930", sizes: "any" },
      { url: "/icon.png?v=20260930", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png?v=20260930", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};


const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "en",
  publisher: { "@id": `${SITE.url}/#organization` },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/org-logo.png?v=20260930`,
    width: 512,
    height: 512,
  },
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phoneE164,
  slogan: SITE.tagline,
  sameAs: SOCIAL_LINKS.map((link) => link.href),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phoneE164,
    email: SITE.email,
    contactType: "customer support",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteLoader />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <NotchNavbar />
        <main id="main" className="flex-1 scroll-mt-16 pt-11">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  );
}
