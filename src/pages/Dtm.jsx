import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Search,
  School,
  Award,
  Hash,
  Calendar,
  History,
  Download,
  TrendingUp,
  Zap,
  Brain,
  CheckCircle2,
  Loader2,
  Target,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// --- 1. CLEAN PLACEHOLDER DATA (7015 olib tashlandi) ---
const DEFAULT_STUDENT = {
  name: "Dostonbek Solijonov",
  class: "Bitirgan",
  direction: "Aniq",
  rank: "1",
  percentile: 100,
  history: [
    {
      date: "00.00.0000",
      cert: 100,
      totalBall: 189,
      grantChance: 100,
      stats: [
        { name: "Ona tili", score: 10, max: 10, color: "#39B54A" },
        { name: "Matematika", score: 10, max: 10, color: "#39B54A" },
        { name: "Tarix", score: 10, max: 10, color: "#39B54A" },
        { name: "1-Blok", score: 30, max: 30, color: "#2E3192" },
        { name: "2-Blok", score: 30, max: 30, color: "#2E3192" },
      ],
    },
  ],
};

export default function DtmPremium() {
  const [searchId, setSearchId] = useState("");
  const [currentId, setCurrentId] = useState(""); // Default bo'sh
  const [testIndex, setTestIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState({});
  const reportRef = useRef(null);

  const SHEET_ID = "1maHii6PdtN3aHvDOS3jMvTbQX11_bnEWOWfjyIVfyGU";
  const SHEET_NAME = "dtms";

  useEffect(() => {
    const fetchSheetsData = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;
        const formatted = {};
        const roundNum = (num) => Math.round(parseFloat(num || 0) * 10) / 10;

        rows.forEach((row) => {
          const c = row.c;
          const id = c[2]?.v ? String(c[2].v) : null;
          if (!id) return;
          if (!formatted[id]) {
            formatted[id] = {
              name: c[1]?.v || "Noma'lum",
              class: c[4]?.v || "N/A",
              direction: c[3]?.v || "Noma'lum",
              rank: "Top 5%",
              percentile: 92,
              history: [],
            };
          }
          formatted[id].history.push({
            date: c[0]?.f || c[0]?.v || "Noma'lum",
            cert: c[16]?.v || 0,
            totalBall: roundNum(c[10]?.v),
            grantChance: Math.round((c[10]?.v / 189) * 100),
            stats: [
              {
                name: "Ona tili",
                score: roundNum(c[11]?.v),
                max: 10,
                color: "#39B54A",
              },
              {
                name: "Matematika",
                score: roundNum(c[12]?.v),
                max: 10,
                color: "#39B54A",
              },
              {
                name: "Tarix",
                score: roundNum(c[13]?.v),
                max: 10,
                color: "#39B54A",
              },
              {
                name: "1-Blok",
                score: roundNum(c[14]?.v),
                max: 30,
                color: "#2E3192",
              },
              {
                name: "2-Blok",
                score: roundNum(c[15]?.v),
                max: 30,
                color: "#2E3192",
              },
            ],
          });
        });
        setStudentsData(formatted);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchSheetsData();
  }, []);

  const student = useMemo(
    () => studentsData[currentId] || DEFAULT_STUDENT,
    [studentsData, currentId],
  );
  const currentTest = useMemo(
    () => student?.history[testIndex] || student?.history[0],
    [student, testIndex],
  );

  const aiAnalysis = useMemo(() => {
    if (!currentTest) return null;
    return {
      feedback:
        currentTest.totalBall >= 120
          ? "Grant uchun imkoniyat juda yuqori."
          : "Potensialingiz yuqori, ko'proq shug'ullaning!",
    };
  }, [currentTest]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (studentsData[searchId]) {
      setCurrentId(searchId);
      setTestIndex(0);
    } else {
      alert("ID topilmadi!");
    }
  };

  const downloadPDF = async () => {
    if (!reportRef.current || !currentId) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f0f2f5",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        (canvas.height * pdfWidth) / canvas.width,
      );
      pdf.save(`DTM_Natija_${student.name}.pdf`);
    } catch (e) {
      alert("Xatolik!");
    } finally {
      setIsDownloading(false);
    }
  };

  // --- 2. LOADING SCREEN (Y-Axis Rotation) ---
  if (loading) {
    return (
      <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#f0f2f5] dark:bg-[#080808]">
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mb-6"
        >
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>
        <div className="text-[#39B54A] font-black tracking-[0.3em] uppercase text-[10px] animate-pulse">
          Ma'lumotlar yuklanmoqda...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#050505] pt-22 px-3 sm:px-6 pb-4 transition-all flex flex-col overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col h-full">
        {/* 1. HEADER & SEARCH */}
        <div
          className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6"
          data-html2canvas-ignore="true"
        >
          <div className="flex items-center gap-3">
            <Zap className="text-[#39B54A] w-6 h-6" fill="#39B54A" />
            <h1 className="text-xl font-black tracking-tighter uppercase italic dark:text-white leading-none">
              DTM CORE
            </h1>
          </div>
          <form
            onSubmit={handleSearch}
            className="relative w-full lg:w-96 shadow-xl rounded-2xl overflow-hidden border border-white dark:border-zinc-800"
          >
            <input
              type="text"
              placeholder="ID raqamni kiriting..."
              className="w-full py-4 px-6 bg-white/90 dark:bg-zinc-900/90 outline-none font-bold text-sm dark:text-white"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 bg-[#39B54A] text-black rounded-xl hover:scale-105 transition-all"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* 2. DASHBOARD BODY */}
        <div ref={reportRef} className="flex flex-col gap-6 flex-1 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* PROFILE CARD (Mobileda Searchdan keyin 1-chi chiqadi) */}
            <div className="order-1 lg:order-3 lg:col-span-3 flex flex-col gap-4">
              <div className="bg-[#0f172a] dark:bg-zinc-900 text-white p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-[#39B54A]/20">
                <div className="relative z-10">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash size={16} className="text-[#39B54A]" />
                      <span className="text-xs font-mono text-[#39B54A] font-black tracking-widest">
                        ID: {currentId || "----"}
                      </span>
                    </div>
                    {/*break-words ism siqishi uchun*/}
                    <h2 className="text-2xl sm:text-3xl font-black uppercase italic leading-[1.1] break-words">
                      {student.name}
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg mb-6 border border-white/5">
                    <Trophy size={14} className="text-[#39B54A]" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#39B54A]">
                      {student.direction}
                    </p>
                  </div>
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <InfoRow icon={<School size={16} />} text={student.class} />
                    <InfoRow
                      icon={<Award size={16} />}
                      text={`${currentTest.cert} ta yutuq`}
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 text-9xl font-black text-white/5 italic select-none">
                  ID
                </div>
              </div>

              {/* AI ANALYSIS BOX (PCda Profilning tagida) */}
              <div className="hidden lg:block bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] shadow-xl border dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-4">
                  <Brain size={20} className="text-purple-500" />
                  <h4 className="text-xs font-black uppercase dark:text-white">
                    AI Tavsiya
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium italic leading-relaxed mb-6">
                  "{aiAnalysis?.feedback}"
                </p>
                <button
                  onClick={downloadPDF}
                  disabled={!currentId || isDownloading}
                  className="w-full py-4 bg-black dark:bg-[#39B54A] text-white dark:text-black rounded-2xl font-black flex items-center justify-center gap-2 transition-all text-xs active:scale-95 shadow-lg disabled:opacity-30"
                >
                  {isDownloading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      <Download size={16} /> PDF YUKLASH
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* STATS LEFT SIDEBAR (Mobileda 2-chi chiqadi) */}
            <div className="order-2 lg:order-1 lg:col-span-3 flex flex-col gap-4">
              <StatCard
                icon={<TrendingUp size={20} className="text-blue-500" />}
                label="Reyting"
                value={student.rank}
                sub="Umumiy o'rni"
                color="blue"
              />
              <StatCard
                icon={<Zap size={20} className="text-yellow-500" />}
                label="Percentile"
                value={`${student.percentile}%`}
                sub="O'sish dinamikasi"
                color="yellow"
              />
              <StatCard
                icon={<Brain size={20} className="text-purple-500" />}
                label="Analiz"
                value="Ijobiy"
                sub="AI xulosasi"
                color="purple"
              />
              <StatCard
                icon={<CheckCircle2 size={20} className="text-[#39B54A]" />}
                label="Grant"
                value={`${currentTest.grantChance}%`}
                sub="O'qishga kirish"
                color="green"
              />

              <div className="hidden lg:block p-6 rounded-[2rem] bg-[#39B54A]/5 border-2 border-dashed border-[#39B54A]/20 mt-auto">
                <p className="text-[10px] font-black uppercase text-[#39B54A] mb-2 flex items-center gap-2">
                  <Target size={14} /> Maqsad
                </p>
                <p className="text-xs font-bold text-slate-400 italic leading-relaxed">
                  Hozirgi natijangiz bilan siz davlat granti asosida qabul
                  qilinish imkoniyatiga egasiz.
                </p>
              </div>
            </div>

            {/* CHART CENTER (Mobileda 3-chi chiqadi) */}
            <div className="order-3 lg:order-2 lg:col-span-6">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] shadow-2xl border border-white dark:border-zinc-800 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-black italic flex items-center gap-2 uppercase dark:text-white">
                      <Calendar size={18} className="text-[#39B54A]" />{" "}
                      {currentTest.date}
                    </h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      O'zlashtirish tahlili
                    </p>
                  </div>
                  <div className="bg-[#39B54A]/10 px-4 py-2 rounded-xl text-center border border-[#39B54A]/20 shadow-inner">
                    <p className="text-[8px] text-slate-500 font-black uppercase tracking-tighter">
                      Jami Ball
                    </p>
                    <p className="text-3xl font-black text-[#39B54A]">
                      {currentTest.totalBall}
                    </p>
                  </div>
                </div>

                <div className="flex-1 min-h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentTest.stats}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.05}
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#64748b",
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      />
                      <YAxis hide domain={[0, 32]} />
                      <Tooltip
                        cursor={{ fill: "rgba(57, 181, 74, 0.05)" }}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          backgroundColor: "#000",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
                        {currentTest.stats.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6">
                  {currentTest.stats.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-slate-50/50 dark:bg-zinc-800/40 border dark:border-zinc-800 text-center shadow-sm"
                    >
                      <p className="text-[8px] text-slate-400 font-black uppercase mb-1 truncate px-1">
                        {item.name}
                      </p>
                      <p className="text-lg font-black dark:text-white leading-none">
                        {item.score}
                        <span className="text-[10px] text-slate-400">
                          /{item.max}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. HISTORY FOOTER (W-100% va Eng pastda) */}
          {student.history.length > 1 && (
            <div
              className="w-full mt-auto p-6 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-white dark:border-zinc-800 shadow-xl"
              data-html2canvas-ignore="true"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <History size={16} /> Imtihonlar tarixi
                </p>
                <div className="flex flex-wrap gap-2">
                  {student.history.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setTestIndex(i)}
                      className={`px-5 py-2.5 rounded-xl font-black text-[11px] transition-all border-2 ${testIndex === i ? "bg-[#39B54A] border-[#39B54A] text-black shadow-lg" : "bg-white dark:bg-zinc-800 text-slate-400 border-transparent hover:border-slate-200"}`}
                    >
                      {t.date}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`,
        }}
      />
    </div>
  );
}

// --- SUB-COMPONENTS ---
function StatCard({ icon, label, value, sub, color }) {
  const themes = {
    blue: "border-blue-500/20 bg-blue-500/5",
    yellow: "border-yellow-500/20 bg-yellow-500/5",
    purple: "border-purple-500/20 bg-purple-500/5",
    green: "border-[#39B54A]/20 bg-[#39B54A]/5",
  };
  return (
    <div
      className={`p-5 rounded-2xl border-2 ${themes[color]} flex items-center gap-5 transition-all hover:translate-x-1 bg-white dark:bg-zinc-900 shadow-sm`}
    >
      <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-md border dark:border-zinc-700">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
          {label}
        </p>
        <p className="text-xl font-black dark:text-white leading-none my-0.5">
          {value}
        </p>
        <p className="text-[7px] font-bold text-slate-400 italic truncate">
          {sub}
        </p>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-white/70">
      <div className="p-1.5 bg-white/5 rounded-lg border border-white/5">
        {icon}
      </div>
      <span className="font-bold text-[11px] tracking-tight">{text}</span>
    </div>
  );
}
