import type { Category } from '@/types/spec';
import { categories as ukCategories, paintColors as ukPaintColors } from './specData';
import type { PaintColor } from '@/types/spec';

// Sweden-specific differences
const seOverrides: Record<string, Partial<Category>> = {
  keys: {
    features: [
      {
        name: 'Standard key',
        values: ['2', '1', '1', '1', '2 / 1', '2 / 1', '2'],
        notes: 'Standard: 2 nycklar',
      },
      {
        name: 'Key tag (activity key)',
        values: ['1', '1', '1', '1', '\u25CB / 1', '\u25CB / 1', '\u25CB'],
      },
      {
        name: 'Polestar Digital key',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', 'Plus', 'Plus', '\u25CF'],
      },
      {
        name: 'Power-operated tailgate',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Power-operated tailgate with handsfree opening',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', 'Plus', 'Plus', 'Plus'],
      },
    ] as Category['features'],
  },
  charging: {
    features: [
      {
        name: 'AC charging cable (22 kW), 6m (32A 3-phase)',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Home charging cable (Schuko/CEE), 7m',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'Plug & Charge (ISO 15118)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF'],
      },
      {
        name: 'Standard Range battery',
        values: ['\u2014', '64 kWh LG', '69 kWh LG', '69 kWh LG', '69 kWh LG', '69 kWh LG', '70 kWh CATL'],
      },
      {
        name: 'Long Range battery',
        values: ['78 kWh', '78 kWh', '78 kWh', '78 kWh', '82 kWh', '82 kWh', '82 kWh'],
      },
      {
        name: 'DC fast charging (max)',
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
        name: 'Standard key fob',
        values: ['2', '1', '1', '1', '2 / 1', '2 / 1', '2'],
        notes: 'US models: Key fob standard',
      },
      {
        name: 'Polestar Digital key',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', 'Plus', 'Plus', '\u25CF'],
      },
      {
        name: 'Power-operated tailgate',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Hands-free power tailgate',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', 'Plus', 'Plus', 'Plus'],
      },
    ] as Category['features'],
  },
  charging: {
    features: [
      {
        name: 'Level 2 charging cable (240V), 6m',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Level 1 charging cable (120V), 7m',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'Plug & Charge (ISO 15118)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF'],
      },
      {
        name: 'Standard Range battery',
        values: ['\u2014', '64 kWh', '69 kWh', '69 kWh', '69 kWh', '69 kWh', '70 kWh CATL'],
        notes: 'EPA est. 270 mi range (MY26)',
      },
      {
        name: 'Long Range battery',
        values: ['78 kWh', '78 kWh', '78 kWh', '78 kWh', '82 kWh', '82 kWh', '82 kWh'],
        notes: 'EPA est. 320 mi range (MY26)',
      },
      {
        name: 'DC fast charging (max)',
        values: ['155 kW', '155 kW', '155 kW', '155 kW', '205 kW', '205 kW', '205 kW'],
      },
    ] as Category['features'],
  },
  comfort: {
    features: [
      {
        name: 'Fixed panoramic sunroof (projected Polestar symbol)',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: 'Interior high-level illumination',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: '15W wireless smartphone charging',
        values: ['Plus', 'Plus', 'Plus', 'Plus', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Rear floor "lid in lid" with bag holder',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: 'Air Quality (PM2.5 sensor & filter)',
        values: ['\u2014', '\u2014', '\u2014', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: '8-speaker audio system (250W)',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Harman Kardon Premium Sound (13 spk, 600W)',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', '\u25CB', '\u25CB'],
      },
      {
        name: 'Bowers & Wilkins (14 spk, 1350W)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB'],
        notes: 'MY26: New option. $2,200 in US.',
      },
      {
        name: 'Rear privacy glass',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', '\u25CB'],
        notes: 'US: Tint laws vary by state. Standalone option for MY26.',
      },
      {
        name: 'High gloss black roof segment',
        values: ['Plus + Perf', 'Plus + Perf', 'Plus + Perf', 'Plus + Perf', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: 'Homelink',
        values: ['\u25CF', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
        notes: 'US: Homelink more common than UK.',
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

// Section labels per locale
export const sectionLabelsEn: Record<string, string> = {
  keys: 'Keys & Access',
  infotainment: 'Infotainment',
  wheels: 'Wheels & Tyres',
  performance: 'Performance',
  seats: 'Seats & Interior',
  lights: 'Lights',
  safety: 'Safety & Assist',
  comfort: 'Comfort',
  charging: 'Charging',
  packs: 'Optional Packs',
  paint: 'Paint Colours',
  knownIssues: 'Known Issues',
  printing: '3D Printing',
  service: 'Service & Maintenance',
  chargingPerf: 'Charging & Thermal',
};

export const sectionLabelsSv: Record<string, string> = {
  keys: 'Nycklar & \u00C5tkomst',
  infotainment: 'Infotainment',
  wheels: 'Hjul & D\u00E4ck',
  performance: 'Prestanda',
  seats: 'S\u00E4ten & Interi\u00F6r',
  lights: 'Belysning',
  safety: 'S\u00E4kerhet & Assistans',
  comfort: 'Komfort',
  charging: 'Laddning',
  packs: 'Tillvalspaket',
  paint: 'Lackf\u00E4rger',
  knownIssues: 'K\u00E4nda Fel',
  printing: '3D-printing',
  service: 'Service & Underhåll',
  chargingPerf: 'Laddning & Termisk',
};
