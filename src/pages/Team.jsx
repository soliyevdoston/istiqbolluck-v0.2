import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  director,
  administration,
  teachers,
  categories,
} from "../data/teamData.js";
import {
  X,
  Award,
  GraduationCap,
  Briefcase,
  Plus,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";

export default function Team() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [adminIdx, setAdminIdx] = useState(0);
  const [teacherIdx, setTeacherIdx] = useState(0);
  const [showAllAdmin, setShowAllAdmin] = useState(false);

  const filteredTeachers =
    activeTab === "all"
      ? teachers
      : teachers.filter((t) => t.category === activeTab);

  const [currentLimit, setCurrentLimit] = useState(4);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCurrentLimit(1);
      else if (window.innerWidth < 1024) setCurrentLimit(2);
      else setCurrentLimit(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const slide = (dir, type) => {
    if (type === "admin") {
      setAdminIdx((p) =>
        dir === "next"
          ? p >= administration.length - currentLimit
            ? 0
            : p + 1
          : p <= 0
            ? administration.length - currentLimit
            : p - 1,
      );
    } else {
      setTeacherIdx((p) =>
        dir === "next"
          ? p >= filteredTeachers.length - currentLimit
            ? 0
            : p + 1
          : p <= 0
            ? filteredTeachers.length - currentLimit
            : p - 1,
      );
    }
  };

  return (
    <div className="pt-24 pb-10 bg-white dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden">
      {/* --- 1. GLOBAL PAGE TITLE --- */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl md:text-[100px] font-black dark:text-white tracking-tighter uppercase italic leading-[0.8]">
            BIZNING <span className="text-[#39B54A]">JAMOA</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mt-6">
            Muvaffaqiyat poydevori - professional mutaxassislar
          </p>
        </motion.div>
      </div>

      {/* --- 2. DIREKTOR (Asosiy sarlavha bilan) --- */}
      <section className="max-w-6xl mx-auto px-6 mb-40">
        <div className="flex items-center gap-4 mb-12">
          <Award className="text-[#39B54A]" size={32} />
          <h2 className="text-3xl md:text-5xl font-black dark:text-white uppercase italic tracking-tighter">
            Maktab Rahbari
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] overflow-hidden border dark:border-zinc-800 shadow-sm"
        >
          <div className="md:w-2/5 h-[400px] md:h-[550px]">
            <img
              src={director.img}
              className="w-full h-full object-cover"
              alt="Director"
            />
          </div>
          <div className="md:w-3/5 p-10 md:p-20">
            <span className="text-[#39B54A] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              School Founder
            </span>
            <h2 className="text-4xl md:text-6xl font-black dark:text-white leading-none mb-6 italic uppercase tracking-tighter">
              {director.name}
            </h2>
            <p className="text-xl md:text-2xl italic text-zinc-500 mb-10 leading-relaxed font-medium">
              "{director.quote}"
            </p>
            <button
              onClick={() => setSelected(director)}
              className="flex items-center gap-3 text-xs font-black uppercase tracking-widest border-b-2 border-[#39B54A] pb-1 hover:gap-6 transition-all dark:text-white outline-none"
            >
              BATAFSIL MA'LUMOT <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- 3. RAHBARIYAT (Slider + All Button) --- */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-[#E43E1C]" size={24} />
              <span className="text-zinc-400 font-black uppercase text-[10px] tracking-widest">
                Management Team
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
              Rahbariyat
            </h2>
          </div>
          <button
            onClick={() => setShowAllAdmin(true)}
            className="group flex items-center gap-3 px-8 py-4 bg-zinc-100 dark:bg-zinc-900 dark:text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#E43E1C] hover:text-white transition-all shadow-lg"
          >
            Barcha Ma'muriyat{" "}
            <Plus
              size={14}
              className="group-hover:rotate-90 transition-transform"
            />
          </button>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: `-${adminIdx * (100 / currentLimit)}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex"
          >
            {administration.map((person) => (
              <div
                key={person.id}
                style={{ minWidth: `${100 / currentLimit}%` }}
                className="px-3"
              >
                <div
                  onClick={() => setSelected(person)}
                  className="cursor-pointer group bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-4 border dark:border-zinc-800 hover:border-[#E43E1C] transition-all"
                >
                  <div className="aspect-square rounded-[2rem] overflow-hidden mb-6">
                    <img
                      src={person.img}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      alt={person.name}
                    />
                  </div>
                  <h4 className="text-2xl font-black dark:text-white mb-1 uppercase italic tracking-tighter leading-none">
                    {person.name}
                  </h4>
                  <p className="text-[#E43E1C] font-bold text-[10px] uppercase tracking-widest mt-2">
                    {person.role}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
          {administration.length > currentLimit && (
            <div className="flex gap-4 mt-10 justify-center">
              <button
                onClick={() => slide("prev", "admin")}
                className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 dark:text-white hover:bg-[#E43E1C] hover:text-white transition-all"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => slide("next", "admin")}
                className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 dark:text-white hover:bg-[#E43E1C] hover:text-white transition-all"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- 4. O'QITUVCHILAR (Filter + Slider) --- */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Users className="text-[#39B54A]" size={24} />
            <span className="text-zinc-400 font-black uppercase text-[10px] tracking-widest">
              Pedagogical Staff
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black dark:text-white uppercase italic tracking-tighter leading-none mb-12">
            Pedagogik Jamoa
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setTeacherIdx(0);
                }}
                className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === cat.id ? "bg-[#39B54A] text-white shadow-xl shadow-green-500/20" : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: `-${teacherIdx * (100 / currentLimit)}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex"
          >
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                style={{ minWidth: `${100 / currentLimit}%` }}
                className="px-3"
              >
                <div
                  onClick={() => setSelected(teacher)}
                  className="cursor-pointer group bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-4 border dark:border-zinc-800 hover:border-[#39B54A] transition-all"
                >
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative">
                    <img
                      src={teacher.img}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      alt={teacher.name}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Plus
                        className="text-white bg-[#39B54A] rounded-full p-3 shadow-2xl"
                        size={40}
                      />
                    </div>
                  </div>
                  <h4 className="text-2xl font-black dark:text-white mb-1 italic uppercase tracking-tighter leading-none">
                    {teacher.name}
                  </h4>
                  <p className="text-[#39B54A] font-bold text-[10px] uppercase tracking-widest mt-2">
                    {teacher.subject}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
          {filteredTeachers.length > currentLimit && (
            <div className="flex gap-4 mt-12 justify-center">
              <button
                onClick={() => slide("prev", "teacher")}
                className="p-5 rounded-full border-2 dark:border-zinc-800 dark:text-white hover:bg-[#39B54A] hover:border-[#39B54A] transition-all shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => slide("next", "teacher")}
                className="p-5 rounded-full border-2 dark:border-zinc-800 dark:text-white hover:bg-[#39B54A] hover:border-[#39B54A] transition-all shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- MODALLAR --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] bg-white dark:bg-[#050505] overflow-y-auto"
          >
            <button
              onClick={() => setSelected(null)}
              className="fixed top-10 right-10 z-[610] p-4 bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-full hover:rotate-90 transition-transform shadow-2xl"
            >
              <X />
            </button>
            <div className="min-h-screen flex flex-col md:flex-row">
              <div className="md:w-1/2 h-[60vh] md:h-screen sticky top-0">
                <img
                  src={selected.img}
                  className="w-full h-full object-cover"
                  alt={selected.name}
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-24 flex flex-col justify-center">
                <span className="text-[#E43E1C] font-black uppercase text-[12px] mb-4 block tracking-[0.3em]">
                  {selected.role || selected.subject}
                </span>
                <h2 className="text-5xl md:text-8xl font-black dark:text-white mb-10 tracking-tighter italic uppercase leading-[0.8]">
                  {selected.name}
                </h2>
                <div className="space-y-8">
                  <InfoItem
                    icon={<GraduationCap />}
                    label="Ma'lumoti"
                    value={selected.education}
                  />
                  <InfoItem
                    icon={<Briefcase />}
                    label="Tajriba"
                    value={selected.experience}
                  />
                  <InfoItem
                    icon={<Award />}
                    label="Yutuqlar"
                    value={selected.achievements}
                  />
                </div>
                <p className="mt-14 text-2xl text-zinc-500 italic border-t dark:border-zinc-800 pt-10 leading-relaxed font-medium">
                  "{selected.bio}"
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {showAllAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[500] bg-white dark:bg-[#050505] p-6 md:p-16 overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto pt-20">
              <div className="flex justify-between items-center mb-20 border-b dark:border-zinc-800 pb-10">
                <h2 className="text-5xl md:text-8xl font-black dark:text-white italic uppercase tracking-tighter leading-none text-left">
                  Barcha <br />
                  <span className="text-[#E43E1C]">Ma'muriyat</span>
                </h2>
                <button
                  onClick={() => setShowAllAdmin(false)}
                  className="p-5 bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-full shadow-xl"
                >
                  <X size={30} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {administration.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelected(p);
                      setShowAllAdmin(false);
                    }}
                    className="group cursor-pointer bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] p-6 border dark:border-zinc-800 hover:border-[#E43E1C] transition-all"
                  >
                    <img
                      src={p.img}
                      className="w-full aspect-square object-cover rounded-[2rem] mb-6 group-hover:scale-105 transition-transform duration-700"
                      alt={p.name}
                    />
                    <h4 className="text-2xl font-black dark:text-white uppercase italic tracking-tighter leading-none">
                      {p.name}
                    </h4>
                    <p className="text-[#E43E1C] font-black text-[10px] uppercase mt-3 tracking-widest">
                      {p.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex gap-6 items-start">
    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 text-[#39B54A] rounded-2xl shadow-inner">
      {icon}
    </div>
    <div>
      <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">
        {label}
      </h4>
      <p className="dark:text-white font-black text-xl md:text-2xl leading-none italic tracking-tight">
        {value}
      </p>
    </div>
  </div>
);
