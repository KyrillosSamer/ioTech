// app/page.tsx
import HeroSection from "@/components/HeroSection";
import TeamSectionServer from "@/components/TeamSection";
import ClientSectionServer from "@/components/Client";
import { Suspense } from "react";
import {
  generateHeroJSONLD,
  generateTeamJSONLD,
  generateClientsJSONLD,
  HeroData,
  TeamMember,
  Client,
} from "@/lib/structuredData";

// Generate dynamic metadata for SEO
export async function generateMetadata() {
  // استعمل revalidate عشان الـ data تتحفظ Cache ومتحملش كل مرة
  const heroRes = await fetch(
    "https://tranquil-positivity-9ec86ca654.strapiapp.com/api/hero",
    { next: { revalidate: 60 } }
  );
  const heroData: { data?: HeroData } = await heroRes.json();

  return {
    title: heroData.data?.title || "IO Tech - Legal & Corporate Services",
    description:
      heroData.data?.description?.slice(0, 160) ||
      "Trusted legal & corporate services.",
    openGraph: {
      title: heroData.data?.title || "IO Tech - Legal & Corporate Services",
      description:
        heroData.data?.description?.slice(0, 160) ||
        "Trusted legal & corporate services.",
      url: "https://domain.com",
      siteName: "IO Tech",
      images: [
        {
          url: heroData.data?.image || "/Imgs/cover.jpg",
          width: 1200,
          height: 630,
          alt: heroData.data?.title || "IO Tech Legal Services",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: heroData.data?.title || "IO Tech - Legal & Corporate Services",
      description:
        heroData.data?.description?.slice(0, 160) ||
        "Trusted legal & corporate services.",
      images: [heroData.data?.image || "/Imgs/cover.jpg"],
    },
  };
}

// Home Page Component
export default async function Home() {
  // ✅ رجّع بس HeroSection الأول (السكاشن التانية Suspense)
  const heroRes = await fetch(
    "https://tranquil-positivity-9ec86ca654.strapiapp.com/api/hero",
    { next: { revalidate: 60 } }
  );
  const heroData: { data?: HeroData } = await heroRes.json();

  // Team & Clients هيتجابوا في الكومبوننتس الخاصة بيهم Lazy
  const teamRes = await fetch(
    "https://tranquil-positivity-9ec86ca654.strapiapp.com/api/teams",
    { next: { revalidate: 60 } }
  );
  const teamData: { data?: TeamMember[] } = await teamRes.json();

  const clientsRes = await fetch(
    "https://tranquil-positivity-9ec86ca654.strapiapp.com/api/clients",
    { next: { revalidate: 60 } }
  );
  const clientsData: { data?: Client[] } = await clientsRes.json();

  return (
    <>
      {/* ✅ أول حاجة HeroSection */}
      <HeroSection />

      {/* ✅ باقي السكاشن Suspense */}
      <Suspense fallback={<div className="text-center py-10">Loading team...</div>}>
        <TeamSectionServer />
      </Suspense>

      <Suspense
        fallback={<div className="text-center py-10">Loading clients...</div>}
      >
        <ClientSectionServer />
      </Suspense>

      {/* ✅ SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHeroJSONLD(heroData.data)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateTeamJSONLD(teamData.data)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateClientsJSONLD(clientsData.data)),
        }}
      />
    </>
  );
}
