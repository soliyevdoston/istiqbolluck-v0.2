import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  director,
  administration,
  teachers,
  categories,
} from "../data/teamData.js";
import {
  X,
  GraduationCap,
  Briefcase,
  Plus,
  ArrowRight,
  ArrowDown,
  Award,
  CheckCircle2,
  ChevronUp,
} from "lucide-react";

// --- 1. EDITORIAL SECTION TITLE (UNIFORM) ---
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

  const filteredTeachers =
    activeTab === "all"
      ? teachers
      : teachers.filter((t) => t.category === activeTab);

  // Dastlabki ko'rinish limiti
  const teacherLimit = isMobile ? 6 : 8;

  return (
    <div className="bg-white dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden">
      {/* --- 1. HERO SECTION (DIREKTOR ALOHIDA) --- */}
      <section className="relative h-screen w-full flex flex-col justify-end bg-[#e2dfdf] dark:bg-[#080808]">
        {/* Sahifa Titli */}
        <div className="absolute top-28 left-6 md:left-12 z-20">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-[130px] font-[900] dark:text-white tracking-tighter uppercase leading-[0.8] italic"
          >
            BIZNING <br /> <span className="text-[#39B54A]">JAMOA</span>
          </motion.h1>
        </div>

        {/* Direktor Rasmi (Contain - kesilmagan holatda) */}
        <div className="absolute inset-0 flex justify-center lg:justify-end items-end z-10 pointer-events-none">
          <img
            src={director.img}
            className="h-[70vh] md:h-[90vh] w-auto object-contain grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
            alt="Director"
          />
        </div>

        {/* Direktor Qisqa Ma'lumot (Pastda) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl max-w-xl text-left">
            <span className="text-[#39B54A] font-black uppercase tracking-widest text-[10px] mb-2 block italic">
              School Director
            </span>
            <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mb-4">
              {director.name}
            </h2>
            <p className="text-zinc-500 italic text-sm md:text-lg leading-snug mb-6">
              "{director.quote}"
            </p>
            <button
              onClick={() => setSelected(director)}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-[#39B54A] text-white px-8 py-4 rounded-full hover:bg-black transition-all"
            >
              Batafsil <ArrowRight size={16} />
            </button>
          </div>
          <div className="hidden lg:block text-zinc-400 font-black text-xs uppercase tracking-[0.5em] rotate-90 origin-right pb-10">
            Scroll down
          </div>
        </div>
      </section>

      {/* --- 2. RAHBARIYAT --- */}
      <section className="py-24 md:py-40 max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle="Management"
          title="Rahbariyat"
          desc="Maktab faoliyatini tizimli boshqaruvchi va sifatni ta'minlovchi jamoa."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
          {(showFullAdmin ? administration : administration.slice(0, 4)).map(
            (p) => (
              <TeamMemberCard key={p.id} person={p} onClick={setSelected} />
            ),
          )}
        </div>
        {administration.length > 4 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowFullAdmin(!showFullAdmin)}
              className="px-10 py-4 border-b-2 border-[#39B54A] text-[#39B54A] font-black text-[10px] uppercase tracking-widest hover:gap-6 transition-all flex items-center gap-3"
            >
              {showFullAdmin ? (
                <>
                  Yashirish <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Barcha rahbarlarni ko'rish <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* --- 3. O'QITUVCHILAR (FILTR + BENTO GRID) --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t dark:border-zinc-900">
        <SectionTitle
          subtitle="Faculty"
          title={
            <>
              Pedagogik <span className="text-[#39B54A]">Staff</span>
            </>
          }
          desc="Har bir yo'nalish bo'yicha eng yuqori malakali mutaxassislar."
        />

        {/* Filtrlar */}
        <div className="flex flex-wrap gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setShowFullTeachers(false);
              }}
              className={`px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === cat.id ? "bg-[#39B54A] text-white shadow-xl shadow-green-500/20" : "bg-[#e2dfdf] dark:bg-zinc-900 text-zinc-500"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* O'qituvchilar Grid (Bento Logic: Lead katta) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 auto-rows-auto">
          {(showFullTeachers
            ? filteredTeachers
            : filteredTeachers.slice(0, teacherLimit)
          ).map((p, idx) => {
            // Agar filtr tanlangan bo'lsa, birinchisi har doim katta
            const isLead = activeTab !== "all" && idx === 0;
            return (
              <TeamMemberCard
                key={p.id}
                person={p}
                onClick={setSelected}
                isLead={isLead}
              />
            );
          })}
        </div>

        {filteredTeachers.length > teacherLimit && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setShowFullTeachers(!showFullTeachers)}
              className="bg-black dark:bg-[#39B54A] text-white px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all"
            >
              {showFullTeachers ? "Yashirish" : "Barcha ustozlarni ko'rish"}
            </button>
          </div>
        )}
      </section>

      {/* --- 4. FULL-SCREEN BLUR MODAL --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10 backdrop-blur-3xl bg-white/5 dark:bg-black/10"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:rotate-90 transition-all"
              >
                <X size={20} />
              </button>

              <div className="bg-[#f8f8f8] dark:bg-zinc-900 p-8 md:p-12 flex justify-center">
                <div className="w-[240px] md:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                  <img
                    src={selected.img}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              </div>

              <div className="p-8 md:p-14 text-left">
                <span className="text-[#39B54A] font-black uppercase text-[10px] tracking-[0.4em] mb-3 block italic">
                  {selected.role || selected.subject}
                </span>
                <h2 className="text-4xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mb-8 italic">
                  {selected.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#e2dfdf] dark:bg-zinc-800 text-[#39B54A] rounded-full flex items-center justify-center shrink-0">
                      <Briefcase size={18} />
                    </div>
                    <p className="text-sm font-bold dark:text-white">
                      Tajriba: {selected.experience} Yil
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#e2dfdf] dark:bg-zinc-800 text-[#39B54A] rounded-full flex items-center justify-center shrink-0">
                      <GraduationCap size={18} />
                    </div>
                    <p className="text-sm font-bold dark:text-white line-clamp-1">
                      {selected.education}
                    </p>
                  </div>
                </div>

                {selected.id === director.id && selected.achievements && (
                  <div className="mb-10 p-6 bg-[#39B54A]/5 rounded-3xl border border-[#39B54A]/10">
                    <h4 className="text-[#39B54A] font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Award size={16} /> Yutuqlar
                    </h4>
                    <ul className="space-y-2">
                      {selected.achievements.map((a, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-xs md:text-sm text-zinc-600 dark:text-zinc-400"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-[#39B54A] shrink-0 mt-0.5"
                          />{" "}
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-zinc-500 italic text-sm md:text-lg leading-relaxed border-t dark:border-zinc-800 pt-8">
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

// --- TEAM MEMBER CARD KOMPONENTI ---
const TeamMemberCard = ({ person, onClick, isLead = false }) => (
  <motion.div
    layout
    onClick={() => onClick(person)}
    className={`group cursor-pointer flex flex-col w-full h-full ${isLead ? "col-span-2 md:col-span-2 md:row-span-2" : "col-span-1"}`}
  >
    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#e2dfdf] dark:bg-zinc-900 border border-transparent group-hover:border-[#39B54A]/40 transition-all duration-700 shadow-sm">
      <img
        src={person.img}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
        <p className="text-white font-black text-xl uppercase italic leading-none">
          {person.name}
        </p>
        <p className="text-[#39B54A] font-bold text-[9px] uppercase tracking-widest mt-2">
          {person.role || person.subject}
        </p>
      </div>
    </div>
    {!isLead && (
      <div className="mt-4 px-1 text-left">
        <h4 className="text-[13px] md:text-xl font-black dark:text-white uppercase tracking-tight leading-tight italic group-hover:text-[#39B54A] transition-colors">
          {person.name}
        </h4>
        <p className="text-zinc-400 font-bold text-[8px] md:text-[10px] uppercase tracking-widest mt-1">
          {person.role || person.subject}
        </p>
      </div>
    )}
  </motion.div>
);
