import type { Category, PaintColor } from '@/types/spec';

export const modelYearLabels = [
  'MY21',
  'MY22\npre-Mar',
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
    title: 'keysAccess',
    features: [
      {
        name: 'spec_feature_0',
        values: ['2', '2', '1', '1', '1', '1', '2'],
        notes: 'spec_note_0',
      },
      {
        name: 'spec_feature_1',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
        notes: 'spec_note_1',
      },
      {
        name: 'spec_feature_2',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', 'Plus', 'Plus', 'Plus'],
        notes: 'spec_note_2',
      },
      {
        name: 'spec_feature_3',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
        notes: 'spec_note_3',
      },
      {
        name: 'spec_feature_4',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', 'Plus', 'Plus', 'Plus'],
        notes: 'spec_note_4',
      },
    ],
  },
  {
    id: 'infotainment',
    title: 'infotainmentTechnology',
    features: [
      {
        name: 'spec_feature_5',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF'],
        notes: 'spec_note_5',
      },
      {
        name: 'spec_feature_6',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_7',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_8',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
        notes: 'spec_note_6',
      },
      {
        name: 'spec_feature_9',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_10',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
        notes: 'spec_note_7',
      },
      {
        name: 'spec_feature_11',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
        notes: 'spec_note_8',
      },
    ],
  },
  {
    id: 'wheels',
    title: 'wheelsTyres',
    features: [
      {
        name: 'spec_feature_12',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u2014', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: 'spec_feature_13',
        values: ['\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF', '\u2014', '\u2014'],
      },
      {
        name: 'spec_feature_14',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_15',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u2014', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: 'spec_feature_16',
        values: ['\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB', '\u2014', '\u2014'],
      },
      {
        name: 'spec_feature_17',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', 'Pro', 'Pro'],
      },
      {
        name: 'spec_feature_18',
        values: ['Perf', 'Perf', 'Perf', 'Perf', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: 'spec_feature_19',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', 'Perf', 'Perf', '\u2014'],
      },
      {
        name: 'spec_feature_20',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', 'Perf'],
        notes: 'spec_note_9',
      },
    ],
  },
  {
    id: 'performance',
    title: 'performance',
    features: [
      {
        name: 'spec_feature_21',
        values: ['Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf'],
      },
      {
        name: 'spec_feature_22',
        values: ['Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf / Pro', 'Perf / Pro'],
      },
      {
        name: 'spec_feature_23',
        values: ['Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf'],
      },
      {
        name: 'spec_feature_24',
        values: ['Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf'],
      },
      {
        name: 'spec_feature_25',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB / Perf', '\u25CB / Perf', '\u25CB / Perf', '\u25CB / Perf'],
        notes: 'spec_note_10',
      },
    ],
  },
  {
    id: 'seats',
    title: 'seatsInterior',
    features: [
      {
        name: 'spec_feature_26',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u2014', '\u2014'],
      },
      {
        name: 'spec_feature_27',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_28',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', '\u2014'],
        notes: 'spec_note_11',
      },
      {
        name: 'spec_feature_29',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', 'Plus', 'Plus'],
        notes: 'spec_note_12',
      },
      {
        name: 'spec_feature_30',
        values: ['Nappa', 'Nappa', 'Nappa', '\u2014', '\u2014', '\u2014', '\u2014'],
        notes: 'spec_note_13',
      },
      {
        name: 'spec_feature_31',
        values: ['\u2014', '\u2014', '\u2014', 'Nappa', '\u2014', '\u2014', '\u2014'],
        notes: 'spec_note_14',
      },
      {
        name: 'spec_feature_32',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', 'Nappa', 'Nappa', 'Nappa'],
        notes: 'spec_note_15',
      },
      {
        name: 'spec_feature_33',
        values: ['Nappa', 'Nappa', 'Nappa', 'Nappa', 'Nappa', 'Nappa', 'Nappa'],
        notes: 'spec_note_16',
      },
      {
        name: 'spec_feature_34',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_35',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus'],
      },
      {
        name: 'spec_feature_36',
        values: ['Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf', 'Perf'],
      },
      {
        name: 'spec_feature_37',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', 'Pro', 'Pro'],
      },
      {
        name: 'spec_feature_38',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_39',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Climate', 'Climate'],
      },
      {
        name: 'spec_feature_40',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Climate', 'Climate'],
      },
      {
        name: 'spec_feature_41',
        values: ['\u2014', 'Plus', 'Plus', 'Plus', 'Plus', 'Climate', 'Climate'],
      },
    ],
  },
  {
    id: 'lights',
    title: 'lights',
    features: [
      {
        name: 'spec_feature_42',
        values: ['\u25CF', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: 'spec_feature_43',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_44',
        values: ['Pilot', 'Pilot', '\u2014', '\u2014', 'Pilot', '\u25CB', '\u25CB'],
        notes: 'spec_note_17',
      },
      {
        name: 'spec_feature_45',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', 'Pilot', 'Plus', 'Plus'],
      },
    ],
  },
  {
    id: 'safety',
    title: 'safetyDriverAssist',
    features: [
      {
        name: 'spec_feature_46',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', 'Pilot', 'Pilot', 'Pilot'],
      },
      {
        name: 'spec_feature_47',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', 'Pilot', 'Pilot', 'Pilot'],
      },
      {
        name: 'spec_feature_48',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', 'Pilot', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_49',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', 'Pilot', '\u2014', '\u2014'],
      },
      {
        name: 'spec_feature_50',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF'],
        notes: 'spec_note_18',
      },
      {
        name: 'spec_feature_51',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_52',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_53',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_54',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u2014', '\u2014', '\u2014'],
        notes: 'spec_note_19',
      },
      {
        name: 'spec_feature_55',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_56',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
      {
        name: 'spec_feature_57',
        values: ['Pilot', 'Pilot', 'Pilot Lite', 'Pilot Lite', '\u25CF', '\u25CF', '\u25CF'],
      },
    ],
  },
  {
    id: 'comfort',
    title: 'comfortConvenience',
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
        notes: 'spec_note_20',
      },
      {
        name: 'spec_feature_65',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB'],
        notes: 'spec_note_21',
      },
      {
        name: 'spec_feature_66',
        values: ['Plus', 'Plus', 'Plus', 'Plus', 'Plus', 'Plus', '\u25CB'],
        notes: 'spec_note_22',
      },
      {
        name: 'spec_feature_67',
        values: ['Plus + Perf', 'Plus + Perf', 'Plus + Perf', 'Plus + Perf', '\u2014', '\u2014', '\u2014'],
      },
      {
        name: 'spec_feature_68',
        values: ['\u25CF', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014'],
        notes: 'spec_note_23',
      },
    ],
  },
  {
    id: 'charging',
    title: 'charging',
    features: [
      {
        name: 'spec_feature_69',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CF'],
        notes: 'spec_note_24',
      },
      {
        name: 'spec_feature_70',
        values: ['\u25CF', '\u25CF', '\u25CF', '\u25CF', '\u25CB', '\u25CB', '\u25CB'],
      },
      {
        name: 'spec_feature_71',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF'],
        notes: 'spec_note_25',
      },
      {
        name: 'spec_feature_72',
        values: ['\u2014', '64 kWh LG', '69 kWh LG', '69 kWh LG', '69 kWh LG', '69 kWh LG', '70 kWh CATL'],
        notes: 'spec_note_26',
      },
      {
        name: 'spec_feature_73',
        values: ['78 kWh', '78 kWh', '78 kWh', '78 kWh', '82 kWh', '82 kWh', '82 kWh'],
      },
      {
        name: 'spec_feature_74',
        values: ['150 kW', '150 kW', '150 kW', '150 kW', '205 kW', '205 kW', '180/205 kW'],
        notes: 'spec_note_27',
      },
    ],
  },
  {
    id: 'packs',
    title: 'optionalPacks',
    features: [
      {
        name: 'spec_feature_75',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB'],
        notes: 'spec_note_28',
      },
      {
        name: 'spec_feature_76',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
        notes: 'spec_note_29',
      },
      {
        name: 'spec_feature_77',
        values: ['\u25CB', '\u25CB', '\u2014', '\u2014', '\u25CB', '\u25CB', '\u25CB'],
        notes: 'spec_note_30',
      },
      {
        name: 'spec_feature_78',
        values: ['\u2014', '\u2014', '\u25CB', '\u25CB', '\u2014', '\u2014', '\u2014'],
        notes: 'spec_note_31',
      },
      {
        name: 'spec_feature_79',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
        notes: 'spec_note_32',
      },
      {
        name: 'spec_feature_80',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB'],
        notes: 'spec_note_33',
      },
      {
        name: 'spec_feature_81',
        values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB'],
        notes: 'spec_note_34',
      },
      {
        name: 'spec_feature_82',
        values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
        notes: 'spec_note_16',
      },
    ],
  },
];

export const filterCategories = [
  { id: 'all', label: 'categoryAll' },
  { id: 'keys', label: 'keysAccess' },
  { id: 'infotainment', label: 'infotainment' },
  { id: 'wheels', label: 'wheelsTyres' },
  { id: 'performance', label: 'performance' },
  { id: 'seats', label: 'seatsInterior' },
  { id: 'lights', label: 'lights' },
  { id: 'safety', label: 'safetyAssist' },
  { id: 'comfort', label: 'comfort' },
  { id: 'charging', label: 'charging' },
  { id: 'packs', label: 'optionalPacks' },
];

export const packageFilters = [
  { id: 'all', label: 'categoryAllPackages', color: '' },
  { id: 'Plus', label: 'Plus', color: '#1A1A1A' },
  { id: 'Pilot', label: 'Pilot', color: '#1A1A1A' },
  { id: 'Pilot Lite', label: 'PilotLite', color: '#6B6B6B' },
  { id: 'Perf', label: 'performance', color: '#C9A96E' },
  { id: 'Nappa', label: 'Nappa', color: '#8B7355' },
  { id: 'Pro', label: 'Pro', color: '#1A1A1A' },
  { id: 'Climate', label: 'Climate', color: '#4A7C59' },
] as const;

export const paintColors: PaintColor[] = [
  {
    name: 'spec_feature_83',
    polestarCode: '707',
    volvoName: 'volvo_name_0',
    volvoCode: '707 / 807',
    hex: '#E8E8E8',
    values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
    isMetallic: true,
  },
  {
    name: 'spec_feature_84',
    polestarCode: '729',
    volvoName: 'volvo_name_1',
    volvoCode: '729 / 829',
    hex: '#A8A9AD',
    values: ['\u25CB', '\u25CB', '\u25CB', '\u25CF', '\u25CF', '\u2014', '\u2014'],
    isMetallic: true,
  },
  {
    name: 'spec_feature_85',
    polestarCode: '740',
    volvoName: 'volvo_name_2',
    volvoCode: '740',
    hex: '#B8B9BB',
    values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CF', '\u25CF'],
    isMetallic: false,
  },
  {
    name: 'spec_feature_86',
    polestarCode: '727',
    volvoName: 'volvo_name_3',
    volvoCode: '727',
    hex: '#9A9B9D',
    values: ['\u25CB', '\u25CB', '\u25CB', '\u2014', '\u2014', '\u2014', '\u2014'],
    isMetallic: true,
  },
  {
    name: 'spec_feature_87',
    polestarCode: 'TBC',
    volvoName: 'volvo_name_4',
    volvoCode: '743',
    hex: '#B8A88A',
    values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB'],
    isMetallic: true,
    notes: 'spec_note_35',
  },
  {
    name: 'spec_feature_88',
    polestarCode: '736',
    volvoName: 'volvo_name_5',
    volvoCode: '736',
    hex: '#A09078',
    values: ['\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB', '\u25CB', '\u2014'],
    isMetallic: true,
    replacedBy: 'spec_feature_87',
  },
  {
    name: 'spec_feature_89',
    polestarCode: '728',
    volvoName: 'volvo_name_6',
    volvoCode: '728',
    hex: '#4A4B4D',
    values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u2014', '\u2014'],
    isMetallic: true,
  },
  {
    name: 'spec_feature_90',
    polestarCode: '747',
    volvoName: 'volvo_name_7',
    volvoCode: '747',
    hex: '#3D3E40',
    values: ['\u2014', '\u2014', '\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB'],
    isMetallic: true,
  },
  {
    name: 'spec_feature_91',
    polestarCode: '723',
    volvoName: 'volvo_name_8',
    volvoCode: '723',
    hex: '#1C2A3A',
    values: ['\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
    isMetallic: true,
  },
  {
    name: 'spec_feature_92',
    polestarCode: '019',
    volvoName: 'volvo_name_9',
    volvoCode: '019',
    hex: '#0A0A0A',
    values: ['\u25CF', '\u25CF', '\u25CF', '\u2014', '\u2014', '\u2014', '\u2014'],
    isMetallic: false,
  },
  {
    name: 'spec_feature_93',
    polestarCode: '717',
    volvoName: 'volvo_name_10',
    volvoCode: '717',
    hex: '#151515',
    values: ['\u2014', '\u2014', '\u2014', '\u25CB', '\u25CB', '\u25CB', '\u25CB'],
    isMetallic: true,
  },
];
