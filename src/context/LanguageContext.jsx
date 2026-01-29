import React, { createContext, useState, useContext, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // LocalStorage dan saqlangan tilni olish, bo'lmasa UZ
  const [lang, setLang] = useState(localStorage.getItem("siteLang") || "UZ");

  const changeLanguage = (code) => {
    setLang(code);
    localStorage.setItem("siteLang", code);
  };

  const t = translations[lang]; // Hozirgi tildagi matnlar obyekti

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
