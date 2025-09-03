"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesDropdown({ isOpen, isMobile }) {
  const [services, setServices] = useState([]);

  const BASE_URL = "https://tranquil-positivity-9ec86ca654.strapiapp.com";

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${BASE_URL}/api/services?populate=*`);
        const json = await res.json();
        setServices(json.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchServices();
  }, []);

  const containerClasses = isMobile
    ? `flex flex-col p-1 bg-[#643F2E] rounded-lg shadow-md transition-all duration-300 ease-in-out
       ${isOpen ? "max-h-64 opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}`
    : `absolute top-[37px] left-[-600%] w-[1220px] h-[250px] pb-8 bg-[#643F2E] text-white shadow-lg rounded-lg p-4 z-50
       transform transition-all duration-300 ease-in-out
       ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`;

  const linkClasses =
    "text-white hover:text-[#FFD700] text-sm font-medium transition py-0.5 px-1";

  return (
    <div className={containerClasses}>
      {isMobile ? (
        services?.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug || "#"}`}
            className={linkClasses}
          >
            {service.title || "No Title"}
          </Link>
        ))
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {services?.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug || "#"}`}
              className="h-[32px] flex items-center text-white hover:text-[#FFD700] text-sm font-medium transition"
            >
              {service.title || "No Title"}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
