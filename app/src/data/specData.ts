import type { Category, PaintColor } from '@/types/spec';

export const modelYearLabels = [
  'MY21',
  'MY21\npre-Mar',
  'MY22\npost-Mar',
  'MY23',
  'MY24',
  'MY25',
  'MY26',
] as const;

export const modelYearIds = ['my21', 'my22a', 'my22b', 'my23', 'my24', 'my25', 'my26'] as const;

export const categories: Category[] = [
  {
    id: 'keys',
    title: 'Keys & Access',
    features: [
      {
        name: 'Standard key',
        values: ['2', '1', '1', '1', '2 / 1', '2 / 1', '2'],
        notes: 'MY26: 2 keys standard. Earlier years varied between 1-2 keys.',
      },
      {
        name: 'Key tag (activity key)',
        values: ['1', '1', '1', '1', '\u25CB / 1', '\u25CB / 1', '\u25CB'],
      },
      {
        name: 'Polestar Digital key',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', 'Plus', 'Plus', '\u25CF'],
        notes: 'MY24 Digital key was added in error on early cars, later corrected.',
      },
      {
        name: 'Power-operated tailgate',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Power-operated tailgate with handsfree opening',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', 'Plus', 'Plus', 'Plus'],
      },
    ],
  },
  {
    id: 'infotainment',
    title: 'Infotainment & Technology',
    features: [
      {
        name: 'Qualcomm Snapdragon processor',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF'],
        notes: 'MY26: New Snapdragon chip improves app load times and display responsiveness.',
      },
      {
        name: 'Plug & Charge',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF'],
        notes: 'MY26: Plug & Charge enabled via Polestar Charge app.',
      },
      {
        name: '11.2" centre display',
        values: ['\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: '12.3" digital driver display',
        values: ['\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Built-in Google apps & services',
        values: ['\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Over-the-air (OTA) updates',
        values: ['\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Apple CarPlay (wired)',
        values: ['\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Android Auto (wired)',
        values: ['\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
    ],
  },
  {
    id: 'wheels',
    title: 'Wheels & Tyres',
    features: [
      {
        name: '19" 5-V Spoke Black Diamond Cut Alloy',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u2014', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: '19" 5-Double Spoke Black Diamond Cut Alloy',
        values: ['\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u2014', '\u2014'],
      },
      {
        name: '19" Aero (Diamond Cut with Plastic Partial Cover)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF'],
      },
      {
        name: '20" 4-V Spoke Black Diamond Cut Alloy',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u2014', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: '20" Pro (5-V Spoke Black Silver)',
        values: ['\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB', 'Pro', '\u2014'],
      },
      {
        name: '20" Pro Graphite (5-V Spoke Black Graphite)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB', 'Pro'],
      },
      {
        name: '20" 4-Y Spoke Polished Forged Alloy',
        values: ['Perf', 'Perf', 'Perf', 'Perf', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: '20" Perf. (4-Multi Spoke Black Polished Forged)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', 'Perf', 'Perf', 'Perf'],
        notes: 'MY26: New 5-spoke forged design, lightest Performance wheel to date.',
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    features: [
      {
        name: 'Performance summer tyres',
        values: ['Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf'],
      },
      {
        name: 'Swedish gold valve caps',
        values: ['Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf / Pro', 'Perf / Pro'],
      },
      {
        name: '\u00D6hlins DFV adjustable shock absorbers',
        values: ['Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf'],
      },
      {
        name: 'Brembo gold 4-piston front callipers',
        values: ['Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf'],
      },
      {
        name: 'Perf. software upgrade 350 kW',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB / Perf', '\u25CB / Perf', '\u25CB / Perf', '\u25CB / Perf'],
        notes: 'Requires dual motor.',
      },
    ],
  },
  {
    id: 'seats',
    title: 'Seats & Interior',
    features: [
      {
        name: 'Embossed textile seats (Charcoal/Zinc with 3D Etched deco)',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u2014', '\u2014'],
      },
      {
        name: 'Embossed textile seats (Charcoal with 3D Etched deco)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF'],
      },
      {
        name: 'WeaveTech seats with Black ash deco inlays',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: 'Bio-attributed MicroTech Charcoal (quilted, Black Ash)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', 'Plus'],
        notes: 'MY26: New MicroTech upholstery with quilted design and Black Ash deco.',
      },
      {
        name: 'Nappa leather seats (Barley, band on doors)',
        values: ['Nappa', 'Nappa', 'Nappa', '\u2014', '\u2014', '\u2014', '\u2014'],
        notes: 'Requires Plus pack.',
      },
      {
        name: 'Nappa leather seats (Zinc, band on doors)',
        values: ['\u2014', '\u2014', '\u2014', 'Nappa', 'Nappa', '\u2014', '\u2014'],
        notes: 'Requires Plus pack.',
      },
      {
        name: 'Nappa leather seats (Zinc or Charcoal, band on doors)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', 'Nappa', 'Nappa'],
        notes: 'Requires Plus pack.',
      },
      {
        name: 'Ventilated front seats',
        values: ['Nappa', 'Nappa', 'Nappa', 'Nappa', 'Nappa', 'Nappa', 'Nappa'],
        notes: 'Requires Plus pack.',
      },
      {
        name: 'Semi-electric front seats (4-way lumbar)',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Full power seats (memory, cushion extension)',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: 'Swedish gold seatbelts',
        values: ['Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf'],
      },
      {
        name: 'Black seatbelt with Swedish gold stripe',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', 'Pro', 'Pro'],
      },
      {
        name: 'Heated front seats',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Heated rear seats',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Climate', 'Climate'],
      },
      {
        name: 'Heated steering wheel & washer fluid wiper nozzle',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Climate', 'Climate'],
      },
      {
        name: 'Energy saving heat pump',
        values: ['\u2014', 'Plus', 'Plus', 'Plus', 'Plus', 'Climate', 'Climate'],
      },
    ],
  },
  {
    id: 'lights',
    title: 'Lights',
    features: [
      {
        name: 'Headlamp washers',
        values: ['\u25CF', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: 'LED headlights',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Pixel LED adaptive headlights',
        values: ['Pilot', 'Pilot', '\u2014', '\u2014', 'Pilot', '\u25CB', 'Pilot'],
      },
      {
        name: 'LED front fog lights with cornering',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', 'Pilot', 'Plus', 'Plus'],
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety & Driver Assist',
    features: [
      {
        name: 'Pilot Assist',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', 'Pilot', 'Pilot', 'Pilot'],
      },
      {
        name: 'Emergency Stop Assist',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', 'Pilot', 'Pilot', 'Pilot'],
      },
      {
        name: 'Adaptive Cruise Control (ACC)',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', 'Pilot', '\u25CF', '\u25CF'],
      },
      {
        name: 'Automatic Speed Limiter',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', 'Pilot', '\u2014', '\u2014'],
      },
      {
        name: 'Intelligent Speed Assist',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF'],
        notes: 'All cars delivered after July 2024.',
      },
      {
        name: 'BLIS with steer assist',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Cross Traffic Alert with brake support',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Rear Collision Warning & Mitigation',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Rear view camera',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: '360\u00B0 camera',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Park Assist side',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'Automatically dimmed exterior mirrors',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
    ],
  },
  {
    id: 'comfort',
    title: 'Comfort & Convenience',
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
        notes: 'MY25+: Removed from Plus pack, available as standalone option.',
      },
      {
        name: 'Bowers & Wilkins (14 spk, 1350W)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB'],
        notes: 'MY26: New option. \u00a31,800 in UK. Requires Plus pack.',
      },
      {
        name: 'Tinted rear window',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', '\u25CF', '\u25CF'],
        notes: 'MY26+: Tint now applied to rear side windows and tailgate.',
      },
      {
        name: 'High gloss black roof segment',
        values: ['Plus + Perf', 'Plus + Perf', 'Plus + Perf', 'Plus + Perf', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: 'Homelink integration',
        values: ['\u25CF', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014'],
      },
    ],
  },
  {
    id: 'charging',
    title: 'Charging',
    features: [
      {
        name: 'AC charging cable (22 kW), 6m (32A 3ph)',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
        notes: 'Early cars had incorrect 20A cable.',
      },
      {
        name: 'Home wall plug UK cable, 7m (granny charger)',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'Plug & Charge (ISO 15118)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF'],
        notes: 'MY26: Enabled via Polestar Charge app.',
      },
      {
        name: 'Standard Range battery',
        values: ['69 kWh LG', '69 kWh LG', '69 kWh LG', '69 kWh LG', '69 kWh LG', '69 kWh LG', '70 kWh CATL'],
        notes: 'MY26: New 70 kWh CATL battery replaces 69 kWh LG Chem.',
      },
      {
        name: 'Long Range battery',
        values: ['78 kWh', '78 kWh', '78 kWh', '82 kWh', '82 kWh', '82 kWh', '82 kWh'],
      },
      {
        name: 'DC fast charging (max)',
        values: ['150 kW', '150 kW', '150 kW', '205 kW', '205 kW', '205 kW', '180/205 kW'],
        notes: 'MY26: Standard Range now 180 kW (up from 135 kW). Long Range 205 kW.',
      },
    ],
  },
  {
    id: 'packs',
    title: 'Optional Packs',
    features: [
      {
        name: 'Prime Pack (Pilot + Plus + Climate + privacy glass)',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB'],
        notes: 'MY26: New pack bundling Pilot, Plus, Climate packs + rear privacy glass.',
      },
      {
        name: 'Plus Pack',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'Pilot Pack',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'Performance Pack',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'Climate Pack',
        values: ['\u2014', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'Pro Pack',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'Nappa Upgrade',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
        notes: 'Requires Plus pack.',
      },
    ],
  },
];

export const filterCategories = [
  { id: 'all', label: 'All' },
  { id: 'keys', label: 'Keys & Access' },
  { id: 'infotainment', label: 'Infotainment' },
  { id: 'wheels', label: 'Wheels' },
  { id: 'performance', label: 'Performance' },
  { id: 'seats', label: 'Seats' },
  { id: 'lights', label: 'Lights' },
  { id: 'safety', label: 'Safety' },
  { id: 'comfort', label: 'Comfort' },
  { id: 'charging', label: 'Charging' },
  { id: 'packs', label: 'Packs' },
];

export const packageFilters = [
  { id: 'all', label: 'All Packages', color: '' },
  { id: 'Plus', label: 'Plus', color: '#1A1A1A' },
  { id: 'Pilot', label: 'Pilot', color: '#1A1A1A' },
  { id: 'Pilot Lite', label: 'Pilot Lite', color: '#6B6B6B' },
  { id: 'Perf', label: 'Performance', color: '#C9A96E' },
  { id: 'Nappa', label: 'Nappa', color: '#8B7355' },
  { id: 'Pro', label: 'Pro', color: '#1A1A1A' },
  { id: 'Climate', label: 'Climate', color: '#4A7C59' },
] as const;

export const paintColors: PaintColor[] = [
  {
    name: 'Snow',
    polestarCode: '707',
    volvoName: 'Crystal White Pearl',
    volvoCode: '707 / 807',
    hex: '#E8E8E8',
    values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
    isMetallic: true,
  },
  {
    name: 'Magnesium',
    polestarCode: '729',
    volvoName: 'Glacier Silver Metallic',
    volvoCode: '729 / 829',
    hex: '#A8A9AD',
    values: ['\u25CB', '\u25CB', '\u25CB', '\u25CF', '\u25CF', '\u2014', '\u2014'],
    isMetallic: true,
  },
  {
    name: 'Vapour',
    polestarCode: '740',
    volvoName: 'Vapor Grey Metallic',
    volvoCode: '740',
    hex: '#B8B9BB',
    values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF'],
    isMetallic: false,
  },
  {
    name: 'Moon',
    polestarCode: '727',
    volvoName: 'Pebble Grey Metallic',
    volvoCode: '727',
    hex: '#9A9B9D',
    values: ['\u25CB', '\u25CB', '\u25CB', '\u2014', '\u2014', '\u2014', '\u2014'],
    isMetallic: true,
  },
  {
    name: 'Dune',
    polestarCode: 'TBC',
    volvoName: 'Sand Dune Metallic',
    volvoCode: '743',
    hex: '#B8A88A',
    values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB'],
    isMetallic: true,
    notes: 'MY26: Replaces Jupiter. Sandy hue with smooth mica finish.',
  },
  {
    name: 'Jupiter',
    polestarCode: '736',
    volvoName: 'Bright Dusk Metallic',
    volvoCode: '736',
    hex: '#A09078',
    values: ['\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB', '\u25CB', '\u2014'],
    isMetallic: true,
    replacedBy: 'Dune',
  },
  {
    name: 'Thunder',
    polestarCode: '728',
    volvoName: 'Thunder Grey Metallic',
    volvoCode: '728',
    hex: '#4A4B4D',
    values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u2014', '\u2014'],
    isMetallic: true,
  },
  {
    name: 'Storm',
    polestarCode: '747',
    volvoName: 'Storm Metallic',
    volvoCode: '747',
    hex: '#3D3E40',
    values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB'],
    isMetallic: true,
  },
  {
    name: 'Midnight',
    polestarCode: '723',
    volvoName: 'Denim Blue Metallic',
    volvoCode: '723',
    hex: '#1C2A3A',
    values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
    isMetallic: true,
  },
  {
    name: 'Void',
    polestarCode: '019',
    volvoName: 'Black Stone',
    volvoCode: '019',
    hex: '#0A0A0A',
    values: ['\u25CF', '\u25CF', '\u25CF', '\u2014', '\u2014', '\u2014', '\u2014'],
    isMetallic: false,
  },
  {
    name: 'Space',
    polestarCode: '717',
    volvoName: 'Onyx Black Pearl Metallic',
    volvoCode: '717',
    hex: '#151515',
    values: ['\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
    isMetallic: true,
  },
];
