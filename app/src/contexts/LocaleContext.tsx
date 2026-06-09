import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { LOCALES, type Locale, type Market, isValidLocale, detectBrowserLocale, defaultMarketForLocale } from '@/locales/registry';

export type { Locale, Market } from '@/locales/registry';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  market: Market;
  availableLocales: readonly { code: Locale; labelKey: string; flag: string }[];
}

const translations: Record<string, Record<string, string>> = {};
for (const l of LOCALES) {
  translations[l.code] = l.translations;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
  market: 'uk',
  availableLocales: [{ code: 'en', labelKey: 'langEnglish', flag: '🇬🇧' }],
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem('ps-locale');
    if (isValidLocale(stored)) return stored;
    const detected = detectBrowserLocale();
    localStorage.setItem('ps-locale', detected);
    localStorage.setItem('ps-market', defaultMarketForLocale(detected));
    return detected;
  });

  const setLocale = useCallback((l: Locale) => {
    const market = defaultMarketForLocale(l);
    localStorage.setItem('ps-locale', l);
    localStorage.setItem('ps-market', market);
    setLocaleState(l);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[locale]?.[key] || translations.en[key] || key;
    },
    [locale]
  );

  const market = defaultMarketForLocale(locale);
  const availableLocales = LOCALES.map((l) => ({ code: l.code, labelKey: l.labelKey, flag: l.flag }));

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, market, availableLocales }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
