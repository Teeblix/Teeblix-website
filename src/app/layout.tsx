import type { Metadata } from "next";
import { Fragment_Mono, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
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
  title: "Blessing Adewale (Teeblix) — Designer & Framer Developer",
  description: "Designer & Framer developer based in Nigeria, open to the world.",
};

// Applied before hydration so the stored theme choice never flashes the
// default (dark) theme first.
const themeInitScript = `
try {
  var t = window.localStorage.getItem("teeblix-theme");
  document.documentElement.setAttribute("data-theme", t === "light" || t === "red" ? t : "dark");
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistMono.variable} ${inter.variable} ${fragmentMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
