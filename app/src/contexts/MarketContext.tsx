import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Market = 'uk' | 'se' | 'us';

interface MarketInfo {
  id: Market;
  label: string;
  flag: string;
  currency: string;
  rangeStandard: string;
  rangeLong: string;
}

export const markets: MarketInfo[] = [
  { id: 'uk', label: 'United Kingdom', flag: '\uD83C\uDDEC\uD83C\uDDE7', currency: 'GBP', rangeStandard: '344 mi', rangeLong: '409 mi' },
  { id: 'se', label: 'Sweden', flag: '\uD83C\uDDF8\uD83C\uDDEA', currency: 'SEK', rangeStandard: '550 km', rangeLong: '655 km' },
  { id: 'us', label: 'United States', flag: '\uD83C\uDDFA\uD83C\uDDF8', currency: 'USD', rangeStandard: '270 mi', rangeLong: '320 mi' },
];

interface MarketContextValue {
  market: Market;
  setMarket: (m: Market) => void;
  marketInfo: MarketInfo;
}

const MarketContext = createContext<MarketContextValue>({
  market: 'uk',
  setMarket: () => {},
  marketInfo: markets[0],
});

function detectBrowserMarket(): Market {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('sv')) return 'se';
  if (lang === 'en-us') return 'us';
  return 'uk';
}

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarketState] = useState<Market>(() => {
    const stored = localStorage.getItem('ps-market');
    if (stored === 'uk' || stored === 'se' || stored === 'us') return stored;
    const detected = detectBrowserMarket();
    localStorage.setItem('ps-market', detected);
    return detected;
  });

  const setMarket = useCallback((m: Market) => {
    localStorage.setItem('ps-market', m);
    setMarketState(m);
  }, []);

  const marketInfo = markets.find((m) => m.id === market) || markets[0];

  return (
    <MarketContext.Provider value={{ market, setMarket, marketInfo }}>
      {children}
    </MarketContext.Provider>
  );
}

export const useMarket = () => useContext(MarketContext);
