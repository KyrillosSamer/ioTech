'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const BASE_URL = "http://localhost:1337";

  const [teamResults, setTeamResults] = useState([]);
  const [serviceResults, setServiceResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);

      try {
        // Fetch teams and services
        const [teamRes, serviceRes] = await Promise.all([
          fetch(`${BASE_URL}/api/teams?populate=image`),
          fetch(`${BASE_URL}/api/services?populate=*`)
        ]);

        const teamData = await teamRes.json();
        const serviceData = await serviceRes.json();

        // Format Team
        const formattedTeam = (teamData.data || []).map(member => ({
          id: member.id,
          name: member.name || "No Name",
          position: member.position || "No Position",
          image: member.image?.[0]?.formats?.small?.url
            ? `${BASE_URL}${member.image[0].formats.small.url}`
            : member.image?.[0]?.url
              ? `${BASE_URL}${member.image[0].url}`
              : "/Imgs/person.png"
        }));

        // Format Services
        const formattedServices = (serviceData.data || []).map(service => ({
          id: service.id,
          title: service.attributes?.title || "No Title",
          slug: service.attributes?.slug || "#",
          description: service.attributes?.description
            ?.map(p => p.children?.map(c => c.text).join(" ") || "")
            .join(" ")
            .trim() || "No Description"
        }));

        // Filter by query
        const lowerQuery = query.toLowerCase();
        setTeamResults(formattedTeam.filter(member => 
          member.name.toLowerCase().includes(lowerQuery) || 
          member.position.toLowerCase().includes(lowerQuery)
        ));
        setServiceResults(formattedServices.filter(service => 
          service.title.toLowerCase().includes(lowerQuery)
        ));

      } catch (error) {
        console.error("Error fetching search results:", error);
        setTeamResults([]);
        setServiceResults([]);
      } finally {
        setLoading(false);
      }
    }

    if (query.trim() !== "") {
      fetchResults();
    } else {
      setTeamResults([]);
      setServiceResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Search Results for: "{query}"
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading results...</p>
      ) : (
        <>
          {/* Team Results */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#643F2E]">Team</h2>
            {teamResults.length === 0 ? (
              <p className="text-gray-500">No team members found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teamResults.map(member => (
                  <div key={member.id} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-48 object-cover rounded"
                    />
                    <h3 className="mt-2 font-semibold text-lg">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Services Results */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#643F2E]">Services</h2>
            {serviceResults.length === 0 ? (
              <p className="text-gray-500">No services found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {serviceResults.map(service => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="block p-4 border rounded-lg shadow hover:shadow-lg transition"
                  >
                    <h3 className="font-semibold text-lg text-[#643F2E]">{service.title}</h3>
                    <p className="text-gray-600 mt-2 line-clamp-3">{service.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <Link href="/" className="text-blue-500 underline mt-4 block">
        Go Back Home
      </Link>
    </div>
  );
}
