// app/page.tsx
import HeroSection from "@/components/HeroSection";
import TeamSectionServer from "@/components/TeamSection";
import ClientSectionServer from "@/components/Client";
import { Suspense } from "react";
import Loading from "@/components/Loading"; // ✅ استدعاء الكومبوننت

export const metadata = {
  title: "IO-Tech | Digital Transformation & IT Solutions",
  description:
    "IO-Tech is a global IT company specializing in ERP, GIS, Cloud Solutions, and Digital Transformation. Offices in Dubai and Bangalore, delivering enterprise-grade technology services.",
  keywords:
    "IO-Tech, ERP solutions, GIS services, Cloud computing, Digital transformation, IT consulting, Dubai, Bangalore",
  alternates: {
    canonical: "https://www.i-o-tech.net/",
  },
  openGraph: {
    title: "IO-Tech | Digital Transformation & IT Solutions",
    description:
      "IO-Tech provides ERP, GIS, Cloud, and Digital Transformation solutions for enterprises across the globe.",
    url: "https://www.i-o-tech.net/",
    siteName: "IO-Tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "IO-Tech | Digital Transformation & IT Solutions",
    description:
      "ERP, GIS, Cloud Solutions, and Digital Transformation services.",
  },
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* ✅ Suspense مع Loading Component */}
      <Suspense fallback={<Loading />}>
        <TeamSectionServer />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <ClientSectionServer />
      </Suspense>

      {/* ✅ Static JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "IO-Tech",
            url: "https://www.i-o-tech.net/",
            description:
              "IO-Tech specializes in ERP, GIS, Cloud Solutions, and Digital Transformation services.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+971-XXXXXXX",
              contactType: "customer service",
              availableLanguage: ["English", "Arabic"],
            },
            sameAs: ["https://www.linkedin.com/company/i-o-tech/"],
          }),
        }}
      />
    </>
  );
}
