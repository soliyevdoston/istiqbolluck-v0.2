import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post)
    return (
      <div className="pt-40 text-center dark:text-white">Maqola topilmadi</div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 bg-white dark:bg-black min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <Link
          to="/blog"
          className="flex items-center gap-2 text-zinc-400 hover:text-[#39B54A] transition mb-10 uppercase text-[10px] font-black tracking-widest"
        >
          <ArrowLeft size={16} /> Orqaga qaytish
        </Link>

        <h1 className="text-4xl md:text-7xl font-black dark:text-white leading-[1.1] mb-8 tracking-tighter uppercase italic">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-6 mb-12 border-y border-zinc-100 dark:border-zinc-900 py-6">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
            <Calendar size={14} className="text-[#39B54A]" /> {post.date}
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
            <Tag size={14} className="text-[#E43E1C]" /> {post.category}
          </div>
        </div>

        <img
          src={post.image}
          className="w-full h-auto rounded-[3rem] mb-12 shadow-2xl"
          alt={post.title}
        />

        <div className="prose prose-xl dark:prose-invert max-w-none">
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line font-medium">
            {post.content}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
