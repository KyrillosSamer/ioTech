// app/page.tsx
import HeroSection from "@/components/HeroSection";
import TeamSectionServer from "@/components/TeamSection";
import ClientSectionServer from "@/components/Client";
import { 
  generateHeroJSONLD, 
  generateTeamJSONLD, 
  generateClientsJSONLD, 
  HeroData, 
  TeamMember, 
  Client 
} from "@/lib/structuredData";

// Generate dynamic metadata for SEO
export async function generateMetadata() {
  const heroRes = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/hero');
  const heroData: { data?: HeroData } = await heroRes.json();

  const teamRes = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/teams');
  const teamData: { data?: TeamMember[] } = await teamRes.json();

  const clientsRes = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/clients');
  const clientsData: { data?: Client[] } = await clientsRes.json();

  const hero = heroData.data;

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
  const heroRes = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/hero');
  const heroData: { data?: HeroData } = await heroRes.json();

  const teamRes = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/teams');
  const teamData: { data?: TeamMember[] } = await teamRes.json();

  const clientsRes = await fetch('https://tranquil-positivity-9ec86ca654.strapiapp.com/api/clients');
  const clientsData: { data?: Client[] } = await clientsRes.json();

  return (
    <>
      <HeroSection data={heroData.data} />
      <TeamSectionServer team={teamData.data} />
      <ClientSectionServer clients={clientsData.data} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateHeroJSONLD(heroData.data)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateTeamJSONLD(teamData.data)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateClientsJSONLD(clientsData.data)) }}
      />
    </>
  );
}
