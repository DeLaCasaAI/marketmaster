
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import enTranslations from '../../../MarketMaster/locales/en.json';
import esTranslations from '../../../MarketMaster/locales/es.json';

type Translations = Record<string, string>;

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  translations: {
    en: Translations;
    es: Translations;
  };
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('marketMasterLanguage');
    return savedLanguage || 'en';
  });

  const translations = {
    en: enTranslations,
    es: esTranslations,
  };

  const t = (key: string): string => {
    const currentTranslations = language === 'en' ? translations.en : translations.es;
    return currentTranslations[key] || key;
  };

  useEffect(() => {
    localStorage.setItem('marketMasterLanguage', language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
