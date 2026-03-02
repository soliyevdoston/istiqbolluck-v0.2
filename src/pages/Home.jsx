import React, { useState, useRef, useEffect, memo } from "react";
import "../index.css";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
import {
  Play,
  Instagram,
  Brain,
  Clock3,
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

// Context import (Sizning tizimingiz)
import { useLanguage } from "../context/LanguageContext";

// --- 1. YORDAMCHI FUNKSIYALAR ---
const wrap = (min, max, v) =>
  ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

const ADMISSION_WINDOW_DAYS = Number(
  import.meta.env.VITE_ADMISSION_WINDOW_DAYS || 30,
);

const resolveAdmissionDeadlineIso = () => {
  if (import.meta.env.VITE_ADMISSION_DEADLINE) {
    return import.meta.env.VITE_ADMISSION_DEADLINE;
  }

  const safeWindowDays =
    Number.isFinite(ADMISSION_WINDOW_DAYS) && ADMISSION_WINDOW_DAYS > 0
      ? ADMISSION_WINDOW_DAYS
      : 30;

  return new Date(Date.now() + safeWindowDays * 24 * 60 * 60 * 1000).toISOString();
};

const ADMISSION_DEADLINE_ISO = resolveAdmissionDeadlineIso();

const MARKETING_CONTENT = {
  UZ: {
    countdown: {
      badge: "Qabul Yakuniga Qoldi",
      title: "Bepul konsultatsiya uchun hozir yoziling",
      desc: "Qabul yopilishidan oldin joy band qiling.",
      labels: ["Kun", "Soat", "Daqiqa", "Soniya"],
      cta: "Konsultatsiyaga o'tish",
      ended: "Qabul muddati yakunlangan",
    },
    quiz: {
      badge: "60 soniyalik test",
      title: "Farzandingizga mos yo'nalishni aniqlang",
      desc: "Oddiy savollarga javob bering, natijada mos yo'nalishni olasiz.",
      start: "Testni boshlash",
      restart: "Qayta boshlash",
      resultTitle: "Natija",
      resultPrefix: "Tavsiya etilgan yo'nalish:",
      profilePrefix: "Profil:",
      tracks: {
        medicine: "Tibbiyot yo'nalishi",
        stem: "Matematika / IT yo'nalishi",
        languages: "Tillar yo'nalishi",
        social: "Huquq / Iqtisod yo'nalishi",
      },
      cta: "Natija bilan konsultatsiya olish",
      questions: [
        {
          id: "gender",
          q: "Farzandingiz kim?",
          options: [
            { label: "O'g'il bola", value: "boy" },
            { label: "Qiz bola", value: "girl" },
          ],
        },
        {
          id: "age",
          q: "Farzandingiz yoshi nechada?",
          options: [
            { label: "10-12 yosh", value: "10-12" },
            { label: "13-15 yosh", value: "13-15" },
            { label: "16-18 yosh", value: "16-18" },
          ],
        },
        {
          id: "free_time",
          q: "Bo'sh vaqtda ko'proq nima qilishni yoqtiradi?",
          options: [
            {
              label: "Tajriba, tabiat va sog'liq mavzulari",
              value: "free_time_medicine",
              weights: { medicine: 2 },
            },
            {
              label: "Mantiqiy masala, texnika, dastur o'yinlari",
              value: "free_time_stem",
              weights: { stem: 2 },
            },
            {
              label: "Kitob, til o'rganish, yozish",
              value: "free_time_languages",
              weights: { languages: 2 },
            },
            {
              label: "Muloqot, tadbir, savdo/biznesga qiziqish",
              value: "free_time_social",
              weights: { social: 2 },
            },
          ],
        },
        {
          id: "strength",
          q: "Maktabda qaysi fanlar osonroq ketadi?",
          options: [
            {
              label: "Biologiya va Kimyo",
              value: "strength_medicine",
              weights: { medicine: 2 },
            },
            {
              label: "Matematika va Fizika",
              value: "strength_stem",
              weights: { stem: 2 },
            },
            {
              label: "Ingliz tili va Ona tili",
              value: "strength_languages",
              weights: { languages: 2 },
            },
            {
              label: "Tarix va Huquq",
              value: "strength_social",
              weights: { social: 2 },
            },
          ],
        },
        {
          id: "study_time",
          q: "Kuniga o'qish uchun qancha vaqt ajrata oladi?",
          options: [
            {
              label: "3 soatdan ko'p",
              value: "time_high",
              weights: { stem: 1, medicine: 1 },
            },
            {
              label: "1-2 soat",
              value: "time_mid",
              weights: { languages: 1, social: 1 },
            },
            {
              label: "1 soatdan kam",
              value: "time_low",
              weights: { languages: 1 },
            },
          ],
        },
      ],
    },
  },
  UZ_KR: {
    countdown: {
      badge: "Қабул Якунига Қолди",
      title: "Бепул консультация учун ҳозир ёзилинг",
      desc: "Қабул ёпилишидан олдин жой банд қилинг.",
      labels: ["Кун", "Соат", "Дақиқа", "Сония"],
      cta: "Консультацияга ўтиш",
      ended: "Қабул муддати якунланган",
    },
    quiz: {
      badge: "60 сониялик тест",
      title: "Фарзандингизга мос йўналишни аниқланг",
      desc: "Оддий саволларга жавоб беринг, натижада мос йўналишни оласиз.",
      start: "Тестни бошлаш",
      restart: "Қайта бошлаш",
      resultTitle: "Натижа",
      resultPrefix: "Тавсия этилган йўналиш:",
      profilePrefix: "Профил:",
      tracks: {
        medicine: "Тиббиёт йўналиши",
        stem: "Математика / IT йўналиши",
        languages: "Тиллар йўналиши",
        social: "Ҳуқуқ / Иқтисод йўналиши",
      },
      cta: "Натижа билан консультация олиш",
      questions: [
        {
          id: "gender",
          q: "Фарзандингиз ким?",
          options: [
            { label: "Ўғил бола", value: "boy" },
            { label: "Қиз бола", value: "girl" },
          ],
        },
        {
          id: "age",
          q: "Фарзандингиз ёши нечада?",
          options: [
            { label: "10-12 ёш", value: "10-12" },
            { label: "13-15 ёш", value: "13-15" },
            { label: "16-18 ёш", value: "16-18" },
          ],
        },
        {
          id: "free_time",
          q: "Бўш вақтда кўпроқ нима қилишни ёқтиради?",
          options: [
            {
              label: "Тажриба, табиат ва соғлиқ мавзулари",
              value: "free_time_medicine",
              weights: { medicine: 2 },
            },
            {
              label: "Мантиқий масала, техника, дастур ўйинлари",
              value: "free_time_stem",
              weights: { stem: 2 },
            },
            {
              label: "Китоб, тил ўрганиш, ёзиш",
              value: "free_time_languages",
              weights: { languages: 2 },
            },
            {
              label: "Мулоқот, тадбир, савдо/бизнес қизиқиши",
              value: "free_time_social",
              weights: { social: 2 },
            },
          ],
        },
        {
          id: "strength",
          q: "Мактабда қайси фанлар осонроқ кетади?",
          options: [
            {
              label: "Биология ва Кимё",
              value: "strength_medicine",
              weights: { medicine: 2 },
            },
            {
              label: "Математика ва Физика",
              value: "strength_stem",
              weights: { stem: 2 },
            },
            {
              label: "Инглиз тили ва Она тили",
              value: "strength_languages",
              weights: { languages: 2 },
            },
            {
              label: "Тарих ва Ҳуқуқ",
              value: "strength_social",
              weights: { social: 2 },
            },
          ],
        },
        {
          id: "study_time",
          q: "Кунига ўқиш учун қанча вақт ажрата олади?",
          options: [
            {
              label: "3 соатдан кўп",
              value: "time_high",
              weights: { stem: 1, medicine: 1 },
            },
            {
              label: "1-2 соат",
              value: "time_mid",
              weights: { languages: 1, social: 1 },
            },
            {
              label: "1 соатдан кам",
              value: "time_low",
              weights: { languages: 1 },
            },
          ],
        },
      ],
    },
  },
  RU: {
    countdown: {
      badge: "До Конца Приема",
      title: "Запишитесь на бесплатную консультацию сейчас",
      desc: "Забронируйте место до закрытия приема.",
      labels: ["Дни", "Часы", "Мин", "Сек"],
      cta: "Перейти к консультации",
      ended: "Срок приема завершен",
    },
    quiz: {
      badge: "Тест за 60 секунд",
      title: "Определите подходящее направление для ребенка",
      desc: "Ответьте на простые вопросы и получите рекомендацию по направлению.",
      start: "Начать тест",
      restart: "Пройти заново",
      resultTitle: "Результат",
      resultPrefix: "Рекомендуемое направление:",
      profilePrefix: "Профиль:",
      tracks: {
        medicine: "Медицинское направление",
        stem: "Математика / IT",
        languages: "Языковое направление",
        social: "Право / Экономика",
      },
      cta: "Получить консультацию по результату",
      questions: [
        {
          id: "gender",
          q: "Пол ребенка?",
          options: [
            { label: "Мальчик", value: "boy" },
            { label: "Девочка", value: "girl" },
          ],
        },
        {
          id: "age",
          q: "Сколько лет вашему ребенку?",
          options: [
            { label: "10-12 лет", value: "10-12" },
            { label: "13-15 лет", value: "13-15" },
            { label: "16-18 лет", value: "16-18" },
          ],
        },
        {
          id: "free_time",
          q: "Чем чаще любит заниматься в свободное время?",
          options: [
            {
              label: "Эксперименты, природа, темы здоровья",
              value: "free_time_medicine",
              weights: { medicine: 2 },
            },
            {
              label: "Логические задачи, техника, программные игры",
              value: "free_time_stem",
              weights: { stem: 2 },
            },
            {
              label: "Книги, изучение языков, письмо",
              value: "free_time_languages",
              weights: { languages: 2 },
            },
            {
              label: "Общение, мероприятия, интерес к бизнесу",
              value: "free_time_social",
              weights: { social: 2 },
            },
          ],
        },
        {
          id: "strength",
          q: "Какие предметы даются легче?",
          options: [
            {
              label: "Биология и Химия",
              value: "strength_medicine",
              weights: { medicine: 2 },
            },
            {
              label: "Математика и Физика",
              value: "strength_stem",
              weights: { stem: 2 },
            },
            {
              label: "Английский и Родной язык",
              value: "strength_languages",
              weights: { languages: 2 },
            },
            {
              label: "История и Право",
              value: "strength_social",
              weights: { social: 2 },
            },
          ],
        },
        {
          id: "study_time",
          q: "Сколько времени в день может уделять учебе?",
          options: [
            {
              label: "Больше 3 часов",
              value: "time_high",
              weights: { stem: 1, medicine: 1 },
            },
            {
              label: "1-2 часа",
              value: "time_mid",
              weights: { languages: 1, social: 1 },
            },
            {
              label: "Меньше 1 часа",
              value: "time_low",
              weights: { languages: 1 },
            },
          ],
        },
      ],
    },
  },
  EN: {
    countdown: {
      badge: "Admission Closing In",
      title: "Book your free consultation now",
      desc: "Reserve your spot before admission closes.",
      labels: ["Days", "Hours", "Min", "Sec"],
      cta: "Go to consultation",
      ended: "Admission deadline has passed",
    },
    quiz: {
      badge: "60-second quiz",
      title: "Find your child's best-fit track",
      desc: "Answer simple questions and get a recommended track.",
      start: "Start quiz",
      restart: "Restart",
      resultTitle: "Result",
      resultPrefix: "Recommended track:",
      profilePrefix: "Profile:",
      tracks: {
        medicine: "Medical track",
        stem: "Math / IT track",
        languages: "Languages track",
        social: "Law / Economics track",
      },
      cta: "Get consultation with this result",
      questions: [
        {
          id: "gender",
          q: "Your child's gender?",
          options: [
            { label: "Boy", value: "boy" },
            { label: "Girl", value: "girl" },
          ],
        },
        {
          id: "age",
          q: "Your child's age group?",
          options: [
            { label: "10-12 years", value: "10-12" },
            { label: "13-15 years", value: "13-15" },
            { label: "16-18 years", value: "16-18" },
          ],
        },
        {
          id: "free_time",
          q: "What does your child enjoy most in free time?",
          options: [
            {
              label: "Experiments, nature, health topics",
              value: "free_time_medicine",
              weights: { medicine: 2 },
            },
            {
              label: "Logic tasks, tech, coding games",
              value: "free_time_stem",
              weights: { stem: 2 },
            },
            {
              label: "Books, language learning, writing",
              value: "free_time_languages",
              weights: { languages: 2 },
            },
            {
              label: "Communication, events, business interest",
              value: "free_time_social",
              weights: { social: 2 },
            },
          ],
        },
        {
          id: "strength",
          q: "Which school subjects feel easier?",
          options: [
            {
              label: "Biology & Chemistry",
              value: "strength_medicine",
              weights: { medicine: 2 },
            },
            {
              label: "Math & Physics",
              value: "strength_stem",
              weights: { stem: 2 },
            },
            {
              label: "English & Native Language",
              value: "strength_languages",
              weights: { languages: 2 },
            },
            {
              label: "History & Law",
              value: "strength_social",
              weights: { social: 2 },
            },
          ],
        },
        {
          id: "study_time",
          q: "How much daily study time is realistic?",
          options: [
            {
              label: "More than 3 hours",
              value: "time_high",
              weights: { stem: 1, medicine: 1 },
            },
            {
              label: "1-2 hours",
              value: "time_mid",
              weights: { languages: 1, social: 1 },
            },
            {
              label: "Less than 1 hour",
              value: "time_low",
              weights: { languages: 1 },
            },
          ],
        },
      ],
    },
  },
};

const CONVERSION_COPY = {
  UZ: {
    nudge: {
      badge: "Qabulga tayyorlanish",
      title: "2 daqiqada ariza, 10 daqiqada aloqaga chiqamiz",
      points: [
        "Bepul konsultatsiya va farzandingizga mos tavsiya",
        "Qabul bosqichlari va kerakli hujjatlar aniq tushuntiriladi",
        "Sizga qulay vaqtda operatorimiz bog'lanadi",
      ],
    },
    fields: {
      ageLabel: "Farzandingiz yoshi (ixtiyoriy)",
      agePlaceholder: "Yosh oralig'ini tanlang",
      ageOptions: ["10-12 yosh", "13-15 yosh", "16-18 yosh"],
      timeLabel: "Qachon bog'lanaylik? (ixtiyoriy)",
      timePlaceholder: "Qulay vaqtni tanlang",
      timeOptions: [
        "09:00-12:00 oralig'ida",
        "12:00-16:00 oralig'ida",
        "16:00-20:00 oralig'ida",
      ],
      interestLabel: "Farzandingiz nimaga qiziqadi? (ixtiyoriy)",
      interestPlaceholder: "Masalan: matematika, ingliz tili, sport",
    },
    sticky: {
      title: "Qabul ochiq",
      desc: "Bepul konsultatsiya oling",
      cta: "Hozir yozilish",
    },
    quickActions: {
      badge: "Tez aloqa",
      call: "Qo'ng'iroq qilish",
    },
    optional: {
      show: "Qo'shimcha savollar (ixtiyoriy)",
      hide: "Qo'shimcha savollarni yopish",
    },
    trust: {
      privacy: "Raqamingiz faqat qabul bo'yicha aloqaga ishlatiladi.",
      speed: "Arizalar botga darhol yuboriladi.",
    },
  },
  UZ_KR: {
    nudge: {
      badge: "Қабулга тайёрланиш",
      title: "2 дақиқада ариза, 10 дақиқада алоқага чиқамиз",
      points: [
        "Бепул консультация ва фарзандингизга мос тавсия",
        "Қабул босқичлари ва керакли ҳужжатлар аниқ тушунтирилади",
        "Сизга қулай вақтда операторимиз боғланади",
      ],
    },
    fields: {
      ageLabel: "Фарзандингиз ёши (ихтиёрий)",
      agePlaceholder: "Ёш оралиғини танланг",
      ageOptions: ["10-12 ёш", "13-15 ёш", "16-18 ёш"],
      timeLabel: "Қачон боғланайлик? (ихтиёрий)",
      timePlaceholder: "Қулай вақтни танланг",
      timeOptions: [
        "09:00-12:00 оралиғида",
        "12:00-16:00 оралиғида",
        "16:00-20:00 оралиғида",
      ],
      interestLabel: "Фарзандингиз нимага қизиқади? (ихтиёрий)",
      interestPlaceholder: "Масалан: математика, инглиз тили, спорт",
    },
    sticky: {
      title: "Қабул очиқ",
      desc: "Бепул консультация олинг",
      cta: "Ҳозир ёзилиш",
    },
    quickActions: {
      badge: "Тез алоқа",
      call: "Қўнғироқ қилиш",
    },
    optional: {
      show: "Қўшимча саволлар (ихтиёрий)",
      hide: "Қўшимча саволларни ёпиш",
    },
    trust: {
      privacy: "Рақамингиз фақат қабул бўйича алоқа учун ишлатилади.",
      speed: "Аризалар ботга дарҳол юборилади.",
    },
  },
  RU: {
    nudge: {
      badge: "Подготовка к приему",
      title: "Заявка за 2 минуты, свяжемся за 10 минут",
      points: [
        "Бесплатная консультация и рекомендация под вашего ребенка",
        "Пошагово объясним прием и список нужных документов",
        "Свяжемся с вами в удобное для вас время",
      ],
    },
    fields: {
      ageLabel: "Возраст ребенка (необязательно)",
      agePlaceholder: "Выберите возраст",
      ageOptions: ["10-12 лет", "13-15 лет", "16-18 лет"],
      timeLabel: "Когда удобно связаться? (необязательно)",
      timePlaceholder: "Выберите время",
      timeOptions: [
        "С 09:00 до 12:00",
        "С 12:00 до 16:00",
        "С 16:00 до 20:00",
      ],
      interestLabel: "Чем больше интересуется ребенок? (необязательно)",
      interestPlaceholder: "Например: математика, английский, спорт",
    },
    sticky: {
      title: "Прием открыт",
      desc: "Получите бесплатную консультацию",
      cta: "Записаться сейчас",
    },
    quickActions: {
      badge: "Быстрая связь",
      call: "Позвонить",
    },
    optional: {
      show: "Дополнительные вопросы (необязательно)",
      hide: "Скрыть дополнительные вопросы",
    },
    trust: {
      privacy: "Номер используется только для связи по приему.",
      speed: "Заявка сразу отправляется в бот.",
    },
  },
  EN: {
    nudge: {
      badge: "Admission Prep",
      title: "Apply in 2 minutes, we contact in 10 minutes",
      points: [
        "Free consultation with a best-fit recommendation",
        "Clear explanation of admission steps and documents",
        "We contact you at your preferred time",
      ],
    },
    fields: {
      ageLabel: "Child age (optional)",
      agePlaceholder: "Select age group",
      ageOptions: ["10-12 years", "13-15 years", "16-18 years"],
      timeLabel: "Preferred contact time (optional)",
      timePlaceholder: "Select time",
      timeOptions: ["09:00-12:00", "12:00-16:00", "16:00-20:00"],
      interestLabel: "What is your child interested in? (optional)",
      interestPlaceholder: "Example: math, English, sports",
    },
    sticky: {
      title: "Admissions open",
      desc: "Get a free consultation",
      cta: "Apply now",
    },
    quickActions: {
      badge: "Fast contact",
      call: "Call now",
    },
    optional: {
      show: "Additional questions (optional)",
      hide: "Hide additional questions",
    },
    trust: {
      privacy: "Your phone is used only for admission follow-up.",
      speed: "Requests are sent to the bot instantly.",
    },
  },
};

const getCountdownParts = (deadlineIso) => {
  const target = new Date(deadlineIso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (Number.isNaN(target) || diff <= 0) {
    return {
      isOver: true,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = String(Math.floor(totalSeconds / 86400)).padStart(2, "0");
  const hours = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(
    2,
    "0",
  );
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return {
    isOver: false,
    days,
    hours,
    minutes,
    seconds,
  };
};

// --- 2. KOMPONENTLAR ---

const DraggableMarquee = memo(({ items = [], baseVelocity = -0.4 }) => {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const isDragging = useRef(false);
  const momentumRef = useRef(0);
  const viewportWidthRef = useRef(1);

  useEffect(() => {
    const updateViewportWidth = () => {
      viewportWidthRef.current = Math.max(window.innerWidth || 1, 1);
    };
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth, { passive: true });
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  useAnimationFrame((t, delta) => {
    const autoMove = baseVelocity * (delta / 1000);
    const inertiaMove = momentumRef.current * (delta / 16.67);

    if (!isDragging.current && Math.abs(momentumRef.current) > 0.0001) {
      momentumRef.current *= 0.93;
    }

    baseX.set(baseX.get() + autoMove + inertiaMove);
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap py-4 md:py-8 w-full cursor-grab active:cursor-grabbing select-none">
      <motion.div
        className="flex gap-4 md:gap-12 will-change-transform transform-gpu"
        style={{ x, touchAction: "pan-y" }}
        onPanStart={() => {
          isDragging.current = true;
          momentumRef.current = 0;
        }}
        onPan={(e, info) => {
          const currentX = baseX.get();
          const normalizedDelta =
            (info.delta.x / viewportWidthRef.current) * 20;
          baseX.set(currentX + normalizedDelta);
          momentumRef.current =
            (info.velocity.x / viewportWidthRef.current) * 0.045;
        }}
        onPanEnd={(e, info) => {
          isDragging.current = false;
          momentumRef.current =
            (info.velocity.x / viewportWidthRef.current) * 0.05;
        }}
        drag={false}
        whileTap={{ cursor: "grabbing" }}
      >
        {[...Array(4)].map((_, outerIdx) => (
          <div key={outerIdx} className="flex gap-4 md:gap-12">
            {items.map((img, i) => (
              <div key={`${outerIdx}-${i}`} className="flex-shrink-0">
                <div className="w-[260px] h-[180px] md:w-[450px] md:h-[320px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-white dark:border-zinc-900 shadow-2xl pointer-events-none">
                  <img
                    src={img}
                    alt="Gallery"
                    loading="lazy"
                    className="w-full h-full object-cover transform-gpu scale-[1.01]"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
});

const PremiumInfiniteSlider = ({
  items,
  baseVelocity = -0.5,
  isText = false,
}) => {
  const baseX = useMotionValue(0);
  // MANTIQ O'ZGARDi: -25 dan -50 gacha wrap qilish sakrashni yo'qotadi
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  const isDragging = useRef(false);
  const momentumRef = useRef(0);
  const viewportWidthRef = useRef(1);

  useEffect(() => {
    const updateViewportWidth = () => {
      viewportWidthRef.current = Math.max(window.innerWidth || 1, 1);
    };
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth, { passive: true });
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  useAnimationFrame((t, delta) => {
    const autoMove = baseVelocity * (delta / 1000);
    const inertiaMove = momentumRef.current * (delta / 16.67);

    if (!isDragging.current && Math.abs(momentumRef.current) > 0.0001) {
      momentumRef.current *= 0.93;
    }

    baseX.set(baseX.get() + autoMove + inertiaMove);
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap py-2 w-full cursor-grab active:cursor-grabbing select-none">
      <motion.div
        className="flex gap-6 md:gap-16 items-center will-change-transform"
        style={{ x, touchAction: "pan-y" }}
        onPanStart={() => {
          isDragging.current = true;
          momentumRef.current = 0;
        }}
        onPan={(e, info) => {
          const currentX = baseX.get();
          const normalizedDelta =
            (info.delta.x / viewportWidthRef.current) * 20;
          baseX.set(currentX + normalizedDelta);
          momentumRef.current =
            (info.velocity.x / viewportWidthRef.current) * 0.045;
        }}
        onPanEnd={(e, info) => {
          isDragging.current = false;
          momentumRef.current =
            (info.velocity.x / viewportWidthRef.current) * 0.05;
        }}
        drag={false}
        whileTap={{ cursor: "grabbing" }}
      >
        {[...Array(4)].map((_, outerIdx) => (
          <React.Fragment key={outerIdx}>
            {items.map((item, i) => (
              <div key={`${outerIdx}-${i}`} className="flex-shrink-0">
                {isText ? (
                  <span className="text-3xl md:text-7xl font-black uppercase italic text-zinc-600 dark:text-zinc-900 hover:text-[#39B54A] transition-all duration-500 px-8">
                    {item}
                  </span>
                ) : (
                  <img
                    src={item}
                    draggable="false"
                    className="w-[240px] md:w-[480px] h-[160px] md:h-[320px] object-cover rounded-[2.5rem] shadow-sm pointer-events-none grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                    alt="Muhit"
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const VideoFeedbackCard = ({ feedback, isPlaying, onPlay }) => {
  const instagramUrl =
    feedback.instagramUrl || "https://instagram.com/istiqbolluckuz";

  return (
    <div className="flex-shrink-0 lg:shrink w-[82vw] sm:w-[45vw] lg:w-full snap-center px-2 lg:px-0 h-full">
      <div className="relative h-[450px] md:h-[520px] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-black shadow-xl group">
        {!isPlaying ? (
          <>
            <img
              src={feedback.thumbnail}
              alt={feedback.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-50 grayscale-0 transition-all duration-700"
            />
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${feedback.name} Instagram video`}
              className="absolute top-5 left-5 z-20 w-10 h-10 rounded-full bg-black/45 backdrop-blur-sm border border-white/25 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#39B54A] hover:border-[#39B54A]"
            >
              <Instagram size={16} />
            </a>
            <button
              type="button"
              aria-label={`${feedback.name} videosini ijro etish`}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={onPlay}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border border-white/20 group-hover:border-[#39B54A]/50 transition-colors"
              >
                <Play
                  className="text-white fill-white group-hover:text-[#39B54A] group-hover:fill-[#39B54A] transition-all"
                  size={24}
                />
              </motion.div>
            </button>
            <div className="absolute bottom-8 left-8 text-white text-left z-10">
              <p className="font-black text-xl uppercase tracking-tighter leading-none mb-1">
                {feedback.name}
              </p>
              <p className="text-[#39B54A] font-bold text-[10px] uppercase tracking-[0.2em]">
                {feedback.role}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </>
        ) : (
          <video
            src={feedback.videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
          />
        )}
      </div>
    </div>
  );
};

const TextFeedbackCard = ({ feedback }) => (
  <div className="flex-shrink-0 lg:shrink w-[82vw] sm:w-[45vw] lg:w-full snap-center px-2 lg:px-0 h-full">
    <div className="h-full min-h-[250px] p-7 md:p-9 rounded-[2.5rem] bg-[#e2dfdf] dark:bg-[#0c0c0c] border border-zinc-200/50 dark:border-zinc-800 transition-all hover:border-[#39B54A]/30 flex flex-col justify-between shadow-sm">
      <p className="text-zinc-600 dark:text-zinc-400 italic text-sm md:text-base lg:text-lg mb-8 leading-relaxed">
        "{feedback.message}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#39B54A] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#39B54A]/20">
          {feedback.name[0]}
        </div>
        <div className="text-left">
          <p className="font-black text-xs md:text-sm uppercase tracking-tight dark:text-white">
            {feedback.name}
          </p>
          <p className="text-[#39B54A] font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
            {feedback.role}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
      const suffix = value.replace(/[0-9]/g, "");
      const controls = animate(0, numericValue, {
        duration: 2.5,
        onUpdate: (latest) => setDisplayValue(Math.floor(latest) + suffix),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);
  return <span ref={ref}>{displayValue}</span>;
};

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/5 dark:border-white/5 last:border-0 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex justify-between items-center text-left transition-all group"
      >
        <span className="text-base md:text-xl font-bold dark:text-white uppercase tracking-tight group-hover:text-[#39B54A] transition-colors">
          {faq.question}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#39B54A] flex items-center justify-center transition-all duration-500 ${
            isOpen
              ? "bg-[#39B54A] text-white rotate-180"
              : "text-[#39B54A] bg-transparent"
          }`}
        >
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p className="pb-8 text-zinc-600 dark:text-zinc-400 font-medium text-sm md:text-base leading-relaxed max-w-4xl italic">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- ASOSIY HOME KOMPONENTI ---

export default function Home() {
  const { t, lang } = useLanguage();
  const consultRef = useRef(null);
  const feedbackSectionRef = useRef(null);
  const SUBMISSION_LIMIT_PER_PHONE = 2;
  const FORM_SUBMIT_STORAGE_KEY = "homeConsultSubmitCounts";
  const marketing = MARKETING_CONTENT[lang] || MARKETING_CONTENT.UZ;
  const conversion = CONVERSION_COPY[lang] || CONVERSION_COPY.UZ;
  const quizQuestions = marketing.quiz.questions;
  const deadlineLabel = new Date(ADMISSION_DEADLINE_ISO).toLocaleString(
    lang === "RU" ? "ru-RU" : lang === "EN" ? "en-US" : "uz-UZ",
    {
      timeZone: "Asia/Tashkent",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const [status, setStatus] = useState("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [childAge, setChildAge] = useState("");
  const [contactTime, setContactTime] = useState("");
  const [childInterest, setChildInterest] = useState("");
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);
  const [countdown, setCountdown] = useState(() =>
    getCountdownParts(ADMISSION_DEADLINE_ISO),
  );
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const isFeedbackSectionInView = useInView(feedbackSectionRef, {
    amount: 0.2,
  });
  const contactPhoneRaw = import.meta.env.VITE_CONTACT_PHONE || t?.phone || "";
  const contactPhoneDigits = contactPhoneRaw.replace(/[^\d+]/g, "");
  const contactPhoneLink = contactPhoneDigits
    ? `tel:${contactPhoneDigits}`
    : null;

  const normalizePhone = (value) => value.replace(/\D/g, "");
  const getAttribution = () => {
    if (typeof window === "undefined") {
      return {
        source: "unknown",
        medium: "unknown",
        campaign: "unknown",
        landing: "unknown",
        referrer: "direct",
      };
    }

    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source") || params.get("source") || "direct";
    const medium = params.get("utm_medium") || "none";
    const campaign = params.get("utm_campaign") || "none";
    const landing = `${window.location.pathname}${window.location.search}`;

    let referrer = "direct";
    if (document.referrer) {
      try {
        referrer = new URL(document.referrer).hostname || document.referrer;
      } catch {
        referrer = document.referrer;
      }
    }

    return { source, medium, campaign, landing, referrer };
  };

  const trackEvent = (eventName, params = {}) => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  };

  const scrollToConsult = (source = "unknown") => {
    trackEvent("consult_cta_click", { source, lang });
    consultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuickChannelClick = (channel) => {
    trackEvent("consult_channel_click", { lang, channel });
  };

  const toggleOptionalFields = () => {
    setShowOptionalFields((prev) => {
      const next = !prev;
      trackEvent("consult_optional_toggle", { lang, isOpen: next });
      return next;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(ADMISSION_DEADLINE_ISO));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setQuizIndex(0);
    setQuizAnswers([]);
    setQuizResult(null);
    setShowOptionalFields(false);
  }, [lang]);

  useEffect(() => {
    if (!isFeedbackSectionInView && playingVideoIndex !== null) {
      setPlayingVideoIndex(null);
    }
  }, [isFeedbackSectionInView, playingVideoIndex]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setQuizIndex(0);
    setQuizAnswers([]);
    setQuizResult(null);
    trackEvent("quiz_start", { lang });
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setQuizIndex(0);
    setQuizAnswers([]);
    setQuizResult(null);
    trackEvent("quiz_restart", { lang });
  };

  const getOptionLabel = (option) =>
    typeof option === "string" ? option : option?.label || "";

  const getOptionValue = (option) =>
    typeof option === "string" ? option : option?.value || "";

  const buildQuizResult = (answers) => {
    const points = {
      medicine: 0,
      stem: 0,
      languages: 0,
      social: 0,
    };

    let genderLabel = "";
    let ageLabel = "";

    quizQuestions.forEach((question, qIndex) => {
      const selectedIndex = answers[qIndex];
      const selectedOption = question.options[selectedIndex];
      const value = getOptionValue(selectedOption);
      const label = getOptionLabel(selectedOption);

      if (question.id === "gender") genderLabel = label;
      if (question.id === "age") ageLabel = label;

      if (
        selectedOption &&
        typeof selectedOption === "object" &&
        selectedOption.weights
      ) {
        Object.entries(selectedOption.weights).forEach(([track, weight]) => {
          if (points[track] !== undefined) {
            points[track] += Number(weight) || 0;
          }
        });
      } else if (points[value] !== undefined) {
        points[value] += 1;
      }
    });

    const topTrack =
      Object.entries(points).sort((a, b) => b[1] - a[1])[0]?.[0] || "stem";
    const trackLabel =
      marketing.quiz.tracks[topTrack] || marketing.quiz.tracks.stem;

    return {
      track: topTrack,
      trackLabel,
      ageLabel,
      genderLabel,
      points,
    };
  };

  const handleQuizAnswer = (optionIndex) => {
    const updatedAnswers = [...quizAnswers];
    updatedAnswers[quizIndex] = optionIndex;
    setQuizAnswers(updatedAnswers);

    if (quizIndex === quizQuestions.length - 1) {
      const result = buildQuizResult(updatedAnswers);
      setQuizResult(result);
      setQuizCompleted(true);
      trackEvent("quiz_complete", {
        lang,
        track: result.track,
        ageLabel: result.ageLabel,
        genderLabel: result.genderLabel,
      });
      return;
    }
    setQuizIndex((prev) => prev + 1);
  };

  const getSubmitCounts = () => {
    try {
      const raw = localStorage.getItem(FORM_SUBMIT_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  };

  const getPhoneSubmitCount = (normalizedPhone) => {
    const counts = getSubmitCounts();
    const count = counts[normalizedPhone];
    return Number.isInteger(count) && count > 0 ? count : 0;
  };

  const incrementPhoneSubmitCount = (normalizedPhone) => {
    const counts = getSubmitCounts();
    counts[normalizedPhone] = getPhoneSubmitCount(normalizedPhone) + 1;
    localStorage.setItem(FORM_SUBMIT_STORAGE_KEY, JSON.stringify(counts));
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (!input.startsWith("998")) input = "998" + input;
    if (input.length > 12) input = input.substring(0, 12);
    let formatted = "+998";
    if (input.length > 3) formatted += " (" + input.substring(3, 5);
    if (input.length > 5) formatted += ") " + input.substring(5, 8);
    if (input.length > 8) formatted += "-" + input.substring(8, 10);
    if (input.length > 10) formatted += "-" + input.substring(10, 12);
    setPhone(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const normalizedPhone = normalizePhone(phone);
    const attribution = getAttribution();
    const quizSummary =
      quizCompleted && quizResult
        ? `${quizResult.trackLabel} | ${quizResult.ageLabel} | ${quizResult.genderLabel}`
        : "Not completed";

    trackEvent("consult_submit_attempt", {
      lang,
      quizCompleted,
      hasAge: Boolean(childAge),
      hasContactTime: Boolean(contactTime),
      hasInterest: Boolean(childInterest.trim()),
      source: attribution.source,
      campaign: attribution.campaign,
    });

    if (!cleanName) {
      alert("Iltimos, ismingizni kiriting.");
      return;
    }

    if (normalizedPhone.length < 12) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting.");
      return;
    }

    if (getPhoneSubmitCount(normalizedPhone) >= SUBMISSION_LIMIT_PER_PHONE) {
      setStatus("limit");
      trackEvent("consult_submit_limit", { lang, phone: normalizedPhone });
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("loading");
    const botToken =
      import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
      "7893849239:AAEalenahp_ar51YDUBYu5Fr6SazLgGu7dI";
    const chatIds = (
      import.meta.env.VITE_TELEGRAM_CHAT_IDS || "8389397224,894403107"
    )
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    const submittedAt = new Date().toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    });

    const message =
      `🎯 <b>Yangi ariza!</b>\n\n` +
      `👤 <b>Ism:</b> ${cleanName}\n` +
      `📞 <b>Telefon:</b> ${phone}\n` +
      `👶 <b>Yosh:</b> ${childAge || "-"}\n` +
      `⏰ <b>Qulay vaqt:</b> ${contactTime || "-"}\n` +
      `⭐️ <b>Qiziqish:</b> ${childInterest.trim() || "-"}\n` +
      `🌐 <b>Sahifa:</b> Home / Qabul\n` +
      `📣 <b>Source:</b> ${attribution.source}\n` +
      `📈 <b>Medium:</b> ${attribution.medium}\n` +
      `🎯 <b>Campaign:</b> ${attribution.campaign}\n` +
      `🧭 <b>Landing:</b> ${attribution.landing}\n` +
      `↩️ <b>Referrer:</b> ${attribution.referrer}\n` +
      `🈯️ <b>Til:</b> ${lang}\n` +
      `🧠 <b>Quiz:</b> ${quizSummary}\n` +
      `🕒 <b>Vaqt:</b> ${submittedAt}`;

    try {
      const results = await Promise.allSettled(
        chatIds.map(async (chatId) => {
          const response = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
              }),
            },
          );
          const payload = await response.json().catch(() => null);
          return {
            ok: response.ok && payload?.ok !== false,
            chatId,
            description: payload?.description || null,
          };
        }),
      );

      const delivered = results.some(
        (res) => res.status === "fulfilled" && res.value.ok,
      );

      if (delivered) {
        incrementPhoneSubmitCount(normalizedPhone);
        setStatus("success");
        trackEvent("consult_submit_success", {
          lang,
          phone: normalizedPhone,
          quizCompleted,
          quizTrack: quizResult?.track || null,
          childAge: childAge || null,
          contactTime: contactTime || null,
          source: attribution.source,
          campaign: attribution.campaign,
        });
        setName("");
        setPhone("+998");
        setChildAge("");
        setContactTime("");
        setChildInterest("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        console.error("Telegram send failed", results);
        setStatus("error");
        trackEvent("consult_submit_error", {
          lang,
          phone: normalizedPhone,
          reason: "telegram_failed",
          source: attribution.source,
        });
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error("Telegram send exception", error);
      setStatus("error");
      trackEvent("consult_submit_error", {
        lang,
        phone: normalizedPhone,
        reason: "exception",
        source: attribution.source,
      });
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  if (!t.home_page) return null;

  return (
    <div className="w-full bg-white dark:bg-[#050505] font-sans overflow-x-hidden transition-colors duration-500">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={t.home_page.hero_bg}
            alt="School"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center justify-center gap-3 tracking-[0.4em] font-bold text-[10px] md:text-xs text-[#39B54A] uppercase"
          >
            <span className="w-8 h-[1px] bg-[#39B54A] block"></span>
            {t.home_page.hero_label}
            <span className="w-8 h-[1px] bg-[#39B54A] block"></span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl sm:text-8xl md:text-[130px] font-[900] leading-[0.85] tracking-[-0.05em] uppercase">
              <span className="text-white">{t.home_page.hero_title1}</span>
              <br />
              <span className="text-[#39B54A]">{t.home_page.hero_title2}</span>
            </h1>

            <div className="mt-8 md:mt-10 max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl font-light tracking-tight text-gray-300 leading-relaxed">
                {t.home_page.hero_desc}
              </p>
            </div>
          </motion.div>

          <div className="flex justify-center w-full mt-12 md:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button
                onClick={() => scrollToConsult("hero_cta")}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0px 0px 20px rgba(57, 181, 74, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-3 px-10 py-4 md:px-14 md:py-5 rounded-full border border-[#39B54A] bg-transparent transition-all duration-300 cursor-pointer"
              >
                <span className="font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-white transition-colors group-hover:text-[#39B54A]">
                  {t.home_page.hero_cta}
                </span>
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-[#39B54A] flex items-center justify-center"
                >
                  <ArrowRight size={22} strokeWidth={2.5} />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ADVANTAGES SECTION */}
      <section className="cv-auto py-16 md:py-32 bg-white dark:bg-[#050505] transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
            <div>
              <h2 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                {t.home_page.adv_subtitle}
              </h2>
              <p className="text-2xl md:text-6xl font-black dark:text-white uppercase leading-none tracking-tighter">
                {t.home_page.adv_title}
              </p>
            </div>
            <p className="max-w-xs text-zinc-700 dark:text-zinc-300 border-l-2 border-[#39B54A] pl-5 italic font-medium text-xs md:text-base leading-relaxed text-left">
              {t.home_page.adv_desc}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {t.home_page.advantages.map((adv, idx) => (
              <div
                key={idx}
                className={`p-5 md:p-10 rounded-[1.5rem] md:rounded-[2.2rem] bg-white/90 dark:bg-[#0c0c0c] border border-zinc-200 dark:border-zinc-800 hover:border-[#39B54A]/35 hover:shadow-xl transition-all group text-left flex flex-col justify-between ${idx === 2 ? "col-span-2 md:col-span-1" : "col-span-1"}`}
              >
                <div>
                  <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.16em] bg-[#39B54A]/10 text-[#39B54A] border border-[#39B54A]/20">
                    {adv.id}
                  </span>
                  <h3 className="text-sm md:text-2xl font-bold mt-4 md:mt-8 mb-2 md:mb-4 dark:text-white leading-tight uppercase italic tracking-tight">
                    {adv.title}
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300 text-xs md:text-lg italic leading-snug">
                    {adv.desc}
                  </p>
                </div>
                <div className="w-6 h-1 bg-[#39B54A] mt-4 opacity-0 group-hover:opacity-100 transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section className="cv-auto py-16 md:py-32 bg-white dark:bg-[#050505] border-y border-zinc-100 dark:border-zinc-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12 md:mb-24">
            <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
              {t.home_page.stats_subtitle}
            </h4>
            <h2 className="text-2xl md:text-6xl font-black dark:text-white tracking-tighter uppercase leading-none">
              {t.home_page.stats_title1}{" "}
              <span className="text-[#39B54A]">{t.home_page.stats_title2}</span>
            </h2>
            <div className="w-16 h-1 bg-[#39B54A] mx-auto mt-6 opacity-20"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-10">
            {t.home_page.stats.map((s, i) => (
              <div
                key={i}
                className={`group text-center flex flex-col items-center ${i === 2 ? "col-span-2 md:col-span-1" : "col-span-1"}`}
              >
                <h4 className="text-[10px] md:text-xs font-black uppercase text-zinc-600 dark:text-zinc-300 mb-2 tracking-widest">
                  {s.label}
                </h4>
                <div className="text-4xl md:text-7xl font-black text-black dark:text-white mb-2 group-hover:text-[#39B54A] transition-colors duration-500">
                  <Counter value={s.value} />
                </div>
                <div className="w-6 h-0.5 bg-[#39B54A] opacity-20 group-hover:w-12 group-hover:opacity-100 transition-all duration-500 mb-3"></div>
                <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300 italic px-2 max-w-[180px] leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAKTAB HAYOTI SECTION */}
      <section className="cv-auto py-16 md:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors">
        <div className="w-full text-left">
          <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none shrink-0">
                {t.home_page.life_title1}{" "}
                <span className="text-[#39B54A]">
                  {t.home_page.life_title2}
                </span>
              </h2>
              <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
                <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs md:text-sm font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                  {t.home_page.life_desc}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-8">
            <DraggableMarquee
              baseVelocity={-0.4}
              items={t.life_page.galleryRow1}
            />
            <DraggableMarquee
              baseVelocity={0.4}
              items={t.life_page.galleryRow2}
            />
          </div>
        </div>
      </section>

      {/* 5. FEEDBACK SECTION */}
      <section
        ref={feedbackSectionRef}
        className="cv-auto py-16 md:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors"
      >
        <div className="w-full text-left">
          <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              <div>
                <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                  {t.home_page.feed_subtitle}
                </h4>
                <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none">
                  {t.home_page.feed_title1}{" "}
                  <span className="text-[#39B54A]">
                    {t.home_page.feed_title2}
                  </span>
                </h2>
              </div>
              <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
                <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs md:text-sm font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                  {t.home_page.feed_desc}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto lg:px-6">
            <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar px-4 lg:px-0 pb-8 md:pb-12 gap-4 md:gap-8">
              {t.home_page.studentFeedbacks.map((f, i) => (
                <div
                  key={i}
                  className="snap-center shrink-0 lg:shrink w-[85vw] sm:w-[45vw] lg:w-auto"
                >
                  <VideoFeedbackCard
                    feedback={f}
                    isPlaying={playingVideoIndex === i}
                    onPlay={() => setPlayingVideoIndex(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto lg:px-6">
            <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar px-4 lg:px-0 gap-4 md:gap-8">
              {t.home_page.textFeedbacks.map((tf, i) => (
                <div
                  key={i}
                  className="snap-center shrink-0 lg:shrink w-[85vw] sm:w-[45vw] lg:w-auto"
                >
                  <TextFeedbackCard feedback={tf} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. UNIVERSITIES SECTION */}
      <section className="cv-auto py-16 md:py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors border-y border-zinc-50 dark:border-zinc-900">
        <div className="w-full text-left">
          <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              <div>
                <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                  {t.home_page.uni_subtitle}
                </h4>
                <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none">
                  {t.home_page.uni_title1} <br className="hidden md:block" />
                  <span className="text-[#39B54A]">
                    {t.home_page.uni_title2}
                  </span>
                </h2>
              </div>
              <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
                <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs md:text-sm font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                  {t.home_page.uni_desc}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:gap-12">
            <PremiumInfiniteSlider
              items={t.home_page.universities}
              baseVelocity={-0.3}
              isText={true}
            />
            <PremiumInfiniteSlider
              items={[...t.home_page.universities].reverse()}
              baseVelocity={0.3}
              isText={true}
            />
          </div>
        </div>
      </section>

      {/* 7. COUNTDOWN + QUIZ */}
      <section className="cv-auto py-16 md:py-24 bg-white dark:bg-[#050505] border-b border-zinc-100 dark:border-zinc-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded-[2rem] bg-[#e2dfdf] dark:bg-[#0c0c0c] border border-zinc-200/50 dark:border-zinc-800 p-6 md:p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 text-[#39B54A] text-[10px] font-black uppercase tracking-[0.2em]">
              <Clock3 size={14} />
              <span>{marketing.countdown.badge}</span>
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-black uppercase leading-tight dark:text-white">
              {marketing.countdown.title}
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {marketing.countdown.desc}
            </p>

            <div
              className="mt-6 grid grid-cols-4 gap-2 md:gap-3"
              aria-live="polite"
              aria-label={marketing.countdown.badge}
            >
              {[
                countdown.days,
                countdown.hours,
                countdown.minutes,
                countdown.seconds,
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 py-3 text-center"
                >
                  <div className="text-xl md:text-2xl font-black text-black dark:text-white leading-none">
                    {value}
                  </div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                    {marketing.countdown.labels[idx]}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500">
              {countdown.isOver ? marketing.countdown.ended : deadlineLabel}
            </p>

            <button
              type="button"
              onClick={() => scrollToConsult("countdown_cta")}
              className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#39B54A] text-white text-[11px] font-black uppercase tracking-[0.14em] hover:bg-[#2f9f3f] transition-colors"
            >
              <span>{marketing.countdown.cta}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="rounded-[2rem] bg-[#e2dfdf] dark:bg-[#0c0c0c] border border-zinc-200/50 dark:border-zinc-800 p-6 md:p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 text-[#39B54A] text-[10px] font-black uppercase tracking-[0.2em]">
              <Brain size={14} />
              <span>{marketing.quiz.badge}</span>
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-black uppercase leading-tight dark:text-white">
              {marketing.quiz.title}
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {marketing.quiz.desc}
            </p>

            {!quizStarted && (
              <button
                type="button"
                onClick={startQuiz}
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black text-[11px] font-black uppercase tracking-[0.14em] hover:bg-[#39B54A] hover:text-white transition-colors"
              >
                {marketing.quiz.start}
              </button>
            )}

            {quizStarted && !quizCompleted && (
              <div className="mt-6">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500 mb-2">
                  {quizIndex + 1} / {quizQuestions.length}
                </p>
                <h4 className="text-base md:text-lg font-bold dark:text-white mb-4">
                  {quizQuestions[quizIndex].q}
                </h4>
                <div className="space-y-2">
                  {quizQuestions[quizIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuizAnswer(idx)}
                      className="w-full text-left px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-black text-sm font-semibold dark:text-white hover:border-[#39B54A] hover:bg-[#39B54A]/5 transition-colors"
                    >
                      {getOptionLabel(option)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStarted && quizCompleted && (
              <div className="mt-6 space-y-4">
                <div className="rounded-xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">
                    {marketing.quiz.resultTitle}
                  </p>
                  <h4 className="mt-2 text-xl md:text-2xl font-black text-[#39B54A]">
                    {quizResult?.trackLabel}
                  </h4>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {marketing.quiz.resultPrefix} {quizResult?.trackLabel}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {marketing.quiz.profilePrefix} {quizResult?.genderLabel} •{" "}
                    {quizResult?.ageLabel}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => scrollToConsult("quiz_result_cta")}
                    className="sm:flex-1 px-4 py-3 rounded-xl bg-[#39B54A] text-white text-[11px] font-black uppercase tracking-[0.12em] hover:bg-[#2f9f3f] transition-colors"
                  >
                    {marketing.quiz.cta}
                  </button>
                  <button
                    type="button"
                    onClick={restartQuiz}
                    className="sm:flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 text-[11px] font-black uppercase tracking-[0.12em] hover:border-[#39B54A] transition-colors"
                  >
                    {marketing.quiz.restart}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. KONSULTATSIYA SECTION */}
      <section
        id="consult-section"
        ref={consultRef}
        className="cv-auto py-16 md:py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-start text-left"
      >
        <div className="bg-[#e2dfdf] dark:bg-[#0c0c0c] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden border border-transparent dark:border-zinc-800 shadow-sm h-full">
          <AnimatePresence>
            {(status === "success" ||
              status === "error" ||
              status === "limit") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-6 ${
                  status === "success"
                    ? "bg-[#39B54A]"
                    : status === "limit"
                      ? "bg-amber-600"
                      : "bg-red-600"
                }`}
                role="alert"
                aria-live="assertive"
              >
                {status === "success" ? (
                  <CheckCircle size={60} className="mb-4" />
                ) : (
                  <AlertCircle size={60} className="mb-4" />
                )}
                <h3 className="text-2xl font-black uppercase italic tracking-tight">
                  {status === "success"
                    ? t.home_page.form_success_title
                    : status === "limit"
                      ? t.home_page.form_limit_title || "So'rov limiti tugadi"
                      : t.home_page.form_error_title || "Xatolik yuz berdi"}
                </h3>
                <p className="text-sm mt-2 opacity-90 text-center">
                  {status === "success"
                    ? t.home_page.form_success_desc
                    : status === "limit"
                      ? t.home_page.form_limit_desc ||
                        "Bitta raqam ko'pi bilan 2 marta yubora oladi."
                      : t.home_page.form_error_desc ||
                        "So'rov yuborilmadi. Iltimos qayta urinib ko'ring."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase leading-[0.9] mb-8 tracking-tighter">
            {t.home_page.form_title1}{" "}
            <span className="text-[#39B54A]">{t.home_page.form_title2}</span>
          </h2>

          <div className="mb-7 rounded-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-4 md:p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#39B54A]">
              {conversion.nudge.badge}
            </p>
            <p className="mt-2 text-sm md:text-base font-bold dark:text-white leading-snug">
              {conversion.nudge.title}
            </p>
            <div className="mt-3 space-y-2">
              {conversion.nudge.points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle
                    size={14}
                    className="text-[#39B54A] mt-0.5 shrink-0"
                  />
                  <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {contactPhoneLink && (
            <div className="mb-5">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500 mb-2">
                {conversion.quickActions.badge}
              </p>
              <a
                href={contactPhoneLink}
                onClick={() => handleQuickChannelClick("call")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-zinc-900 dark:text-white px-4 py-3 text-[11px] font-black uppercase tracking-[0.12em] hover:border-[#39B54A] hover:text-[#39B54A] transition-colors"
              >
                <PhoneCall size={15} />
                <span>{conversion.quickActions.call}</span>
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="consult-name"
                className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 ml-2"
              >
                {t.home_page.form_name_label}
              </label>
              <input
                id="consult-name"
                required
                type="text"
                placeholder={t.home_page.form_name_placeholder}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] focus-visible:ring-2 focus-visible:ring-[#39B54A] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-all font-bold text-sm shadow-sm"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="consult-phone"
                className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 ml-2"
              >
                {t.home_page.form_phone_label}
              </label>
              <input
                id="consult-phone"
                required
                type="tel"
                autoComplete="tel"
                inputMode="numeric"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+998 (__) ___-__-__"
                className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] focus-visible:ring-2 focus-visible:ring-[#39B54A] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-all font-bold text-sm shadow-sm"
              />
            </div>

            <button
              type="button"
              onClick={toggleOptionalFields}
              className="w-full inline-flex items-center justify-between rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-black/80 px-4 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-zinc-700 dark:text-zinc-300 hover:border-[#39B54A] transition-colors"
            >
              <span>
                {showOptionalFields
                  ? conversion.optional.hide
                  : conversion.optional.show}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showOptionalFields ? "rotate-180 text-[#39B54A]" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {showOptionalFields && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="space-y-1">
                    <label
                      htmlFor="consult-age"
                      className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 ml-2"
                    >
                      {conversion.fields.ageLabel}
                    </label>
                    <select
                      id="consult-age"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] focus-visible:ring-2 focus-visible:ring-[#39B54A] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-all font-bold text-sm shadow-sm"
                    >
                      <option value="">{conversion.fields.agePlaceholder}</option>
                      {conversion.fields.ageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="consult-contact-time"
                      className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 ml-2"
                    >
                      {conversion.fields.timeLabel}
                    </label>
                    <select
                      id="consult-contact-time"
                      value={contactTime}
                      onChange={(e) => setContactTime(e.target.value)}
                      className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] focus-visible:ring-2 focus-visible:ring-[#39B54A] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-all font-bold text-sm shadow-sm"
                    >
                      <option value="">
                        {conversion.fields.timePlaceholder}
                      </option>
                      {conversion.fields.timeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="consult-interest"
                      className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300 ml-2"
                    >
                      {conversion.fields.interestLabel}
                    </label>
                    <input
                      id="consult-interest"
                      type="text"
                      value={childInterest}
                      onChange={(e) => setChildInterest(e.target.value)}
                      placeholder={conversion.fields.interestPlaceholder}
                      className="w-full p-4 md:p-5 rounded-2xl bg-white dark:bg-black dark:text-white border-2 border-transparent focus:border-[#39B54A] focus-visible:ring-2 focus-visible:ring-[#39B54A] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black transition-all font-bold text-sm shadow-sm"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="rounded-xl border border-[#39B54A]/25 bg-[#39B54A]/5 p-3 space-y-1">
              <p className="text-[11px] text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#39B54A] shrink-0" />
                {conversion.trust.privacy}
              </p>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                {conversion.trust.speed}
              </p>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              className="w-full py-4 md:py-5 bg-black dark:bg-[#39B54A] text-white font-black uppercase rounded-2xl text-xs md:text-sm tracking-[0.2em] transition-all flex justify-center items-center gap-2 mt-2"
            >
              {status === "loading" ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <>
                  {t.home_page.form_submit} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* XARITA QISMI */}
        <div className="h-[400px] md:h-[580px] rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative w-full group/map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.912659295463!2d71.22956197613638!3d40.43293285465283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb01b0ac926783%3A0xa103cff84e3dbd4b!2sIstiqbol%20luck%20xususiy%20maktabi!5e0!3m2!1sru!2s!4v1768546214781!5m2!1sru!2s"
            className="w-full h-full dark:invert transition-all grayscale-0 duration-1000"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-5 md:p-7 rounded-[2rem] flex items-center gap-4 md:gap-6 shadow-2xl text-left">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#39B54A] rounded-full flex items-center justify-center text-white shrink-0">
              <MapPin size={24} />
            </div>
            <div className="flex-grow">
              <h3 className="text-xs md:text-sm font-black dark:text-white uppercase leading-none tracking-tight">
                {t.home_page.map_branch}
              </h3>
              <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300 font-bold uppercase mt-1 tracking-wider text-left">
                {t.home_page.map_address}
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Istiqbol+luck+xususiy+maktabi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs md:text-sm font-black text-[#39B54A] uppercase tracking-widest hover:text-black dark:hover:text-white transition-all"
              >
                <span>{t.home_page.map_find}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="cv-auto py-16 md:py-32 bg-white dark:bg-[#050505] transition-colors text-left">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 mb-12 md:mb-20">
            <div>
              <h4 className="text-[#39B54A] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 italic">
                {t.home_page.faq_subtitle}
              </h4>
              <h2 className="text-3xl md:text-6xl font-black dark:text-white uppercase tracking-tighter leading-none">
                {t.home_page.faq_title1} <br className="hidden md:block" />
                <span className="dark:text-white">
                  {t.home_page.faq_title2}
                </span>
              </h2>
            </div>
            <div className="flex items-stretch gap-4 md:gap-6 max-w-md">
              <div className="w-[2px] md:w-[3px] bg-[#39B54A] opacity-30 shrink-0"></div>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs md:text-sm font-bold uppercase tracking-[0.2em] leading-relaxed py-1">
                {t.home_page.faq_desc}
              </p>
            </div>
          </div>
          <div className="bg-[#e2dfdf] dark:bg-[#0c0c0c] rounded-[2.5rem] p-6 md:p-12 border border-transparent dark:border-zinc-800 shadow-sm">
            {t.home_page.faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
