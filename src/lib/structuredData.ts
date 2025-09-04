
//  Types
export type HeroData = {
  title?: string;
  description?: string;
  image?: { url?: string };
  background?: {
    url?: string;
    type?: "image" | "video";
  };
};



export type TeamMember = {
  name?: string;
  position?: string;
  email?: string;
  phone?: string;
};

export type Client = {
  name?: string;
};

export type BlogData = {
  title?: string;
  description?: string;
  url?: string;
  datePublished?: string;
};

export type ContactData = {
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

export type ServiceData = {
  title?: string;
  description?: { children: { text: string }[] }[];
  slug?: string;
};

// 🌍 Base info
const BASE_URL = "https://yourdomain.com";
const LOGO_URL = `${BASE_URL}/Imgs/cover.jpg`;
const SOCIALS = [
  "https://www.linkedin.com/company/io-tech",
  "https://www.facebook.com/io-tech"
];

// . Hero
export function generateHeroJSONLD(heroData?: HeroData) {
  if (!heroData) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}#organization`,
    name: heroData.title || "IO Tech",
    description: heroData.description?.slice(0, 160) || "Trusted legal & corporate services.",
    url: BASE_URL,
    logo: heroData.image?.url || LOGO_URL,
    sameAs: SOCIALS
  };
}

// . Team
export function generateTeamJSONLD(teamData?: TeamMember[]) {
  if (!teamData || !Array.isArray(teamData)) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}#organization`,
    member: teamData.map((member, idx) => ({
      "@type": "Person",
      "@id": `${BASE_URL}#member-${idx + 1}`,
      name: member.name || "No Name",
      jobTitle: member.position || "No Position",
      email: member.email || "",
      telephone: member.phone || ""
    })),
    sameAs: SOCIALS
  };
}

// . Clients
export function generateClientsJSONLD(clientsData?: Client[]) {
  if (!clientsData || !Array.isArray(clientsData)) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}#organization`,
    memberOf: clientsData.map((client, idx) => ({
      "@type": "Organization",
      "@id": `${BASE_URL}#client-${idx + 1}`,
      name: client.name || "No Name"
    })),
    sameAs: SOCIALS
  };
}

// . About page
export function generateAboutJSONLD() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}#organization`,
    name: "IO Tech",
    url: BASE_URL,
    logo: LOGO_URL,
    description: "IO Tech is a leading law firm providing legal consultation, corporate services, and litigation across all sectors.",
    founder: [
      { "@type": "Person", name: "John Due" },
      { "@type": "Person", name: "Mina Samer" }
    ],
    sameAs: SOCIALS
  };
}

// . Blog
export function generateBlogJSONLD(blogData?: BlogData) {
  if (!blogData) return {};
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": blogData.url || `${BASE_URL}/blog`,
    headline: blogData.title || "IO Tech Blog",
    description: blogData.description || "Latest news and updates from IO Tech",
    url: blogData.url || `${BASE_URL}/blog`,
    datePublished: blogData.datePublished || new Date().toISOString(),
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}#organization`,
      name: "IO Tech"
    },
    publisher: {
      "@type": "Organization",
      name: "IO Tech",
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL
      }
    }
  };
}

// . Contact
export function generateContactJSONLD(contactData?: ContactData) {
  if (!contactData) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}#organization`,
    name: contactData.name || "IO Tech",
    url: contactData.url || BASE_URL,
    telephone: contactData.phone || "",
    email: contactData.email || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: contactData.address?.street || "",
      addressLocality: contactData.address?.city || "",
      addressCountry: contactData.address?.country || ""
    },
    sameAs: SOCIALS
  };
}

// . Service
export function generateServiceJSONLD(serviceData?: ServiceData) {
  if (!serviceData) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/services/${serviceData.slug || ""}#service`,
    name: serviceData.title || "IO Tech Service",
    description: serviceData.description?.map(d => d.children.map(c => c.text).join(" ")).join(" ") || "Professional legal and corporate services",
    provider: {
      "@type": "Organization",
      "@id": `${BASE_URL}#organization`,
      name: "IO Tech",
      url: BASE_URL,
      logo: LOGO_URL
    },
    url: `${BASE_URL}/services/${serviceData.slug || ""}`
  };
}
