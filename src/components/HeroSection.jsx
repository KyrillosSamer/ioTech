"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "../components/LanguageContext.jsx"; // Language context

export default function HeroSection() {
  const { language } = useLanguage(); // Get language from context
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  const BASE_URL = "https://tranquil-positivity-9ec86ca654.strapiapp.com";
  const isRTL = language === "AR";

  useEffect(() => {
    async function fetchHero() {
      try {
        const locale = isRTL ? "ar" : "en";
        const res = await fetch(`${BASE_URL}/api/heroes?populate=*&locale=${locale}`);
        const data = await res.json();

        if (!data?.data || !Array.isArray(data.data)) {
          console.error("API response unexpected:", data);
          return;
        }

        const heroData = data.data.map((item) => {
          const attrs = item;

          return {
            title: attrs.title || "",
            description: Array.isArray(attrs.description)
              ? attrs.description
                  .map((block) =>
                    block.children.map((child) => child.text).join(" ")
                  )
                  .join("\n")
              : "",
            background: attrs.backgroundImage
              ? {
                  url: attrs.backgroundImage.url,
                  type: attrs.backgroundImage.mime?.startsWith("video")
                    ? "video"
                    : "image",
                }
              : null,
            image: attrs.image ? attrs.image.url : null,
          };
        });

        setSlides(heroData);
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    }

    fetchHero();
  }, [language]);

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

        {/* Photo */}
        {image && (
          <div className="w-[275px] sm:w-[300px] md:w-[374px] h-[275px] sm:h-[350px] md:h-[374px]">
            <img
              src={image}
              alt="Side"
              className="w-full h-full object-cover rounded-xl shadow-lg bg-[#643F2E]"
            />
          </div>
        )}
      </div>

      {/* Vertical Dots */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-[3%] flex flex-col gap-4 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
}
