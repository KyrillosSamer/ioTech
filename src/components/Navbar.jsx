'use client';
import React, { useState } from "react";
import Link from "next/link";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import ServicesDropdown from "../components/ServicesDropdown.jsx";

export default function Navbar({ variant }) {
  const [language, setLanguage] = useState("EN");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const router = useRouter();

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "EN" ? "AR" : "EN"));
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const navbarClasses = variant === "service"
    ? "flex items-center justify-between border rounded-xl w-full md:w-[1252px] h-[71px] px-4 md:px-6 text-sm absolute top-[20px] left-0 md:left-[24px] text-white bg-transparent z-50"
    : "flex items-center justify-between w-full h-[71px] px-4 md:px-10 text-sm bg-[#643F2E] text-white shadow-md relative";

  // النصوص حسب اللغة
  const texts = {
    home: language === "EN" ? "Home" : "الرئيسية",
    about: language === "EN" ? "About Us" : "من نحن",
    services: language === "EN" ? "Services ▾" : "خدمات ▾",
    team: language === "EN" ? "Our Team" : "الفريق",
    blogs: language === "EN" ? "Blogs" : "المدونة",
    contact: language === "EN" ? "Contact Us" : "اتصل بنا",
    searchPlaceholder: language === "EN" ? "Search..." : "ابحث...",
    bookAppointment: language === "EN" ? "Book Appointment" : "احجز موعد",
    cancel: language === "EN" ? "Cancel" : "إلغاء"
  };

  return (
    <nav className={navbarClasses} dir={language === "AR" ? "rtl" : "ltr"}>
      {/* Logo */}
      <div className="flex items-center md:flex"> 
        <Link href="/">
          <img
            src="/Imgs/logoo.png"
            alt="Logo"
            className="h-10 w-10 mr-4 cursor-pointer hidden md:block" 
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      {!searchOpen && (
<ul className={`hidden md:flex items-center ${language === "AR" ? "gap-6" : "space-x-6"}`}>
          {variant !== "home" && (
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                {texts.home}
              </Link>
            </li>
          )}
          <li>
            <Link href="/about" className="hover:text-gray-300 transition">
              {texts.about}
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="hover:text-gray-300 transition"
            >
              {texts.services}
            </button>
            <ServicesDropdown isOpen={servicesOpen} />
          </li>
          <li>
            <Link href="/team" className="hover:text-gray-300 transition">
              {texts.team}
            </Link>
          </li>
          <li>
            <Link href="/blogs" className="hover:text-gray-300 transition">
              {texts.blogs}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300 transition">
              {texts.contact}
            </Link>
          </li>
        </ul>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {!searchOpen && variant === "home" && (
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded border border-white hover:bg-white hover:text-[#643F2E] transition"
          >
            {language}
          </button>
        )}

        {!searchOpen && variant !== "home" && (
          <button
            className="p-2 text-white hover:text-[#FFD700] transition"
            onClick={() => setSearchOpen(true)}
          >
            <FiSearch size={20} />
          </button>
        )}

        {!searchOpen && (
          <Link href="/appointment">
            <button className="px-4 py-1 bg-transparent border border-white text-white rounded hover:bg-white hover:text-[#643F2E] transition">
              {texts.bookAppointment}
            </button>
          </Link>
        )}

        {/* Mobile menu toggle */}
        {!searchOpen && (
          <button
            className="md:hidden p-2 text-white hover:text-[#FFD700]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && !searchOpen && (
        <div className="absolute top-full left-0 w-full md:hidden z-40 flex justify-center">
          <div className="w-full bg-white/0.2 backdrop-blur-sm border border-gray-300 shadow-md flex flex-col p-4 space-y-2">
            {variant === "service" && (
              <Link
                href="/"
                className="hover:text-gray-300 transition px-2 py-1 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {texts.home}
              </Link>
            )}
            <Link
              href="/about"
              className="hover:text-gray-300 transition px-2 py-1 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {texts.about}
            </Link>
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="hover:text-gray-300 transition px-2 py-1 rounded w-full text-left"
              >
                {texts.services}
              </button>
              {servicesOpen && <ServicesDropdown isOpen={servicesOpen} isMobile />}
            </div>
            <Link
              href="/team"
              className="hover:text-gray-300 transition px-2 py-1 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {texts.team}
            </Link>
            <Link
              href="/blogs"
              className="hover:text-gray-300 transition px-2 py-1 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {texts.blogs}
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-300 transition px-2 py-1 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {texts.contact}
            </Link>
          </div>
        </div>
      )}

      {/* Search Open: show input + appointment + cancel */}
      {searchOpen && (
        <div className="absolute top-0 left-0 w-full h-[71px] flex items-center justify-end bg-transparent z-50 px-4 md:px-10">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKey}
              autoFocus
              className="w-full md:w-64 p-2 rounded border border-gray-300 text-white"
              placeholder={texts.searchPlaceholder}
            />
            <Link href="/appointment">
              <button className="px-4 py-1 bg-transparent border border-white text-white rounded hover:bg-white hover:text-[#643F2E] transition">
                {texts.bookAppointment}
              </button>
            </Link>
            <button
              className="px-4 py-1 bg-transparent border border-white text-white rounded hover:bg-white hover:text-[#643F2E] transition"
              onClick={() => setSearchOpen(false)}
            >
              {texts.cancel}
            </button>
          </div>
        </div>
      )}

    </nav>
  );
}
