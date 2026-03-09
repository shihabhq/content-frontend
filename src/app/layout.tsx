import type { Metadata,Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightscontent.com";

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rights Content – Human Rights Content Lab",
    template: "%s | Rights Content",
  },
  description:
    "Rights Content is a content library for rights education and awareness.",
  keywords: [
    "rights",
    "education",
    "awareness",
  ],
  authors: [{ name: "Rights Content" }],
  creator: "Rights Content",
  publisher: "Rights Content",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: "bn_BD",
    siteName: "Rights Content",
    title: "Rights Content – Human Rights Content Lab",
    description:
      "Rights Content is a content library for rights education and awareness.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rights Content – Human Rights Content Lab",
    description:
      "Rights Content is a content library for rights education and awareness. We are a team of volunteers who are passionate about sharing knowledge and empowering people to make a difference.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-light text-text-main`}
      >
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6RX9MELPFS"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6RX9MELPFS');
          `}
        </Script>
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
