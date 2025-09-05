'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from './LanguageContext';

interface Client {
  name: string;
  position: string;
  feedback: string;
  img: string;
}

interface StrapiClient {
  id: number;
  name?: string;
  position?: string;
  feedback?: Array<{ children: Array<{ text: string }> }>;
  image?: Array<{ formats?: { small?: { url?: string } }; url?: string }>;
}

export default function FeedBack() {
  const { language } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const BASE_URL = "https://tranquil-positivity-9ec86ca654.strapiapp.com";
  const isRTL = language === "AR";

  // Fetch Clients
  useEffect(() => {
    async function fetchClients() {
      try {
        const locale = isRTL ? "ar" : "en";
        const res = await fetch(`${BASE_URL}/api/clients?populate=image&locale=${locale}`);
        const data = await res.json();

        const formattedClients: Client[] = data?.data?.map((item: StrapiClient) => ({
          name: item?.name || "No Name",
          position: item?.position || "No Position",
          feedback: item?.feedback
            ?.map(f => f.children.map(c => c.text).join(''))
            .join('\n') || "No Feedback",
          img: item?.image?.[0]?.formats?.small?.url
            || item?.image?.[0]?.url
            || "/Imgs/person.png"
        })) || [];

        setClients(formattedClients);
        setCurrentIndex(0);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    }

    fetchClients();
  }, [language, isRTL]);

  if (!clients.length) return <div className="p-10 text-center text-gray-700"></div>;

  const client = clients[currentIndex];

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
        {/* Image */}
        <div className={`relative w-full max-w-[300px] sm:max-w-[374px] h-[300px] sm:h-[374px] ${isRTL ? "order-2 md:order-1" : "order-1"}`}>
          <Image
            src={client.img}
            alt={client.name}
            fill
            className="object-cover rounded-lg bg-[#643F2E]"
            priority={currentIndex === 0} // أول عميل يعطي أولوية للـ LCP
            quality={70} // تقليل حجم الصورة
            placeholder="blur"
            blurDataURL="/Imgs/person.png"
          />
        </div>

        {/* Feedback Text */}
        <div className={`w-full md:w-[728px] ${isRTL ? "order-1 md:order-2" : "order-2"}`}>
          <p className="opacity-60 mb-4 sm:mb-6 text-base sm:text-[24px]">{`"${client.feedback}"`}</p>
          <h5 className="text-xl sm:text-2xl font-semibold">{client.name}</h5>
          <p className="text-gray-300 text-sm sm:text-base">{client.position}</p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className={`flex gap-4 sm:gap-6 mt-6 ${isRTL ? "justify-start flex-row-reverse" : "justify-end"}`}>
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
