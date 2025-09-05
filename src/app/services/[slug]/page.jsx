"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Loading from "@/components/Loading"; 

function renderRichText(blocks) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i} className="mb-4">
          {block.children.map((child, j) => (
            child.type === "text" ? (
              <span key={j} className={child.bold ? "font-bold" : ""}>
                {child.text}
              </span>
            ) : null
          ))}
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
    const controller = new AbortController();

    async function fetchService() {
      try {
        const res = await fetch(
          `${BASE_URL}/api/services?filters[slug][$eq]=${slug}&populate=*`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setService(data.data[0] || null);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchService();
    return () => controller.abort();
  }, [slug]);

  // Memoized content — نحسبها هنا لكن بدون شرط قبل الـ Hooks
  const renderedDescription = useMemo(() => renderRichText(service?.description), [service?.description]);
  const renderedSections = useMemo(() => service?.sections?.map(section => (
    <div key={section.id} className="mb-10">
      <h3 className="text-[20px] font-semibold mb-3 text-[#4B2615]">{section.title || ""}</h3>
      <div>{renderRichText(section.text)}</div>
      {section.list?.length > 0 && (
        <ul className="list-disc list-inside space-y-1 text-[16px]">
          {section.list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )), [service?.sections]);

  if (loading) return <Loading />; 
  if (!service)
    return (
      <div className="p-10 text-center text-red-600">Service not found</div>
    );

  const { title } = service;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[650px] w-full">
        <Image
          src="/Imgs/cover.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="/Imgs/placeholder.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3d1f1247] to-[#3a1d10ad]" />
      </section>

      {/* Content */}
      <section className="w-full bg-white text-gray-800 px-10 py-16">
        <h2 className="text-[42px] font-bold mb-6 text-[#4B2615]">{title}</h2>
        <div className="max-w-4xl mb-10">{renderedDescription}</div>
        {renderedSections}
      </section>
    </>
  );
}
