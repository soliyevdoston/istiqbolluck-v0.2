import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
import {
  Tv,
  Computer,
  Book,
  ShieldCheck,
  Trophy,
  Zap,
  Compass,
  ArrowUpRight,
} from "lucide-react";

// Context import
import { useLanguage } from "../context/LanguageContext";

const wrap = (min, max, v) =>
  ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

// --- DRAGGABLE MARQUEE ---
const DraggableMarquee = ({ items = [], baseVelocity = -0.4 }) => {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      let moveBy = baseVelocity * (delta / 1000) * 4;
      baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap py-3 w-full cursor-grab active:cursor-grabbing">
      <motion.div
        className="flex gap-2 md:gap-14"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => (isDragging.current = false)}
        onDrag={(event, info) => {
          const currentX = baseX.get();
          const deltaInUnits = (info.delta.x / window.innerWidth) * 50;
          baseX.set(currentX + deltaInUnits);
        }}
      >
        {[...items, ...items, ...items].map((img, i) => (
          <div key={i} className="flex-shrink-0">
            <div className="w-[240px] h-[170px] md:w-[360px] md:h-[250px] overflow-hidden rounded-[2rem] md:rounded-[2rem] border-[2px] md:border-[4px] border-white dark:border-zinc-900 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
              <img
                src={img}
                alt="Gallery"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function SchoolLife() {
  const { t } = useLanguage();
  const scrollTargetRef = useRef(null);

  const clubIcons = [
    <Trophy size={32} />,
    <Tv size={32} />,
    <Computer size={32} />,
    <Book size={32} />,
  ];

  if (!t.life_page) return null;

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden">
      {/* --- 1. HERO SECTION (O'zgarmadi) --- */}
      <section className="relative min-h-[90vh] md:h-screen w-full flex items-center justify-center pt-20 pb-12 px-6 md:px-10 overflow-hidden bg-white dark:bg-[#050505]">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2dfdf_1.5px,transparent_1.5px)] [background-size:32px_32px] dark:bg-[radial-gradient(#1a1a1a_1.5px,transparent_1.5px)]"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#39B54A]"></div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#39B54A]">
                {t.life_page.hero_label}
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-[900] tracking-tighter dark:text-white leading-[0.85] uppercase italic mb-10">
              {t.life_page.hero_title1} <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px #39B54A" }}
              >
                {t.life_page.hero_title2}
              </span>
            </h1>

            <div className="flex items-stretch gap-5 mb-12 max-w-xl text-left">
              <div className="w-[2px] bg-[#39B54A] opacity-40 shrink-0"></div>
              <p className="text-base md:text-xl font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase tracking-tight italic">
                {t.life_page.hero_desc}
              </p>
            </div>

            <button
              onClick={() =>
                scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-6 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#39B54A] hover:text-black dark:hover:text-white transition-colors"
            >
              {t.life_page.view_gallery}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#39B54A] flex items-center justify-center group-hover:bg-[#39B54A] group-hover:text-white transition-all duration-500 group-hover:rotate-45">
                <ArrowUpRight size={22} />
              </div>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="w-full max-w-[420px] aspect-[4/5] rounded-[3.5rem] overflow-hidden border-[15px] border-white dark:border-zinc-900 shadow-2xl rotate-3 relative z-10 hover:rotate-0 transition-transform duration-700">
              <img
                src={t.life_page.hero_img}
                alt="School"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -inset-10 bg-[#39B54A] rounded-full opacity-[0.07] blur-[100px] animate-pulse"></div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. GALEREYA --- */}
      <section
        ref={scrollTargetRef}
        className="py-8 overflow-hidden bg-white dark:bg-[#080808]"
      >
        <DraggableMarquee items={t.life_page.galleryRow1} baseVelocity={-0.3} />
        <DraggableMarquee items={t.life_page.galleryRow2} baseVelocity={0.3} />
      </section>

      {/* --- 3. CLUBS (Standard Header) --- */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] transition-colors">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-20 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12">
              <div className="shrink-0">
                <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 italic">
                  {t.life_page.clubs_subtitle}
                </h4>
                <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none">
                  {t.life_page.clubs_title1} <br className="hidden md:block" />
                  <span className="text-[#39B54A]">
                    {t.life_page.clubs_title2}
                  </span>
                </h2>
              </div>
              <div className="flex items-stretch gap-4 md:gap-6 max-w-md text-left">
                <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
                <p className="text-zinc-400 dark:text-zinc-500 text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] leading-relaxed py-1">
                  {t.life_page.clubs_desc}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {t.life_page.extraClubs.map((club, idx) => (
              <div
                key={idx}
                className={`p-5 md:p-10 rounded-[1.8rem] md:rounded-[3rem] bg-[#e2dfdf] dark:bg-[#0c0c0c] border border-transparent hover:border-[#39B54A]/30 transition-all duration-500 group flex flex-col items-start text-left shadow-sm ${idx > 1 ? "col-span-2 lg:col-span-1" : "col-span-1"}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl mb-4 md:mb-6 flex items-center justify-center text-white shadow-md bg-[#39B54A] group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {React.cloneElement(clubIcons[idx], {
                    size: 24,
                    className: "text-white",
                  })}
                </div>
                <h4 className="text-[14px] md:text-xl font-black uppercase italic mb-2 text-zinc-900 dark:text-white">
                  {club.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-[11px] md:text-sm font-medium">
                  {club.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. MISSION (Header moslandi) --- */}
      <section className="py-12 md:py-24 bg-white dark:bg-[#050505] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 mb-10 md:mb-20 text-left">
            <div className="shrink-0">
              <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 italic">
                {t.life_page.mission_subtitle}
              </h4>
              <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none">
                {t.life_page.mission_title1} <br className="hidden md:block" />
                <span className="text-[#39B54A]">
                  {t.life_page.mission_title2}
                </span>
              </h2>
            </div>
            <div className="flex items-stretch gap-4 md:gap-6 max-w-md text-left">
              <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
              <p className="text-zinc-400 dark:text-zinc-500 text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] leading-relaxed py-1">
                {t.life_page.mission_desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {t.life_page.missions.map((m, idx) => (
              <div
                key={idx}
                className={`p-6 md:p-8 rounded-[2rem] bg-[#e2dfdf] dark:bg-[#0c0c0c] border border-transparent hover:border-[#39B54A]/20 transition-all duration-500 group flex flex-col justify-between min-h-[220px] md:min-h-[260px] ${idx === 2 ? "sm:col-span-2 lg:col-span-1 sm:w-1/2 sm:mx-auto lg:w-full" : ""}`}
              >
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/80 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#39B54A] transition-colors duration-500">
                    <Compass
                      className="text-[#39B54A] group-hover:text-white transition-colors"
                      size={22}
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-black mb-2 dark:text-white uppercase italic tracking-tight">
                    {m.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium text-xs md:text-sm">
                    {m.desc}
                  </p>
                </div>
                <div className="w-6 group-hover:w-full h-[1.5px] bg-[#39B54A]/30 mt-6 transition-all duration-700 ease-in-out"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. FACILITIES (Header moslandi) --- */}
      <section className="py-16 md:py-32 bg-white dark:bg-[#050505] transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 mb-16 md:mb-24 text-left">
            <div className="shrink-0">
              <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 italic">
                {t.life_page.fac_subtitle}
              </h4>
              <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none">
                {t.life_page.fac_title1} <br className="hidden md:block" />
                <span className="text-[#39B54A]">{t.life_page.fac_title2}</span>
              </h2>
            </div>
            <div className="flex items-stretch gap-4 md:gap-6 max-w-md text-left">
              <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
              <p className="text-zinc-400 dark:text-zinc-500 text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] leading-relaxed py-1">
                {t.life_page.fac_desc}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {t.life_page.facilities.map((f, i) => (
                  <div
                    key={i}
                    className={`p-6 md:p-8 rounded-[2rem] bg-[#e2dfdf] dark:bg-zinc-900 border border-transparent hover:border-[#39B54A]/30 transition-all duration-500 group ${i < 2 ? "col-span-2 lg:col-span-1" : "col-span-1"}`}
                  >
                    <div className="w-10 h-10 bg-white dark:bg-black rounded-xl flex items-center justify-center text-[#39B54A] mb-4 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={22} />
                    </div>
                    <h4 className="font-black italic uppercase text-[12px] md:text-sm mb-2 dark:text-white tracking-tight">
                      {f.title}
                    </h4>
                    <p className="text-[10px] md:text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-[450px] aspect-square rounded-[3.5rem] overflow-hidden border-[12px] border-white dark:border-zinc-900 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 z-10">
                <img
                  src={t.life_page.fac_main_img}
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  alt="Facilities"
                />
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-6 z-20 bg-[#39B54A] p-6 md:p-10 rounded-full w-28 h-28 md:w-44 md:h-44 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-white dark:border-zinc-900"
              >
                <Zap
                  size={28}
                  fill="white"
                  className="text-white mb-1 md:mb-2"
                />
                <span className="font-black text-[8px] md:text-xs uppercase text-white leading-tight tracking-tighter">
                  {t.life_page.safe_badge}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. JARAYONLAR (Header moslandi) --- */}
      <section className="py-16 md:py-28 bg-white dark:bg-[#050505] transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 mb-12 lg:mb-24 text-left">
            <div className="shrink-0">
              <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 italic">
                {t.life_page.proc_subtitle}
              </h4>
              <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none">
                {t.life_page.proc_title1} <br className="hidden md:block" />
                <span className="text-[#39B54A]">
                  {t.life_page.proc_title2}
                </span>
              </h2>
            </div>
            <div className="flex items-stretch gap-4 md:gap-6 max-w-md text-left">
              <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
              <p className="text-zinc-400 dark:text-zinc-500 text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] leading-relaxed py-1">
                {t.life_page.proc_desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 md:gap-10 items-start">
            <div className="col-span-2 lg:col-span-7 group relative">
              <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#e2dfdf]">
                <img
                  src={t.life_page.process_images.theory}
                  className="w-full aspect-[4/3] md:aspect-[16/10] object-cover transition-all duration-1000 group-hover:scale-105"
                  alt="Theory"
                />
                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <span className="text-[#39B54A] font-black text-[10px] md:text-sm uppercase tracking-widest">
                    {t.life_page.theory}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-5 lg:-mt-20 group relative self-start">
              <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#e2dfdf] shadow-lg">
                <img
                  src={t.life_page.process_images.discipline}
                  className="w-full aspect-square md:aspect-[4/5] group-hover:scale-105 object-cover transition-all duration-1000"
                  alt="Discipline"
                />
              </div>
              <p className="mt-3 text-[#39B54A] font-black text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-right">
                — {t.life_page.discipline}
              </p>
            </div>
            <div className="col-span-1 lg:col-span-4 lg:-mt-32 group relative">
              <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#e2dfdf] border-4 md:border-8 border-white dark:border-zinc-900 shadow-md">
                <img
                  src={t.life_page.process_images.experience}
                  className="w-full aspect-[3/4] object-cover transition-all duration-1000 group-hover:scale-105"
                  alt="Experience"
                />
              </div>
            </div>
            <div className="col-span-2 lg:col-span-8 group relative lg:mt-6">
              <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] bg-[#e2dfdf] shadow-xl border border-zinc-100 dark:border-zinc-900">
                <img
                  src={t.life_page.process_images.creative}
                  className="w-full aspect-[2/1] object-cover transition-all duration-1000 group-hover:scale-105"
                  alt="Creative"
                />
                <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full text-white font-black text-[10px] md:text-base uppercase italic">
                  {t.life_page.creative}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
