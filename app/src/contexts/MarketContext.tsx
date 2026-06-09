import { createContext, useContext, type ReactNode } from 'react';
import { useLocale, type Market } from '@/contexts/LocaleContext';

export type { Market } from '@/contexts/LocaleContext';

interface MarketInfo {
  id: Market;
  label: string;
  flag: string;
  currency: string;
  rangeStandard: string;
  rangeLong: string;
}

const marketData: Record<Market, MarketInfo> = {
  uk: { id: 'uk', label: 'marketUk', flag: '🇬🇧', currency: 'GBP', rangeStandard: '344 mi', rangeLong: '409 mi' },
  se: { id: 'se', label: 'marketSe', flag: '🇸🇪', currency: 'SEK', rangeStandard: '550 km', rangeLong: '655 km' },
  us: { id: 'us', label: 'marketUs', flag: '🇺🇸', currency: 'USD', rangeStandard: '270 mi', rangeLong: '320 mi' },
};

interface MarketContextValue {
  market: Market;
  marketInfo: MarketInfo;
}

const MarketContext = createContext<MarketContextValue>({
  market: 'uk',
  marketInfo: marketData.uk,
});

export function MarketProvider({ children }: { children: ReactNode }) {
  const { market } = useLocale();
  const marketInfo = marketData[market] || marketData.uk;

  return (
    <MarketContext.Provider value={{ market, marketInfo }}>
      {children}
    </MarketContext.Provider>
  );
}

export const useMarket = () => useContext(MarketContext);
