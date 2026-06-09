import en from './en.json';
import sv from './sv.json';
import no from './no.json';
import da from './da.json';
import fr from './fr.json';
import de from './de.json';

export type Market = 'uk' | 'se' | 'us';

export interface LocaleDef {
  code: string;
  labelKey: string;
  defaultMarket: Market;
  flag: string;
  translations: Record<string, string>;
}

export const LOCALES: LocaleDef[] = [
  { code: 'en', labelKey: 'langEnglish', defaultMarket: 'uk', flag: '🇬🇧', translations: en },
  { code: 'sv', labelKey: 'langSwedish', defaultMarket: 'se', flag: '🇸🇪', translations: sv },
  { code: 'no', labelKey: 'langNorwegian', defaultMarket: 'uk', flag: '🇳🇴', translations: no },
  { code: 'da', labelKey: 'langDanish', defaultMarket: 'uk', flag: '🇩🇰', translations: da },
  { code: 'fr', labelKey: 'langFrench', defaultMarket: 'uk', flag: '🇫🇷', translations: fr },
  { code: 'de', labelKey: 'langGerman', defaultMarket: 'uk', flag: '🇩🇪', translations: de },
];

export type Locale = (typeof LOCALES)[number]['code'];

export function getLocale(code: string): LocaleDef | undefined {
  return LOCALES.find((l) => l.code === code);
}

export function isValidLocale(code: string): code is Locale {
  return LOCALES.some((l) => l.code === code);
}

export function detectBrowserLocale(): Locale {
  const lang = navigator.language.toLowerCase();
  for (const l of LOCALES) {
    if (lang.startsWith(l.code)) return l.code;
  }
  return 'en';
}

export function defaultMarketForLocale(locale: Locale): Market {
  return getLocale(locale)?.defaultMarket ?? 'uk';
}
