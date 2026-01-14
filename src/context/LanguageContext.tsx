"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";

export type Language = "en" | "pt";

const translations = { en, pt };

type TranslationValue = string | string[] | { [key: string]: TranslationValue };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, TranslationValue>, path: string): TranslationValue | undefined {
  const keys = path.split(".");
  let current: TranslationValue = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && !Array.isArray(current) && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && (saved === "en" || saved === "pt")) {
      setLanguageState(saved);
    }
    // Only checking for saved preference, as default is now PT
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Use "pt" during SSR and initial hydration to prevent mismatch
  const currentLang = mounted ? language : "pt";

  const t = (key: string): string => {
    const value = getNestedValue(translations[currentLang] as Record<string, TranslationValue>, key);
    if (typeof value === "string") {
      return value;
    }
    // Fallback to English
    const fallback = getNestedValue(translations.en as Record<string, TranslationValue>, key);
    if (typeof fallback === "string") {
      return fallback;
    }
    return key;
  };

  const tArray = (key: string): string[] => {
    const value = getNestedValue(translations[currentLang] as Record<string, TranslationValue>, key);
    if (Array.isArray(value)) {
      return value as string[];
    }
    // Fallback to English
    const fallback = getNestedValue(translations.en as Record<string, TranslationValue>, key);
    if (Array.isArray(fallback)) {
      return fallback as string[];
    }
    return [];
  };

  return (
    <LanguageContext.Provider value={{ language: currentLang, setLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
