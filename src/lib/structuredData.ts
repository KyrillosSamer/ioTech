// src/lib/structuredData.ts

type HeroData = {
  title?: string;
  description?: string;
  image?: { url?: string };
};

type TeamMember = {
  name?: string;
  position?: string;
  email?: string;
  phone?: string;
};

type Client = {
  name?: string;
};

type BlogData = {
  title?: string;
  description?: string;
  url?: string;
  datePublished?: string;
};

type ContactData = {
  name?: string;
  url?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
};

type ServiceData = {
  title?: string;
  description?: { children: { text: string }[] }[];
  slug?: string;
};

// ✅ Hero
export function generateHeroJSONLD(heroData?: HeroData) {
  if (!heroData) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: heroData.title || "IO Tech",
    description: heroData.description?.slice(0, 160) || "Trusted legal & corporate services.",
    url: "https://yourdomain.com",
    logo: heroData.image?.url || "/Imgs/cover.jpg",
  };
}

// ✅ Team
export function generateTeamJSONLD(teamData?: TeamMember[]) {
  if (!teamData || !Array.isArray(teamData)) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    member: teamData.map(member => ({
      "@type": "Person",
      name: member.name || "No Name",
      jobTitle: member.position || "No Position",
      email: member.email || "",
      telephone: member.phone || "",
    })),
  };
}

// ✅ Clients
export function generateClientsJSONLD(clientsData?: Client[]) {
  if (!clientsData || !Array.isArray(clientsData)) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    memberOf: clientsData.map(client => ({
      "@type": "Organization",
      name: client.name || "No Name",
    })),
  };
}

// ✅ About page
export function generateAboutJSONLD() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IO Tech",
    url: "https://yourdomain.com",
    logo: "/Imgs/cover.jpg",
    description: "IO Tech is a leading law firm providing legal consultation, corporate services, and litigation across all sectors.",
    founder: [
      { "@type": "Person", name: "John Due" },
      { "@type": "Person", name: "Mina Samer" }
    ],
    sameAs: [
      "https://www.linkedin.com/company/io-tech",
      "https://www.facebook.com/io-tech"
    ]
  };
}

// ✅ Blog
export function generateBlogJSONLD(blogData?: BlogData) {
  if (!blogData) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blogData.title || "IO Tech Blog",
    description: blogData.description || "Latest news and updates from IO Tech",
    url: blogData.url || "https://yourdomain.com/blog",
    datePublished: blogData.datePublished || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "IO Tech"
    }
  };
}

// ✅ Contact
export function generateContactJSONLD(contactData?: ContactData) {
  if (!contactData) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: contactData.name || "IO Tech",
    url: contactData.url || "https://yourdomain.com",
    telephone: contactData.phone || "",
    email: contactData.email || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: contactData.address?.street || "",
      addressLocality: contactData.address?.city || "",
      addressCountry: contactData.address?.country || "",
    },
  };
}

// ✅ Service
export function generateServiceJSONLD(serviceData?: ServiceData) {
  if (!serviceData) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceData.title || "IO Tech Service",
    description: serviceData.description?.map(d => d.children.map(c => c.text).join(" ")).join(" ") || "Professional legal and corporate services",
    provider: {
      "@type": "Organization",
      name: "IO Tech",
      url: "https://yourdomain.com",
      logo: "/Imgs/cover.jpg",
    },
    url: `https://yourdomain.com/services/${serviceData.slug || ""}`,
  };
}
