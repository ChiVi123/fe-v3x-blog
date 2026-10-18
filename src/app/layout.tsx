import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { type ReactNode, Suspense } from "react";
import SiteFooter from "~/components/layouts/site-footer";
import SiteHeader from "~/components/layouts/site-header";
import { HoverPreview } from "~/components/shared/hover-preview";
import { ReadingStoreProvider } from "~/components/shared/reading-provider";
import { ResumeBar } from "~/components/shared/resume-bar";
import { ThemeProvider } from "~/components/shared/theme-provider";
import { ToastContainer } from "~/components/shared/toast";
import "./globals.css";

/* Ba họ font của TẠP. */
const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TẠP. — Tạp chí những ý nghĩ lang thang",
    template: "%s — TẠP.",
  },
  description:
    "Tạp chí trực tuyến về viết, đọc và sống chậm. Một bài mỗi ngày, trừ những ngày chúng tôi bận đọc.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F1E8" },
    { media: "(prefers-color-scheme: dark)", color: "#151210" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain min-h-dvh flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReadingStoreProvider>
            {/* Skip link */}
            <a
              href="#main"
              className="fixed -top-12 left-4 z-200 bg-son text-white px-4 py-[.6rem] font-mono font-semibold text-[.72rem] tracking-widest transition-[top_.2s] focus:top-3"
            >
              Nội dung chính
            </a>

            <Suspense
              fallback={
                <header className="sticky top-0 z-50 bg-(--background)/85 backdrop-blur border-b border-border h-(--header-h)" />
              }
            >
              <SiteHeader />
            </Suspense>

            <main id="main" className="flex-1">
              {children}
            </main>

            <SiteFooter />
            <ToastContainer />
            <ResumeBar />
            <HoverPreview />
          </ReadingStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
