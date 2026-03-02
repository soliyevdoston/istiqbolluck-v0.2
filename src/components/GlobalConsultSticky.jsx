import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const STICKY_COPY = {
  UZ: {
    title: "Qabul ochiq",
    desc: "Bepul konsultatsiya oling",
    cta: "Hozir yozilish",
  },
  UZ_KR: {
    title: "Қабул очиқ",
    desc: "Бепул консультация олинг",
    cta: "Ҳозир ёзилиш",
  },
  RU: {
    title: "Прием открыт",
    desc: "Получите бесплатную консультацию",
    cta: "Записаться",
  },
  EN: {
    title: "Admissions Open",
    desc: "Get a free consultation",
    cta: "Apply now",
  },
};

export default function GlobalConsultSticky() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isConsultInView, setIsConsultInView] = useState(false);
  const [isFooterInView, setIsFooterInView] = useState(false);
  const copy = STICKY_COPY[lang] || STICKY_COPY.UZ;

  useEffect(() => {
    if (pathname !== "/") {
      setIsConsultInView(false);
      return;
    }

    let frameId = 0;
    let observer = null;
    let attempts = 0;

    const observeConsult = () => {
      const section = document.getElementById("consult-section");
      if (!section) {
        if (attempts < 20) {
          attempts += 1;
          frameId = requestAnimationFrame(observeConsult);
        } else {
          setIsConsultInView(false);
        }
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => setIsConsultInView(entry.isIntersecting),
        { threshold: 0.25 },
      );
      observer.observe(section);
    };

    observeConsult();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    let frameId = 0;
    let observer = null;
    let attempts = 0;

    const observeFooter = () => {
      const footer = document.querySelector("footer");
      if (!footer) {
        if (attempts < 20) {
          attempts += 1;
          frameId = requestAnimationFrame(observeFooter);
        } else {
          setIsFooterInView(false);
        }
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => setIsFooterInView(entry.isIntersecting),
        { threshold: 0.05 },
      );
      observer.observe(footer);
    };

    observeFooter();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      observer?.disconnect();
    };
  }, []);

  if ((pathname === "/" && isConsultInView) || isFooterInView) return null;

  const handleClick = () => {
    if (pathname === "/") {
      const section = document.getElementById("consult-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    navigate("/#consult-section");
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-[120] w-[calc(100%-1.5rem)] sm:w-auto">
      <button
        type="button"
        onClick={handleClick}
        className="w-full sm:w-auto flex items-center justify-between gap-4 rounded-2xl bg-black text-white px-4 py-3 sm:px-5 sm:py-3 shadow-2xl border border-zinc-700/60"
      >
        <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#39B54A]">
            {copy.title}
          </p>
          <p className="text-xs sm:text-sm font-semibold">{copy.desc}</p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 rounded-xl bg-[#39B54A] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em]">
          {copy.cta}
          <ArrowRight size={14} />
        </span>
      </button>
    </div>
  );
}
