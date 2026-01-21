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
  ArrowRight,
  ShieldCheck,
  Star,
  Trophy,
  Zap,
  Compass,
  Lightbulb,
  Camera,
} from "lucide-react";

// Ma'lumotlar
import {
  missions,
  facilities,
  galleryRow1,
  galleryRow2,
} from "../data/schoolLifeData";

const extraClubs = [
  {
    icon: <Trophy size={32} />,
    title: "Sport Klublari",
    desc: "Sog‘lom tana, jismoniy chidamlilik va g‘oliblik ruhi",
    color: "#F59E0B",
  },
  {
    icon: <Tv size={32} />,
    title: "Madaniy Hordiq",
    desc: "Filmlar va madaniy tadbirlar orqali hordiq",
    color: "#8B5CF6",
  },
  {
    icon: <Computer size={32} />,
    title: "Kompyuter va IT",
    desc: "Dasturlash va texnologik loyihalar",
    color: "#0EA5E9",
  },
  {
    icon: <Book size={32} />,
    title: "Qo‘shimcha Darslar",
    desc: "Fanlar bo‘yicha chuqurlashtirilgan tayyorgarlik",
    color: "#F97316",
  },
];

const wrap = (min, max, v) =>
  ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

// --- DRAGGABLE MARQUEE (Premium Shadow & Size) ---
const DraggableMarquee = ({ items, baseVelocity = -0.4 }) => {
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
    <div className="overflow-hidden flex whitespace-nowrap py-16 w-full cursor-grab active:cursor-grabbing">
      <motion.div
        className="flex gap-8 md:gap-14"
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
            <div className="w-[240px] h-[170px] md:w-[360px] md:h-[250px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border-[8px] md:border-[12px] border-white dark:border-zinc-900 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
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
  const scrollTargetRef = useRef(null);

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center pt-10 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fcfcfc] dark:to-[#050505] z-10"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="p-2 bg-[#39B54A]/10 rounded-lg text-[#39B54A]">
                <Camera size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                Life in focus
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter dark:text-white leading-[0.85] italic uppercase mb-8">
              MAKTAB <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px #39B54A" }}
              >
                HAYOTI
              </span>
            </h1>

            <p className="text-lg md:text-2xl font-bold text-zinc-500 leading-tight mb-10 uppercase italic max-w-xl mx-auto lg:mx-0">
              Har bir lahza — bu{" "}
              <span className="text-zinc-900 dark:text-white border-b-4 border-[#E43E1C]">
                muvaffaqiyatga
              </span>{" "}
              qo'yilgan qadamdir.
            </p>

            <button
              onClick={() =>
                scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-6 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#39B54A] mx-auto lg:mx-0"
            >
              GALEREYANI KO'RISH
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#39B54A] flex items-center justify-center group-hover:bg-[#39B54A] group-hover:text-white transition-all duration-500 group-hover:rotate-90">
                <ArrowRight size={20} />
              </div>
            </button>
          </motion.div>

          {/* Hero Image (Double Shadow Effect) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="w-full max-w-[400px] aspect-[4/5] rounded-[3.5rem] overflow-hidden border-[15px] border-white dark:border-zinc-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4),0_30px_60px_-30px_rgba(0,0,0,0.3)] rotate-3 relative z-10 hover:rotate-0 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Ambient Glow */}
            <div className="absolute -inset-10 bg-[#39B54A] rounded-full opacity-10 blur-3xl animate-pulse"></div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. GALEREYA --- */}
      <section
        ref={scrollTargetRef}
        className="py-8 overflow-hidden bg-white dark:bg-[#080808]"
      >
        <DraggableMarquee items={galleryRow1} baseVelocity={-0.3} />
        <DraggableMarquee items={galleryRow2} baseVelocity={0.3} />
      </section>

      {/* --- 3. CLUBS --- */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-5xl md:text-7xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
              Darsdan <br /> <span className="text-[#39B54A]">Tashqari</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extraClubs.map((club, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#111] p-10 rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border-b-8 transition-all duration-500 group hover:-translate-y-2"
                style={{ borderBottomColor: club.color }}
              >
                <div
                  style={{ backgroundColor: club.color }}
                  className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform"
                >
                  {club.icon}
                </div>
                <h4 className="text-xl font-black uppercase italic mb-3 text-zinc-900 dark:text-white">
                  {club.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium leading-relaxed">
                  {club.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. MISSION --- */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 text-center md:text-left">
            <h2 className="text-5xl md:text-8xl font-black dark:text-white uppercase italic leading-[0.8] tracking-tighter">
              BIZNING <br />
              <span className="text-[#39B54A]">YO‘NALISHIMIZ</span>
            </h2>
            <div className="bg-[#39B54A]/10 p-5 rounded-[2rem] border border-[#39B54A]/20 flex items-center gap-4 mx-auto md:mx-0">
              <Lightbulb className="text-[#39B54A]" size={28} />
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">
                Muvaffaqiyat poydevori
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missions.map((m) => (
              <div
                key={m.id}
                className="bg-[#f8f8f8] dark:bg-[#0c0c0c] p-10 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-b-[10px] transition-all hover:scale-[1.03] duration-500"
                style={{ borderBottomColor: m.color }}
              >
                <Compass
                  style={{ color: m.color }}
                  size={40}
                  className="mb-6"
                />
                <h3 className="text-2xl font-black mb-4 dark:text-white uppercase italic tracking-tight">
                  {m.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-sm md:text-base">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. FACILITIES --- */}
      <section className="py-24 bg-[#080b16] text-white relative overflow-hidden px-6">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-5xl md:text-8xl font-black mb-12 leading-[0.85] italic uppercase tracking-tighter text-center lg:text-left">
              KOMFORT <br /> <span className="text-[#39B54A]">HUDUDI</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {facilities.map((f, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/5 rounded-[2rem] border border-white/10 hover:bg-[#39B54A] hover:text-black transition-all duration-500 group"
                >
                  <ShieldCheck
                    className="text-[#39B54A] group-hover:text-black mb-3"
                    size={24}
                  />
                  <h4 className="font-black italic uppercase text-xs mb-2">
                    {f.title}
                  </h4>
                  <p className="text-[10px] opacity-60 group-hover:opacity-100 font-medium">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative w-full max-w-lg">
            <div className="aspect-square rounded-[3.5rem] md:rounded-[5rem] overflow-hidden border-[10px] md:border-[15px] border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
                className="w-full h-full object-cover"
                alt="School"
              />
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-5 -right-5 md:-bottom-10 md:-right-10 bg-[#E43E1C] p-8 md:p-12 rounded-full w-32 h-32 md:w-44 md:h-44 flex flex-col items-center justify-center text-center shadow-2xl"
            >
              <Zap size={32} fill="white" className="mb-1" />
              <span className="font-black text-[8px] md:text-xs uppercase leading-tight">
                100% Xavfsiz
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 6. JARAYONLAR (Premium Grid Shadow) --- */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-9xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
              JARAYONLAR
            </h2>
            <div className="w-24 md:w-32 h-2 bg-[#39B54A] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 md:gap-8 h-auto lg:h-[800px]">
            <div className="lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-zinc-100 dark:border-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="P1"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-black text-2xl italic uppercase">
                  Nazariya
                </p>
              </div>
            </div>

            <div className="lg:col-span-1 lg:row-span-2 group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-4 border-zinc-100 dark:border-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
                className="w-full h-full object-cover"
                alt="P2"
              />
            </div>

            <div className="lg:col-span-1 lg:row-span-1 bg-[#2E3192] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-white flex flex-col justify-end relative overflow-hidden group shadow-[0_20px_40px_rgba(46,49,146,0.3)]">
              <Star
                size={100}
                className="absolute -right-6 -top-6 opacity-20 rotate-12 group-hover:rotate-180 transition-transform duration-1000"
              />
              <h3 className="text-3xl font-black uppercase italic leading-[0.8]">
                AMALIY <br /> TA'LIM
              </h3>
            </div>

            <div className="lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-zinc-100 dark:border-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="P3"
              />
            </div>

            <div className="lg:col-span-1 lg:row-span-1 bg-[#39B54A] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-white shadow-[0_20px_40px_rgba(57,181,74,0.3)] flex items-center justify-center text-center">
              <h4 className="text-2xl font-black uppercase italic leading-none">
                Ijodiy <br /> Fokus
              </h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
