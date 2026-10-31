import React, { createContext, useContext, useState } from 'react';
import guTranslations from '../locales/gu.json';
import enTranslations from '../locales/en.json';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('gu'); // Default Gujarati

  const t = (key) => {
    const currentDict = lang === 'gu' ? guTranslations : enTranslations;
    return currentDict[key] || key;
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'gu' ? 'en' : 'gu'));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
