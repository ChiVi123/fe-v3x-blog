import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Fraunces, IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { ThemeProvider } from "~/components/theme-provider";
import "./globals.css";

/* Ba họ font của TẠP. — biến CSS khớp với @theme inline trong globals.css.
   Subset "vietnamese" bắt buộc để dấu tiếng Việt hiển thị bằng đúng font. */
const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
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
  weight: ["400", "500", "600"],
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
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
