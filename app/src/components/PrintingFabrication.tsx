import { useState, useRef } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { ChevronDown, Info, Settings, ArrowRight, RotateCcw } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PrintableComponent {
  id: string;
  name: Record<'en' | 'sv', string>;
  description: Record<'en' | 'sv', string>;
  material: string; // Display string
  materialsList: string[]; // e.g. ['ASA', 'PETG']
  location: 'interior' | 'exterior' | 'mechanical';
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
      sv: 'Mugghållare & Armstödsförlängning',
    },
    description: {
      en: 'Double cupholder supporting 330 ml cans and an elevated armrest extension.',
      sv: 'Dubbel mugghållare med stöd för 330 ml burkar samt en upphöjd armstödsförlängning.',
    },
    material: 'ASA / PETG',
    materialsList: ['ASA', 'PETG'],
    location: 'interior',
    link: 'https://www.printables.com/model/85125-polestar-2-cupholder-and-armrest',
    linkLabel: 'Printables: 85125',
    printTime: '4h 45m',
    filamentWeight: '130g',
    infill: '30% Gyroid',
    perimeters: 4,
    orientation: {
      en: 'Print face down to avoid supports on the main armrest segment.',
      sv: 'Skriv ut uppochnervänd för att undvika stödmaterial på armstödsdelen.',
    },
  },
  {
    id: 'magsafe-mount',
    name: {
      en: 'MagSafe Phone Mount',
      sv: 'MagSafe Telefonfäste',
    },
    description: {
      en: 'Bracket fitting around the center screen with interchangeable phone holders.',
      sv: 'Konsol som fästs runt mittskärmen med utbytbara telefonhållare.',
    },
    material: 'ASA / PC',
    materialsList: ['ASA', 'PC'],
    location: 'interior',
    link: 'https://www.thingiverse.com/thing:7271739',
    linkLabel: 'Thingiverse: 7271739',
    printTime: '2h 15m',
    filamentWeight: '65g',
    infill: '40% Gyroid',
    perimeters: 5,
    orientation: {
      en: 'Print on its side to maximize layer line strength around the screen clip area.',
      sv: 'Skriv ut på sidan för att maximera lagerlinjestyrkan runt skärmklämman.',
    },
  },
  {
    id: 'usb-shelf-tidy',
    name: {
      en: 'USB Shelf Tidy',
      sv: 'USB-fack Organiserare',
    },
    description: {
      en: 'Shelf insert for the USB port area to reclaim space, featuring cable pass-through notches.',
      sv: 'Hyllinsats för USB-portområdet för att spara utrymme, med spår för kabelgenomföring.',
    },
    material: 'ASA / PETG',
    materialsList: ['ASA', 'PETG'],
    location: 'interior',
    link: 'https://www.thingiverse.com/thing:6577352',
    linkLabel: 'Thingiverse: 6577352',
    printTime: '1h 50m',
    filamentWeight: '50g',
    infill: '15% Grid',
    perimeters: 3,
    orientation: {
      en: 'Print flat on the bed. No support material required.',
      sv: 'Skriv ut platt på byggplattan. Inget stödmaterial krävs.',
    },
  },
  {
    id: 'charge-port-cover',
    name: {
      en: 'Charge Port Snow Cover',
      sv: 'Laddlucka Snöskydd',
    },
    description: {
      en: 'Protective cover fitting precisely over the charging area to prevent snow and debris accumulation.',
      sv: 'Skyddskåpa som passar exakt över laddningsområdet för att förhindra snö och skräpansamling.',
    },
    material: 'ASA',
    materialsList: ['ASA'],
    location: 'exterior',
    link: 'https://www.printables.com/model/1482336-polestar-2-charge-snow-cover',
    linkLabel: 'Printables: 1482336',
    printTime: '3h 10m',
    filamentWeight: '95g',
    infill: '20% Gyroid',
    perimeters: 4,
    orientation: {
      en: 'Print with the weather seal face flat against the build plate.',
      sv: 'Skriv ut med vädertätningen platt mot byggplattan.',
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
      sv: 'Högtalaradaptrar för eftermarknadshögtalare kompatibla med Polestar 2 och Volvo XC40.',
    },
    material: 'PC / ASA',
    materialsList: ['PC', 'ASA'],
    location: 'mechanical',
    link: 'https://www.thingiverse.com/thing:6207821',
    linkLabel: 'Thingiverse: 6207821',
    printTime: '3h 30m',
    filamentWeight: '110g',
    infill: '50% Gyroid',
    perimeters: 6,
    orientation: {
      en: 'Print flat. Enable brim if printing with PC to prevent corner warping.',
      sv: 'Skriv ut platt. Aktivera brim vid utskrift i PC för att förhindra kantresning.',
    },
  },
];

const reverseEngineeringTips = [
  {
    title: {
      en: 'Dimensional Extraction',
      sv: 'Dimensionell Extraktion',
    },
    description: {
      en: 'Utilize photogrammetry or reference scaling from module photographs to build initial CAD wireframes for custom trim.',
      sv: 'Använd fotogrammetri eller referensskalning från modulbilder för att bygga inledande CAD-trådmodeller för anpassade paneler.',
    },
  },
  {
    title: {
      en: 'OEM Integration',
      sv: 'OEM-integration',
    },
    description: {
      en: 'Apply standardized dimensions for replicating factory mounting clips to secure custom components without permanent modifications.',
      sv: 'Använd standardiserade dimensioner för att replikera fabrikens monteringsklämmor så att anpassade komponenter kan fästas utan permanenta ändringar.',
    },
  },
  {
    title: {
      en: 'Material Tolerances',
      sv: 'Materialtoleranser',
    },
    description: {
      en: 'Apply scaling compensation factors within the slicer or CAD software to account for material shrinkage when printing functional engineering filaments like PC or ASA.',
      sv: 'Applicera skalningskompensation i slicern eller CAD-programvaran för att ta hänsyn till materialkrympning vid utskrift av funktionella trådar som PC eller ASA.',
    },
  },
];

const materialGuidelines = [
  {
    name: 'Acrylonitrile Styrene Acrylate (ASA)',
    description: {
      en: 'Recommended for interior trim and exterior components. Provides high UV resistance, thermal stability, and a matte finish suitable for matching OEM aesthetics.',
      sv: 'Rekommenderas för kupépaneler och exteriöra delar. Ger hög UV-beständighet, termisk stabilitet och en matt yta lämplig för att matcha OEM-estetik.',
    },
  },
  {
    name: 'Polycarbonate (PC)',
    description: {
      en: 'Required for structural components, parts exposed to high mechanical stress, or extreme temperature environments.',
      sv: 'Krävs för strukturella komponenter, delar som utsätts för hög mekanisk belastning eller extrema temperaturmiljöer.',
    },
  },
  {
    name: 'Thermoplastic Polyurethane (TPU)',
    description: {
      en: 'Optimal for cup holder inserts, gaskets, or vibration-dampening mounts.',
      sv: 'Optimalt för mugghållarinsatser, packningar eller vibrationsdämpande fästen.',
    },
  },
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
        ? 'TPU är idealiskt för flexibla eller vibrationsdämpande delar (t.ex. mugghållare eller packningar). Det kan enkelt skrivas ut på skrivare utan inbyggnad eftersom det inte krymper mycket.'
        : 'TPU is ideal for flexible, vibration-dampening components like cup holders or gaskets. It is easy to print on open-frame printers as it has very low shrinkage.';
    } else if (partLoc === 'exterior') {
      if (enclosure === 'yes' && bedTemp === 'high') {
        filament = 'ASA (Acrylonitrile Styrene Acrylate)';
        description = isSv
          ? 'ASA är det bästa valet för exteriöra delar. Det har utmärkt UV- och väderbeständighet samt hög temperaturtålighet, men kräver en stängd inbyggnad och hög bäddtemperatur (100°C+) för att förhindra skevhet.'
          : 'ASA is the best choice for exterior parts. It features outstanding UV/weather resistance and high thermal limits, but requires a closed enclosure and high bed temperature (100°C+) to prevent warping.';
      } else {
        filament = 'PETG (with UV/Weather Clear Coat)';
        description = isSv
          ? 'Eftersom du saknar en stängd inbyggnad eller hög bäddtemperatur är PETG det säkraste valet för utomhusbruk. Det tål UV hyfsat, men spraya delen med ett UV-skyddande klarlack för långvarig hållbarhet.'
          : 'Since you lack an enclosure or high bed temp, PETG is the safest choice for exterior parts. It has decent natural UV resistance, but we recommend spraying the finished part with a UV-blocking clear coat for longevity.';
      }
    } else if (partLoc === 'interior') {
      if (enclosure === 'yes' && bedTemp === 'high') {
        filament = 'ASA';
        description = isSv
          ? 'ASA är det absolut bästa för kupépaneler. Temperaturen inuti kupén i direkt solljus kan nå 70°C, vilket får PLA att smälta/skeva. ASA tål detta och matchar bilens OEM-plast perfekt.'
          : 'ASA is highly recommended for cabin panels. Temperatures inside a parked cabin in direct sun can exceed 70°C, causing PLA to warp. ASA withstands this heat and matches the matte OEM plastic texture.';
      } else {
        filament = 'PETG';
        description = isSv
          ? 'Utan en inbyggnad är PETG det bästa valet för kupéinteriör. Det tål temperaturer upp till 75°C vilket räcker för delar som inte sitter i direkt solsken på instrumentbrädan. Undvik helt vanlig PLA i kupén.'
          : 'Without an enclosure, PETG is the best choice for cabin interior parts. It withstands up to 75°C, which is sufficient for parts not in direct dashboard sunlight. Avoid standard PLA inside the cabin.';
      }
    } else if (partLoc === 'mechanical') {
      if (enclosure === 'yes' && bedTemp === 'high') {
        filament = 'Polycarbonate (PC)';
        description = isSv
          ? 'Polykarbonat (PC) ger extrem styrka, mekanisk styvhet och mycket hög temperaturtålighet (110°C+). Perfekt för t.ex. högtalaradaptrar. Kräver hög munstyckstemp (270°C+) och stängd inbyggnad.'
          : 'Polycarbonate (PC) provides extreme strength, mechanical stiffness, and very high thermal resistance (110°C+). Ideal for speaker adapters. Requires hot nozzles (270°C+) and a heated chamber.';
      } else {
        filament = 'PETG (Heavy Perimeters)';
        description = isSv
          ? 'För mekaniska delar utan inbyggnad, skriv ut i PETG med extra väggar (5-6 st) och 40%+ infill. Det ger god seghet och slagtålighet och är betydligt starkare än standard-PLA.'
          : 'For mechanical parts without an enclosure, print with PETG using extra perimeters (5-6 walls) and 40%+ infill. This provides great impact resistance and is significantly stronger than PLA.';
      }
    }

    return (
      <div className="mt-4 p-4 border border-[var(--ps-gold)]/40 bg-[var(--ps-gold)]/5 rounded-none relative">
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--ps-gold)]/60" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[var(--ps-gold)]/60" />
        
        <h4 className="text-[12px] uppercase tracking-wider font-semibold text-[var(--ps-gold)] mb-1">
          {isSv ? 'Rekommenderat Material' : 'Recommended Filament'}
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
              1. {isSv ? 'Skrivarkabin / Inbyggnad?' : 'Enclosure / Chamber?'}
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
                {isSv ? 'Ja (Stängd/Värmd)' : 'Yes (Enclosed/Vented)'}
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
              2. {isSv ? 'Max Byggplattetemp?' : 'Max Bed Temperature?'}
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
              3. {isSv ? 'Delens Funktion/Placering?' : 'Part Function/Location?'}
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
                {isSv ? 'Kupéinteriör (Värmetålig)' : 'Cabin Interior (Heat)'}
              </option>
              <option value="exterior" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {isSv ? 'Exteriör (UV-tålig/Väder)' : 'Exterior (UV/Weather)'}
              </option>
              <option value="mechanical" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {isSv ? 'Mekanisk / Styvhet' : 'Mechanical / High Strength'}
              </option>
              <option value="flexible" style={{ backgroundColor: 'var(--ps-bg)' }}>
                {isSv ? 'Flexibel / Mugghållare / Gummipackning' : 'Flexible / Cup Inserts / Gaskets'}
              </option>
            </select>
          </div>
        </div>

        {/* Display recommendation */}
        {getAdvisorRecommendation()}
      </div>

      {/* Material Guidelines */}
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
              style={{ backgroundColor: 'var(--ps-bg-secondary)' }}
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
                  ? (isSv ? 'Kupéinteriör' : 'Interior Cabin')
                  : comp.location === 'exterior'
                  ? (isSv ? 'Exteriör' : 'Exterior Trim')
                  : (isSv ? 'Mekanisk del' : 'Structural Part');

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
                              {isSv ? 'Väggar:' : 'Walls:'}
                            </span>{' '}
                            {comp.perimeters} {isSv ? 'st' : 'loops'}
                          </div>
                        </div>
                        <div className="border-t border-[var(--ps-border-light)] pt-1.5 mt-1 text-[10px]">
                          <span className="font-semibold text-[var(--ps-text-tertiary)] uppercase tracking-wider block mb-0.5">
                            {isSv ? 'Riktlinjer:' : 'Orientation Guideline:'}
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
