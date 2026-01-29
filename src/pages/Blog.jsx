import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  ArrowUpRight,
  ArrowRight,
  X,
  Filter,
  Clock,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Blog() {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const currentCategory = activeCategory || t.blog_all;

  const categories = useMemo(() => {
    return [t.blog_all, ...new Set(t.blogPosts.map((post) => post.category))];
  }, [t.blog_all, t.blogPosts]);

  const filteredPosts =
    currentCategory === t.blog_all
      ? t.blogPosts
      : t.blogPosts.filter((post) => post.category === currentCategory);

  return (
    <div className="pt-16 md:pt-20 pb-24 bg-white dark:bg-[#050505] transition-colors min-h-screen font-sans overflow-x-hidden">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative py-10 md:py-28 overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#39B54A]/5 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 border-b border-zinc-100 dark:border-zinc-900 pb-12 md:pb-20">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8"
              >
                <span className="w-8 md:w-12 h-[1px] bg-[#39B54A]"></span>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#39B54A]">
                  {t.blog_subtitle}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-[900] leading-[0.9] md:leading-[0.8] tracking-tighter dark:text-white uppercase italic"
              >
                {t.blog_title1}{" "}
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px #39B54A" }}
                >
                  &
                </span>
                <br />
                <span className="text-zinc-300 dark:text-zinc-800">
                  {t.blog_title2}
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-stretch gap-4 md:gap-6 max-w-sm"
            >
              <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-40 shrink-0"></div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium italic text-sm md:text-lg leading-relaxed uppercase tracking-tight">
                {t.blog_desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 2. CATEGORY FILTER (No-scroll, Wrap version) --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-12 md:mb-20">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {/* Filter Icon */}
          <div className="p-3 md:p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl md:rounded-2xl text-[#39B54A] shrink-0 shadow-sm">
            <Filter size={18} />
          </div>

          {/* Category Buttons */}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 md:px-8 py-2.5 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.2em] transition-all ${
                currentCategory === cat
                  ? "bg-[#39B54A] text-white shadow-lg shadow-green-500/30 -translate-y-0.5"
                  : "bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent dark:border-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* --- 3. BLOG GRID --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-24 md:mb-40">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="group block text-left">
                  <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] aspect-[16/10] mb-8 md:mb-10 border border-zinc-100 dark:border-zinc-900 shadow-sm">
                    <img
                      src={post.image}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt={post.title}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-md p-3 md:p-5 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                        <ArrowUpRight
                          size={24}
                          className="md:w-[30px] md:h-[30px] text-[#39B54A]"
                        />
                      </div>
                    </div>
                    <div className="absolute top-4 md:top-8 left-4 md:left-8">
                      <span className="px-3 md:px-5 py-1.5 md:py-2 bg-white/90 dark:bg-black/95 backdrop-blur-xl rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.2em] dark:text-[#39B54A] shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 md:gap-8 group">
                    <div className="w-[3px] md:w-[6px] bg-zinc-100 dark:bg-zinc-800 shrink-0 group-hover:bg-[#39B54A] transition-colors duration-500 rounded-full"></div>
                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-3 md:mb-4 text-zinc-400 text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.2em]">
                        <span className="flex items-center gap-1.5 md:gap-2">
                          <Calendar size={12} className="text-[#39B54A]" />{" "}
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5 md:gap-2">
                          <Clock size={12} className="text-[#39B54A]" />{" "}
                          {t.blog_read_time}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-3xl lg:text-5xl font-black dark:text-white leading-[1.2] md:leading-[1.1] mb-4 md:mb-5 tracking-tighter uppercase italic group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-500">
                        {post.title}
                      </h2>
                      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 text-sm md:text-lg font-medium">
                        {post.desc}
                      </p>
                      <div className="mt-6 md:mt-8 flex items-center gap-2 md:gap-3 text-[#39B54A] text-[9px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                        {t.blog_read_more} <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- 4. CERTIFICATES SECTION --- */}
      <section className="bg-zinc-50 dark:bg-[#080808] py-20 md:py-32 border-t dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 md:mb-24 gap-8 md:gap-12 text-left">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
              >
                <span className="w-8 md:w-12 h-[1px] bg-[#39B54A]"></span>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em] text-zinc-400">
                  {t.cert_subtitle}
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-[900] dark:text-white tracking-tighter uppercase italic leading-[1] md:leading-none">
                {t.cert_title1} <br />{" "}
                <span className="text-[#39B54A]">{t.cert_title2}</span>
              </h2>
            </div>
            <div className="flex items-stretch gap-4 md:gap-6 max-w-sm">
              <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-40 shrink-0"></div>
              <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[9px] md:text-[11px] tracking-wider md:tracking-[0.2em] leading-relaxed">
                Bizning o'qituvchilarimiz xalqaro malaka va professional
                sertifikatlarga ega.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10">
            {t.certificates.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedCert(cert)}
                className="group relative aspect-[3/4] bg-white dark:bg-zinc-900 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden cursor-pointer shadow-xl border border-zinc-100 dark:border-zinc-800"
              >
                <img
                  src={cert.img}
                  className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  alt="Cert"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-3 md:p-10 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-[#39B54A] text-[7px] md:text-[9px] font-black uppercase tracking-wider md:tracking-[0.4em] mb-1 md:mb-3">
                    {cert.teacher}
                  </p>
                  <h4 className="text-white font-black text-[10px] md:text-2xl leading-tight group-hover:text-[#39B54A] transition-colors uppercase italic tracking-tighter">
                    {cert.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. MODAL --- */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 md:top-10 right-6 md:right-10 p-3 md:p-5 bg-white/10 text-white rounded-full hover:bg-[#E43E1C] transition-colors z-[2100]"
            >
              <X size={24} />
            </motion.button>
            <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8 md:gap-16 py-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full lg:flex-1"
              >
                <img
                  src={selectedCert.img}
                  className="w-full h-auto shadow-2xl rounded-xl md:rounded-2xl border border-white/10"
                  alt="Full Cert"
                />
              </motion.div>
              <div className="w-full lg:flex-1 text-center lg:text-left">
                <span className="text-[#39B54A] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs mb-4 md:mb-6 block">
                  {t.cert_detail_label}
                </span>
                <h3 className="text-3xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight mb-8 md:mb-10 italic">
                  {selectedCert.title}
                </h3>
                <div className="flex gap-4 md:gap-6 mb-8 md:mb-12 justify-center lg:justify-start">
                  <div className="w-[3px] md:w-[4px] bg-[#39B54A] shrink-0"></div>
                  <p className="text-zinc-400 text-base md:text-2xl font-medium leading-relaxed italic">
                    {t.cert_confirm_text}{" "}
                    <span className="text-white font-black not-italic block mt-1 md:mt-2">
                      — {selectedCert.teacher}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-6 bg-[#39B54A] text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all shadow-2xl"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
