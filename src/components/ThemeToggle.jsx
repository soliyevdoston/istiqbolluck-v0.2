import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("system"); // light, dark, system
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setTheme("system");
      applyTheme("system");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (localStorage.getItem("theme") === "system" || !localStorage.getItem("theme")) {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const applyTheme = (mode) => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else if (mode === "light") {
      root.classList.remove("dark");
    } else if (mode === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  const updateTheme = (mode) => {
    setTheme(mode);
    if (mode === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", mode);
    }
    applyTheme(mode);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  const CurrentIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <div className="relative flex items-center justify-end mt-1 mr-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute right-14 flex items-center gap-2 p-1.5 bg-zinc-900/90 dark:bg-white/90 backdrop-blur-md rounded-full border border-white/20 shadow-xl mr-2"
          >
            {[
              { id: "light", Icon: Sun },
              { id: "dark", Icon: Moon },
              { id: "system", Icon: Monitor },
            ].map(({ id, Icon }) => (
              <button
                key={id}
                onClick={() => {
                  updateTheme(id);
                  setIsOpen(false);
                }}
                className={`p-2 rounded-full transition-all ${
                  theme === id
                    ? "bg-white text-black shadow-sm dark:bg-black dark:text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10 dark:text-black/70 dark:hover:text-black dark:hover:bg-black/10"
                }`}
              >
                <Icon size={16} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleOpen}
        className="w-12 h-12 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-full shadow-lg flex items-center justify-center border-2 border-zinc-100 dark:border-zinc-800 hover:border-[#39B54A] transition-colors"
      >
        <CurrentIcon size={20} />
      </motion.button>
    </div>
  );
}
