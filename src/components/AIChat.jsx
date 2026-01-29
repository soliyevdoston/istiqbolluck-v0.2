import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext"; // Til contextini import qilish

export default function AIChat() {
  const { t } = useLanguage(); // Hozirgi til tarjimalari (translations.js dan)
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Til o'zgarganda birinchi salomlashish xabarini yangilash
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "ai", text: t.chat.welcome }]);
    }
  }, [t, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // JAVOB TOPISH MANTIQI (Tildan kelib chiqadi)
  const getAIResponse = (userInput) => {
    const text = userInput.toLowerCase();

    // Tanlangan tildagi bilimlar bazasidan (kb) qidirish
    const found = t.chat.kb.find((item) =>
      item.keywords.some((key) => text.includes(key)),
    );

    return found ? found.reply : t.chat.error;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    // O'ylash simulyatsiyasi
    setTimeout(() => {
      const aiReply = getAIResponse(currentInput);
      setMessages((prev) => [...prev, { role: "ai", text: aiReply }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-zinc-900 shadow-2xl rounded-[2rem] 
                       w-[calc(100vw-2rem)] sm:w-[350px] 
                       h-[450px] sm:h-[500px] max-h-[70vh] sm:max-h-[80vh]
                       flex flex-col border border-zinc-100 dark:border-zinc-800 mb-4 overflow-hidden"
          >
            {/* Header (Tarjima qilindi) */}
            <div className="p-4 bg-zinc-900 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#39B54A] rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <span className="font-bold text-sm block leading-none">
                    {t.chat.title}
                  </span>
                  <span className="text-[10px] text-green-400">
                    {t.chat.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-2xl text-[13px] leading-relaxed max-w-[85%] shadow-sm ${
                      m.role === "user"
                        ? "bg-[#2E3192] text-white rounded-br-none"
                        : "bg-white dark:bg-zinc-800 dark:text-white rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 italic">
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                  {t.chat.typing}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input (Tarjima qilindi) */}
            <div className="p-3 sm:p-4 border-t dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2 shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder={t.chat.placeholder}
                className="flex-1 text-sm bg-zinc-100 dark:bg-zinc-800 p-3 rounded-2xl border-none outline-none dark:text-white"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-[#39B54A] hover:bg-[#2e943c] disabled:opacity-50 text-white p-3 rounded-2xl transition-all flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full shadow-2xl flex items-center justify-center border-4 border-white dark:border-zinc-900"
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
      </motion.button>
    </div>
  );
}
