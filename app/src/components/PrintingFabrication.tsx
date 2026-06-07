import { useState, useRef } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { ChevronDown, Info, Settings, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PrintableComponent {
  id: string;
  name: Record<'en' | 'sv', string>;
  description: Record<'en' | 'sv', string>;
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
  orientation: Record<'en' | 'sv', string>;
}

const printableComponents: PrintableComponent[] = [
  {
    id: 'cupholder-armrest',
    name: {
      en: 'Cupholder & Armrest Extension',
      sv: 'Mugghållare & armstödsförlängning',
    },
    description: {
      en: 'Double cupholder supporting 330 ml cans and an elevated armrest extension.',
      sv: 'Dubbel mugghållare med stöd för 330 ml-burkar samt en upphöjd armstödsförlängning.',
    },
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
    orientation: {
      en: 'Print face down to avoid supports on the main armrest segment.',
      sv: 'Skriv ut med ovansidan nedåt mot byggplattan för att undvika stödmaterial (supports) på armstödsdelen.',
    },
  },
  {
    id: 'magsafe-mount',
    name: {
      en: 'MagSafe Phone Mount',
      sv: 'MagSafe-mobilfäste',
    },
    description: {
      en: 'Bracket fitting around the center screen with interchangeable phone holders.',
      sv: 'Konsol som fästs runt mittskärmen med utbytbara mobilhållare.',
    },
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
    orientation: {
      en: 'Print on its side to maximize layer line strength around the screen clip area.',
      sv: 'Skriv ut liggande på sidan för åstadkomma maximal lagerhållfasthet runt skärmklämman.',
    },
  },
  {
    id: 'usb-shelf-tidy',
    name: {
      en: 'USB Shelf Tidy',
      sv: 'USB-facksorganiserare',
    },
    description: {
      en: 'Shelf insert for the USB port area to reclaim space, featuring cable pass-through notches.',
      sv: 'Hyllinsats för USB-uttaget för att optimera förvaringsutrymmet, med urspårningar för kabelgenomföring.',
    },
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
    orientation: {
      en: 'Print flat on the bed. No support material required.',
      sv: 'Skriv ut liggande platt mot byggplattan. Inget stödmaterial behövs.',
    },
  },
  {
    id: 'charge-port-cover',
    name: {
      en: 'Charge Port Snow Cover',
      sv: 'Snöskydd för laddinlopp',
    },
    description: {
      en: 'Protective cover fitting precisely over the charging area to prevent snow and debris accumulation.',
      sv: 'Skyddskåpa med exakt passform över ladduttaget för att förhindra ansamling av snö, is och smuts.',
    },
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
    orientation: {
      en: 'Print with the weather seal face flat against the build plate.',
      sv: 'Skriv ut med tätningssidan platt mot byggplattan.',
    },
  },
  {
    id: 'speaker-adapters',
    name: {
      en: 'Speaker Adapters',
      sv: 'Högtalaradaptrar',
    },
    description: {
      en: 'Aftermarket speaker adapters compatible with the Polestar 2 and Volvo XC40.',
      sv: 'Eftermarknads-högtalaradaptrar kompatibla med Polestar 2 och Volvo XC40.',
    },
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
    orientation: {
      en: 'Print flat. Enable brim if printing with PC to prevent corner warping.',
      sv: 'Skriv ut platt. Aktivera kantstöd (brim) vid utskrift i PC för att förhindra kantresning (warping).',
    },
  },
  {
    id: 'key-fob-shell',
    name: {
      en: 'Key Fob Replacement Shell',
      sv: 'Ersättningsskal för nyckel',
    },
    description: {
      en: 'Custom lightweight and textured replacement shells for the bulky OEM key fob, featuring exact fit tolerances.',
      sv: 'Eget, lättviktigt och texturerat ersättningsskal med exakt passform för den klumpiga originalnyckeln.',
    },
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
    orientation: {
      en: 'Print flat on the main outer face; use a textured bed sheet for a high-end matte OEM-like finish.',
      sv: 'Skriv ut platt med den yttre huvudytan mot byggplattan. Använd en texturerad byggplatta för att få en matt yta som efterliknar originalutförandet.',
    },
  },
  {
    id: 'trunk-cargo-hooks',
    name: {
      en: 'Trunk Cargo Bag Hooks',
      sv: 'Kassekrokar till bagageutrymme',
    },
    description: {
      en: 'Heavy-duty clip-on bag hanger hooks designed to slide into the trunk side liner slots to secure bags.',
      sv: 'Kraftiga hängkrokar som skjuts in i spåren på bagageutrymmets sidopaneler för att hålla kassar på plats.',
    },
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
    orientation: {
      en: 'Print flat on its side so the layer lines run parallel to the hook curve for maximum load capacity.',
      sv: 'Skriv ut liggande på sidan så att lagerlinjerna löper parallellt med krokens krökning för maximal draghållfasthet.',
    },
  },
  {
    id: 'console-storage-divider',
    name: {
      en: 'Center Console Storage Divider',
      sv: 'Fackavdelare för mittkonsol',
    },
    description: {
      en: 'Drop-in slot divider insert to partition the deep center armrest compartment for cards, sunglasses, and keys.',
      sv: 'Mellanvägg som sticks ned i mittkonsolen för att dela upp det djupa armstödsfacket för kort, solglasögon och nycklar.',
    },
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
    orientation: {
      en: 'Print flat on its bottom face. No support material required.',
      sv: 'Skriv ut platt med bottenytan nedåt. Inget stödmaterial behövs.',
    },
  },
  {
    id: 'parcel-shelf-clips',
    name: {
      en: 'Parcel Shelf String Clips',
      sv: 'Fästklämmor till hatthyllans snören',
    },
    description: {
      en: 'High-tolerance replacements for the fragile plastic string clips that secure the rear parcel cargo shelf.',
      sv: 'Ersättningsklämmor med hög precision för hatthyllans ömtåliga originalklämmor i plast.',
    },
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
    orientation: {
      en: 'Print vertically with the slot facing upwards. Enable a small brim to stabilize the print.',
      sv: 'Skriv ut stående (vertikalt) med spåret uppåt. Aktivera en liten brim (kantstöd) för att stabilisera utskriften.',
    },
  },
];

const reverseEngineeringTips = [
  {
    title: {
      en: 'Dimensional Extraction',
      sv: 'Måttbestämning',
    },
    description: {
      en: 'Utilize photogrammetry or reference scaling from module photographs to build initial CAD wireframes for custom trim.',
      sv: 'Använd fotogrammetri eller skalning utifrån referensbilder för att bygga upp grundläggande CAD-trådmodeller för anpassade interiörpaneler.',
    },
  },
  {
    title: {
      en: 'OEM Integration',
      sv: 'OEM-integration',
    },
    description: {
      en: 'Apply standardized dimensions for replicating factory mounting clips to secure custom components without permanent modifications.',
      sv: 'Använd standardiserade mått för att replikera originaldelarnas monteringsklämmor, så att egentillverkade delar kan monteras utan att göra permanenta ingrepp på bilen.',
    },
  },
  {
    title: {
      en: 'Material Tolerances',
      sv: 'Materialtoleranser',
    },
    description: {
      en: 'Apply scaling compensation factors within the slicer or CAD software to account for material shrinkage when printing functional engineering filaments like PC or ASA.',
      sv: 'Kompensera för materialkrympning i slicern eller CAD-programvaran vid utskrift i funktionella konstruktionsplaster (tekniska filament) som PC eller ASA.',
    },
  },
];

const materialGuidelines = [
  {
    name: 'Acrylonitrile Styrene Acrylate (ASA)',
    description: {
      en: 'Recommended for interior trim and exterior components. Provides high UV resistance, thermal stability, and a matte finish suitable for matching OEM aesthetics.',
      sv: 'Rekommenderas för interiör- och exteriördetaljer. Ger utmärkt UV- och väderbeständighet, hög formstabilitet vid värme samt en matt yta som matchar bilens originalplast (OEM) perfekt.',
    },
  },
  {
    name: 'Polycarbonate (PC)',
    description: {
      en: 'Required for structural components, parts exposed to high mechanical stress, or extreme temperature environments.',
      sv: 'Krävs för strukturella komponenter samt delar som utsätts för hög mekanisk belastning eller extrema temperaturer.',
    },
  },
  {
    name: 'Thermoplastic Polyurethane (TPU)',
    description: {
      en: 'Optimal for cup holder inserts, gaskets, or vibration-dampening mounts.',
      sv: 'Idealiskt för mugghållarinsatser, packningar eller vibrationsdämpande fästen.',
    },
  },
];

const filamentProperties = [
  { name: 'ASA', tg: '100°C', uv: { en: 'Excellent', sv: 'Utmärkt' }, difficulty: { en: 'Hard', sv: 'Svår' }, useCase: { en: 'Cabin & Exterior Panels', sv: 'Kupé- & exteriörpaneler' } },
  { name: 'PC', tg: '145°C', uv: { en: 'Good', sv: 'Bra' }, difficulty: { en: 'Expert', sv: 'Avancerad' }, useCase: { en: 'Structural & Speaker Adapters', sv: 'Strukturella delar & högtalaradaptrar' } },
  { name: 'PETG', tg: '75°C', uv: { en: 'Good', sv: 'Bra' }, difficulty: { en: 'Moderate', sv: 'Måttlig' }, useCase: { en: 'General Cabin Accessories', sv: 'Allmänna interiörtillbehör' } },
  { name: 'TPU', tg: 'Flexible', uv: { en: 'Fair', sv: 'Medelmåttig' }, difficulty: { en: 'Moderate', sv: 'Måttlig' }, useCase: { en: 'Gaskets & Cup Holder Inserts', sv: 'Packningar & mugghållarinsatser' } },
  { name: 'PLA', tg: '60°C', uv: { en: 'Poor', sv: 'Dålig' }, difficulty: { en: 'Easy', sv: 'Enkel' }, useCase: { en: 'Fit Testing & Prototypes Only', sv: 'Endast för testpassning & prototyper' } },
];

export default function PrintingFabrication() {
  const { locale, t } = useLocale();
  const isSv = locale === 'sv';

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

    let filament = '';
    let description = '';

    if (partLoc === 'flexible') {
      filament = 'TPU (Thermoplastic Polyurethane)';
      description = isSv
        ? 'TPU är idealiskt för flexibla eller vibrationsdämpande delar (t.ex. mugghållarinsatser eller packningar). Det kan enkelt skrivas ut på skrivare utan inbyggnad eftersom materialet krymper minimalt.'
        : 'TPU is ideal for flexible, vibration-dampening components like cup holders or gaskets. It is easy to print on open-frame printers as it has very low shrinkage.';
    } else if (partLoc === 'exterior') {
      if (enclosure === 'yes' && bedTemp === 'high') {
        filament = 'ASA (Acrylonitrile Styrene Acrylate)';
        description = isSv
          ? 'ASA är det bästa valet för exteriöra delar. Det har utmärkt UV- och väderbeständighet samt hög temperaturtålighet, men kräver inbyggnad (kabin) och hög byggplattetemperatur (100 °C+) för att förhindra kantresning (warping).'
          : 'ASA is the best choice for exterior parts. It features outstanding UV/weather resistance and high thermal limits, but requires a closed enclosure and high bed temperature (100°C+) to prevent warping.';
      } else {
        filament = 'PETG (with UV/Weather Clear Coat)';
        description = isSv
          ? 'Eftersom du saknar inbyggnad eller hög byggplattetemperatur är PETG det säkraste valet för exteriördelar. Det har ett hyfsat inbyggt UV-skydd, men vi rekommenderar att du sprayar den färdiga delen med ett UV-skyddande klarlack för längre hållbarhet.'
          : 'Since you lack an enclosure or high bed temp, PETG is the safest choice for exterior parts. It has decent natural UV resistance, but we recommend spraying the finished part with a UV-blocking clear coat for longevity.';
      }
    } else if (partLoc === 'interior') {
      if (enclosure === 'yes' && bedTemp === 'high') {
        filament = 'ASA';
        description = isSv
          ? 'ASA rekommenderas starkt för kupépaneler. Temperaturen inuti en parkerad bil i direkt solljus kan nå 70 °C, vilket får PLA att mjukna och deformeras. ASA tål denna värme och dess matta yta matchar bilens originalplast (OEM) perfekt.'
          : 'ASA is highly recommended for cabin panels. Temperatures inside a parked cabin in direct sun can exceed 70°C, causing PLA to warp. ASA withstands this heat and matches the matte OEM plastic texture.';
      } else {
        filament = 'PETG';
        description = isSv
          ? 'Utan inbyggnad är PETG det bästa valet för interiördelar. Det tål temperaturer upp till 75 °C, vilket är tillräckligt för delar som inte utsätts för direkt solljus på instrumentbrädan. Undvik helt att använda vanlig PLA i kupén.'
          : 'Without an enclosure, PETG is the best choice for cabin interior parts. It withstands up to 75°C, which is sufficient for parts not in direct dashboard sunlight. Avoid standard PLA inside the cabin.';
      }
    } else if (partLoc === 'mechanical') {
      if (enclosure === 'yes' && bedTemp === 'high') {
        filament = 'Polycarbonate (PC)';
        description = isSv
          ? 'Polykarbonat (PC) ger extrem styrka, mekanisk styvhet och mycket hög temperaturbeständighet (110 °C+). Perfekt för exempelvis högtalaradaptrar. Kräver hög munstyckstemperatur (270 °C+) och uppvärmd/stängd byggkammare.'
          : 'Polycarbonate (PC) provides extreme strength, mechanical stiffness, and very high thermal resistance (110°C+). Ideal for speaker adapters. Requires hot nozzles (270°C+) and a heated chamber.';
      } else {
        filament = 'PETG (Heavy Perimeters)';
        description = isSv
          ? 'För mekaniska delar utan inbyggnad rekommenderas utskrift i PETG med extra många väggar (5–6 perimetrar) och minst 40 % infill (fyllnadsgrad). Detta ger god seghet och slagtålighet, vilket är betydligt starkare än PLA.'
          : 'For mechanical parts without an enclosure, print with PETG using extra perimeters (5-6 walls) and 40%+ infill. This provides great impact resistance and is significantly stronger than PLA.';
      }
    }

    return (
      <div className="mt-4 p-4 border border-[var(--ps-gold)]/40 bg-[var(--ps-gold)]/5 rounded-none relative">
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--ps-gold)]/60" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[var(--ps-gold)]/60" />
        
        <h4 className="text-[12px] uppercase tracking-wider font-semibold text-[var(--ps-gold)] mb-1">
          {isSv ? 'Rekommenderat filament' : 'Recommended Filament'}
        </h4>
        <p className="text-[14px] font-medium text-[var(--ps-text)] mb-2">
          {filament}
        </p>
        <p className="text-[12px] leading-relaxed text-[var(--ps-text-secondary)]">
          {description}
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
              {isSv ? 'Filamentrådgivare för 3D-skrivare' : '3D Printer Filament Advisor'}
            </h3>
          </div>
          {(enclosure || bedTemp || partLoc) && (
            <button
              onClick={resetAdvisor}
              className="text-[11px] uppercase tracking-wider font-medium text-[var(--ps-text-secondary)] hover:text-[var(--ps-text)] transition-colors flex items-center gap-1"
            >
              <RotateCcw size={12} />
              {isSv ? 'Återställ' : 'Reset'}
            </button>
          )}
        </div>

        <p className="text-[12px] text-[var(--ps-text-secondary)] leading-relaxed">
          {isSv
            ? 'Svara på tre frågor om din utrustning och ditt projekt för att få en skräddarsydd materialrekommendation.'
            : 'Answer three quick questions about your printer setup and project to find the correct printing material.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Question 1: Enclosure */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-medium block">
              1. {isSv ? 'Inbyggnad / Kabin?' : 'Enclosure / Chamber?'}
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
                {isSv ? 'Ja (Stängd/uppvärmd)' : 'Yes (Enclosed/Vented)'}
              </button>
              <button
                onClick={() => setEnclosure('no')}
                className={`flex-1 py-1.5 px-3 border text-[12px] font-normal transition-colors rounded-none ${
                  enclosure === 'no'
                    ? 'border-[var(--ps-text)] bg-[var(--ps-text)] text-[var(--ps-bg)]'
                    : 'border-[var(--ps-border)] bg-transparent text-[var(--ps-text-secondary)] hover:border-[var(--ps-text-secondary)]'
                }`}
              >
                {isSv ? 'Nej (Öppen ram)' : 'No (Open Frame)'}
              </button>
            </div>
          </div>

          {/* Question 2: Bed Temp */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-medium block">
              2. {isSv ? 'Max temperatur för byggplatta?' : 'Max Bed Temperature?'}
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
                {isSv ? '≥ 100°C' : '≥ 100°C'}
              </button>
              <button
                onClick={() => setBedTemp('low')}
                className={`flex-1 py-1.5 px-3 border text-[12px] font-normal transition-colors rounded-none ${
                  bedTemp === 'low'
                    ? 'border-[var(--ps-text)] bg-[var(--ps-text)] text-[var(--ps-bg)]'
                    : 'border-[var(--ps-border)] bg-transparent text-[var(--ps-text-secondary)] hover:border-[var(--ps-text-secondary)]'
                }`}
              >
                {isSv ? '< 100°C' : '< 100°C'}
              </button>
            </div>
          </div>

          {/* Question 3: Part Location */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-medium block">
              3. {isSv ? 'Delens placering/funktion?' : 'Part Function/Location?'}
            </label>
            <select
              value={partLoc || ''}
              onChange={(e) => setPartLoc(e.target.value || null)}
              className="w-full py-1.5 px-3 border border-[var(--ps-border)] bg-transparent text-[12px] text-[var(--ps-text)] outline-none rounded-none focus:border-[var(--ps-text)]"
            >
              <option value="" disabled style={{ backgroundColor: 'var(--ps-bg)' }}>
                {isSv ? 'Välj alternativ...' : 'Select option...'}
              </option>
              <option value="interior" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {isSv ? 'Kupéinteriör (Värmebeständighet)' : 'Cabin Interior (Heat)'}
              </option>
              <option value="exterior" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {isSv ? 'Exteriör (UV- & väderbeständighet)' : 'Exterior (UV/Weather)'}
              </option>
              <option value="mechanical" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {isSv ? 'Mekanisk del (Hög hållfasthet)' : 'Mechanical / High Strength'}
              </option>
              <option value="flexible" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {isSv ? 'Flexibel del (Mugghållare, packningar)' : 'Flexible / Cup Inserts / Gaskets'}
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
                  {isSv ? mat.description.sv : mat.description.en}
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
                {isSv ? 'Felsökning: Kantresning och vidhäftning (ASA/PC)' : 'Troubleshooting Warping & Bed Adhesion (ASA/PC)'}
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
                  1. {isSv ? 'Förvärm byggkammaren' : 'Preheat the Build Chamber'}
                </span>
                <p>
                  {isSv
                    ? 'Innan du påbörjar en utskrift i ASA eller PC, slå på byggplattan på 100 °C–110 °C och låt skrivaren stå stängd i 15–20 minuter. Detta värmer upp luften i byggkammaren, vilket drastiskt minskar de termiska spänningar som annars gör att delens hörn slår sig.'
                    : 'Before printing ASA or PC, turn your heated bed to 100°C–110°C and let the enclosed printer sit idle for 15–20 minutes. This preheats the ambient chamber air, drastically reducing thermal shock stresses that pull corners off the bed.'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-[var(--ps-text)] block">
                  2. {isSv ? 'Använd lämpligt lim på byggplattan' : 'Select Appropriate Bed Adhesives'}
                </span>
                <p>
                  {isSv
                    ? 'Filament som krymper mycket kräver god vidhäftning. Applicera speciallim (såsom Magigoo, ABS-slurry eller vanligt limstift) på en ren, texturerad PEI-platta. Detta skapar den kemiska bindning som krävs för att hålla nere hörnen på modellen.'
                    : 'High-shrinkage filaments require active adhesion. Apply specialized adhesive (such as Magigoo, ABS juice/slurry, or standard glue stick) onto a clean textured PEI plate. This provides the chemical bond necessary to lock down warping corners.'}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-[var(--ps-text)] block">
                  3. {isSv ? 'Aktivera dragsköld (draft shield) i slicern' : 'Enable Slicer Draft Shielding'}
                </span>
                <p>
                  {isSv
                    ? 'Om din skrivare bara är delvis inbyggd kan du aktivera funktionen "Draft Shield" (dragsköld) i din slicer. Detta skriver ut en skyddande enväggig sköld runt din modell, vilket förhindrar att svala luftdrag träffar den utskrivna delen.'
                    : 'If your printer is only semi-enclosed, turn on the "Draft Shield" (or wind shield) option in your slicer. This prints a sacrificial single-walled shroud around your model, blocking cooling drafts from hitting the printed object.'}
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
          {isSv ? 'Jämförelsematris för materialegenskaper' : 'Filament Properties Matrix'}
        </h3>
        <div className="overflow-x-auto scrollbar-hide border border-[var(--ps-border)] bg-[var(--ps-bg)] rounded-none">
          <table className="w-full min-w-[750px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--ps-border)]" style={{ backgroundColor: 'var(--ps-bg-secondary)' }}>
                <th className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-tertiary)] w-[100px]">{isSv ? 'Filament' : 'Filament'}</th>
                <th className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-tertiary)] w-[110px]">{isSv ? 'Mjukningstemperatur (Tg)' : 'Glass Temp (Tg)'}</th>
                <th className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-tertiary)] w-[130px]">{isSv ? 'UV-beständighet' : 'UV Resistance'}</th>
                <th className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-tertiary)] w-[120px]">{isSv ? 'Utskriftssvårighet' : 'Print Difficulty'}</th>
                <th className="p-3 text-[11px] uppercase tracking-wider font-semibold text-[var(--ps-text-tertiary)]">{isSv ? 'Primärt användningsområde' : 'Optimal Used Case'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ps-border-light)] text-[12.5px]">
              {filamentProperties.map((f) => (
                <tr key={f.name} className="hover:bg-[var(--ps-bg-secondary)]/30 transition-colors">
                  <td className="p-3 font-semibold text-[var(--ps-text)]">{f.name}</td>
                  <td className="p-3 text-[var(--ps-text-secondary)]">{f.tg}</td>
                  <td className="p-3 text-[var(--ps-text-secondary)]">{isSv ? f.uv.sv : f.uv.en}</td>
                  <td className="p-3">
                    <span className={`px-1.5 py-0.5 border text-[10px] font-medium tracking-wide uppercase rounded-none ${
                      f.name === 'PLA'
                        ? 'border-[var(--ps-success)]/40 text-[var(--ps-success)] bg-[var(--ps-success)]/5'
                        : f.name === 'PC'
                        ? 'border-[var(--ps-error)]/40 text-[var(--ps-error)] bg-[var(--ps-error)]/5'
                        : 'border-[var(--ps-gold)]/40 text-[var(--ps-gold)] bg-[var(--ps-gold)]/5'
                    }`}>
                      {isSv ? f.difficulty.sv : f.difficulty.en}
                    </span>
                  </td>
                  <td className="p-3 text-[var(--ps-text-secondary)]">{isSv ? f.useCase.sv : f.useCase.en}</td>
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
                {isSv ? 'Material:' : 'Material:'}
              </span>
              <div className="flex gap-1">
                {materialsList.map((m) => {
                  const isActive = activeMaterial === m;
                  const label = m === 'all' ? (isSv ? 'Alla' : 'All') : m;
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
                {isSv ? 'Placering:' : 'Location:'}
              </span>
              <div className="flex gap-1">
                {locationsList.map((loc) => {
                  const isActive = activeLocation === loc;
                  const label =
                    loc === 'all'
                      ? (isSv ? 'Alla' : 'All')
                      : loc === 'interior'
                      ? (isSv ? 'Kupé' : 'Interior')
                      : loc === 'exterior'
                      ? (isSv ? 'Exteriör' : 'Exterior')
                      : (isSv ? 'Mekanisk' : 'Mechanical');

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
              {isSv ? 'Inga utskrifter matchar de valda filtren.' : 'No models match the selected filters.'}
            </div>
          ) : (
            filteredComponents.map((comp) => {
              const isExpanded = expandedIds.has(comp.id);
              const name = isSv ? comp.name.sv : comp.name.en;
              const desc = isSv ? comp.description.sv : comp.description.en;
              const orient = isSv ? comp.orientation.sv : comp.orientation.en;

              // Format location badge
              const locationLabel =
                comp.location === 'interior'
                  ? (isSv ? 'Interiör (kupé)' : 'Interior Cabin')
                  : comp.location === 'exterior'
                  ? (isSv ? 'Exteriör' : 'Exterior Trim')
                  : (isSv ? 'Strukturell del' : 'Structural Part');

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
                        {isSv ? 'Utskriftsinställningar' : 'Slicer Recipe'}
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
                              {isSv ? 'Utskriftstid:' : 'Print Time:'}
                            </span>{' '}
                            {comp.printTime}
                          </div>
                          <div>
                            <span className="font-semibold text-[var(--ps-text-tertiary)]">
                              {isSv ? 'Vikt:' : 'Weight:'}
                            </span>{' '}
                            {comp.filamentWeight}
                          </div>
                          <div>
                            <span className="font-semibold text-[var(--ps-text-tertiary)]">
                              {isSv ? 'Infill:' : 'Infill:'}
                            </span>{' '}
                            {comp.infill}
                          </div>
                          <div>
                            <span className="font-semibold text-[var(--ps-text-tertiary)]">
                              {isSv ? 'Perimetrar (väggar):' : 'Walls:'}
                            </span>{' '}
                            {comp.perimeters} {isSv ? 'st' : 'loops'}
                          </div>
                        </div>
                        <div className="border-t border-[var(--ps-border-light)] pt-1.5 mt-1 text-[10px]">
                          <span className="font-semibold text-[var(--ps-text-tertiary)] uppercase tracking-wider block mb-0.5">
                            {isSv ? 'Utskriftsriktning:' : 'Orientation Guideline:'}
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
              key={isSv ? tip.title.sv : tip.title.en}
              className="rounded-none p-5 border border-[var(--ps-border)] relative overflow-hidden"
              style={{ backgroundColor: 'var(--ps-bg-secondary)' }}
            >
              <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--ps-border)] opacity-35" />
              <h4 className="text-[13px] font-semibold mb-2" style={{ color: 'var(--ps-text)' }}>
                {isSv ? tip.title.sv : tip.title.en}
              </h4>
              <p className="text-[12px] leading-relaxed text-[var(--ps-text-secondary)]">
                {isSv ? tip.description.sv : tip.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
