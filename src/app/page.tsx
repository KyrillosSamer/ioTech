// app/page.tsx
import HeroSection from "@/components/HeroSection";
import TeamSectionServer from "@/components/TeamSection";
import ClientSectionServer from "@/components/Client";
import { generateHeroJSONLD, generateTeamJSONLD, generateClientsJSONLD } from "@/lib/structuredData";

// Generate dynamic metadata for SEO
export async function generateMetadata() {
  const hero = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/hero').then(res => res.json());
  const team = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/teams').then(res => res.json());
  const clients = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/clients').then(res => res.json());

  return {
    title: hero?.title || "IO Tech - Legal & Corporate Services",
    description: hero?.description?.slice(0, 160) || "Trusted legal & corporate services.",
    openGraph: {
      title: hero?.title || "IO Tech - Legal & Corporate Services",
      description: hero?.description?.slice(0, 160) || "Trusted legal & corporate services.",
      url: "https://yourdomain.com",
      siteName: "IO Tech",
      images: [
        {
          url: hero?.image?.url || "/Imgs/cover.jpg",
          width: 1200,
          height: 630,
          alt: hero?.title || "IO Tech Legal Services",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: hero?.title || "IO Tech - Legal & Corporate Services",
      description: hero?.description?.slice(0, 160) || "Trusted legal & corporate services.",
      images: [hero?.image?.url || "/Imgs/cover.jpg"],
    },
  };
}

// Home Page Component
export default async function Home() {
  // Fetch data from APIs
  const hero = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/hero').then(res => res.json());
  const team = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/teams').then(res => res.json());
  const clients = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/clients').then(res => res.json());

  return (
    <>
      {/* Hero Section */}
      <HeroSection data={hero?.data} />

      {/* Team Section */}
      <TeamSectionServer team={team?.data} />

      {/* Clients Section */}
      <ClientSectionServer clients={clients?.data} />

      {/* Structured Data JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHeroJSONLD(hero?.data)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateTeamJSONLD(team?.data)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateClientsJSONLD(clients?.data)),
        }}
      />
    </>
  );
}
