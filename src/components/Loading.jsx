import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafaf5] dark:bg-[#0c0c0c] transition-colors duration-300">
      <Loader2 className="w-12 h-12 text-[#39B54A] animate-spin mb-4" />
      <p className="text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">
        Yuklanmoqda...
      </p>
    </div>
  );
};

export default Loading;
