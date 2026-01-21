import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, certificates } from "../data/blogData";
import { Award, Calendar, ArrowUpRight, X, Filter } from "lucide-react";

export default function Blog() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  // Kategoriyalarni aniqlash
  const categories = [
    "Barchasi",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  // Filtrlangan maqolalar
  const filteredPosts =
    activeCategory === "Barchasi"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="pt-20 pb-24 bg-white dark:bg-[#050505] transition-colors min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 overflow-hidden">
        {/* Orqa fondagi dekorativ elementlar */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#39B54A]/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2E3192]/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-zinc-100 dark:border-zinc-900 pb-16">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-12 h-[2px] bg-[#39B54A]"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                  Bizning dunyomiz
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter dark:text-white uppercase italic"
              >
                BLOG <span className="text-[#39B54A]">&</span>
                <br />
                <span className="text-zinc-400 dark:text-zinc-800">
                  MAQOLALAR
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-sm p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 backdrop-blur-md"
            >
              <p className="text-zinc-500 dark:text-zinc-400 font-medium italic leading-relaxed">
                Zamonaviy ta'lim tendensiyalari, metodikalar va maktabimizning
                muvaffaqiyat hikoyalari.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CATEGORY FILTER --- */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-400">
            <Filter size={18} />
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#39B54A] text-white shadow-lg shadow-green-500/20"
                  : "bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* --- BLOG GRID --- */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] mb-8 shadow-2xl shadow-black/5">
                  <img
                    src={post.image}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Category Badge on Image */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest dark:text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-2">
                  <div className="flex items-center gap-4 mb-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#39B54A]" />{" "}
                      {post.date}
                    </span>
                    <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                    <span>5 daqiqa mutolaa</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black dark:text-white leading-tight mb-4 group-hover:text-[#39B54A] transition-colors duration-300">
                    {post.title}
                  </h2>

                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 line-clamp-2 text-lg">
                    {post.desc}
                  </p>

                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#39B54A] dark:hover:bg-[#39B54A] hover:text-white transition-all group/btn"
                  >
                    Maqolani o'qish
                    <ArrowUpRight
                      size={18}
                      className="group-hover/btn:rotate-45 transition-transform"
                    />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- CERTIFICATES SECTION --- */}
      <section className="bg-zinc-50 dark:bg-[#080808] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-12 h-[2px] bg-[#E43E1C]"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                  Sifat kafolati
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black dark:text-white tracking-tighter uppercase italic">
                XALQARO <span className="text-[#E43E1C]">YUTUQLAR</span>
              </h2>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-full shadow-xl">
              <Award size={40} className="text-[#E43E1C]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -15 }}
                onClick={() => setSelectedCert(cert)}
                className="group relative aspect-[3/4] bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl border border-zinc-100 dark:border-zinc-800"
              >
                <img
                  src={cert.img}
                  className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  alt="Cert"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-[#39B54A] text-[9px] font-black uppercase tracking-[0.3em] mb-2">
                    {cert.teacher}
                  </p>
                  <h4 className="text-white font-black text-xl leading-tight group-hover:text-[#39B54A] transition-colors uppercase italic">
                    {cert.title}
                  </h4>
                </div>
                <div className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="text-white" size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODAL (Full Certificate) --- */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={() => setSelectedCert(null)}
              className="absolute top-10 right-10 p-5 bg-white/10 text-white rounded-full hover:bg-[#E43E1C] transition-colors"
            >
              <X size={30} />
            </motion.button>

            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex-1"
              >
                <img
                  src={selectedCert.img}
                  className="w-full h-auto shadow-[0_0_100px_rgba(57,181,74,0.2)] rounded-lg"
                  alt="Full Cert"
                />
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1 text-center md:text-left"
              >
                <span className="text-[#39B54A] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                  Sertifikat tafsiloti
                </span>
                <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6 italic">
                  {selectedCert.title}
                </h3>
                <p className="text-zinc-400 text-xl font-medium mb-10 border-l-4 border-[#39B54A] pl-6">
                  Ushbu sertifikat{" "}
                  <span className="text-white font-black italic">
                    {selectedCert.teacher}
                  </span>{" "}
                  tomonidan erishilgan professional muvaffaqiyatni tasdiqlaydi.
                </p>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-10 py-5 bg-[#39B54A] text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all"
                >
                  Yopish
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
