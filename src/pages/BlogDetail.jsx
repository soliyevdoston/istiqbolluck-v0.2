import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function BlogDetail() {
  const { id } = useParams();
  const { t } = useLanguage();

  // 1. Ma'lumotlarni xavfsiz qidirish
  const post = useMemo(() => {
    return (t?.blogPosts || []).find((p) => p.id === parseInt(id));
  }, [t, id]);

  // Ma'lumot yuklanmaguncha yoki topilmaguncha bo'sh holatni ko'rsatish
  if (!post) {
    return (
      <div className="pt-40 text-center dark:text-white font-black uppercase tracking-widest min-h-screen">
        {t?.not_found || "Loading..."}
      </div>
    );
  }

  return (
    <div className="relative pt-32 pb-24 bg-white dark:bg-[#050505] min-h-screen font-sans text-left transition-colors">
      <div className="max-w-4xl mx-auto px-6 relative">
        {/* BACK BUTTON */}
        <Link
          to="/blog"
          className="group inline-flex items-center gap-3 text-zinc-400 hover:text-[#39B54A] mb-12 transition-all"
        >
          <div className="w-10 h-10 rounded-full border dark:border-zinc-800 flex items-center justify-center group-hover:bg-[#39B54A] group-hover:text-white transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="uppercase text-[10px] font-black tracking-widest">
            {t?.back || "Back"}
          </span>
        </Link>

        {/* TITLE */}
        <h1 className="text-4xl md:text-7xl font-black dark:text-white leading-[1.05] mb-8 uppercase italic tracking-tighter">
          {post.title}
        </h1>

        {/* META INFO */}
        <div className="flex gap-8 mb-12 border-y dark:border-zinc-900 py-6 text-zinc-500 font-bold text-xs uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-[#39B54A]" /> {post.date}
          </span>
          <span className="flex items-center gap-2">
            <Tag size={14} className="text-[#39B54A]" /> {post.category}
          </span>
        </div>

        {/* MAIN IMAGE */}
        <img
          src={post.image}
          className="w-full h-auto rounded-[3rem] md:rounded-[4rem] mb-16 shadow-2xl border-4 border-white dark:border-zinc-900"
          alt=""
        />

        {/* CONTENT */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-12 whitespace-pre-line border-l-4 border-[#39B54A] pl-6">
            {post.desc}
          </p>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-[1.8] whitespace-pre-line">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
}
