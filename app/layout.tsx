import type { Metadata } from "next";
import { Playfair_Display, Manrope, Cormorant } from "next/font/google";
import { ThemeScript } from "@/components/layout/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://recantodopark.com.br"
  ),
  icons: {
    icon: [
      { url: "/brand/favicon.ico" },
      { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/brand/site.webmanifest",
};

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={`${playfair.variable} ${manrope.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
