import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ORIGIN_URL } from "@/utils/helper";
import Script from "next/script"; // ✅ import Script

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BrainMate",
  description: "Your AI-powered companion for smarter learning & work.",
  metadataBase: new URL(ORIGIN_URL),
  alternates: {
    canonical: ORIGIN_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta
            name="google-adsense-account"
            content="ca-pub-6044278578685946"
          />
          {/* ✅ Google AdSense script (correct way in Next.js) */}
        </head>
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
