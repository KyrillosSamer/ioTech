'use client';
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from '../components/LanguageContext.jsx'; // Language context

export default function FeedBack() {
  const { language } = useLanguage(); 
  const [clients, setClients] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const BASE_URL = "https://tranquil-positivity-9ec86ca654.strapiapp.com";

  useEffect(() => {
    async function fetchClients() {
      try {
        const locale = language === "AR" ? "ar" : "en";
        const res = await fetch(`${BASE_URL}/api/clients?populate=image&locale=${locale}`);
        const data = await res.json();

        const formattedClients = data?.data?.map(item => ({
          name: item?.name || "No Name",
          position: item?.position || "No Position",
          feedback: item?.feedback
            ?.map(f => f.children.map(c => c.text).join(''))
            .join('\n') || "No Feedback",
          img: item?.image?.[0]?.formats?.small?.url
            ? item.image[0].formats.small.url
            : item?.image?.[0]?.url
              ? item.image[0].url
              : "/Imgs/person.png"
        })) || [];

        setClients(formattedClients);
        setCurrentIndex(0);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    }

    fetchClients();
  }, [language]);

  if (clients.length === 0) return <div className="p-10 text-center text-gray-700"></div>;

  const client = clients[currentIndex];
  const isRTL = language === "AR";

  const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? clients.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex(prev => (prev === clients.length - 1 ? 0 : prev + 1));

  return (
    <div
      className="w-full max-w-[1400px] bg-[#4b2615] flex flex-col text-white p-6 sm:p-10 mb-8 mx-auto"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Section Header */}
      <div className={`mb-8 sm:mb-16 ${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          {isRTL ? "ماذا يقول عملاؤنا" : "What Our Clients Are Saying"}
        </h1>
        <p className="text-gray-200 opacity-70 text-sm sm:text-base sm:w-[579px]">
          {isRTL
            ? "عملاؤنا يتنوعون بين مستثمرين فرديين، شركات محلية ودولية، بالإضافة إلى شركات Fortune 500."
            : "Our clients range from individual investors, to local, international as well as fortune 500 companies."
          }
        </p>
      </div>

      {/* Testimonial Content */}
      <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-10`}>
        {/* Image on right side only for Arabic */}
        <img
          src={client.img}
          alt={client.name}
          className={`w-full max-w-[300px] sm:max-w-[374px] h-[300px] sm:h-[374px] object-cover rounded-lg bg-[#643F2E] 
            ${isRTL ? "order-2 md:order-1" : "order-1"}`}
        />

        <div className={`w-full md:w-[728px] ${isRTL ? "order-1 md:order-2" : "order-2"}`}>
          <p className="opacity-60 mb-4 sm:mb-6 text-base sm:text-[24px]">"{client.feedback}"</p>
          <h5 className="text-xl sm:text-2xl font-semibold">{client.name}</h5>
          <p className="text-gray-300 text-sm sm:text-base">{client.position}</p>
        </div>
      </div>

      {/* Arrows */}
      <div
        className={`flex gap-4 sm:gap-6 mt-6 ${isRTL ? "justify-start flex-row-reverse" : "justify-end"}`}
      >
        <FaArrowLeft
          onClick={handlePrev}
          className="border rounded-full text-[#4b2615] bg-white/50 text-2xl sm:text-4xl p-2 cursor-pointer hover:bg-white"
        />
        <FaArrowRight
          onClick={handleNext}
          className="border rounded-full text-[#4b2615] bg-white text-2xl sm:text-4xl p-2 cursor-pointer hover:bg-white/80"
        />
      </div>
    </div>
  );
}
