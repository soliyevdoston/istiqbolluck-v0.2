import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const STORAGE_KEY = "exitIntentConsultSeenAt";
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

const hasSeenRecently = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < COOLDOWN_MS;
  } catch {
    return false;
  }
};

const persistSeen = () => {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // no-op
  }
};

export default function ExitIntentPopup() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const closePopup = () => {
    persistSeen();
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasSeenRecently()) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) return;

    const onMouseLeave = (event) => {
      if (hasTriggeredRef.current) return;
      if (event.clientY > 0) return;
      hasTriggeredRef.current = true;
      setIsOpen(true);
    };

    document.addEventListener("mouseout", onMouseLeave);
    return () => document.removeEventListener("mouseout", onMouseLeave);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();

    const onEscape = (event) => {
      if (event.key === "Escape") closePopup();
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  const handlePrimaryAction = () => {
    closePopup();
    if (pathname === "/") {
      const el = document.getElementById("consult-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    navigate("/#consult-section");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1300] bg-black/60 backdrop-blur-sm p-4 md:p-6 flex items-end md:items-center justify-center"
          role="presentation"
          onClick={closePopup}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            className="w-full max-w-lg rounded-[2rem] bg-white dark:bg-[#0c0c0c] border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 shadow-2xl text-left"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#39B54A]/10 text-[#39B54A] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={13} />
                <span>
                  {t?.exit_popup_badge || "Bepul Konsultatsiya"}
                </span>
              </div>
              <button
                ref={closeRef}
                onClick={closePopup}
                className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white hover:border-[#39B54A] transition-colors"
                aria-label={t?.close || "Close"}
              >
                <X size={16} />
              </button>
            </div>

            <h3
              id="exit-intent-title"
              className="mt-5 text-2xl md:text-3xl font-black uppercase tracking-tight text-black dark:text-white leading-tight"
            >
              {t?.exit_popup_title || "Ketishdan oldin bepul konsultatsiya oling"}
            </h3>
            <p className="mt-3 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t?.exit_popup_desc ||
                "Mutaxassisimiz sizga yo'nalish, qabul shartlari va farzandingiz uchun eng to'g'ri reja bo'yicha bepul maslahat beradi."}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePrimaryAction}
                className="sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#39B54A] text-white font-black text-[11px] uppercase tracking-[0.14em] hover:bg-[#2d9a3d] transition-colors"
              >
                <span>{t?.exit_popup_primary || "Bepul Konsultatsiya Olish"}</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={closePopup}
                className="sm:flex-1 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-black text-[11px] uppercase tracking-[0.14em] hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
              >
                {t?.exit_popup_secondary || "Hozircha Yo'q"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
