import type { Category } from '@/types/spec';
import { categories as ukCategories, paintColors as ukPaintColors } from './specData';
import type { PaintColor } from '@/types/spec';

// Sweden-specific differences
const seOverrides: Record<string, Partial<Category>> = {
  keys: {
    features: [
      {
        name: 'spec_feature_0',
        values: ['2', '1', '1', '1', '2 / 1', '2 / 1', '2'],
        notes: 'market_note_0',
      },
      {
        name: 'market_feature_0',
        values: ['1', '1', '1', '1', '\u25CB / 1', '\u25CB / 1', '\u25CB'],
      },
      {
        name: 'spec_feature_2',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', 'Plus', 'Plus', '\u25CF'],
      },
      {
        name: 'spec_feature_3',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'market_feature_1',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', 'Plus', 'Plus', 'Plus'],
      },
    ] as Category['features'],
  },
  charging: {
    features: [
      {
        name: 'market_feature_2',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'market_feature_3',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'spec_feature_71',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF'],
      },
      {
        name: 'spec_feature_72',
        values: ['\u2014', '64 kWh LG', '69 kWh LG', '69 kWh LG', '69 kWh LG', '69 kWh LG', '70 kWh CATL'],
      },
      {
        name: 'spec_feature_73',
        values: ['78 kWh', '78 kWh', '78 kWh', '78 kWh', '82 kWh', '82 kWh', '82 kWh'],
      },
      {
        name: 'spec_feature_74',
        values: ['150 kW', '150 kW', '150 kW', '150 kW', '205 kW', '205 kW', '180/205 kW'],
      },
    ] as Category['features'],
  },
};

// US-specific differences
const usOverrides: Record<string, Partial<Category>> = {
  keys: {
    features: [
      {
        name: 'market_feature_4',
        values: ['2', '1', '1', '1', '2 / 1', '2 / 1', '2'],
        notes: 'market_note_1',
      },
      {
        name: 'spec_feature_2',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', 'Plus', 'Plus', '\u25CF'],
      },
      {
        name: 'spec_feature_3',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'market_feature_5',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', 'Plus', 'Plus', 'Plus'],
      },
    ] as Category['features'],
  },
  charging: {
    features: [
      {
        name: 'market_feature_6',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'market_feature_7',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'spec_feature_71',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF'],
      },
      {
        name: 'spec_feature_72',
        values: ['\u2014', '64 kWh', '69 kWh', '69 kWh', '69 kWh', '69 kWh', '70 kWh CATL'],
        notes: 'market_note_2',
      },
      {
        name: 'spec_feature_73',
        values: ['78 kWh', '78 kWh', '78 kWh', '78 kWh', '82 kWh', '82 kWh', '82 kWh'],
        notes: 'market_note_3',
      },
      {
        name: 'spec_feature_74',
        values: ['155 kW', '155 kW', '155 kW', '155 kW', '205 kW', '205 kW', '205 kW'],
      },
    ] as Category['features'],
  },
  comfort: {
    features: [
      {
        name: 'spec_feature_58',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: 'spec_feature_59',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: 'spec_feature_60',
        values: ['Plus', 'Plus', 'Plus', 'Plus', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_61',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: 'spec_feature_62',
        values: ['\u2014', '\u2014', '\u2014', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: 'spec_feature_63',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_64',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', '\u25CB', '\u25CB'],
      },
      {
        name: 'spec_feature_65',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB'],
        notes: 'market_note_4',
      },
      {
        name: 'market_feature_8',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', '\u25CB'],
        notes: 'market_note_5',
      },
      {
        name: 'spec_feature_67',
        values: ['Plus + Perf', 'Plus + Perf', 'Plus + Perf', 'Plus + Perf', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: 'market_feature_9',
        values: ['\u25CF', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
        notes: 'market_note_6',
      },
    ] as Category['features'],
  },
};

export function getCategoriesForMarket(market: 'uk' | 'se' | 'us'): Category[] {
  const overrides = market === 'se' ? seOverrides : market === 'us' ? usOverrides : {};

  return ukCategories.map((cat) => {
    if (overrides[cat.id]) {
      return { ...cat, ...overrides[cat.id] } as Category;
    }
    return cat;
  });
}

export function getPaintColorsForMarket(_market: 'uk' | 'se' | 'us'): PaintColor[] {
  // Paint colours are the same across markets
  return ukPaintColors;
}

// Section labels (translation keys)
export const sectionLabels: Record<string, string> = {
  keys: 'keysAccess',
  infotainment: 'infotainment',
  wheels: 'wheelsTyres',
  performance: 'performance',
  seats: 'seatsInterior',
  lights: 'lights',
  safety: 'safetyAssist',
  comfort: 'comfort',
  charging: 'charging',
  packs: 'optionalPacks',
  paint: 'paintColours',
  knownIssues: 'knownIssues',
  printing: 'printing3d',
  service: 'serviceMaintenance',
  chargingPerf: 'chargingThermal',
};
