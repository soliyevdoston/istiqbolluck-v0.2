import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronUp,
} from "lucide-react";

// Context import
import { useLanguage } from "../context/LanguageContext";

// --- SECTION TITLE KOMPONENTI ---
const SectionTitle = ({ subtitle, title, desc }) => (
  <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-left">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
      <div className="shrink-0 text-left">
        <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
          {subtitle}
        </h4>
        <h2 className="text-3xl md:text-6xl font-[900] dark:text-white uppercase tracking-tighter leading-none italic">
          {title}
        </h2>
      </div>
      <div className="flex items-stretch gap-4 md:gap-6 max-w-md text-left">
        <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
        <p className="text-zinc-400 dark:text-zinc-500 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

export default function Team() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showFullAdmin, setShowFullAdmin] = useState(false);
  const [showFullTeachers, setShowFullTeachers] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!t.team_page) return null;

  // Rasmlar o'zgarmas bo'lgani uchun ularni hardcoded yoki rasm ID'si bilan saqlashingiz mumkin
  // Bu misolda person obyektida rasmlar bor deb faraz qilamiz

  const getOrderedTeachers = () => {
    let list =
      activeTab === "all"
        ? [...t.team_page.teachers]
        : t.team_page.teachers.filter((t) => t.category === activeTab);
    return list.sort((a, b) => (b.isLead ? 1 : 0) - (a.isLead ? 1 : 0));
  };

  const currentTeachers = getOrderedTeachers();
  const teacherLimit = isMobile ? 6 : 8;

  return (
    <div className="bg-white dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden pt-20">
      {/* --- 1. HERO SECTION --- */}
      {/* --- 1. HERO SECTION (Director Spotlight) --- */}
      <section className="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center bg-[#f5f5f5] dark:bg-[#080808] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#39B54A]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#39B54A]/5 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Director Card - Featured */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 mt-10 md:mt-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-5/12"
            >
              <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                <img
                  src={t.team_page.director.img}
                  alt="Director"
                  className="w-full h-full object-cover select-none"
                />
                {/* Decorative Frame */}
                <div className="absolute inset-4 border border-white/20 rounded-[2.5rem]" />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-7/12 text-left"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#39B54A]" />
                <span className="text-[#39B54A] font-black uppercase tracking-[0.2em] text-xs">
                  {t.team_page.dir_label}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black dark:text-white uppercase leading-[0.9] mb-8">
                {t.team_page.director.name.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h2>

              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-serif italic mb-10 leading-relaxed border-l-4 border-[#39B54A] pl-6 py-2">
                "{t.team_page.director.quote}"
              </p>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <span className="block text-xs uppercase text-zinc-400 font-bold tracking-wider mb-1">
                    {t.team_page.exp_label}
                  </span>
                  <span className="text-3xl font-black dark:text-white">
                    {t.team_page.director.experience} {t.team_page.years}
                  </span>
                </div>
                <div>
                  <span className="block text-xs uppercase text-zinc-400 font-bold tracking-wider mb-1">
                    {t.team_page.achievements_label}
                  </span>
                  <span className="text-3xl font-black dark:text-white">
                    Top #1
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelected(t.team_page.director)}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-[#39B54A] dark:hover:bg-[#39B54A] hover:text-white transition-all shadow-xl"
              >
                {t.team_page.more_info}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- RAHBARIYAT SECTION --- */}
      <section className="py-24 md:py-40 max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle={t.team_page.admin_section.subtitle}
          title={t.team_page.admin_section.title}
          desc={t.team_page.admin_section.desc}
        />
        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20">
          {t.team_page.administration.map((p) => (
            <motion.div
              layout
              key={p.id}
              onClick={() => setSelected(p)}
              className="group cursor-pointer w-full md:w-[45%] max-w-[500px] relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={p.img}
                  className="w-full h-full object-cover transition-all duration-700 filter grayscale-0 group-hover:scale-110"
                  alt={p.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                  <span className="inline-block px-3 py-1 mb-4 rounded-full bg-[#39B54A] text-white text-[10px] font-black uppercase tracking-widest w-fit">
                    {p.achievements?.[0] || "Rahbariyat"}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-none mb-2">
                    {p.name}
                  </h3>
                  <p className="text-zinc-300 font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    {p.role}
                  </p>
                  <div className="h-[2px] w-12 bg-[#39B54A] group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {t.team_page.administration.length > 4 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowFullAdmin(!showFullAdmin)}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#39B54A] border-b-2 border-[#39B54A] pb-1 transition-all"
            >
              {showFullAdmin ? (
                <>
                  {t.team_page.hide} <ChevronUp size={16} />
                </>
              ) : (
                <>
                  {t.team_page.view_all} <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* --- STAFF SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t dark:border-zinc-900">
        <SectionTitle
          subtitle={t.team_page.staff_section.subtitle}
          title={
            <>
              {t.team_page.staff_section.title1}{" "}
              <span className="text-[#39B54A]">
                {t.team_page.staff_section.title2}
              </span>
            </>
          }
          desc={t.team_page.staff_section.desc}
        />

        <div className="flex flex-wrap gap-2 mb-16 overflow-x-auto no-scrollbar pb-4">
          {t.team_page.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setShowFullTeachers(false);
              }}
              className={`px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === cat.id ? "bg-[#39B54A] text-white shadow-xl" : "bg-[#e2dfdf] dark:bg-zinc-900 text-zinc-500"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
          {(showFullTeachers
            ? currentTeachers
            : currentTeachers.slice(0, teacherLimit)
          ).map((p) => (
            <TeamMemberCard
              key={p.id}
              person={p}
              onClick={setSelected}
              isLarge={activeTab !== "all" && p.isLead}
              detailText={t.team_page.details_btn}
            />
          ))}
        </div>

        {currentTeachers.length > teacherLimit && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setShowFullTeachers(!showFullTeachers)}
              className="bg-black dark:bg-[#39B54A] text-white px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all"
            >
              {showFullTeachers ? t.team_page.hide : t.team_page.view_all}
            </button>
          </div>
        )}
      </section>

      {/* --- MODAL (Batafsil ma'lumot) --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 backdrop-blur-3xl bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-zinc-950 w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/10 dark:bg-white/10 hover:bg-[#39B54A] hover:text-white rounded-full transition-all"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-2/5 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-8">
                <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                  <img
                    src={selected.img}
                    className="w-full h-full object-cover"
                    alt={selected.name}
                  />
                </div>
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-12 text-left overflow-y-auto no-scrollbar">
                <span className="text-[#39B54A] font-black uppercase text-[10px] tracking-[0.4em] mb-3 block">
                  {selected.role || selected.subject}
                </span>
                <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mb-8 leading-none italic">
                  {selected.name}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#39B54A]/10 text-[#39B54A] rounded-full flex items-center justify-center">
                      <Briefcase size={18} />
                    </div>
                    <p className="text-sm font-bold dark:text-white">
                      {t.team_page.exp_label}: {selected.experience} yil
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#39B54A]/10 text-[#39B54A] rounded-full flex items-center justify-center">
                      <GraduationCap size={18} />
                    </div>
                    <p className="text-sm font-bold dark:text-white">
                      {selected.education}
                    </p>
                  </div>
                </div>

                {selected.achievements && (
                  <div className="mb-8 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-[#39B54A] font-black text-[10px] uppercase mb-4 flex items-center gap-2">
                      <Award size={16} /> {t.team_page.achievements_label}
                    </h4>
                    <ul className="space-y-3">
                      {selected.achievements.map((a, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-xs text-zinc-600 dark:text-zinc-400 font-medium"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-[#39B54A] shrink-0"
                          />{" "}
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-zinc-500 dark:text-zinc-400 italic text-sm md:text-base border-t dark:border-zinc-800 pt-6">
                  "{selected.bio}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TeamMemberCard = ({ person, onClick, isLarge = false, detailText }) => (
  <motion.div
    layout
    onClick={() => onClick(person)}
    className={`group cursor-pointer flex flex-col w-full h-full relative ${isLarge ? "col-span-2 md:col-span-2 md:row-span-2" : "col-span-1"}`}
  >
    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border border-transparent group-hover:border-[#39B54A]/40 transition-all duration-500 shadow-sm group-hover:shadow-xl">
      <img
        src={person.img}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        alt={person.name}
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <div className="bg-white text-black px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          {detailText}
        </div>
      </div>
      {isLarge && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 text-left">
          <p className="text-white font-black text-2xl md:text-4xl uppercase italic leading-none">
            {person.name}
          </p>
          <p className="text-[#39B54A] font-bold text-xs uppercase tracking-[0.2em] mt-3">
            {person.role || person.subject}
          </p>
        </div>
      )}
    </div>
    {!isLarge && (
      <div className="mt-5 px-1 text-left">
        <h4 className="text-[14px] md:text-xl font-black dark:text-white uppercase tracking-tight leading-tight italic group-hover:text-[#39B54A] transition-colors">
          {person.name}
        </h4>
        <p className="text-zinc-400 dark:text-zinc-500 font-bold text-[9px] md:text-[11px] uppercase tracking-widest mt-1">
          {person.role || person.subject}
        </p>
      </div>
    )}
  </motion.div>
);
