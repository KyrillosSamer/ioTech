'use client';

import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaPhone, FaEnvelope, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);

  const BASE_URL = "http://localhost:1337"; // رابط Strapi

  // جلب البيانات من Strapi
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/teams?populate=image`); // صححت الاسم
        if (!res.ok) throw new Error(`Failed to fetch team: ${res.status}`);
        const data = await res.json();

        const formattedTeam = data?.data?.map(member => ({
          id: member.id,
          name: member.name || "No Name",
          position: member.position || "No Position",
          whatsapp: member.whatsapp || "#",
          phone: member.phone || "#",
          email: member.email || "#",
          image: member.image?.[0]?.formats?.small?.url
            ? `${BASE_URL}${member.image[0].formats.small.url}`
            : member.image?.[0]?.url
              ? `${BASE_URL}${member.image[0].url}`
              : "/Imgs/person.png" // fallback
        }));

        setTeam(formattedTeam);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeam();
  }, []);

  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
    }
    return 3;
  };

  useEffect(() => {
    setVisibleCount(getVisibleCount());
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => setIndex(index === 0 ? Math.max(team.length - visibleCount, 0) : index - 1);
  const nextSlide = () => setIndex(index + visibleCount >= team.length ? 0 : index + 1);

  return (
    <div className="w-full max-w-[1400px] mx-auto text-center mt-32 relative px-4 sm:px-6 lg:px-0">
      <h1 className="text-3xl sm:text-4xl text-[#643F2E] font-bold">Our Team</h1>
      <p className="w-full sm:w-[500px] mx-auto mt-4 text-gray-600 text-sm sm:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quasi et voluptatum quidem non expedita vitae.
      </p>

      <div className="flex justify-center items-center gap-4 sm:gap-6 lg:gap-8 mt-12 overflow-hidden">
        {team.slice(index, index + visibleCount).map(member => (
          <div key={member.id} className="flex-shrink-0 w-[250px] sm:w-[250px] lg:w-[269px] mb-25">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-[250px] sm:h-[180px] lg:h-[184px] object-cover rounded-lg shadow-md bg-[#643F2E]"
            />
            <h2 className="mt-3 text-lg font-semibold text-[#643F2E]">{member.name}</h2>
            <p className="text-gray-500 text-sm">{member.position}</p>
            <div className="flex justify-center gap-4 mt-3 text-[#643F2E] text-xl mb-6">
              <a href={`https://wa.me/${member.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
              </a>
              <a href={`tel:${member.phone}`}><FaPhone className="hover:text-blue-500 cursor-pointer" /></a>
              <a href={`mailto:${member.email}`}><FaEnvelope className="hover:text-red-500 cursor-pointer" /></a>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prevSlide} className="absolute left-2 sm:left-10 top-1/2 -translate-y-1/2 bg-[#643F2E] text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-[#4e3224]">
        <FaArrowLeft />
      </button>
      <button onClick={nextSlide} className="absolute right-2 sm:right-10 top-1/2 -translate-y-1/2 bg-[#643F2E] text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-[#4e3224]">
        <FaArrowRight />
      </button>
    </div>
  );
}
