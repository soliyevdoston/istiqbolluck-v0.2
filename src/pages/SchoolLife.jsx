import React, { useRef, useMemo, memo } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  useSpring,
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

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- 1. HYPER-SMOOTH & SLOW MARQUEE ---
const DraggableMarquee = memo(({ items = [], baseVelocity = -0.02 }) => {
  const baseX = useMotionValue(0);
  
  // Juda yuqori damping va past stiffness silliqlikni ta'minlaydi
  const smoothX = useSpring(baseX, {
    damping: 100, 
    stiffness: 100,
    restDelta: 0.001
  });

  const x = useTransform(smoothX, (v) => `${wrap(-25, -50, v)}%`);
  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      // Delta vaqtiga bog'liq o'ta sekin harakat
      let moveBy = baseVelocity * (delta / 10); 
      baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap py-4 md:py-8 w-full cursor-grab active:cursor-grabbing select-none">
      <motion.div
        className="flex gap-4 md:gap-12 will-change-transform transform-gpu"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => (isDragging.current = false)}
        onDrag={(e, info) => {
          const currentX = baseX.get();
          // Drag paytida sezgirlikni yanada yumshoq qilish
          baseX.set(currentX + info.delta.x * 0.03);
        }}
      >
        {[...Array(4)].map((_, outerIdx) => (
          <div key={outerIdx} className="flex gap-4 md:gap-12">
            {items.map((img, i) => (
              <div key={`${outerIdx}-${i}`} className="flex-shrink-0">
                <div className="w-[260px] h-[180px] md:w-[450px] md:h-[320px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white dark:border-zinc-900 shadow-2xl pointer-events-none">
                  <img
                    src={img}
                    alt="Gallery"
                    loading="lazy"
                    className="w-full h-full object-cover transform-gpu scale-[1.01]"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
});

export default function SchoolLife() {
  const { t } = useLanguage();
  const scrollTargetRef = useRef(null);

  const clubIcons = useMemo(() => [
    <Trophy size={32} />, <Tv size={32} />, <Computer size={32} />, <Book size={32} />,
  ], []);

  if (!t.life_page) return null;

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden selection:bg-[#39B54A] selection:text-white">
      
      {/* --- 1. HERO SECTION (Optimized Mobile) --- */}
      <section className="relative min-h-[100vh] w-full flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
        
        {/* Orqa fon nurli effekt (Sekin pulsatsiya) */}
        <motion.div 
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#39B54A] rounded-full blur-[140px] opacity-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#e2dfdf_1px,transparent_1px)] [background-size:40px_40px] dark:bg-[radial-gradient(#1a1a1a_1px,transparent_1px)]"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-20 max-w-7xl mx-auto w-full">
          {/* Matn qismi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 md:w-14 h-[2px] bg-[#39B54A]"></span>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#39B54A]">
                {t.life_page.hero_label}
              </span>
              <span className="w-10 md:w-14 h-[2px] bg-[#39B54A] lg:hidden"></span>
            </div>

            <h1 className="text-[44px] sm:text-7xl md:text-8xl lg:text-[105px] font-[900] tracking-tighter dark:text-white leading-[0.85] uppercase italic">
              {t.life_page.hero_title1} <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #39B54A" }}>
                {t.life_page.hero_title2}
              </span>
            </h1>

            <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-5 max-w-xl">
              <div className="hidden lg:block w-[3px] bg-[#39B54A] opacity-40 shrink-0"></div>
              <p className="text-[13px] md:text-xl font-semibold text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase tracking-tight italic">
                {t.life_page.hero_desc}
              </p>
            </div>

            <button
              onClick={() => scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-6 text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-[#39B54A] hover:text-black dark:hover:text-white transition-all pt-4"
            >
              {t.life_page.view_gallery}
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-full border-2 border-[#39B54A] flex items-center justify-center group-hover:bg-[#39B54A] group-hover:text-white transition-all duration-700 group-hover:rotate-45 shadow-lg shadow-[#39B54A]/20">
                <ArrowUpRight size={24} className="md:w-8 md:h-8" />
              </div>
            </button>
          </motion.div>

          {/* Hero Rasm (Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1.4 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="w-full max-w-[440px] aspect-[4/5] rounded-[4.5rem] overflow-hidden border-[15px] border-white dark:border-zinc-900 shadow-2xl hover:rotate-0 transition-transform duration-1000 transform-gpu">
              <img src={t.life_page.hero_img} alt="School" className="w-full h-full object-cover" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -inset-10 bg-[#39B54A] rounded-full blur-[100px] -z-10"
            ></motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. GALLERY (Super Slow) --- */}
      <section ref={scrollTargetRef} className="py-16 bg-white dark:bg-[#080808] border-y border-zinc-100 dark:border-zinc-900">
        <DraggableMarquee items={t.life_page.galleryRow1} baseVelocity={-0.015} />
        <DraggableMarquee items={t.life_page.galleryRow2} baseVelocity={0.015} />
      </section>

      {/* --- 3. CLUBS --- */}
      <section className="py-24 md:py-32 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20 text-center md:text-left">
            <div>
              <h4 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3 italic">
                {t.life_page.clubs_subtitle}
              </h4>
              <h2 className="text-4xl md:text-7xl font-black dark:text-white uppercase tracking-tighter leading-none">
                {t.life_page.clubs_title1} <br className="hidden md:block" />
                <span className="text-[#39B54A]">{t.life_page.clubs_title2}</span>
              </h2>
            </div>
            <div className="flex items-stretch gap-6 max-w-md mx-auto md:mx-0">
              <div className="w-[4px] bg-[#39B54A] opacity-20 shrink-0"></div>
              <p className="text-zinc-400 dark:text-zinc-500 text-[11px] md:text-sm font-bold uppercase tracking-widest leading-relaxed py-2">
                {t.life_page.clubs_desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.life_page.extraClubs.map((club, idx) => (
              <div key={idx} className="p-10 rounded-[3rem] bg-[#f8f8f8] dark:bg-[#0c0c0c] border border-transparent hover:border-[#39B54A]/30 transition-all duration-700 group flex flex-col items-center md:items-start">
                <div className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center text-white bg-[#39B54A] group-hover:scale-110 group-hover:rotate-12 transition-all shadow-xl shadow-[#39B54A]/20">
                  {React.cloneElement(clubIcons[idx], { size: 30 })}
                </div>
                <h4 className="text-2xl font-black uppercase italic mb-4 text-zinc-900 dark:text-white tracking-tight">
                  {club.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                  {club.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. MISSION --- */}
      <section className="py-20 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.life_page.missions.map((m, idx) => (
              <div key={idx} className="p-12 rounded-[3.5rem] bg-[#f8f8f8] dark:bg-[#0c0c0c] group hover:translate-y-[-12px] transition-all duration-700 border border-zinc-100 dark:border-zinc-900/50">
                <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#39B54A] group-hover:text-white transition-colors duration-500">
                  <Compass size={28} />
                </div>
                <h3 className="text-2xl font-black mb-4 dark:text-white uppercase italic tracking-tight">
                  {m.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. FACILITIES --- */}
      <section className="py-24 md:py-32 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.life_page.facilities.map((f, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-[#f8f8f8] dark:bg-zinc-900/40 border border-transparent hover:border-[#39B54A]/20 transition-all duration-500 group">
                  <ShieldCheck className="text-[#39B54A] mb-5 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-black italic uppercase text-base mb-3 dark:text-white">
                    {f.title}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-1/2 relative order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-[480px] aspect-square rounded-[4.5rem] md:rounded-[6rem] overflow-hidden border-[15px] md:border-[25px] border-white dark:border-zinc-900 shadow-2xl rotate-3 transform-gpu">
                <img src={t.life_page.fac_main_img} className="w-full h-full object-cover" alt="Facilities" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-8 z-20 bg-[#39B54A] p-10 md:p-14 rounded-full w-32 h-32 md:w-52 md:h-52 flex flex-col items-center justify-center text-center shadow-2xl border-8 border-white dark:border-zinc-900"
              >
                <Zap fill="white" className="text-white mb-2" size={32} />
                <span className="font-black text-[10px] md:text-sm uppercase text-white leading-tight">
                  {t.life_page.safe_badge}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. PROCESS --- */}
      <section className="py-24 bg-white dark:bg-[#050505] pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="col-span-2 lg:col-span-7 group relative overflow-hidden rounded-[3.5rem] shadow-2xl border-4 border-white dark:border-zinc-900">
              <img src={t.life_page.process_images.theory} className="w-full aspect-[16/10] object-cover transition-transform duration-[2.5s] group-hover:scale-110" alt="Theory" />
              <div className="absolute bottom-8 left-8 bg-white/95 dark:bg-black/95 px-8 py-4 rounded-2xl shadow-2xl">
                <span className="text-[#39B54A] font-black text-sm md:text-xl uppercase tracking-[0.2em]">
                  {t.life_page.theory}
                </span>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-5 group overflow-hidden rounded-[3rem] shadow-xl lg:-mt-16 border-4 border-white dark:border-zinc-900">
               <img src={t.life_page.process_images.discipline} className="w-full aspect-square md:aspect-[4/5] object-cover transition-transform duration-[2.5s] group-hover:scale-110" alt="Discipline" />
            </div>
            <div className="col-span-1 lg:col-span-4 group overflow-hidden rounded-[3rem] shadow-xl lg:-mt-24 border-4 border-white dark:border-zinc-900">
               <img src={t.life_page.process_images.experience} className="w-full aspect-[3/4] object-cover transition-transform duration-[2.5s] group-hover:scale-110" alt="Experience" />
            </div>
            <div className="col-span-2 lg:col-span-8 group relative overflow-hidden rounded-[3.5rem] shadow-2xl border-4 border-white dark:border-zinc-900">
               <img src={t.life_page.process_images.creative} className="w-full aspect-[21/9] object-cover transition-transform duration-[2.5s] group-hover:scale-110" alt="Creative" />
               <div className="absolute top-8 right-8 bg-[#39B54A] px-10 py-4 rounded-full text-white font-black text-sm md:text-xl uppercase italic shadow-2xl">
                  {t.life_page.creative}
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}