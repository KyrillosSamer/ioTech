"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HeroData } from "@/lib/structuredData";
import { useLanguage } from "@/components/LanguageContext"; 

interface HeroSectionProps {
  data?: HeroData; 
}

interface HeroAPIResponse {
  title?: string;
  description?: { children: { text: string }[] }[] ;
  backgroundImage?: {
    url: string;
    mime?: string;
  };
  image?: { url: string };
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { language } = useLanguage();
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
        const res = await fetch(
          `https://tranquil-positivity-9ec86ca654.strapiapp.com/api/heroes?populate=*&locale=${locale}`
        );
        const result = await res.json();
        const heroArray = Array.isArray(result?.data)
          ? result.data
          : [result?.data].filter(Boolean);
        if (!heroArray.length) return;

        const heroData: HeroData[] = heroArray.map((item: HeroAPIResponse) => ({
          title: item.title || "",
          description: Array.isArray(item.description)
            ? item.description
                .map(block => block.children.map(child => child.text).join(" "))
                .join("\n")
            : "",
          background: item.backgroundImage
            ? {
                url: item.backgroundImage.url,
                type: item.backgroundImage.mime?.startsWith("video") ? "video" : "image",
              }
            : null,
          image: item.image?.url || null,
        }));

        setSlides(heroData);
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    }

    fetchHero();
  }, [language, data, isRTL]);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), 5000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  if (!slides.length) return null;

  const { title, description, background, image } = slides[current];

  return (
    <section
      className="relative w-full min-h-[650px] md:min-h-[650px] flex items-center justify-center overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {background?.type === "image" && (
        <Image
          src={background.url}
          alt="Background"
          fill
          className="absolute inset-0 object-cover transition-opacity duration-700"
          priority
          quality={50}
          placeholder="blur"
          blurDataURL="/Imgs/placeholder.png"
        />
      )}
      {background?.type === "video" && (
        <video
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          src={background.url}
          autoPlay
          muted
          loop
          preload="metadata"
          playsInline
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-[#4B2615AD] to-[#4B261547]"></div>

      <div
        className={`relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 text-white max-w-5xl px-4 md:px-0 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <div className="w-full md:w-[700px] text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-center">{title}</h1>
          <p className="text-sm sm:text-base md:text-lg">{description}</p>
        </div>

        {image && (
          <div className="w-[275px] sm:w-[300px] md:w-[374px] h-[275px] sm:h-[350px] md:h-[374px] relative">
            <Image
              src={image}
              alt="Hero image"
              fill
              className="object-cover rounded-xl shadow-lg bg-[#643F2E]"
              priority
              quality={70}
              placeholder="blur"
              blurDataURL="/Imgs/placeholder.png"
            />
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-row gap-3 md:top-1/2 md:left-[3%] md:flex-col md:gap-4 z-20">
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
