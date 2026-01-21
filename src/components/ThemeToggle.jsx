import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sahifa yuklanganda localStorage-ni tekshiramiz
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    // Agar oldin tanlangan bo'lsa o'shani olamiz, bo'lmasa sistema sozlamasini olamiz
    if (savedTheme === "dark" || (!savedTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      // Light mode-ga o'tkazish
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      // Dark mode-ga o'tkazish
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-zinc-600 dark:text-yellow-400 border border-transparent dark:border-zinc-700 transition-all shadow-sm hover:bg-gray-200 dark:hover:bg-zinc-700"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}
