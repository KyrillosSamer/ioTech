'use client';
import React, { useState } from "react";
import Link from "next/link";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import ServicesDropdown from "../components/ServicesDropdown.jsx";
import Loading from "../components/Loading.jsx"; 
import { useLanguage } from '../components/LanguageContext.jsx';

export default function Navbar({ variant }) {
  const { language, toggleLanguage } = useLanguage();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); // ✅ نجيب المسار الحالي
  const showHomeLink = pathname !== "/"; // ✅ مش هيظهر لو احنا في الهوم

  const handleNavigation = async (path) => {
    setLoading(true);
    await router.push(path);
    setLoading(false);
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      handleNavigation(`/search?query=${encodeURIComponent(query)}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const navbarClasses = variant === "service"
    ? "flex items-center justify-between border rounded-xl w-full md:w-[1252px] h-[71px] px-4 md:px-6 text-sm absolute top-[20px] left-0 md:left-[24px] text-white bg-transparent z-50"
    : "flex items-center justify-between w-full h-[71px] px-4 md:px-10 text-sm bg-[#643F2E] text-white shadow-md relative";

  const texts = {
    home: language === "EN" ? "Home" : "الرئيسية",
    about: language === "EN" ? "About Us" : "من نحن",
    services: language === "EN" ? "Services" : "خدمات",
    team: language === "EN" ? "Our Team" : "الفريق",
    blogs: language === "EN" ? "Blogs" : "المدونة",
    contact: language === "EN" ? "Contact Us" : "اتصل بنا",
    searchPlaceholder: language === "EN" ? "Search..." : "ابحث...",
    bookAppointment: language === "EN" ? "Book Appointment" : "احجز موعد",
    cancel: language === "EN" ? "Cancel" : "إلغاء"
  };

  return (
    <nav className={navbarClasses}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <Loading />
        </div>
      )}

      {/* Logo */}
      <div className="flex items-center md:flex"> 
        <Link href="/" onClick={(e) => { e.preventDefault(); handleNavigation("/"); }}>
          <img
            src="/Imgs/logoo.png"
            alt="Logo"
            className="h-10 w-10 mr-4 cursor-pointer hidden md:block" 
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      {!searchOpen && (
        <ul
          className={`hidden md:flex items-center gap-6 
          ${language === "AR" ? "text-lg flex-row-left mr-40 gap-16" : "text-sm"}`}
        >
          {showHomeLink && (
            <li>
              <Link href="/" onClick={(e) => { e.preventDefault(); handleNavigation("/"); }}>
                {texts.home}
              </Link>
            </li>
          )}
          <li>
            <Link href="/about" onClick={(e) => { e.preventDefault(); handleNavigation("/about"); }}>
              {texts.about}
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="hover:text-gray-300 transition flex items-center gap-1"
            >
              {texts.services}
              {servicesOpen ? (
                <IoIosArrowUp className="inline-block text-sm" />
              ) : (
                <IoIosArrowDown className="inline-block text-sm" />
              )}
            </button>
            <ServicesDropdown isOpen={servicesOpen} />
          </li>
          <li>
            <Link href="/team" onClick={(e) => { e.preventDefault(); handleNavigation("/team"); }}>
              {texts.team}
            </Link>
          </li>
          <li>
            <Link href="/blogs" onClick={(e) => { e.preventDefault(); handleNavigation("/blogs"); }}>
              {texts.blogs}
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={(e) => { e.preventDefault(); handleNavigation("/contact"); }}>
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
            className="px-3 py-1 hover:bg-white hover:text-[#643F2E] transition flex items-center gap-1"
          >
            {language}
            <IoIosArrowDown className="text-sm" />
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
          <button
            onClick={() => handleNavigation("/appointment")}
            className="px-4 py-1 bg-transparent border border-white text-white rounded hover:bg-white hover:text-[#643F2E] transition"
          >
            {texts.bookAppointment}
          </button>
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
          <div
            className={`w-full bg-white/20 backdrop-blur-sm border border-gray-300 shadow-md flex flex-col p-4 space-y-2 
            ${language === "AR" ? "text-lg font-bold" : "text-sm"}`}
          >
            {showHomeLink && (
              <Link
                href="/"
                onClick={(e) => { e.preventDefault(); handleNavigation("/"); setMobileMenuOpen(false); }}
                className="hover:text-gray-300 transition px-2 py-1 rounded"
              >
                {texts.home}
              </Link>
            )}
            <Link
              href="/about"
              onClick={(e) => { e.preventDefault(); handleNavigation("/about"); setMobileMenuOpen(false); }}
              className="hover:text-gray-300 transition px-2 py-1 rounded"
            >
              {texts.about}
            </Link>
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="hover:text-gray-300 transition px-2 py-1 rounded w-full flex items-center justify-between"
              >
                {texts.services}
                {servicesOpen ? (
                  <IoIosArrowUp className="inline-block text-lg" />
                ) : (
                  <IoIosArrowDown className="inline-block text-lg" />
                )}
              </button>
              {servicesOpen && <ServicesDropdown isOpen={servicesOpen} isMobile />}
            </div>
            <Link
              href="/team"
              onClick={(e) => { e.preventDefault(); handleNavigation("/team"); setMobileMenuOpen(false); }}
              className="hover:text-gray-300 transition px-2 py-1 rounded"
            >
              {texts.team}
            </Link>
            <Link
              href="/blogs"
              onClick={(e) => { e.preventDefault(); handleNavigation("/blogs"); setMobileMenuOpen(false); }}
              className="hover:text-gray-300 transition px-2 py-1 rounded"
            >
              {texts.blogs}
            </Link>
            <Link
              href="/contact"
              onClick={(e) => { e.preventDefault(); handleNavigation("/contact"); setMobileMenuOpen(false); }}
              className="hover:text-gray-300 transition px-2 py-1 rounded"
            >
              {texts.contact}
            </Link>
          </div>
        </div>
      )}

      {/* Search Open */}
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
            <button
              onClick={() => handleNavigation("/appointment")}
              className="px-4 py-1 bg-transparent border border-white text-white rounded hover:bg-white hover:text-[#643F2E] transition"
            >
              {texts.bookAppointment}
            </button>
            <button
              onClick={() => setSearchOpen(false)}
              className="px-4 py-1 bg-transparent border border-white text-white rounded hover:bg-white hover:text-[#643F2E] transition"
            >
              {texts.cancel}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
