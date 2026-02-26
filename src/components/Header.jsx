import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Phone,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext"; // Context'ni chaqiramiz

const FlagIcon = ({ code, className = "" }) => {
  if (code === "RU") {
    return (
      <svg
        viewBox="0 0 24 16"
        width="24"
        height="16"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <rect width="24" height="16" fill="#FFFFFF" />
        <rect y="5.33" width="24" height="5.34" fill="#224C9D" />
        <rect y="10.67" width="24" height="5.33" fill="#D52B1E" />
      </svg>
    );
  }

  if (code === "EN") {
    return (
      <svg
        viewBox="0 0 24 16"
        width="24"
        height="16"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <rect width="24" height="16" fill="#1F4DA1" />
        <path d="M0 0 L9 6 L7.2 6 L0 1.2 Z" fill="#FFFFFF" />
        <path d="M24 0 L15 6 L16.8 6 L24 1.2 Z" fill="#FFFFFF" />
        <path d="M0 16 L9 10 L7.2 10 L0 14.8 Z" fill="#FFFFFF" />
        <path d="M24 16 L15 10 L16.8 10 L24 14.8 Z" fill="#FFFFFF" />
        <path d="M0 0 L8.2 5.5 L7 5.5 L0 0.8 Z" fill="#D9202A" />
        <path d="M24 0 L15.8 5.5 L17 5.5 L24 0.8 Z" fill="#D9202A" />
        <path d="M0 16 L8.2 10.5 L7 10.5 L0 15.2 Z" fill="#D9202A" />
        <path d="M24 16 L15.8 10.5 L17 10.5 L24 15.2 Z" fill="#D9202A" />
        <rect x="9.5" width="5" height="16" fill="#FFFFFF" />
        <rect y="5.5" width="24" height="5" fill="#FFFFFF" />
        <rect x="10.5" width="3" height="16" fill="#D9202A" />
        <rect y="6.5" width="24" height="3" fill="#D9202A" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 16"
      width="24"
      height="16"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="24" height="16" fill="#1EB4E8" />
      <rect y="5" width="24" height="0.8" fill="#D81E32" />
      <rect y="5.8" width="24" height="4.4" fill="#FFFFFF" />
      <rect y="10.2" width="24" height="0.8" fill="#D81E32" />
      <rect y="11" width="24" height="5" fill="#1FA650" />
      <circle cx="4.1" cy="3.3" r="2.05" fill="#FFFFFF" />
      <circle cx="4.7" cy="3.3" r="1.7" fill="#1EB4E8" />
      <circle cx="7.4" cy="1.9" r="0.28" fill="#FFFFFF" />
      <circle cx="8.5" cy="1.6" r="0.28" fill="#FFFFFF" />
      <circle cx="9.6" cy="1.9" r="0.28" fill="#FFFFFF" />
      <circle cx="7.9" cy="2.9" r="0.28" fill="#FFFFFF" />
      <circle cx="9" cy="2.6" r="0.28" fill="#FFFFFF" />
      <circle cx="10.1" cy="2.9" r="0.28" fill="#FFFFFF" />
      <circle cx="7.4" cy="3.9" r="0.28" fill="#FFFFFF" />
      <circle cx="8.5" cy="3.6" r="0.28" fill="#FFFFFF" />
      <circle cx="9.6" cy="3.9" r="0.28" fill="#FFFFFF" />
      <circle cx="7.9" cy="4.9" r="0.28" fill="#FFFFFF" />
      <circle cx="9" cy="4.6" r="0.28" fill="#FFFFFF" />
      <circle cx="10.1" cy="4.9" r="0.28" fill="#FFFFFF" />
    </svg>
  );
};

export default function Header() {
  const { lang, changeLanguage, t } = useLanguage(); // Til tizimi
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  // Tillar ro'yxati
  const languages = [
    { code: "UZ", label: "O'zbekcha", flagCode: "UZ" },
    { code: "UZ_KR", label: "Ўзбекча", flagCode: "UZ" },
    { code: "RU", label: "Русский", flagCode: "RU" },
    { code: "EN", label: "English", flagCode: "EN" },
  ];

  if (!t) return null;

  // Navigatsiya linklari tarjimalar bilan
  const navLinks = [
    { to: "/", label: t.about },
    { to: "/dtm", label: t.dtm },
    { to: "/life", label: t.life },
    { to: "/team", label: t.team },
    { to: "/blog", label: t.blog },
  ];

  // Current language flag finder
  const currentLanguage =
    languages.find((l) => l.code === lang) || languages[0];

  // Tashqarini bossa til menyusini yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-[101] h-14 md:h-16 flex items-center justify-between px-4 md:px-10 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 transition-all">
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
          />
          <div className="flex font-bold text-[11px] gap-1 md:text-sm uppercase tracking-tighter">
            <span className="text-[#E43E1C]">ISTIQBOL</span>
            <span className="text-[#2E3192]">LUCK</span>
          </div>
        </Link>

        {/* --- DESKTOP NAV --- */}
        <nav className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `
                relative py-1 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300
                ${isActive ? "text-[#39B54A]" : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"}
                group
              `}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`
                    absolute bottom-0 left-0 h-[1.5px] bg-[#39B54A] transition-all duration-300 ease-in-out
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* 1. TIL SELECT (CUSTOM DROPDOWN) */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
            >
              <FlagIcon
                code={currentLanguage.flagCode}
                className="w-5 h-3.5 md:h-4 rounded-[2px] shadow-sm shrink-0 block"
              />
              <span className="text-[10px] md:text-[11px] font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">
                {lang === "UZ_KR" ? "ЎЗ" : lang}
              </span>
              <ChevronDown
                size={10}
                className={`text-zinc-400 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-[110]"
                >
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        changeLanguage(item.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase transition-colors flex items-center gap-2
                        ${lang === item.code ? "text-[#39B54A] bg-[#39B54A]/5" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"}
                      `}
                    >
                      <FlagIcon
                        code={item.flagCode}
                        className="w-5 h-3.5 rounded-[2px] shadow-sm shrink-0 block"
                      />
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TELEFON */}
          <a
            href={`tel:${t.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-[#39B54A] text-white transition-transform group-hover:scale-110 shadow-lg shadow-[#39B54A]/20">
              <Phone size={14} fill="currentColor" />
            </div>
            <span className="hidden md:inline text-[13px] font-bold text-black dark:text-white group-hover:text-[#39B54A] transition-colors">
              {t.phone}
            </span>
          </a>
        </div>
      </header>
    </>
  );
}
