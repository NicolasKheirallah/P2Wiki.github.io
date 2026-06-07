import { useState, useRef } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { Search, ChevronDown, Check, Copy, Package, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PartNumberEntry {
  label: Record<'en' | 'sv', string>;
  number: string;
  note?: Record<'en' | 'sv', string>;
}

interface IssueItem {
  id: string;
  category: 'software' | 'drivetrain' | 'electrical' | 'body';
  severity: 'critical' | 'moderate' | 'minor';
  issue: Record<'en' | 'sv', string>;
  affectedYearsList: string[]; // e.g. ['MY21', 'MY22', 'MY23'] or ['All']
  symptoms: Record<'en' | 'sv', string>;
  diy: Record<'en' | 'sv', string>;
  partNumbers?: PartNumberEntry[];
}

const issueData: IssueItem[] = [
  {
    id: 'ihu-instability',
    category: 'software',
    severity: 'minor',
    issue: {
      en: 'Infotainment (IHU) Instability',
      sv: 'Instabilitet i infotainmentsystemet (IHU)',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23', 'MY24', 'MY25'],
    symptoms: {
      en: 'UI lag, boot loops, system crashes due to Android Automotive OS memory leaks.',
      sv: 'Segt gränssnitt, upprepade omstarter (bootloops) och systemkrascher på grund av minnesläckor i Android Automotive OS.',
    },
    diy: {
      en: 'Soft Reset: Hold home button below screen for 20 seconds.\nHard Reset: Recovery menu factory reset (requires VIDA key re-pairing).',
      sv: 'Mjuk återställning: Håll hemknappen under skärmen intryckt i 20 sekunder.\nHård återställning: Fabriksåterställning via återställningsmenyn (kräver nyckelparning i VIDA).',
    },
  },
  {
    id: 'tcam-failure',
    category: 'software',
    severity: 'critical',
    issue: {
      en: 'TCAM Module Failure',
      sv: 'Haveri i TCAM-modulen',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptoms: {
      en: 'Total loss of LTE, GPS, eCall, and Phone-as-Key (PAK) connection.',
      sv: 'Total förlust av uppkoppling (LTE/GPS), eCall och funktionen Mobil som nyckel (PAK).',
    },
    diy: {
      en: 'Soft Reset: Hold front defroster button for 20 seconds.\nHard Reset: Disconnect TCAM 12V backup battery under rear roof trim.',
      sv: 'Mjuk återställning: Håll defrosterknappen fram intryckt i 20 sekunder.\nHård återställning: Koppla tillfälligt ur TCAM-modulens 12V-backupbatteri (BUB) som sitter under innertaket i bilens bakkant.',
    },
    partNumbers: [
      {
        label: { en: 'TCAM Backup Battery (BUB)', sv: 'TCAM-backupbatteri (BUB)' },
        number: '32319770',
        note: {
          en: 'Rechargeable backup battery located under the rear headliner.',
          sv: 'Laddningsbart reservbatteri placerat under innertaket i bakkant.',
        },
      },
    ],
  },
  {
    id: 'rearview-camera-glitch',
    category: 'software',
    severity: 'critical',
    issue: {
      en: 'Rearview Camera Display Glitch',
      sv: 'Skärmfel för backkameran',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23', 'MY24', 'MY25'],
    symptoms: {
      en: 'Rearview backup camera image fails to render or remains blank when shifting into reverse.',
      sv: 'Backkamerabilden visas inte eller skärmen förblir svart när backväxeln läggs i.',
    },
    diy: {
      en: 'Verify camera lens is clean. If screen is black, perform IHU soft reset (hold Home button below screen for 20 seconds).',
      sv: 'Kontrollera att kameralinsen är ren. Om skärmen är svart, utför en mjuk återställning av infotainmentsystemet (IHU) genom att hålla hemknappen intryckt i 20 sekunder.',
    },
  },
  {
    id: 'rear-axle-click',
    category: 'drivetrain',
    severity: 'moderate',
    issue: {
      en: 'Rear Axle "Clicking" (Dual Motor)',
      sv: 'Klickande ljud från bakaxeln (Dual Motor)',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptoms: {
      en: 'Low-speed clicking/ticking from rear. Often misdiagnosed as CV joints; root cause is often ERAD internal wear.',
      sv: 'Klickande eller tickande ljud från bakaxeln vid låga hastigheter. Feldiagnostiseras ofta som slitna drivknutar, men orsaken är ofta internt slitage i den bakre elmotorn (ERAD).',
    },
    diy: {
      en: 'Checks: Verify axle bolt torque. Note: Axle nut is single-use (45 Nm + 90 degrees).',
      sv: 'Kontroll: Kontrollera åtdragningsmomentet för drivaxelbulten. Obs: Axelskrubben/muttern är av engångstyp och ska bytas (45 Nm + 90°).',
    },
    partNumbers: [
      {
        label: { en: 'Axle Bolt with Rubber Washer', sv: 'Drivaxelbult med gummibricka' },
        number: '30670602',
        note: {
          en: 'Torque-to-yield stretch bolt. Must be replaced whenever removed (single-use).',
          sv: 'Sträckbult för engångsbruk. Måste alltid bytas ut mot en ny om den lossas.',
        },
      },
    ],
  },
  {
    id: 'front-suspension-knocking',
    category: 'drivetrain',
    severity: 'moderate',
    issue: {
      en: 'Front Suspension Knocking',
      sv: 'Knackande ljud från framvagnen',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptoms: {
      en: 'Popping/grinding during low-speed steering over uneven surfaces. Premature strut top bearing wear.',
      sv: 'Kluckande, knackande eller knarrande ljud från framvagnen vid styrning i låg fart över ojämna underlag. Beror på förtida slitage i de övre fjäderbenslagren.',
    },
    diy: {
      en: 'Repair: Replace strut top mounts in pairs. Apply final torque (81 Nm) only when suspension is fully loaded on the ground.',
      sv: 'Reparation: Byt fjäderbenslagringar/stödlager parvis. Dra slutmomentet (81 Nm) först när bilen står på hjulen och hjulupphängningen är helt belastad.',
    },
    partNumbers: [
      {
        label: { en: 'Strut Support Mount/Bearing', sv: 'Övre fjäderbenslagring (stödlager)' },
        number: '32395175',
        note: {
          en: 'Front upper suspension bearing and mount assembly. Recommended to replace in pairs.',
          sv: 'Främre övre stödlager och fjäderbenslagring. Rekommenderas att alltid bytas parvis.',
        },
      },
    ],
  },
  {
    id: 'propeller-shaft-vibration',
    category: 'drivetrain',
    severity: 'moderate',
    issue: {
      en: 'AWD Propeller Shaft Vibration',
      sv: 'Vibrationer från kardanaxel (AWD)',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptoms: {
      en: 'Vibration/shudder felt through the cabin or steering wheel during moderate acceleration between 50 and 70 km/h.',
      sv: 'Vibrationer eller skakningar som känns i kupén eller ratten vid måttlig acceleration, oftast mellan 50 och 70 km/h.',
    },
    diy: {
      en: 'Diagnostic check: Inspect motor mounts and driveshaft alignment for play.',
      sv: 'Felsökning: Kontrollera motorfästen/bussningar samt kardanaxelns inriktning och eventuellt glapp.',
    },
  },
  {
    id: '12v-battery-drain',
    category: 'electrical',
    severity: 'critical',
    issue: {
      en: '12V Auxiliary Battery Drain',
      sv: 'Urladdning av 12V-hjälpbatteriet',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptoms: {
      en: 'Total vehicle immobilization. Contactor fails to close regardless of high-voltage pack state of charge.',
      sv: 'Bilen är helt stendöd och går inte att starta. Högspänningskontaktorn slår inte till, oavsett högspänningsbatteriets laddningsnivå.',
    },
    diy: {
      en: 'Preventative: Replace 12V lead-acid battery every 36 months to prevent sudden failures.',
      sv: 'Förebyggande åtgärd: Byt ut 12V-batteriet (AGM) i förebyggande syfte var 36:e månad för att slippa plötsliga stopp.',
    },
    partNumbers: [
      {
        label: { en: '12V Auxiliary AGM Battery (H5/Group 47)', sv: '12V AGM-hjälpbatteri (H5)' },
        number: '31652494',
        note: {
          en: 'OEM H5 AGM battery. Can be replaced with premium aftermarket H5 AGM battery equivalents.',
          sv: 'Original H5 AGM-batteri. Kan ersättas med valfritt eftermarknadsbatteri av typen H5/Group 47 AGM.',
        },
      },
    ],
  },
  {
    id: 'hvch-failure',
    category: 'electrical',
    severity: 'critical',
    issue: {
      en: 'HVCH (High Voltage Coolant Heater) Failure',
      sv: 'Haveri i högspänningsvärmaren (HVCH)',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptoms: {
      en: 'Loss of cabin heat, "Parking Climate Temporarily Unavailable" error. Blown 15A inverter fuse.',
      sv: 'Kupévärmen slutar helt att fungera, felmeddelandet "Parkeringsklimat tillfälligt otillgängligt" visas och 15A-säkringen till värmaren har ofta gått.',
    },
    diy: {
      en: 'Not recommended: High-voltage (400V) system hazard. Seek professional service.',
      sv: 'Gör ej själv: Högspänningssystem (400V) med livsfara. Låt en auktoriserad verkstad utföra bytet.',
    },
    partNumbers: [
      {
        label: { en: 'High Voltage Coolant Heater (HVCH)', sv: 'Högspänningsvärmare (HVCH)' },
        number: '32275606',
        note: {
          en: 'Updated heater unit revision. Sourced to fix failure-prone initial 2021 parts.',
          sv: 'Uppdaterad version av värmarenheten. Ersätter den felbenägna första generationen från 2021.',
        },
      },
    ],
  },
  {
    id: 'power-inverter-failure',
    category: 'electrical',
    severity: 'critical',
    issue: {
      en: 'Power Inverter Assembly Failure',
      sv: 'Haveri i växelriktaren (inverter)',
    },
    affectedYearsList: ['MY21'],
    symptoms: {
      en: 'Sudden loss of propulsion while driving, "Propulsion system urgent service required" dashboard warning, or failure to start.',
      sv: 'Plötslig förlust av drivkraft under körning, varningsmeddelandet "Drivsystem brådskande service krävs" i förardisplayen, eller att bilen inte går att starta.',
    },
    diy: {
      en: 'No DIY action: High-voltage system hazard. Pull over safely and arrange towing to a service point.',
      sv: 'Gör ej själv: Högspänningssystem med livsfara. Kör åt sidan på ett säkert sätt, stäng av bilen och kontakta bärgare till en Polestar-verkstad.',
    },
  },
  {
    id: 'blend-door-actuator',
    category: 'body',
    severity: 'minor',
    issue: {
      en: 'HVAC Blend Door Actuator Failure',
      sv: 'Haveri i spjällmotor till klimatanläggningen (HVAC)',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptoms: {
      en: 'Extreme temperature delta across zones (e.g., hot driver, cold passenger), rapid dashboard clicking.',
      sv: 'Extrema temperaturskillnader mellan klimatzoner (t.ex. brännande hett på förarsidan men iskallt på passagerarsidan) samt ett snabbt klickande ljud bakom instrumentpanelen.',
    },
    diy: {
      en: 'Repair: Replace stripped damper motors (shared Volvo XC40 part). Requires VIDA for end-stop recalibration.',
      sv: 'Reparation: Byt ut den felande spjällmotorn (samma komponent som i Volvo XC40). Efter byte krävs VIDA för att kalibrera in spjällets ändlägen.',
    },
    partNumbers: [
      {
        label: { en: 'HVAC Damper/Actuator Motor', sv: 'Spjällmotor/Ställdon till HVAC' },
        number: '32226715',
        note: {
          en: 'Electric actuator motor controlling HVAC flaps (shared with Volvo XC40).',
          sv: 'Elektrisk ställmotor som reglerar ventilationsspjällen (samma som i Volvo XC40).',
        },
      },
    ],
  },
  {
    id: 'door-latch-freezing',
    category: 'body',
    severity: 'moderate',
    issue: {
      en: 'Frozen Rear Door Latches',
      sv: 'Frysta dörrlås bak',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptoms: {
      en: 'Rear exterior/interior handles freeze shut or fail to latch below -10 °C. Factory grease inadequacy.',
      sv: 'Inre eller yttre dörrhandtag bak fryser fast, eller så går dörren inte i baklås (går inte att stänga) när temperaturen sjunker under -10 °C. Beror på felaktigt/otillräckligt fett från fabrik.',
    },
    diy: {
      en: 'Mitigation: Apply water-displacing silicone lubricant inside latch assembly (temporary fix).',
      sv: 'Tillfällig åtgärd: Spruta fuktavvisande silikonspray eller låsspray direkt in i låskistan (endast tillfällig lösning).',
    },
    partNumbers: [
      {
        label: { en: 'Rear Left Door Latch Assembly', sv: 'Låskista bak vänster' },
        number: '32131412',
        note: {
          en: 'Updated latch with improved moisture seals and low-temperature grease.',
          sv: 'Uppdaterad låskista med förbättrade fukt- och dammtätningar samt speciellt lågtemperaturfett.',
        },
      },
      {
        label: { en: 'Rear Right Door Latch Assembly', sv: 'Låskista bak höger' },
        number: '32131413',
        note: {
          en: 'Updated latch with improved moisture seals and low-temperature grease.',
          sv: 'Uppdaterad låskista med förbättrade fukt- och dammtätningar samt speciellt lågtemperaturfett.',
        },
      },
    ],
  },
  {
    id: 'lamp-condensation',
    category: 'body',
    severity: 'minor',
    issue: {
      en: 'Headlamp & Taillight Condensation',
      sv: 'Kondens i strålkastare och bakljus',
    },
    affectedYearsList: ['All'],
    symptoms: {
      en: 'Visible moisture build-up, misting, or water droplets inside the front headlamps or rear light bar.',
      sv: 'Synlig fukt, imma eller vattendroppar på insidan av strålkastarna fram eller den bakre ljusrampen.',
    },
    diy: {
      en: 'Inspect and clean ventilation caps on back of assemblies. Temporary misting is normal and should clear on drive.',
      sv: 'Kontrollera och rengör ventilationsventilerna på baksidan av lyktornas hus. Tillfällig lätt imma är normalt och bör försvinna av sig självt under körning med lysena tända.',
    },
  },
  {
    id: 'tailgate-spindle-failure',
    category: 'body',
    severity: 'moderate',
    issue: {
      en: 'Power Tailgate Spindle Drive Failure',
      sv: 'Havererade elektriska dämpare till bakluckan',
    },
    affectedYearsList: ['MY21', 'MY22', 'MY23', 'MY24'],
    symptoms: {
      en: 'Tailgate makes a loud grinding, squeaking, or groaning noise during operation. It may open halfway and reverse, or fail to open/close under power.',
      sv: 'Bakluckan ger ifrån sig ett högt malande, gnisslande eller stönande ljud när den öppnas/stängs. Luckan kan stanna och vända halvvägs, eller vägra att manövreras elektriskt överhuvudtaget.',
    },
    diy: {
      en: '1. Calibration: Manually open tailgate fully, press and hold the close button for 5 seconds until it beeps twice to reset.\n2. Inspection: Pull back the rubber boot at the top of the struts and check for pinched or broken wires (solder any breaks).\n3. Squeaks: Apply silicone-based lubricant to rubber weather seals.\n4. Replacement: If internal motor/gears have failed (grinding/stalling persists), replace both left and right motorized spindle struts as a pair (Left: 31690370, Right: 31690371).',
      sv: '1. Kalibrering: Öppna bakluckan helt för hand, tryck och håll stängningsknappen intryckt i 5 sekunder tills du hör två pip för att återställa.\n2. Kontroll: Dra tillbaka gummibälgen längst upp på dämparna och leta efter klämda eller trasiga kablar (löd ihop eventuella kabelbrott).\n3. Gnissel: Applicera silikonfett eller gummivårdsspray på bakluckans tätningslister.\n4. Byte: Om den inbyggda motorn eller kuggarna i dämparen har rasat (malande ljud/stopp kvarstår), måste båda de elektriska dämparna bytas ut parvis (Vänster: 31690370, Höger: 31690371).',
    },
    partNumbers: [
      {
        label: { en: 'Power Spindle Drive Strut (Left)', sv: 'Elektrisk dämpare/spindel (Vänster)' },
        number: '31690370',
        note: {
          en: 'Driver side motorized lift strut. Replaced as a matched pair.',
          sv: 'Motoriserad dämpare för vänster sida. Bör bytas parvis.',
        },
      },
      {
        label: { en: 'Power Spindle Drive Strut (Right)', sv: 'Elektrisk dämpare/spindel (Höger)' },
        number: '31690371',
        note: {
          en: 'Passenger side motorized lift strut. Replaced as a matched pair.',
          sv: 'Motoriserad dämpare för höger sida. Bör bytas parvis.',
        },
      },
    ],
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent accordion from toggling when copying
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium border border-[var(--ps-border)] hover:border-[var(--ps-text)] bg-[var(--ps-bg-secondary)] hover:bg-[var(--ps-bg-elevated)] transition-all duration-150 rounded-none text-[var(--ps-text-secondary)] hover:text-[var(--ps-text)]"
      title="Copy DIY instructions"
    >
      {copied ? (
        <>
          <Check size={12} className="text-[var(--ps-gold)]" />
          <span className="text-[var(--ps-gold)]">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={12} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

function formatMultiline(text: string) {
  return text.split('\n').map((line, i) => (
    <span key={i} className="block mt-1 first:mt-0">
      {line}
    </span>
  ));
}

export default function KnownIssues() {
  const { locale, t } = useLocale();
  const isSv = locale === 'sv';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeYearFilter, setActiveYearFilter] = useState('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const containerRef = useRef<HTMLDivElement>(null);

  // Categories list mapped to their translations
  const categories = [
    { id: 'all', labelKey: 'catAll' },
    { id: 'software', labelKey: 'catSoftware' },
    { id: 'drivetrain', labelKey: 'catDrivetrain' },
    { id: 'electrical', labelKey: 'catElectrical' },
    { id: 'body', labelKey: 'catBody' },
  ];

  // Model Years list for filtering
  const modelYearsList = ['all', 'MY21', 'MY22', 'MY23', 'MY24', 'MY25', 'MY26'];

  // Filter issues
  const filteredIssues = issueData.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;

    const matchesYear =
      activeYearFilter === 'all' ||
      item.affectedYearsList.includes(activeYearFilter) ||
      item.affectedYearsList.includes('All');

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesTab && matchesYear;

    const title = (isSv ? item.issue.sv : item.issue.en).toLowerCase();
    const symptoms = (isSv ? item.symptoms.sv : item.symptoms.en).toLowerCase();
    const diyText = (isSv ? item.diy.sv : item.diy.en).toLowerCase();

    const matchesSearch =
      title.includes(query) ||
      symptoms.includes(query) ||
      diyText.includes(query) ||
      item.affectedYearsList.some((y) => y.toLowerCase().includes(query)) ||
      (item.partNumbers && item.partNumbers.some((pn) => pn.number.toLowerCase().includes(query)));

    return matchesTab && matchesYear && matchesSearch;
  });

  // Stagger reveal animations on filter/search change
  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.issue-card');
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out', overwrite: true }
    );
  }, { scope: containerRef, dependencies: [activeTab, activeYearFilter, searchQuery] });

  const toggleExpand = (id: string) => {
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

  return (
    <div className="space-y-6" ref={containerRef}>
      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
        {t('knownIssuesDesc')}
      </p>

      {/* Search Bar & Tab Filters Panel */}
      <div className="space-y-4 pt-2">
        {/* Search input bar */}
        <div className="relative border border-[var(--ps-border)] focus-within:border-[var(--ps-text)] bg-[var(--ps-bg)] flex items-center px-4 py-2.5 transition-colors duration-150 rounded-none w-full md:max-w-xl">
          <Search size={16} className="text-[var(--ps-text-tertiary)] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchIssuesPlaceholder')}
            className="w-full ml-3 bg-transparent border-none outline-none text-[13px] text-[var(--ps-text)] placeholder-[var(--ps-text-tertiary)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[var(--ps-text-tertiary)] hover:text-[var(--ps-text)] transition-colors ml-2 cursor-pointer flex items-center justify-center shrink-0"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className="px-4 py-2 rounded-none text-[13px] font-normal transition-all duration-150 border"
                style={{
                  borderColor: isActive ? 'var(--ps-text)' : 'var(--ps-border)',
                  backgroundColor: isActive ? 'var(--ps-pill-active-bg)' : 'var(--ps-pill-bg)',
                  color: isActive ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg-hover)';
                    e.currentTarget.style.borderColor = 'var(--ps-text-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg)';
                    e.currentTarget.style.borderColor = 'var(--ps-border)';
                  }
                }}
              >
                {t(cat.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Model Year Filter tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--ps-border-light)] pb-4 pt-1">
          <span className="text-[11px] text-[var(--ps-text-tertiary)] uppercase tracking-wider font-semibold mr-1">
            {isSv ? 'Modellår:' : 'Model Year:'}
          </span>
          {modelYearsList.map((yr) => {
            const isActive = activeYearFilter === yr;
            const label = yr === 'all' ? (isSv ? 'Alla år' : 'All Years') : yr;
            return (
              <button
                key={yr}
                onClick={() => setActiveYearFilter(yr)}
                className="px-3 py-1 rounded-none text-[11px] font-normal transition-all duration-150 border"
                style={{
                  borderColor: isActive ? 'var(--ps-text)' : 'var(--ps-border)',
                  backgroundColor: isActive ? 'var(--ps-pill-active-bg)' : 'transparent',
                  color: isActive ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--ps-bg-secondary)';
                    e.currentTarget.style.borderColor = 'var(--ps-text-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--ps-border)';
                  }
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion Issues List */}
      <div className="space-y-3">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-16 text-[14px]" style={{ color: 'var(--ps-text-tertiary)' }}>
            {isSv ? 'Inga problem matchar de valda filtren.' : 'No issues match the selected filters.'}
          </div>
        ) : (
          filteredIssues.map((item) => {
            const isExpanded = expandedIds.has(item.id);
            const title = isSv ? item.issue.sv : item.issue.en;
            const symptoms = isSv ? item.symptoms.sv : item.symptoms.en;
            const diyText = isSv ? item.diy.sv : item.diy.en;

            // Get category display label
            const categoryLabel = t(categories.find((c) => c.id === item.category)?.labelKey || '');

            return (
              <div
                key={item.id}
                className="issue-card border border-[var(--ps-border)] bg-[var(--ps-bg)] rounded-none transition-colors duration-150 overflow-hidden"
              >
                {/* Header panel */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full text-left px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--ps-bg-secondary)]/20 transition-colors duration-150 rounded-none cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 border rounded-none`}
                        style={{
                          backgroundColor:
                            item.severity === 'critical'
                              ? 'rgba(239, 68, 68, 0.08)'
                              : item.severity === 'moderate'
                              ? 'rgba(245, 158, 11, 0.08)'
                              : 'rgba(59, 130, 246, 0.08)',
                          borderColor:
                            item.severity === 'critical'
                              ? 'var(--ps-error)'
                              : item.severity === 'moderate'
                              ? 'var(--ps-gold)'
                              : 'var(--ps-text-tertiary)',
                          color:
                            item.severity === 'critical'
                              ? 'var(--ps-error)'
                              : item.severity === 'moderate'
                              ? 'var(--ps-gold)'
                              : 'var(--ps-text-secondary)',
                        }}
                      >
                        {t(`severity${item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}`)}
                      </span>
                      <h4 className="text-[15px] font-medium leading-snug" style={{ color: 'var(--ps-text)' }}>
                        {title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px]" style={{ color: 'var(--ps-text-secondary)' }}>
                      <span className="font-light">{categoryLabel}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0 self-start sm:self-center">
                    {/* Model Year Badges */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[var(--ps-text-tertiary)] uppercase tracking-wider font-normal mr-1">
                        {t('affectedYears')}:
                      </span>
                      {item.affectedYearsList.map((yr) => {
                        const isAll = yr === 'All';
                        const displayYr = isAll ? (isSv ? 'Alla år' : 'All Years') : yr;
                        return (
                          <span
                            key={yr}
                            className={`px-1.5 py-0.5 border text-[10px] font-semibold tracking-wide uppercase rounded-none ${
                              isAll
                                ? 'border-[var(--ps-text)] bg-[var(--ps-text)] text-[var(--ps-bg)]'
                                : 'border-[var(--ps-border)] bg-[var(--ps-bg-secondary)] text-[var(--ps-text)]'
                            }`}
                          >
                            {displayYr}
                          </span>
                        );
                      })}
                    </div>

                    <ChevronDown
                      size={16}
                      className="text-[var(--ps-text-tertiary)] transition-transform duration-250 ml-1"
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-[var(--ps-border-light)] p-5 bg-[var(--ps-bg-secondary)]/10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Symptoms Column */}
                      <div className="space-y-2">
                        <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
                          {t('symptomsLabel')}
                        </h5>
                        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                          {symptoms}
                        </p>
                      </div>

                      {/* DIY Remediation Column */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
                            {t('diyLabel')}
                          </h5>
                          <CopyButton text={diyText} />
                        </div>
                        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                          {formatMultiline(diyText)}
                        </p>
                      </div>
                    </div>

                    {/* Part Numbers Table */}
                    {item.partNumbers && item.partNumbers.length > 0 && (
                      <div className="pt-4 border-t border-[var(--ps-border-light)] space-y-3">
                        <div className="flex items-center gap-1.5">
                          <Package size={13} className="text-[var(--ps-text-tertiary)]" />
                          <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
                            {isSv ? 'Referensartikelnummer' : 'Reference Part Numbers'}
                          </h5>
                        </div>
                        <div className="space-y-2">
                          {item.partNumbers.map((pn, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-2.5 bg-[var(--ps-bg-secondary)]/20 border border-[var(--ps-border)] rounded-none"
                            >
                              <div className="flex-1 min-w-0">
                                <span className="text-[12px] font-medium block" style={{ color: 'var(--ps-text)' }}>
                                  {isSv ? pn.label.sv : pn.label.en}
                                </span>
                                {pn.note && (
                                  <span className="text-[10.5px] leading-snug block mt-0.5" style={{ color: 'var(--ps-text-tertiary)' }}>
                                    {isSv ? pn.note.sv : pn.note.en}
                                  </span>
                                )}
                              </div>
                              <code
                                className="text-[12px] font-mono font-semibold shrink-0 px-2 py-0.5 border border-[var(--ps-border)] bg-[var(--ps-bg)] select-all"
                                style={{ color: 'var(--ps-gold)' }}
                              >
                                {pn.number}
                              </code>
                            </div>
                          ))}
                        </div>
                        <p className="text-[10px] leading-relaxed italic" style={{ color: 'var(--ps-text-tertiary)' }}>
                          {isSv
                            ? '⚠ Artikelnummer kan ersättas av nyare versioner utan förvarning. Bekräfta alltid korrekt nummer genom att uppge ditt VIN hos en auktoriserad Polestar-verkstad eller Volvo Parts-portal.'
                            : '⚠ Part numbers may be superseded without notice. Always confirm the correct number by providing your VIN to an authorized Polestar Service Point or Volvo Parts portal.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Disclaimer Box */}
      <div
        className="mt-6 rounded-none p-5 border border-[var(--ps-border)] relative overflow-hidden"
        style={{ backgroundColor: 'var(--ps-bg-info)' }}
      >
        {/* Subtle corner design detail */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--ps-border)] opacity-35" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--ps-border)] opacity-35" />

        <h4 className="text-[13px] font-semibold mb-2" style={{ color: 'var(--ps-text)' }}>
          {t('disclaimerTitle')}
        </h4>
        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('knownIssuesDisclaimer')}
        </p>
      </div>
    </div>
  );
}
