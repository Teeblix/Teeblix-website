import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fragment_Mono, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/json-ld";
import { Preloader } from "@/components/preloader";
import { pageMetadata, SITE_URL, siteJsonLd } from "@/lib/seo";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    title: "Home",
    path: "/",
    description:
      "I design and build high-quality Framer websites, landing pages and digital experiences for ambitious brands, agencies and businesses worldwide. Based in Nigeria, working globally.",
  }),
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

// Applied before hydration so the stored theme choice never flashes the
// default (dark) theme first.
const themeInitScript = `
try {
  var t = window.localStorage.getItem("teeblix-theme");
  document.documentElement.setAttribute("data-theme", t === "light" || t === "red" ? t : "dark");
} catch (e) {}
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistMono.variable} ${inter.variable} ${fragmentMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={siteJsonLd()} />
      </head>
      <body className="min-h-full antialiased">
        <Preloader />
        {/* Wrapper so the preloader can push the whole page in without transforming <body> (which would drag the fixed preloader along). */}
        <div className="site-root">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
