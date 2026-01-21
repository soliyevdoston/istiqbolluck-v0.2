import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
import { Play, Loader2, CheckCircle, ChevronDown, MapPin } from "lucide-react";

// --- 1. YORDAMCHI FUNKSIYALAR ---
const wrap = (min, max, v) =>
  ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

// --- 2. MA'LUMOTLAR ---
const faqs = [
  {
    question: "Maktabga qabul jarayoni qanday amalga oshiriladi?",
    answer:
      "Qabul jarayoni o'quvchi bilan suhbat va aniq fanlardan (matematika, mantiq) test sinovi asosida amalga oshiriladi.",
  },
  {
    question: "O'quv kun tartibi qanday?",
    answer: "Darslar soat 08:30 da boshlanadi va 16:30 gacha davom etadi.",
  },
  {
    question: "O'quvchilar ovqat bilan ta'minlanadimi?",
    answer: "Ha, maktabimizda 3 mahal issiq ovqat tashkil etilgan.",
  },
  {
    question: "Bitiruvchilarga qanday hujjat beriladi?",
    answer:
      "Bitiruvchilarga davlat namunasidagi shahodatnoma (attestat) beriladi.",
  },
];

const advantages = [
  {
    id: "01",
    title: "Har bir o‘quvchiga alohida e’tibor",
    desc: "O‘quvchi qaysi darajada bo‘lishidan qat’i nazar, unga mos yondashuv qo‘llaniladi.",
    color: "#39B54A",
  },
  {
    id: "02",
    title: "Kuchli ta’lim tizimi",
    desc: "Eng samarali xorijiy ta’lim tajribalari asosida tuzilgan dasturlar.",
    color: "#2E3192",
  },
  {
    id: "03",
    title: "Hayotiy ko‘nikmalar",
    desc: "O‘z fikrini erkin ifodalash va jamoada ishlash ko‘nikmalari rivojlanadi.",
    color: "#E43E1C",
  },
];

const stats = [
  {
    label: "O'quvchilar soni",
    value: "1200+",
    desc: "Bilimga chanqoq yoshlar bir oiladek jamlangan.",
  },
  {
    label: "Bitiruvchilar soni",
    value: "850+",
    desc: "Nufuzli oliygohlar va hayot yo'lida o'z o'rnini topganlar.",
  },
  {
    label: "O'qishga kirish",
    value: "98%",
    desc: "Bitiruvchilarimizning davlat va xalqaro OTMlardagi ulushi.",
  },
];

const studentFeedbacks = [
  {
    id: 1,
    name: "Lola Abdullayeva",
    role: "11-sinf bitiruvchisi",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
  },
  {
    id: 2,
    name: "Asadbek Orifov",
    role: "10-sinf o'quvchisi",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800",
  },
  {
    id: 3,
    name: "Jasur Mirzayev",
    role: "9-sinf o'quvchisi",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
  },
];

const textFeedbacks = [
  {
    id: 1,
    name: "Zuhra Karimova",
    role: "9-sinf",
    message:
      "Maktabdagi muhit menga juda yoqadi, ayniqsa mentorlar bilan ishlash tizimi juda foydali.",
  },
  {
    id: 2,
    name: "Bekzod Rahmonov",
    role: "10-sinf",
    message:
      "Xalqaro olimpiadalarga tayyorgarlik ko'rish uchun bu yerdan yaxshiroq joy yo'q.",
  },
  {
    id: 3,
    name: "Omina Ergasheva",
    role: "8-sinf",
    message: "Darslar faqat nazariya emas, amaliyotda ham juda ko'p ishlaymiz.",
  },
];

const universities = [
  "WIUT",
  "INHA",
  "TTPU",
  "AMITY",
  "MDIST",
  "AKFA",
  "WEBSTER",
  "HARVARD",
  "STANFORD",
  "MIT",
];

// --- 3. KOMPONENTLAR ---

const DraggableMarquee = ({ items, baseVelocity = -0.4 }) => {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const isDragging = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      let moveBy = baseVelocity * (delta / 1000) * 2;
      baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap py-4 w-full cursor-grab active:cursor-grabbing">
      <motion.div
        className="flex gap-4 md:gap-8"
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
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex-shrink-0">
            <img
              src={item}
              alt="Gallery"
              draggable="false"
              className="h-[200px] md:h-[300px] w-[280px] md:w-[450px] object-cover rounded-[2rem] pointer-events-none shadow-lg select-none"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const VideoFeedbackCard = ({ feedback }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[31%] snap-center px-3">
      <div className="relative h-[450px] md:h-[500px] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-black shadow-xl group">
        {!isPlaying ? (
          <>
            <img
              src={feedback.thumbnail}
              alt={feedback.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Play className="text-white fill-white" size={28} />
              </div>
            </div>
            <div className="absolute bottom-8 left-8 text-white text-left">
              <p className="font-black text-xl italic uppercase tracking-tighter leading-none mb-1">
                {feedback.name}
              </p>
              <p className="text-[#39B54A] font-bold text-[10px] uppercase tracking-widest">
                {feedback.role}
              </p>
            </div>
          </>
        ) : (
          <video
            src={feedback.videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
          />
        )}
      </div>
    </div>
  );
};

const TextFeedbackCard = ({ feedback }) => (
  <div className="flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[31%] snap-center px-3">
    <div className="h-full min-h-[250px] p-8 rounded-[2.5rem] bg-white dark:bg-[#0c0c0c] border dark:border-zinc-800 shadow-sm text-left flex flex-col justify-between">
      <p className="text-gray-500 dark:text-zinc-400 italic text-sm md:text-lg mb-6 leading-relaxed">
        "{feedback.message}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#39B54A] rounded-full flex items-center justify-center text-white font-bold">
          {feedback.name[0]}
        </div>
        <div>
          <p className="font-black text-sm uppercase italic dark:text-white">
            {feedback.name}
          </p>
          <p className="text-[#39B54A] font-bold text-[10px] uppercase">
            {feedback.role}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
      const suffix = value.replace(/[0-9]/g, "");
      const controls = animate(0, numericValue, {
        duration: 2.5,
        onUpdate: (latest) => setDisplayValue(Math.floor(latest) + suffix),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);
  return <span ref={ref}>{displayValue}</span>;
};

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex justify-between items-center text-left transition-all group"
      >
        <span className="text-lg md:text-2xl font-black dark:text-white uppercase italic tracking-tighter pr-8 leading-tight group-hover:text-[#39B54A] transition-colors">
          {faq.question}
        </span>
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#39B54A] flex items-center justify-center transition-all duration-500 ${isOpen ? "rotate-180 bg-[#39B54A] text-white" : "text-[#39B54A]"}`}
        >
          <ChevronDown size={24} strokeWidth={3} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p className="pb-8 text-gray-500 dark:text-zinc-400 font-medium text-sm md:text-lg italic leading-relaxed max-w-4xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 4. ASOSIY HOME KOMPONENTI ---

export default function Home() {
  const consultRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="w-full bg-white dark:bg-[#050505] font-sans overflow-x-hidden transition-colors duration-500">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.gazeta.uz/media/img/2022/09/HE29hc16640465414375_l.jpg"
            alt="School"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-center gap-3 tracking-[0.3em] font-black text-[10px] md:text-xs text-[#39B54A]"
          >
            KELAJAK YETAKCHILARI AKADEMIYASI
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-[90px] font-black leading-none tracking-tighter uppercase italic">
              <span className="text-[#E43E1C] text-6xl md:text-[110px]">
                ISTIQBOL
              </span>{" "}
              <br className="md:hidden" />
              <span className="text-white">LUCK</span>
            </h1>
            <div className="mt-6 text-xl md:text-5xl font-extrabold tracking-tight italic">
              Kelajak yetakchilari{" "}
              <span className="text-[#39B54A]">shu yerda kamol topadi.</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <button
              onClick={() =>
                consultRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-12 py-5 bg-[#39B54A] text-white rounded-full font-black text-xs md:text-sm tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Bog'lanish
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. ADVANTAGES SECTION */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 text-left">
            <div>
              <h2 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic">
                Nega aynan biz?
              </h2>
              <p className="text-4xl md:text-6xl font-black dark:text-white uppercase leading-none tracking-tighter">
                Afzalliklarimiz
              </p>
            </div>
            <p className="max-w-xs text-gray-500 border-l-2 border-[#E43E1C] pl-6 italic font-medium text-sm md:text-base">
              Har bir bolaning yashirin qobiliyatlarini yuzaga chiqaramiz.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {advantages.map((adv) => (
              <div
                key={adv.id}
                className="p-8 md:p-12 rounded-[2.5rem] bg-[#e3dede] dark:bg-[#0c0c0c] border dark:border-zinc-800 hover:border-[#39B54A] transition-all group text-left"
              >
                <span
                  className="text-5xl md:text-6xl font-black italic opacity-30 group-hover:opacity-100 transition-opacity"
                  style={{ color: adv.color }}
                >
                  {adv.id}
                </span>
                <h3 className="text-2xl md:text-3xl font-black mt-8 mb-4 dark:text-white leading-tight uppercase italic">
                  {adv.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-lg italic">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section className="py-20 bg-zinc-50 dark:bg-[#080808] border-y dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="mb-16 md:mb-24">
            <h4 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic">
              Muvaffaqiyat ko'zgusi
            </h4>
            <h2 className="text-4xl md:text-7xl font-black dark:text-white tracking-tighter italic uppercase">
              ISHONCH <span className="text-[#2E3192]">RAQAMLARDA</span>
            </h2>
            <div className="w-24 h-1 bg-[#E43E1C] mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {stats.map((s, i) => (
              <div key={i} className="text-center group">
                <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-3 tracking-widest">
                  {s.label}
                </h4>
                <div className="text-6xl font-black text-[#2E3192] dark:text-white mb-3 group-hover:text-[#39B54A] transition-colors">
                  <Counter value={s.value} />
                </div>
                <div className="w-8 h-1 bg-[#E43E1C] mx-auto mb-3 group-hover:w-16 transition-all"></div>
                <p className="text-xs text-gray-500 italic px-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAKTAB HAYOTI SECTION */}
      <section className="py-20 md:py-32">
        <div className="w-full text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-20 dark:text-white italic uppercase tracking-tighter px-4">
            MAKTAB <span className="text-[#39B54A]">HAYOTI</span>
          </h2>
          <DraggableMarquee
            baseVelocity={-0.4}
            items={[
              "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
              "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
            ]}
          />
          <DraggableMarquee
            baseVelocity={0.4}
            items={[
              "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
              "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
            ]}
          />
        </div>
      </section>

      {/* 5. FEEDBACK SECTION */}
      <section className="py-20 md:py-32 bg-zinc-50 dark:bg-[#080808] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h4 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic">
            Samimiy fikrlar
          </h4>
          <h2 className="text-4xl md:text-7xl font-black dark:text-white tracking-tighter italic uppercase">
            O'QUVCHILARIMIZ <span className="text-[#E43E1C]">OVOZI</span>
          </h2>
        </div>
        <div className="w-full overflow-x-auto snap-x snap-mandatory flex hide-scrollbar px-4 md:px-[10%] pb-10">
          {studentFeedbacks.map((f) => (
            <VideoFeedbackCard key={f.id} feedback={f} />
          ))}
        </div>
        <div className="w-full overflow-x-auto snap-x snap-mandatory flex scroll-smooth hide-scrollbar mt-4 px-4 md:px-[10%]">
          {textFeedbacks.map((tf) => (
            <TextFeedbackCard key={tf.id} feedback={tf} />
          ))}
        </div>
      </section>

      {/* 6. UNIVERSITIES SECTION (2 Qatorli Marquee) */}
      <section className="py-20 md:py-32 border-y border-zinc-100 dark:border-zinc-900 overflow-hidden bg-white dark:bg-[#050505]">
        {/* Sarlavha */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 md:mb-20">
          <h4 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic">
            Katta kelajak sari
          </h4>
          <h2 className="text-4xl md:text-7xl font-black dark:text-white tracking-tighter italic uppercase leading-tight md:leading-[0.9]">
            BITIRUVCHILARIMIZ <br />
            <span className="text-[#2E3192]">NUFUZLI</span> OLIGOHLARDA
          </h2>
        </div>

        {/* Universities Marquee */}
        <div className="flex flex-col gap-4 md:gap-8 group">
          {/* 1-Qator: Chapga harakatlanadi */}
          <div className="flex overflow-hidden select-none gap-8 py-2 animate-scroll">
            {[...universities, ...universities].map((univ, idx) => (
              <span
                key={`row1-${idx}`}
                className="text-2xl md:text-5xl font-black italic uppercase tracking-tighter text-zinc-300 dark:text-zinc-800 hover:text-[#39B54A] transition-colors duration-300 cursor-default px-6"
              >
                {univ}
              </span>
            ))}
          </div>

          {/* 2-Qator: O'ngga harakatlanadi (Reverse) */}
          <div className="flex overflow-hidden select-none gap-8 py-2 animate-scroll-reverse">
            {[...universities, ...universities].map((univ, idx) => (
              <span
                key={`row2-${idx}`}
                className="text-2xl md:text-5xl font-black italic uppercase tracking-tighter text-zinc-300 dark:text-zinc-800 hover:text-[#E43E1C] transition-colors duration-300 cursor-default px-6"
              >
                {univ}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KONSULTATSIYA SECTION */}
      <section
        ref={consultRef}
        className="py-20 md:py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="bg-[#e3dede] dark:bg-[#0c0c0c] p-10 rounded-[2.5rem] relative overflow-hidden border dark:border-zinc-800 shadow-2xl text-left">
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 bg-[#39B54A] flex flex-col items-center justify-center text-white text-center p-6"
              >
                <CheckCircle size={60} className="mb-4 animate-bounce" />{" "}
                <h3 className="text-2xl font-black uppercase italic">
                  Ariza yuborildi!
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
          <h2 className="text-4xl md:text-7xl font-black dark:text-white uppercase italic mb-8 leading-tight">
            QO'SHILISH VAQTI <span className="text-[#E43E1C]">KELDI.</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              type="text"
              placeholder="Ismingiz"
              className="w-full p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] outline-none transition-all font-bold"
            />
            <input
              required
              type="text"
              defaultValue="+998"
              className="w-full p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] outline-none transition-all font-bold"
            />
            <button
              type="submit"
              className="w-full py-5 bg-[#39B54A] text-white font-black uppercase rounded-2xl text-lg hover:bg-black transition-all shadow-lg active:scale-95"
            >
              {status === "loading" ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Ariza topshirish"
              )}
            </button>
          </form>
        </div>
        <div className="h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl relative">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.912659295463!2d71.22956197613638!3d40.43293285465283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb01b0ac926783%3A0xa103cff84e3dbd4b!2sIstiqbol%20luck%20xususiy%20maktabi!5e0!3m2!1sru!2s!4v1768546214781!5m2!1sru!2s"
            className="w-full h-full grayscale dark:invert"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="absolute top-6 left-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 shadow-2xl">
            <div className="w-10 h-10 bg-[#39B54A] rounded-xl flex items-center justify-center text-white">
              <MapPin size={20} />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-black dark:text-white uppercase leading-none">
                Rishton filiali
              </h3>
              <p className="text-[10px] text-gray-500 font-bold">
                Rishton tumani
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 text-left">
            <div>
              <h4 className="text-[#39B54A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-4 italic">
                Sizni qiziqtirgan savollar
              </h4>
              <h2 className="text-4xl md:text-7xl font-black dark:text-white tracking-tighter italic uppercase">
                KO'P BERILADIGAN{" "}
                <span className="text-[#E43E1C]">SAVOLLAR</span>
              </h2>
            </div>
            <p className="max-w-xs text-gray-500 border-l-2 border-[#2E3192] pl-6 italic font-medium text-sm md:text-base">
              Agar savolingizga javob topmasangiz, bizga murojaat qiling.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0c0c0c] rounded-[3rem] p-6 md:p-12 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
