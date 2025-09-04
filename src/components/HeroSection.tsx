"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HeroData } from "@/lib/structuredData";
import { useLanguage } from "@/components/LanguageContext"; // Fixed import path

interface HeroSectionProps {
  data?: HeroData; // Accepts HeroData as prop
}

interface HeroAPIResponse {
  title?: string;
  description?: { children: { text: string }[] }[];
  backgroundImage?: {
    url: string;
    mime?: string;
  };
  image?: { url: string };
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { language } = useLanguage(); // Get language from context
  const [slides, setSlides] = useState<HeroData[]>([]);
  const [current, setCurrent] = useState(0);

  const isRTL = language === "AR";

  useEffect(() => {
    if (data) {
      setSlides([data]);
      return;
    }

    async function fetchHero() {
      try {
        const locale = isRTL ? "ar" : "en";
        // Fixed API endpoint to match page.tsx (hero instead of heroes)
        const res = await fetch(
          `https://tranquil-positivity-9ec86ca654.strapiapp.com/api/heroes?populate=*&locale=${locale}`
        );
        const result = await res.json();

        // Handle both single object and array responses
        const heroArray = Array.isArray(result?.data) ? result.data : [result?.data].filter(Boolean);

        if (heroArray.length === 0) return;

        const heroData: HeroData[] = heroArray.map((item: HeroAPIResponse) => {
          return {
            title: item.title || "",
            description: Array.isArray(item.description)
              ? item.description
                  .map((block) =>
                    block.children.map((child) => child.text).join(" ")
                  )
                  .join("\n")
              : "",
            background: item.backgroundImage
              ? {
                  url: item.backgroundImage.url,
                  // Fixed TypeScript issue with potential undefined
                  type: (item.backgroundImage.mime?.startsWith("video") ?? false)
                    ? "video"
                    : "image",
                }
              : null,
            image: item.image?.url || null,
          };
        });

        setSlides(heroData);
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    }

    fetchHero();
  }, [language, data, isRTL]);

  // Auto slider every 5 seconds
  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  if (slides.length === 0) return null;

  const { title, description, background, image } = slides[current];

  return (
    <section
      className={`relative w-full h-[600px] md:h-[650px] flex items-center justify-center overflow-hidden`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background */}
      {background?.type === "image" && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url(${background.url})` }}
        />
      )}
      {background?.type === "video" && (
        <video
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          src={background.url}
          autoPlay
          muted
          loop
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4B2615AD] to-[#4B261547]"></div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-white max-w-5xl px-4 md:px-0 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {/* Text */}
        <div className="w-full md:w-[700px] mt-10 md:mt-25">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-base sm:text-lg md:text-lg">{description}</p>
        </div>

        {/* Photo - Fixed to use Next.js Image component */}
        {image && typeof image === "string" && (
        <div className="w-[275px] sm:w-[300px] md:w-[374px] h-[275px] sm:h-[350px] md:h-[374px]">
          <Image
            src={image}
            alt="Hero image"
            width={374}
            height={374}
            className="w-full h-full object-cover rounded-xl shadow-lg bg-[#643F2E]"
            priority
          />
        </div>
      )}
      </div>

      {/* Vertical Dots - Only show if multiple slides */}
      {slides.length > 1 && (
        <div className="absolute top-1/2 transform -translate-y-1/2 left-[3%] flex flex-col gap-4 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                idx === current ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}