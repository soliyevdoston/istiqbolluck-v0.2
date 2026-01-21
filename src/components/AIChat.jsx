import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

// 1. MAKTAB HAQIDAGI MA'LUMOTLAR (Shu yerga xohlagancha ma'lumot qo'shing)
const KNOWLEDGE_BASE = [
  {
    keywords: [
      "salom",
      "assalom",
      "hello",
      "hi",
      "salomlar",
      "assalomu",
      "helo",
      "hallo",
    ],
    reply:
      "Assalomu alaykum! Istiqbol Luck o'quv markazining virtual yordamchisiman. Sizga kurslar, narxlar, manzil yoki boshqa ma’lumotlar bo‘yicha yordam bera olaman. Siz nimani bilmoqchisiz?",
  },
  {
    keywords: [
      "manzil",
      "joylashuv",
      "qayerda",
      "lokatsiya",
      "adres",
      "yer",
      "location",
      "joy",
    ],
    reply:
      "Bizning o'quv markazimiz Farg'ona viloyati, Rishton tumanida joylashgan. Xaritani saytimizning pastki qismida ko'rishingiz mumkin. Agar istasangiz, biz sizga aniq yo‘l-yo‘riqni ham bera olamiz.",
  },
  {
    keywords: [
      "tel",
      "nomer",
      "telefon",
      "bog'lanish",
      "aloqa",
      "raqam",
      "call",
      "contact",
    ],
    reply:
      "Biz bilan bog'lanish uchun telefon raqamimiz: +998 90 123 45 67. Shuningdek, saytimizdagi 'Ariza topshirish' formasini to'ldirsangiz, ma’muriyat siz bilan o'z vaqtida bog‘lanadi.",
  },
  {
    keywords: [
      "kurs",
      "fanlar",
      "nima o'tiladi",
      "oqish",
      "ta’lim",
      "darslar",
      "o‘quv dasturi",
      "program",
      "subjects",
    ],
    reply:
      "Bizda asosan DTM imtihonlariga tayyorgarlik kurslari mavjud: Matematika, Fizika, Ona tili va Tarix. Bundan tashqari, xorijiy tillar (Ingliz tili, Rus tili) va qo‘shimcha fanlar ham o‘tiladi. Har bir kurs o‘quvchining darajasiga mos holda rejalashtiriladi.",
  },
  {
    keywords: [
      "narx",
      "qancha",
      "tolov",
      "pul",
      "fee",
      "price",
      "qimmat",
      "to‘lov",
    ],
    reply:
      "Kurslarimiz narxi tanlangan yo'nalish, dars soati va guruhga bog'liq. Masalan, DTM tayyorgarlik kurslari va til kurslari narxlari farq qiladi. Aniq narxni bilish uchun markazimizga qo‘ng‘iroq qiling yoki saytimiz orqali ariza qoldiring, biz sizga batafsil ma’lumot beramiz.",
  },
  {
    keywords: ["dtm", "tahlil", "ball", "natija", "imtihon", "score", "result"],
    reply:
      "DTM tahlili bo‘limida o‘quvchilarimiz o‘z ID raqamlarini kiritib, natijalarini va o‘sish grafiklarini ko‘rishlari mumkin. Shu bilan birga, har bir fan bo‘yicha kuchli va zaif tomonlaringizni aniqlab, kelajakdagi rivojlanish yo‘lini belgilash imkoniyati mavjud.",
  },
  {
    keywords: [
      "vaqt",
      "jadval",
      "dars vaqti",
      "schedule",
      "soatlar",
      "time",
      "grafik",
    ],
    reply:
      "Bizning darslar jadvali moslashuvchan bo‘lib, o‘quvchining imkoniyatlariga qarab tuziladi. Siz hafta davomida qaysi kun va soatda dars olishni xohlaysiz? Shu orqali biz eng qulay guruhni tavsiya qilamiz.",
  },
  {
    keywords: [
      "rahmat",
      "raxmat",
      "ok",
      "yaxshi",
      "yahshi",
      "tushundim",
      "thanks",
      "thank you",
    ],
    reply:
      "Arziydi! 😊 Agar boshqa savollaringiz bo‘lsa, bemalol so‘rashingiz mumkin. Biz sizga markazdagi kurslar, narxlar, jadval va boshqa ma’lumotlar bo‘yicha batafsil yordam beramiz.",
  },
  {
    keywords: [
      "internet",
      "online",
      "video",
      "zoom",
      "darslar onlayn",
      "virtual",
    ],
    reply:
      "Bizda onlayn darslar ham mavjud. Zoom va boshqa platformalar orqali o‘quvchilar masofadan turib ham ta’lim olishlari mumkin. Shu bilan birga, onlayn resurslar va video materiallar orqali mustaqil o‘rganish imkoniyati mavjud.",
  },
  {
    keywords: [
      "mukofot",
      "yutuq",
      "olimpiada",
      "medal",
      "competition",
      "musobaqa",
    ],
    reply:
      "Maktabimiz o‘quvchilari turli xalqaro va mahalliy musobaqalarda muvaffaqiyatli ishtirok etishadi. Olimpiadalar, tanlovlar va sport musobaqalari orqali ular o‘z salohiyatini namoyon qiladi.",
  },
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Salom! Men Istiqbol Luck AI. Sizga qanday yordam bera olaman?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // 2. JAVOB TOPISH MANTIQI
  const getAIResponse = (userInput) => {
    const text = userInput.toLowerCase();

    // Ma'lumotlar ichidan kalit so'z mos kelishini tekshirish
    const found = KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((key) => text.includes(key)),
    );

    if (found) {
      return found.reply;
    } else {
      return "Kechirasiz, bu savol bo'yicha ma'lumot topa olmadim. Iltimos, ma'muriyat bilan bog'laning yoki savolni boshqacharoq shaklda bering.";
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    // AI o'ylayotganini simulyatsiya qilish (1 soniya)
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
            {/* Header */}
            <div className="p-4 bg-zinc-900 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#39B54A] rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <span className="font-bold text-sm block leading-none">
                    Luck Assistant
                  </span>
                  <span className="text-[10px] text-green-400">Online</span>
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
                  Luck AI yozmoqda
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2 shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Savol yo'llang..."
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
