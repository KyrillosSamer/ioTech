'use client'; 

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const BASE_URL = "https://tranquil-positivity-9ec86ca654.strapiapp.com";

  const [teamResults, setTeamResults] = useState([]);
  const [serviceResults, setServiceResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);

      try {
        const [teamRes, serviceRes] = await Promise.all([
          fetch(`${BASE_URL}/api/teams?populate=image`),
          fetch(`${BASE_URL}/api/services?populate=*`)
        ]);

        const teamData = await teamRes.json();
        const serviceData = await serviceRes.json();

        const formattedTeam = (teamData.data || []).map(member => {
          let imgUrl = null;

          if (member.image && member.image.length > 0) {
            if (member.image[0].formats?.small?.url) {
              imgUrl = member.image[0].formats.small.url;
            } else if (member.image[0].url) {
              imgUrl = member.image[0].url;
            }
          }

          return {
            id: member.id,
            name: member.name || "No Name",
            position: member.position || "No Position",
            image: imgUrl,
          };
        });

        const formattedServices = (serviceData.data || []).map(service => ({
          id: service.id,
          title: service.attributes?.title || "No Title",
          slug: service.attributes?.slug || "#",
          description: service.attributes?.description
            ?.map(p => p.children?.map(c => c.text).join(" ") || "")
            .join(" ")
            .trim() || "No Description"
        }));

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
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#643F2E]">
        Search Results for: "{query}"
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading results...</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 ">
          {/* Column 1: Titles / Navigation */}
          <div className="md:w-1/4 flex flex-col gap-6 mt-40">
            <h2 className="text-xl font-semibold text-[#643F2E]">Team</h2>
            <h2 className="text-xl font-semibold text-[#643F2E]">Services</h2>
            <Link href="/" className="text-blue-500 underline mt-4">
              Go Back Home
            </Link>
          </div>

          {/* Column 2: Results */}
          <div className="md:w-3/4 flex flex-col gap-8 mt-20">
            {/* Team Results */}
            {teamResults.length === 0 ? (
              <p className="text-gray-500">No team members found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                {teamResults.map(member => (
                  <div key={member.id} className="border rounded-lg shadow hover:shadow-lg transition">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-48 object-cover rounded bg-[#643F2E]"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center rounded bg-gray-200 text-gray-500">
                        No Image
                      </div>
                    )}
                    <h3 className="p-4 mt-2 font-semibold text-lg">{member.name}</h3>
                    <p className="p-4 text-gray-600">{member.position}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Services Results */}
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
        </div>
      )}
    </div>
  );
}
