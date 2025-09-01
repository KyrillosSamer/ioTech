"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesDropdown({ isOpen, isMobile, language }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("http://localhost:1337/api/services?populate=*");
        const json = await res.json();
        setServices(json.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchServices();
  }, []);

const containerClasses = isMobile
  ? `flex flex-col p-4 bg-[#643F2E] rounded-lg shadow-md transition-all duration-300 ease-in-out
     ${isOpen ? "max-h-64 opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}`
  : `absolute top-[37px] ${language === "AR" ? "left-[-1409%]" : "left-[-648%]"} w-[1200px] h-full pb-14 bg-[#643F2E] text-white shadow-lg rounded-lg p-6 z-50
     transform transition-all duration-300 ease-in-out
     ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`;


  const linkClasses =
    "text-white hover:text-[#FFD700] text-sm font-medium transition py-1 px-2";

  return (
    <div className={containerClasses}>
      {isMobile ? (
        services?.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className={linkClasses}
          >
            {service.title}
          </Link>
        ))
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {services?.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="h-[40px] flex items-center justify-left text-white hover:text-[#FFD700] text-center text-sm font-medium transition"
            >
              {service.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
