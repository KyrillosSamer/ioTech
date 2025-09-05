// app/layout.tsx
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://io-tech-kb2y.vercel.app"),
  title: "IO Tech - Legal & Corporate Services",
  description:
    "IO Tech provides professional legal consultations, corporate governance, arbitration, intellectual property, investment, and financial services.",
  openGraph: {
    title: "IO Tech - Legal & Corporate Services",
    description:
      "Trusted legal advisory and corporate services for individuals, companies, and institutions.",
    url: "https://io-tech-kb2y.vercel.app",
    siteName: "IO Tech",
    images: [
      {
        url: "/Imgs/cover.jpg",
        width: 1200,
        height: 630,
        alt: "IO Tech Legal Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IO Tech - Legal & Corporate Services",
    description:
      "Trusted legal advisory and corporate services for individuals, companies, and institutions.",
    images: ["/Imgs/cover.jpg"],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 relative">
        <LanguageProvider>
          <NavbarWrapper />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
