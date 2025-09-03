// src/lib/structuredData.ts

export function generateHeroJSONLD(heroData: any) {
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

export function generateTeamJSONLD(teamData: any[]) {
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

export function generateClientsJSONLD(clientsData: any[]) {
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

// ✅ About page JSON-LD
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

// ✅ Blog page JSON-LD
export function generateBlogJSONLD(blogData: any) {
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

// ✅ Contact page JSON-LD
export function generateContactJSONLD(contactData: any) {
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

// ✅ Service page JSON-LD
export function generateServiceJSONLD(serviceData: any) {
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
