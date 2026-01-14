import LoadingScreen from "@/components/effects/LoadingScreen";
import GoogleAnalytics from "@/components/scripts/GoogleAnalytics";
import IubendaScript from "@/components/scripts/IubendaScript";
import PersonSchema from "@/components/scripts/PersonSchema";
import ResourceHints from "@/components/scripts/ResourceHints";
import SmoothScroll from "@/components/scripts/SmoothScroll";
import { BackgroundProvider } from "@/context/BackgroundContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["monospace"],
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://eduardorichard.com"),
  title: {
    default: "Eduardo Richard | Software Engineer",
    template: "%s | Eduardo Richard",
  },
  description:
    "Eduardo Richard is a Software Engineer with 4+ years of experience in crafting efficient, scalable digital solutions.",
  alternates: {
    canonical: "https://eduardorichard.com",
  },
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "Web Development",
    "React",
    "Next.js",
    "Node.js",
    "DevOps",
    "Web3",
    "Blockchain",
    "Freelance Developer Italy",
  ],
  authors: [{ name: "Eduardo Richard", url: "https://eduardorichard.com" }],
  creator: "Eduardo Richard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eduardorichard.com",
    title: "Eduardo Richard | Software Engineer",
    description:
      "Turning complex problems into elegant, user-centric digital experiences. Expert in Websites, Backend, DevOps, and Web3.",
    siteName: "Eduardo Richard Portfolio",
    images: [
      {
        url: "/og-image.jpg", // We need to generate or add this
        width: 1200,
        height: 630,
        alt: "Eduardo Richard - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Richard | Software Engineer",
    description: "Crafting efficient, scalable solutions in software & web.",
    creator: "@richwrd",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <ResourceHints />
        <PersonSchema />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden w-full`}
      >
        {/* <LoadingScreen /> */}
        <BackgroundProvider>
          <LanguageProvider>
            <IubendaScript />
            <GoogleAnalytics />
            <SmoothScroll>
              {children}
              <SpeedInsights />
              <Analytics />
            </SmoothScroll>
          </LanguageProvider>
        </BackgroundProvider>
      </body>
    </html>
  );
}
