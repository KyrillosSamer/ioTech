"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading"; 

//func Rich Text (Strapi blocks) to JSX
function renderRichText(blocks) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i} className="mb-4">
          {block.children.map((child, j) => {
            if (child.type === "text") {
              return (
                <span key={j} className={child.bold ? "font-bold" : ""}>
                  {child.text}
                </span>
              );
            }
            return null;
          })}
        </p>
      );
    }
    return null;
  });
}

export default function ServicePage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://tranquil-positivity-9ec86ca654.strapiapp.com";

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(
          `${BASE_URL}/api/services?filters[slug][$eq]=${slug}&populate=*`
        );
        const data = await res.json();
        setService(data.data[0] || null);
      } catch (err) {
        console.error("Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchService();
  }, [slug]);

  if (loading) return <Loading />; // ✅ استخدام Loading Component
  if (!service)
    return (
      <div className="p-10 text-center text-red-600">Service not found</div>
    );

  const { title, description, sections } = service;

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[650px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/Imgs/cover.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3d1f1247] to-[#3a1d10ad]"></div>
      </section>

      {/* Content */}
      <section className="w-full bg-white text-gray-800 px-10 py-16">
        <h2 className="text-[42px] font-bold mb-6 text-[#4B2615]">{title}</h2>

        {/* Description */}
        <div className="max-w-4xl mb-10">{renderRichText(description)}</div>

        {/* Sections */}
        {sections?.map((section) => (
          <div key={section.id} className="mb-10">
            <h3 className="text-[20px] font-semibold mb-3 text-[#4B2615]">
              {section.title || ""}
            </h3>

            <div>{renderRichText(section.text)}</div>

            {section.list?.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-[16px]">
                {section.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
