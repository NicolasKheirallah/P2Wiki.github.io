import { useState, useRef } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { ChevronDown, Info, Settings, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PrintableComponent {
  id: string;
  name: string;
  description: string;
  material: string; // Display string
  materialsList: string[]; // e.g. ['ASA', 'PETG']
  location: 'interior' | 'exterior' | 'mechanical';
  sourceFormat: 'STL' | 'STEP' | 'STL + STEP';
  link: string;
  linkLabel: string;
  // Slicer settings
  printTime: string;
  filamentWeight: string;
  infill: string;
  perimeters: number;
  orientation: string;
}

const printableComponents: PrintableComponent[] = [
  {
    id: 'cupholder-armrest',
    name: 'print_cupholderArmrestName',
    description: 'print_cupholderArmrestDesc',
    material: 'ASA / PETG',
    materialsList: ['ASA', 'PETG'],
    location: 'interior',
    sourceFormat: 'STL',
    link: 'https://www.printables.com/model/85125-polestar-2-cupholder-and-armrest',
    linkLabel: 'Printables: 85125',
    printTime: '4h 45m',
    filamentWeight: '130g',
    infill: '30% Gyroid',
    perimeters: 4,
    orientation: 'print_cupholderArmrestOrient',
  },
  {
    id: 'magsafe-mount',
    name: 'print_magsafeMountName',
    description: 'print_magsafeMountDesc',
    material: 'ASA / PC',
    materialsList: ['ASA', 'PC'],
    location: 'interior',
    sourceFormat: 'STL + STEP',
    link: 'https://www.thingiverse.com/thing:7271739',
    linkLabel: 'Thingiverse: 7271739',
    printTime: '2h 15m',
    filamentWeight: '65g',
    infill: '40% Gyroid',
    perimeters: 5,
    orientation: 'print_magsafeMountOrient',
  },
  {
    id: 'usb-shelf-tidy',
    name: 'print_usbShelfTidyName',
    description: 'print_usbShelfTidyDesc',
    material: 'ASA / PETG',
    materialsList: ['ASA', 'PETG'],
    location: 'interior',
    sourceFormat: 'STL',
    link: 'https://www.thingiverse.com/thing:6577352',
    linkLabel: 'Thingiverse: 6577352',
    printTime: '1h 50m',
    filamentWeight: '50g',
    infill: '15% Grid',
    perimeters: 3,
    orientation: 'print_usbShelfTidyOrient',
  },
  {
    id: 'charge-port-cover',
    name: 'print_chargePortCoverName',
    description: 'print_chargePortCoverDesc',
    material: 'ASA',
    materialsList: ['ASA'],
    location: 'exterior',
    sourceFormat: 'STL',
    link: 'https://www.printables.com/model/1482336-polestar-2-charge-snow-cover',
    linkLabel: 'Printables: 1482336',
    printTime: '3h 10m',
    filamentWeight: '95g',
    infill: '20% Gyroid',
    perimeters: 4,
    orientation: 'print_chargePortCoverOrient',
  },
  {
    id: 'speaker-adapters',
    name: 'print_speakerAdaptersName',
    description: 'print_speakerAdaptersDesc',
    material: 'PC / ASA',
    materialsList: ['PC', 'ASA'],
    location: 'mechanical',
    sourceFormat: 'STL + STEP',
    link: 'https://www.thingiverse.com/thing:6207821',
    linkLabel: 'Thingiverse: 6207821',
    printTime: '3h 30m',
    filamentWeight: '110g',
    infill: '50% Gyroid',
    perimeters: 6,
    orientation: 'print_speakerAdaptersOrient',
  },
  {
    id: 'key-fob-shell',
    name: 'print_keyFobShellName',
    description: 'print_keyFobShellDesc',
    material: 'PETG / ASA',
    materialsList: ['PETG', 'ASA'],
    location: 'interior',
    sourceFormat: 'STL + STEP',
    link: 'https://www.printables.com/model/426002-polestar-2-key-fob-shell',
    linkLabel: 'Printables: 426002',
    printTime: '1h 10m',
    filamentWeight: '15g',
    infill: '100% Solid',
    perimeters: 3,
    orientation: 'print_keyFobShellOrient',
  },
  {
    id: 'trunk-cargo-hooks',
    name: 'print_trunkCargoHooksName',
    description: 'print_trunkCargoHooksDesc',
    material: 'ASA / PC',
    materialsList: ['ASA', 'PC'],
    location: 'mechanical',
    sourceFormat: 'STL',
    link: 'https://www.thingiverse.com/thing:6074211',
    linkLabel: 'Thingiverse: 6074211',
    printTime: '1h 40m',
    filamentWeight: '45g',
    infill: '45% Gyroid',
    perimeters: 5,
    orientation: 'print_trunkCargoHooksOrient',
  },
  {
    id: 'console-storage-divider',
    name: 'print_consoleStorageDividerName',
    description: 'print_consoleStorageDividerDesc',
    material: 'ASA / PETG',
    materialsList: ['ASA', 'PETG'],
    location: 'interior',
    sourceFormat: 'STL',
    link: 'https://www.printables.com/model/294025-polestar-2-console-divider',
    linkLabel: 'Printables: 294025',
    printTime: '2h 30m',
    filamentWeight: '75g',
    infill: '20% Grid',
    perimeters: 3,
    orientation: 'print_consoleStorageDividerOrient',
  },
  {
    id: 'parcel-shelf-clips',
    name: 'print_parcelShelfClipsName',
    description: 'print_parcelShelfClipsDesc',
    material: 'PETG / ASA',
    materialsList: ['PETG', 'ASA'],
    location: 'mechanical',
    sourceFormat: 'STL + STEP',
    link: 'https://www.printables.com/model/612245-polestar-2-parcel-shelf-clip',
    linkLabel: 'Printables: 612245',
    printTime: '0h 40m',
    filamentWeight: '12g',
    infill: '35% Gyroid',
    perimeters: 4,
    orientation: 'print_parcelShelfClipsOrient',
  },
];

interface ReverseEngineeringTip {
  title: string;
  description: string;
}

const reverseEngineeringTips: ReverseEngineeringTip[] = [
  {
    title: 'print_revEngTip1Title',
    description: 'print_revEngTip1Desc',
  },
  {
    title: 'print_revEngTip2Title',
    description: 'print_revEngTip2Desc',
  },
  {
    title: 'print_revEngTip3Title',
    description: 'print_revEngTip3Desc',
  },
];

interface MaterialGuideline {
  name: string;
  description: string;
}

const materialGuidelines: MaterialGuideline[] = [
  {
    name: 'Acrylonitrile Styrene Acrylate (ASA)',
    description: 'print_matGuidelineAsaDesc',
  },
  {
    name: 'Polycarbonate (PC)',
    description: 'print_matGuidelinePcDesc',
  },
  {
    name: 'Thermoplastic Polyurethane (TPU)',
    description: 'print_matGuidelineTpuDesc',
  },
];

interface FilamentProperty {
  name: string;
  tg: string;
  uv: string;
  difficulty: string;
  useCase: string;
}

const filamentProperties: FilamentProperty[] = [
  { name: 'ASA', tg: '100°C', uv: 'print_uvExcellent', difficulty: 'print_diffHard', useCase: 'print_useCabinExterior' },
  { name: 'PC', tg: '145°C', uv: 'print_uvGood', difficulty: 'print_diffExpert', useCase: 'print_useStructuralSpeaker' },
  { name: 'PETG', tg: '75°C', uv: 'print_uvGood', difficulty: 'print_diffModerate', useCase: 'print_useGeneralCabin' },
  { name: 'TPU', tg: 'Flexible', uv: 'print_uvFair', difficulty: 'print_diffModerate', useCase: 'print_useGasketsCup' },
  { name: 'PLA', tg: '60°C', uv: 'print_uvPoor', difficulty: 'print_diffEasy', useCase: 'print_useFitTestProto' },
];

export default function PrintingFabrication() {
  const { t } = useLocale();

  // Filters state
  const [activeMaterial, setActiveMaterial] = useState('all');
  const [activeLocation, setActiveLocation] = useState('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Advisor State
  const [enclosure, setEnclosure] = useState<string | null>(null);
  const [bedTemp, setBedTemp] = useState<string | null>(null);
  const [partLoc, setPartLoc] = useState<string | null>(null);
  const [expandedWarping, setExpandedWarping] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Filter lists
  const materialsList = ['all', 'ASA', 'PETG', 'TPU', 'PC'];
  const locationsList = ['all', 'interior', 'exterior', 'mechanical'];

  // Filter components
  const filteredComponents = printableComponents.filter((comp) => {
    const matchesMaterial = activeMaterial === 'all' || comp.materialsList.includes(activeMaterial);
    const matchesLocation = activeLocation === 'all' || comp.location === activeLocation;
    return matchesMaterial && matchesLocation;
  });

  // Stagger reveal animation when filters change
  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.print-card');
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out', overwrite: true }
    );
  }, { scope: containerRef, dependencies: [activeMaterial, activeLocation] });

  const toggleRecipe = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const resetAdvisor = () => {
    setEnclosure(null);
    setBedTemp(null);
    setPartLoc(null);
  };

  // Advisor Recommendation Engine
  const getAdvisorRecommendation = () => {
    if (!enclosure || !bedTemp || !partLoc) return null;

    let filamentKey = '';
    let descriptionKey = '';

    if (partLoc === 'flexible') {
      filamentKey = 'print_recTPUName';
      descriptionKey = 'print_recTPUDesc';
    } else if (partLoc === 'exterior') {
      if (enclosure === 'yes' && bedTemp === 'high') {
        filamentKey = 'print_recASAExteriorName';
        descriptionKey = 'print_recASAExteriorDesc';
      } else {
        filamentKey = 'print_recPETGExteriorName';
        descriptionKey = 'print_recPETGExteriorDesc';
      }
    } else if (partLoc === 'interior') {
      if (enclosure === 'yes' && bedTemp === 'high') {
        filamentKey = 'print_recASAInteriorName';
        descriptionKey = 'print_recASAInteriorDesc';
      } else {
        filamentKey = 'print_recPETGInteriorName';
        descriptionKey = 'print_recPETGInteriorDesc';
      }
    } else if (partLoc === 'mechanical') {
      if (enclosure === 'yes' && bedTemp === 'high') {
        filamentKey = 'print_recPCMechanicalName';
        descriptionKey = 'print_recPCMechanicalDesc';
      } else {
        filamentKey = 'print_recPETGMechName';
        descriptionKey = 'print_recPETGMechDesc';
      }
    }

    return (
      <div className="mt-4 p-4 border border-[var(--ps-gold)]/40 bg-[var(--ps-gold)]/5 rounded-none relative">
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--ps-gold)]/60" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[var(--ps-gold)]/60" />
        
        <h4 className="text-[12px] uppercase tracking-wider font-semibold text-[var(--ps-gold)] mb-1">
          {t('print_recFilamentTitle')}
        </h4>
        <p className="text-[14px] font-medium text-[var(--ps-text)] mb-2">
          {t(filamentKey)}
        </p>
        <p className="text-[12px] leading-relaxed text-[var(--ps-text-secondary)]">
          {t(descriptionKey)}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-10" ref={containerRef}>
      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
        {t('printingDesc')}
      </p>

      {/* Interactive Filament Advisor wizard */}
      <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-5 rounded-none space-y-4 relative">
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--ps-border)]" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--ps-border)]" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info size={16} className="text-[var(--ps-gold)]" />
            <h3 className="text-[14px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text)' }}>
              {t('print_advisorTitle')}
            </h3>
          </div>
          {(enclosure || bedTemp || partLoc) && (
            <button
              onClick={resetAdvisor}
              className="text-[11px] uppercase tracking-wider font-medium text-[var(--ps-text-secondary)] hover:text-[var(--ps-text)] transition-colors flex items-center gap-1"
            >
              <RotateCcw size={12} />
              {t('print_reset')}
            </button>
          )}
        </div>

        <p className="text-[12px] text-[var(--ps-text-secondary)] leading-relaxed">
          {t('print_advisorDesc')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Question 1: Enclosure */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-medium block">
              1. {t('print_question1Label')}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setEnclosure('yes')}
                className={`flex-1 py-1.5 px-3 border text-[12px] font-normal transition-colors rounded-none ${
                  enclosure === 'yes'
                    ? 'border-[var(--ps-text)] bg-[var(--ps-text)] text-[var(--ps-bg)]'
                    : 'border-[var(--ps-border)] bg-transparent text-[var(--ps-text-secondary)] hover:border-[var(--ps-text-secondary)]'
                }`}
              >
                {t('print_yesEnclosed')}
              </button>
              <button
                onClick={() => setEnclosure('no')}
                className={`flex-1 py-1.5 px-3 border text-[12px] font-normal transition-colors rounded-none ${
                  enclosure === 'no'
                    ? 'border-[var(--ps-text)] bg-[var(--ps-text)] text-[var(--ps-bg)]'
                    : 'border-[var(--ps-border)] bg-transparent text-[var(--ps-text-secondary)] hover:border-[var(--ps-text-secondary)]'
                }`}
              >
                {t('print_noOpenFrame')}
              </button>
            </div>
          </div>

          {/* Question 2: Bed Temp */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-medium block">
              2. {t('print_question2Label')}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setBedTemp('high')}
                className={`flex-1 py-1.5 px-3 border text-[12px] font-normal transition-colors rounded-none ${
                  bedTemp === 'high'
                    ? 'border-[var(--ps-text)] bg-[var(--ps-text)] text-[var(--ps-bg)]'
                    : 'border-[var(--ps-border)] bg-transparent text-[var(--ps-text-secondary)] hover:border-[var(--ps-text-secondary)]'
                }`}
              >
                {t('print_highTemp')}
              </button>
              <button
                onClick={() => setBedTemp('low')}
                className={`flex-1 py-1.5 px-3 border text-[12px] font-normal transition-colors rounded-none ${
                  bedTemp === 'low'
                    ? 'border-[var(--ps-text)] bg-[var(--ps-text)] text-[var(--ps-bg)]'
                    : 'border-[var(--ps-border)] bg-transparent text-[var(--ps-text-secondary)] hover:border-[var(--ps-text-secondary)]'
                }`}
              >
                {t('print_lowTemp')}
              </button>
            </div>
          </div>

          {/* Question 3: Part Location */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-medium block">
              3. {t('print_question3Label')}
            </label>
            <select
              value={partLoc || ''}
              onChange={(e) => setPartLoc(e.target.value || null)}
              className="w-full py-1.5 px-3 border border-[var(--ps-border)] bg-transparent text-[12px] text-[var(--ps-text)] outline-none rounded-none focus:border-[var(--ps-text)]"
            >
              <option value="" disabled style={{ backgroundColor: 'var(--ps-bg)' }}>
                {t('print_selectOption')}
              </option>
              <option value="interior" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {t('print_optionInterior')}
              </option>
              <option value="exterior" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {t('print_optionExterior')}
              </option>
              <option value="mechanical" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {t('print_optionMechanical')}
              </option>
              <option value="flexible" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {t('print_optionFlexible')}
              </option>
            </select>
          </div>
        </div>

        {/* Display recommendation */}
        {getAdvisorRecommendation()}
      </div>

      {/* Material Guidelines */}
      <div className="space-y-6">
        <div>
          <h3
            className="text-[16px] font-medium mb-4"
            style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
          >
            {t('materialGuidelines')}
          </h3>
          <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ps-text-secondary)' }}>
            {t('materialWarning')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {materialGuidelines.map((mat) => (
              <div
                key={mat.name}
                className="rounded-none p-5 border border-[var(--ps-border)] relative overflow-hidden"
                style={{ backgroundColor: 'var(--ps-bg-secondary)/10' }}
              >
                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--ps-border)] opacity-35" />
                <h4 className="text-[13px] font-semibold mb-2" style={{ color: 'var(--ps-text)' }}>
                  {mat.name}
                </h4>
                <p className="text-[12px] leading-relaxed text-[var(--ps-text-secondary)]">
                  {t(mat.description)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Warping Troubleshooting sub-panel */}
        <div className="border border-[var(--ps-border)] rounded-none overflow-hidden bg-[var(--ps-bg)]">
          <button
            onClick={() => setExpandedWarping(!expandedWarping)}
            className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[var(--ps-bg-secondary)]/25 transition-colors duration-150 rounded-none cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-[var(--ps-gold)]" />
              <h4 className="text-[13.5px] font-medium tracking-wide uppercase" style={{ color: 'var(--ps-text)' }}>
                {t('print_warpingTitle')}
              </h4>
            </div>
            <ChevronDown
              size={16}
              className="text-[var(--ps-text-secondary)] transition-transform duration-250"
              style={{
                transform: expandedWarping ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
          
          {expandedWarping && (
            <div className="border-t border-[var(--ps-border-light)] p-5 bg-[var(--ps-bg-secondary)]/5 space-y-4 text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              <div className="space-y-1">
                <span className="font-semibold text-[var(--ps-text)] block">
                  1. {t('print_warpStep1Title')}
                </span>
                <p>
                  {t('print_warpStep1Desc')}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-[var(--ps-text)] block">
                  2. {t('print_warpStep2Title')}
                </span>
                <p>
                  {t('print_warpStep2Desc')}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-[var(--ps-text)] block">
                  3. {t('print_warpStep3Title')}
                </span>
                <p>
                  {t('print_warpStep3Desc')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filament Properties Matrix */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('print_propsMatrixTitle')}
        </h3>
        <div className="overflow-x-auto scrollbar-hide border border-[var(--ps-border)] bg-[var(--ps-bg)] rounded-none">
          <table className="w-full min-w-[750px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--ps-border)]" style={{ backgroundColor: 'var(--ps-bg-secondary)' }}>
                <th className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-tertiary)] w-[100px]">{t('print_colFilament')}</th>
                <th className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-tertiary)] w-[110px]">{t('print_colGlassTemp')}</th>
                <th className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-tertiary)] w-[130px]">{t('print_colUvResist')}</th>
                <th className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-tertiary)] w-[120px]">{t('print_colPrintDiff')}</th>
                <th className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-tertiary)]">{t('print_colUseCase')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ps-border-light)] text-[12.5px]">
              {filamentProperties.map((f) => (
                <tr key={f.name} className="hover:bg-[var(--ps-bg-secondary)]/30 transition-colors">
                  <td className="p-3 font-semibold text-[var(--ps-text)]">{f.name}</td>
                  <td className="p-3 text-[var(--ps-text-secondary)]">{f.tg}</td>
                  <td className="p-3 text-[var(--ps-text-secondary)]">{t(f.uv)}</td>
                  <td className="p-3">
                    <span className={`px-1.5 py-0.5 border text-[10px] font-medium tracking-wide uppercase rounded-none ${
                      f.name === 'PLA'
                        ? 'border-[var(--ps-success)]/40 text-[var(--ps-success)] bg-[var(--ps-success)]/5'
                        : f.name === 'PC'
                        ? 'border-[var(--ps-error)]/40 text-[var(--ps-error)] bg-[var(--ps-error)]/5'
                        : 'border-[var(--ps-gold)]/40 text-[var(--ps-gold)] bg-[var(--ps-gold)]/5'
                    }`}>
                      {t(f.difficulty)}
                    </span>
                  </td>
                  <td className="p-3 text-[var(--ps-text-secondary)]">{t(f.useCase)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Component Repository */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3
            className="text-[16px] font-medium"
            style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
          >
            {t('printableRepository')}
          </h3>

          {/* Filtering panels */}
          <div className="flex flex-wrap gap-3">
            {/* Filament filter selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[var(--ps-text-tertiary)] uppercase tracking-wider font-semibold mr-1">
                {t('print_materialFilterLabel')}
              </span>
              <div className="flex gap-1">
                {materialsList.map((m) => {
                  const isActive = activeMaterial === m;
                  const label = m === 'all' ? t('print_all') : m;
                  return (
                    <button
                      key={m}
                      onClick={() => setActiveMaterial(m)}
                      className="px-2 py-0.5 border text-[10px] uppercase font-normal transition-colors rounded-none"
                      style={{
                        borderColor: isActive ? 'var(--ps-text)' : 'var(--ps-border)',
                        backgroundColor: isActive ? 'var(--ps-pill-active-bg)' : 'transparent',
                        color: isActive ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location filter selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[var(--ps-text-tertiary)] uppercase tracking-wider font-semibold mr-1">
                {t('print_locationFilterLabel')}
              </span>
              <div className="flex gap-1">
                {locationsList.map((loc) => {
                  const isActive = activeLocation === loc;
                  const label =
                    loc === 'all'
                      ? t('print_all')
                      : loc === 'interior'
                      ? t('print_locInterior')
                      : loc === 'exterior'
                      ? t('print_locExterior')
                      : t('print_locMechanical');

                  return (
                    <button
                      key={loc}
                      onClick={() => setActiveLocation(loc)}
                      className="px-2 py-0.5 border text-[10px] uppercase font-normal transition-colors rounded-none"
                      style={{
                        borderColor: isActive ? 'var(--ps-text)' : 'var(--ps-border)',
                        backgroundColor: isActive ? 'var(--ps-pill-active-bg)' : 'transparent',
                        color: isActive ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComponents.length === 0 ? (
            <div className="col-span-full text-center py-16 text-[14px]" style={{ color: 'var(--ps-text-tertiary)' }}>
              {t('print_noMatchFilters')}
            </div>
          ) : (
            filteredComponents.map((comp) => {
              const isExpanded = expandedIds.has(comp.id);
              const name = t(comp.name);
              const desc = t(comp.description);
              const orient = t(comp.orientation);

              // Format location badge
              const locationLabel =
                comp.location === 'interior'
                  ? t('print_locBadgeInterior')
                  : comp.location === 'exterior'
                  ? t('print_locBadgeExterior')
                  : t('print_locBadgeMechanical');

              return (
                <div
                  key={comp.id}
                  className="print-card border border-[var(--ps-border)] bg-[var(--ps-bg)] rounded-none flex flex-col justify-between transition-colors duration-150 p-5 space-y-4"
                >
                  <div className="space-y-2">
                    {/* Header: Name and badges */}
                    <div className="space-y-1">
                      <h4 className="text-[14px] font-semibold text-[var(--ps-text)] leading-snug">
                        {name}
                      </h4>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {comp.materialsList.map((m) => (
                          <span
                            key={m}
                            className="px-1.5 py-0.5 border border-[var(--ps-border)] bg-[var(--ps-bg-secondary)] text-[9px] tracking-wider uppercase font-semibold text-[var(--ps-text-secondary)] rounded-none"
                          >
                            {m}
                          </span>
                        ))}
                        <span className="px-1.5 py-0.5 border border-[var(--ps-border)] bg-[var(--ps-bg-secondary)] text-[9px] tracking-wider uppercase font-semibold text-[var(--ps-text-tertiary)] rounded-none">
                          {locationLabel}
                        </span>
                        {/* CAD format badge */}
                        <span className="px-1.5 py-0.5 border border-[var(--ps-gold)]/40 bg-[var(--ps-gold)]/5 text-[9px] tracking-wider uppercase font-semibold text-[var(--ps-gold)] rounded-none">
                          {comp.sourceFormat}
                        </span>
                      </div>
                    </div>

                    <p className="text-[12px] text-[var(--ps-text-secondary)] leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Slicer recipe drawer */}
                  <div className="space-y-2 border-t border-[var(--ps-border-light)] pt-3">
                    <button
                      onClick={() => toggleRecipe(comp.id)}
                      className="flex items-center justify-between w-full text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-secondary)] hover:text-[var(--ps-text)] transition-colors rounded-none"
                    >
                      <span className="flex items-center gap-1.5">
                        <Settings size={12} />
                        {t('print_slicerRecipe')}
                      </span>
                      <ChevronDown
                        size={12}
                        className="transition-transform duration-200"
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>

                    {isExpanded && (
                      <div className="space-y-2 text-[11px] leading-relaxed text-[var(--ps-text-secondary)] bg-[var(--ps-bg-secondary)]/30 p-2.5 border border-[var(--ps-border-light)] rounded-none">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                          <div>
                            <span className="font-semibold text-[var(--ps-text-tertiary)]">
                              {t('print_printTime')}
                            </span>{' '}
                            {comp.printTime}
                          </div>
                          <div>
                            <span className="font-semibold text-[var(--ps-text-tertiary)]">
                              {t('print_weight')}
                            </span>{' '}
                            {comp.filamentWeight}
                          </div>
                          <div>
                            <span className="font-semibold text-[var(--ps-text-tertiary)]">
                              {t('print_infill')}
                            </span>{' '}
                            {comp.infill}
                          </div>
                          <div>
                            <span className="font-semibold text-[var(--ps-text-tertiary)]">
                              {t('print_walls')}
                            </span>{' '}
                            {comp.perimeters} {t('print_loops')}
                          </div>
                        </div>
                        <div className="border-t border-[var(--ps-border-light)] pt-1.5 mt-1 text-[10px]">
                          <span className="font-semibold text-[var(--ps-text-tertiary)] uppercase tracking-wider block mb-0.5">
                            {t('print_orientGuideline')}
                          </span>
                          {orient}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* STL Link button */}
                  <a
                    href={comp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2 border border-[var(--ps-text)] bg-transparent hover:bg-[var(--ps-pill-active-bg)] text-[var(--ps-text)] hover:text-[var(--ps-pill-active-text)] text-[12px] transition-all duration-150 rounded-none flex items-center justify-center gap-1.5"
                  >
                    <span>{comp.linkLabel}</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Reverse Engineering tips */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('reverseEngineering')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reverseEngineeringTips.map((tip) => (
            <div
              key={tip.title}
              className="rounded-none p-5 border border-[var(--ps-border)] relative overflow-hidden"
              style={{ backgroundColor: 'var(--ps-bg-secondary)' }}
            >
              <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--ps-border)] opacity-35" />
              <h4 className="text-[13px] font-semibold mb-2" style={{ color: 'var(--ps-text)' }}>
                {t(tip.title)}
              </h4>
              <p className="text-[12px] leading-relaxed text-[var(--ps-text-secondary)]">
                {t(tip.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
