import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import en from '../locales/en.json';
import sv from '../locales/sv.json';

export type Locale = 'en' | 'sv';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = { en, sv };

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
});

function detectBrowserLocale(): Locale {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('sv')) return 'sv';
  return 'en';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem('ps-locale');
    if (stored === 'en' || stored === 'sv') return stored;
    const detected = detectBrowserLocale();
    localStorage.setItem('ps-locale', detected);
    return detected;
  });

  const setLocale = useCallback((l: Locale) => {
    localStorage.setItem('ps-locale', l);
    setLocaleState(l);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[locale]?.[key] || translations.en[key] || key;
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
