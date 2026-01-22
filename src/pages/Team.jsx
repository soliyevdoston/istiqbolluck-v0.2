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
  Award,
  CheckCircle2,
  ChevronUp,
} from "lucide-react";

// --- 1. SECTION TITLE (EDITORIAL) ---
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

  // --- MANTIQ: HAR BIR BO'LIM KATALARINI TEPAGA SARALASH ---
  const getOrderedTeachers = () => {
    let list =
      activeTab === "all"
        ? [...teachers]
        : teachers.filter((t) => t.category === activeTab);
    // isLead: true bo'lganlar har doim boshida chiqadi
    return list.sort((a, b) => (b.isLead ? 1 : 0) - (a.isLead ? 1 : 0));
  };

  const currentTeachers = getOrderedTeachers();
  const teacherLimit = isMobile ? 6 : 8;

  return (
    <div className="bg-white dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden pt-20">
      {/* --- 1. HERO SECTION (DIREKTOR) --- */}
      <section className="relative h-screen h-[100dvh] w-full flex flex-col md:flex-row bg-[#e2dfdf] dark:bg-[#080808] overflow-hidden">
        {/* DEKORATIV FON */}
        <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#39B54A]/10 blur-[100px] rounded-full pointer-events-none z-0" />

        {/* 1. RASM QISMI (Mobil qurilmada tepada) */}
        <div className="relative flex-1 min-h-0 w-full md:h-full md:w-1/2 order-1 md:order-2 flex items-end justify-center overflow-hidden">
          <motion.img
            src={director.img}
            alt="Director"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full object-contain z-10 rounded-[50px] select-none pointer-events-none transition-all duration-700"
          />
          {/* Mobil uchun pastki qismni matn bilan yumshoq bog'lash */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#e2dfdf] dark:from-[#080808] via-transparent to-transparent md:hidden z-20" />
        </div>

        {/* 2. MATN VA INFO QISMI (Mobil qurilmada pastda) */}
        <div className="relative flex-1 min-h-0 w-full md:h-full md:w-1/2 order-2 md:order-1 flex flex-col justify-center px-6 md:px-16 pb-8 md:pb-0 z-30">
          {/* SARLAVHA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 md:mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-[100px] font-black italic uppercase tracking-tighter dark:text-white leading-[0.85]">
              BIZNING <br />
              <span className="text-[#39B54A]">JAMOA</span>
            </h1>
          </motion.div>

          {/* INFO BLOK */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <div className="w-8 h-[2px] bg-[#39B54A]" />
              <span className="text-[#39B54A] font-black uppercase tracking-widest text-[9px] md:text-xs">
                School Director
              </span>
            </div>

            <h2 className="text-2xl md:text-5xl font-black dark:text-white uppercase mb-2 md:mb-4 tracking-tight">
              {director.name}
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400 italic text-xs md:text-lg mb-6 md:mb-8 leading-snug line-clamp-3 md:line-clamp-none">
              “{director.quote}”
            </p>

            <button
              onClick={() => setSelected(director)}
              className="group flex items-center gap-4 outline-none"
            >
              <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] dark:text-white border-b-2 border-[#39B54A] pb-1">
                Batafsil
              </span>
              <div className="w-8 h-8 md:w-12 md:h-12 bg-[#39B54A] rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight size={18} />
              </div>
            </button>
          </motion.div>
        </div>

        {/* FONDA DEKORATIV TEXT */}
        <div className="absolute bottom-10 left-10 hidden lg:block opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
          <h1 className="text-[180px] font-black uppercase">DIRECTOR</h1>
        </div>
      </section>

      {/* --- 2. RAHBARIYAT --- */}
      <section className="py-24 md:py-40 max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle="Leadership"
          title="Rahbariyat"
          desc="Maktab rivoji va strategik boshqaruvini ta'minlovchi professional jamoa."
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
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#39B54A] border-b-2 border-[#39B54A] pb-1 hover:gap-6 transition-all"
            >
              {showFullAdmin ? (
                <>
                  Yashirish <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Barchasini ko'rish <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* --- 3. O'QITUVCHILAR (Barchasida kichik, Yo'nalishda Lead katta) --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t dark:border-zinc-900">
        <SectionTitle
          subtitle="Faculty"
          title={
            <>
              Pedagogik <span className="text-[#39B54A]">Staff</span>
            </>
          }
          desc="Har bir yo'nalish bo'yicha eng yuqori malakali mutaxassislarimiz."
        />

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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 auto-rows-auto">
          {(showFullTeachers
            ? currentTeachers
            : currentTeachers.slice(0, teacherLimit)
          ).map((p) => (
            <TeamMemberCard
              key={p.id}
              person={p}
              onClick={setSelected}
              // QOIDASI: Barchasida (all) hamma kichik. Yo'nalishga o'tganda isLead bo'lsa KATTA bo'ladi.
              isLarge={activeTab !== "all" && p.isLead}
            />
          ))}
        </div>

        {currentTeachers.length > teacherLimit && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setShowFullTeachers(!showFullTeachers)}
              className="bg-black dark:bg-[#39B54A] text-white px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all"
            >
              {showFullTeachers ? "Yashirish" : "Barchasini ko'rish"}
            </button>
          </div>
        )}
      </section>

      {/* --- 4. PREMIUM BLUR MODAL --- */}
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
              className="bg-white dark:bg-zinc-950 w-full max-w-4xl rounded-[2rem] md:rounded-[3rem] shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden no-scrollbar"
            >
              {/* CLOSE BUTTON - Mobil qurilmada ko'rinishi aniqroq bo'lishi uchun */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md rounded-full text-black dark:text-white transition-all hover:rotate-90 shadow-lg"
              >
                <X size={20} />
              </button>

              {/* IMAGE SECTION */}
              <div className="w-full md:w-2/5 bg-[#f8f8f8] dark:bg-zinc-900 p-6 md:p-8 flex items-center justify-center shrink-0">
                <div className="w-full max-w-[200px] md:max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                  <img
                    src={selected.img}
                    className="w-full h-full object-cover"
                    alt={selected.name}
                  />
                </div>
              </div>

              {/* INFO SECTION */}
              <div className="w-full md:w-3/5 p-6 md:p-14 text-left flex flex-col justify-center md:overflow-y-auto no-scrollbar">
                <span className="text-[#39B54A] font-black uppercase text-[10px] tracking-[0.4em] mb-2 md:mb-3 block italic">
                  {selected.role || selected.subject}
                </span>

                <h2 className="text-2xl md:text-5xl font-black dark:text-white uppercase tracking-tighter mb-6 md:mb-8 leading-none italic">
                  {selected.name}
                </h2>

                {/* TAJRIBA VA TA'LIM */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#e2dfdf] dark:bg-zinc-800 text-[#39B54A] rounded-full flex items-center justify-center shrink-0">
                      <Briefcase size={18} />
                    </div>
                    <p className="text-xs md:text-sm font-bold dark:text-white">
                      Tajriba: {selected.experience} yil
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#e2dfdf] dark:bg-zinc-800 text-[#39B54A] rounded-full flex items-center justify-center shrink-0">
                      <GraduationCap size={18} />
                    </div>
                    <p className="text-xs md:text-sm font-bold dark:text-white line-clamp-1">
                      {selected.education}
                    </p>
                  </div>
                </div>

                {/* YUTUQLAR */}
                {selected.achievements && selected.achievements.length > 0 && (
                  <div className="mb-6 p-4 md:p-5 bg-[#39B54A]/5 rounded-2xl md:rounded-3xl border border-[#39B54A]/10 text-left">
                    <h4 className="text-[#39B54A] font-black text-[10px] uppercase mb-3 flex items-center gap-2">
                      <Award size={14} /> Yutuqlar
                    </h4>
                    <ul className="space-y-2">
                      {selected.achievements.map((a, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[11px] md:text-xs text-zinc-600 dark:text-zinc-400 font-medium"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-[#39B54A] shrink-0"
                          />{" "}
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* BIO */}
                <p className="text-zinc-500 italic text-xs md:text-base border-t dark:border-zinc-800 pt-4 md:pt-6">
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
const TeamMemberCard = ({ person, onClick, isLarge = false }) => (
  <motion.div
    layout
    onClick={() => onClick(person)}
    className={`group cursor-pointer flex flex-col w-full h-full relative ${isLarge ? "col-span-2 md:col-span-2 md:row-span-2" : "col-span-1"}`}
  >
    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#e2dfdf] dark:bg-zinc-900 border border-transparent group-hover:border-[#39B54A]/40 transition-all duration-700">
      <img
        src={person.img}
        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
        alt=""
      />
      <div className="absolute bottom-0 right-0 bg-blur text-[#d2c5c5] px-4 py-2 rounded-tl-2xl font-black text-[10px] uppercase tracking-widest bottom-2 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        Batafsil
      </div>
      {isLarge && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-left">
          <p className="text-white font-black text-2xl md:text-3xl uppercase italic leading-tight">
            {person.name}
          </p>
          <p className="text-[#39B54A] font-bold text-[9px] md:text-xs uppercase tracking-widest mt-2">
            {person.role || person.subject}
          </p>
        </div>
      )}
    </div>
    {!isLarge && (
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
