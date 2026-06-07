import { useState, useRef } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { Search, ChevronDown, Check, Copy } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface IssueItem {
  id: string;
  category: 'software' | 'drivetrain' | 'electrical' | 'body';
  issue: Record<'en' | 'sv', string>;
  affectedYears: Record<'en' | 'sv', string>;
  severity: 'critical' | 'moderate' | 'minor';
  symptoms: Record<'en' | 'sv', string>;
  diy: Record<'en' | 'sv', string>;
  dealer: Record<'en' | 'sv', string>;
}

const issueData: IssueItem[] = [
  {
    id: 'ihu-instability',
    category: 'software',
    issue: {
      en: 'Infotainment (IHU) Instability',
      sv: 'Infotainmentsystem (IHU) instabilitet',
    },
    affectedYears: {
      en: 'MY21–MY25 (Resolved in MY26 via Qualcomm Snapdragon processor)',
      sv: 'MY21–MY25 (Åtgärdat i MY26 via Qualcomm Snapdragon-processor)',
    },
    severity: 'minor',
    symptoms: {
      en: 'UI lag, boot loops, system crashes due to Android Automotive OS memory leaks.',
      sv: 'Fördröjning i gränssnittet, loopande omstarter, systemkrascher på grund av minnesläckor i Android Automotive OS.',
    },
    diy: {
      en: 'Soft Reset: Hold home button below screen for 20 seconds.\nHard Reset: Recovery menu factory reset (requires VIDA key re-pairing).',
      sv: 'Mjuk återställning: Håll hemknappen under skärmen intryckt i 20 sekunder.\nHård återställning: Fabriksåterställning via återställningsmenyn (kräver VIDA-nyckelparning).',
    },
    dealer: {
      en: 'Performs full software reload (re-flash). In rare, persistent hardware lockup cases, replaces IHU module under warranty.',
      sv: 'Utför fullständig programvaruomladdning (omflasning). I sällsynta fall av ihållande hårdvarulåsning byts IHU-modulen ut under garanti.',
    },
  },
  {
    id: 'tcam-failure',
    category: 'software',
    issue: {
      en: 'TCAM Module Failure',
      sv: 'TCAM-modul haveri',
    },
    affectedYears: {
      en: 'MY21–MY23 (Resolved in MY24+ via upgraded hardware and software integration)',
      sv: 'MY21–MY23 (Åtgärdat i MY24+ via uppgraderad hårdvara och mjukvaruintegration)',
    },
    severity: 'critical',
    symptoms: {
      en: 'Total loss of LTE, GPS, eCall, and Phone-as-Key (PAK) connection.',
      sv: 'Total förlust av LTE, GPS, eCall och Mobil som nyckel (PAK)-anslutning.',
    },
    diy: {
      en: 'Soft Reset: Hold front defroster button for 20 seconds.\nHard Reset: Disconnect TCAM 12V backup battery under rear roof trim.',
      sv: 'Mjuk återställning: Håll främre defrosterknappen intryckt i 20 sekunder.\nHård återställning: Koppla bort TCAM 12V-backuphissbatteriet under den bakre takklädseln.',
    },
    dealer: {
      en: 'Performs TCAM battery replacement, software reload, or replaces module with updated hardware revision.',
      sv: 'Utför byte av TCAM-batteri, programvaruomladdning eller byter ut modulen till en uppdaterad hårdvarurevision.',
    },
  },
  {
    id: 'rear-axle-click',
    category: 'drivetrain',
    issue: {
      en: 'Rear Axle "Clicking" (Dual Motor)',
      sv: 'Bakaxel "klickande" (Dual Motor)',
    },
    affectedYears: {
      en: 'MY21–MY23 (Resolved in MY24+ with updated rear drive units/splines/axles)',
      sv: 'MY21–MY23 (Åtgärdat i MY24+ med uppdaterade bakre drivenheter/splines/axlar)',
    },
    severity: 'moderate',
    symptoms: {
      en: 'Low-speed clicking/ticking from rear. Often misdiagnosed as CV joints; root cause is often ERAD internal wear.',
      sv: 'Klickande/tickande ljud från bakaxeln vid låga hastigheter. Feldiagnostiseras ofta som drivknutar; den bakomliggande orsaken är ofta internt slitage i ERAD.',
    },
    diy: {
      en: 'Checks: Verify axle bolt torque. Note: Axle nut is single-use (45 Nm + 90 degrees).',
      sv: 'Kontroll: Verifiera åtdragningsmoment för axelbult. Obs: Axelmutter är av engångstyp (45 Nm + 90 grader).',
    },
    dealer: {
      en: 'Applies specialized spline grease/adhesive to driveshaft splines and fits new axle bolts under service bulletin.',
      sv: 'Applicerar specialanpassat spline-fett/lim på drivaxelns splines och monterar nya axelbultar enligt servicemeddelande.',
    },
  },
  {
    id: 'front-suspension-knocking',
    category: 'drivetrain',
    issue: {
      en: 'Front Suspension Knocking',
      sv: 'Knackande framhjulsupphängning',
    },
    affectedYears: {
      en: 'MY21–MY23 (Resolved in MY24+ via updated strut top mounts and bearing design)',
      sv: 'MY21–MY23 (Åtgärdat i MY24+ via uppdaterade fjäderbensfästen och lagerdesign)',
    },
    severity: 'moderate',
    symptoms: {
      en: 'Popping/grinding during low-speed steering over uneven surfaces. Premature strut top bearing wear.',
      sv: 'Knackande/knarrande ljud vid styrning i låg fart över ojämna underlag. Förtida slitage på övre fjäderbenslager.',
    },
    diy: {
      en: 'Repair: Replace strut top mounts in pairs. Apply final torque (81 Nm) only when suspension is fully loaded on the ground.',
      sv: 'Reparation: Byt fjäderbensfästen parvis. Applicera slutmoment (81 Nm) endast när upphängningen är helt belastad på marken.',
    },
    dealer: {
      en: 'Replaces strut top mounts and bearings with updated, improved part numbers under warranty.',
      sv: 'Byter ut fjäderbensfästen och lager till uppdaterade, förbättrade artikelnummer under garanti.',
    },
  },
  {
    id: 'propeller-shaft-vibration',
    category: 'drivetrain',
    issue: {
      en: 'AWD Propeller Shaft Vibration',
      sv: 'AWD Kardanaxel vibration',
    },
    affectedYears: {
      en: 'MY21–MY23 (Dual Motor) (Resolved in MY24+ with updated drivetrain layout)',
      sv: 'MY21–MY23 (Dual Motor) (Åtgärdat i MY24+ med uppdaterad drivlinekonfiguration)',
    },
    severity: 'moderate',
    symptoms: {
      en: 'Vibration/shudder felt through the cabin or steering wheel during moderate acceleration between 50 and 70 km/h.',
      sv: 'Vibrationer/skakningar som känns i kupén eller ratten vid måttlig acceleration mellan 50 och 70 km/h.',
    },
    diy: {
      en: 'Diagnostic check: Inspect motor mounts and driveshaft alignment for play.',
      sv: 'Diagnostisk kontroll: Inspektera motorfästen och drivaxelns inriktning för spel.',
    },
    dealer: {
      en: 'Re-indexes the propeller shaft or replaces front motor mounts/driveshafts under warranty.',
      sv: 'Omindexerar kardanaxeln eller byter ut främre motorfästen/drivaxlar under garanti.',
    },
  },
  {
    id: '12v-battery-drain',
    category: 'electrical',
    issue: {
      en: '12V Auxiliary Battery Drain',
      sv: '12V-hjälpbatteri urladdning',
    },
    affectedYears: {
      en: 'MY21–MY23 (Improved in MY24+ via battery sensor and software power-saving improvements)',
      sv: 'MY21–MY23 (Förbättrat i MY24+ via batterigivare och mjukvaruförbättringar för strömsparande)',
    },
    severity: 'critical',
    symptoms: {
      en: 'Total vehicle immobilization. Contactor fails to close regardless of high-voltage pack state of charge.',
      sv: 'Total fordonstillstånd. Kontaktorn stängs inte oavsett högspänningsbatteriets laddningstillstånd.',
    },
    diy: {
      en: 'Preventative: Replace 12V lead-acid battery every 36 months to prevent sudden failures.',
      sv: 'Förebyggande: Byt ut 12V blybatteriet var 36:e månad för att förhindra plötsliga fel.',
    },
    dealer: {
      en: 'Replaces 12V auxiliary battery and performs battery sensor calibration using VIDA.',
      sv: 'Byter ut 12V-hjälpbatteriet och utför kalibrering av batterisensorn med VIDA.',
    },
  },
  {
    id: 'hvch-failure',
    category: 'electrical',
    issue: {
      en: 'HVCH (High Voltage Coolant Heater) Failure',
      sv: 'HVCH (högspänningsvärmare) haveri',
    },
    affectedYears: {
      en: 'MY21–MY23 (Resolved in MY24+ via next-generation Webasto heater units)',
      sv: 'MY21–MY23 (Åtgärdat i MY24+ via nästa generations Webasto-värmare)',
    },
    severity: 'critical',
    symptoms: {
      en: 'Loss of cabin heat, "Parking Climate Temporarily Unavailable" error. Blown 15A inverter fuse.',
      sv: 'Förlust av kupévärme, felmeddelande "Parkeringsklimat tillfälligt otillgängligt". Säkring för växelriktare (15A) har gått.',
    },
    diy: {
      en: 'Not recommended: High-voltage (400V) system hazard. Seek professional service.',
      sv: 'Rekommenderas ej: Fara relaterad till högspänningssystemet (400V). Sök professionell hjälp.',
    },
    dealer: {
      en: 'Replaces the high-voltage coolant heating assembly and replaces the blown inverter fuse.',
      sv: 'Byter ut högspänningsvärmeaggregatet för kylvätska och byter den trasiga säkringen.',
    },
  },
  {
    id: 'blend-door-actuator',
    category: 'body',
    issue: {
      en: 'HVAC Blend Door Actuator Failure',
      sv: 'HVAC Spjällmotor ställdon haveri',
    },
    affectedYears: {
      en: 'MY21–MY23 (Resolved in MY24+ via updated actuator design)',
      sv: 'MY21–MY23 (Åtgärdat i MY24+ med uppdaterad ställdonsdesign)',
    },
    severity: 'moderate',
    symptoms: {
      en: 'Extreme temperature delta across zones (e.g., hot driver, cold passenger), rapid dashboard clicking.',
      sv: 'Extrema temperaturskillnader mellan zoner (t.ex. varmt för föraren, kallt för passageraren), snabbt klickande ljud från instrumentpanelen.',
    },
    diy: {
      en: 'Repair: Replace stripped damper motors (shared Volvo XC40 part). Requires VIDA for end-stop recalibration.',
      sv: 'Reparation: Byt ut utslitna spjällmotorer (delad Volvo XC40-del). Kräver VIDA för kalibrering av ändlägen.',
    },
    dealer: {
      en: 'Replaces the faulty blend door actuator motor and performs calibration sweep via VIDA.',
      sv: 'Byter ut den felaktiga spjällmotorn och utför kalibrering via VIDA.',
    },
  },
  {
    id: 'door-latch-freezing',
    category: 'body',
    issue: {
      en: 'Frozen Rear Door Latches',
      sv: 'Frysta bakdörrslås',
    },
    affectedYears: {
      en: 'MY21–MY23 (Resolved in MY24+ with updated latch design featuring improved seals)',
      sv: 'MY21–MY23 (Åtgärdat i MY24+ med uppdaterad låsdesign och förbättrade tätningar)',
    },
    severity: 'moderate',
    symptoms: {
      en: 'Rear exterior/interior handles freeze shut or fail to latch below -10 °C. Factory grease inadequacy.',
      sv: 'Bakre yttre/inre handtag fryser fast eller låser inte vid temperaturer under -10 °C. Otillräckligt fabriksfett.',
    },
    diy: {
      en: 'Mitigation: Apply water-displacing silicone lubricant inside latch assembly (temporary fix).',
      sv: 'Åtgärd: Applicera fuktavvisande silikonsmörjmedel inuti låsmekanismen (tillfällig lösning).',
    },
    dealer: {
      en: 'Replaces latch assemblies with updated versions featuring improved moisture seals and low-temperature grease.',
      sv: 'Byter ut låsmekanismerna till uppdaterade versioner med förbättrade fukt-tätningar och lågtemperaturfett.',
    },
  },
  {
    id: 'lamp-condensation',
    category: 'body',
    issue: {
      en: 'Headlamp & Taillight Condensation',
      sv: 'Strålkastare & Bakljus kondens',
    },
    affectedYears: {
      en: 'All Years (MY21–MY26)',
      sv: 'Alla modellår (MY21–MY26)',
    },
    severity: 'minor',
    symptoms: {
      en: 'Visible moisture build-up, misting, or water droplets inside the front headlamps or rear light bar.',
      sv: 'Synlig fuktansamling, imma eller vattendroppar inuti främre strålkastare eller bakre ljusramp.',
    },
    diy: {
      en: 'Inspect and clean ventilation caps on back of assemblies. Temporary misting is normal and should clear on drive.',
      sv: 'Inspektera och rengör ventilationslock på baksidan av enheterna. Tillfällig imma är normalt och bör försvinna under körning.',
    },
    dealer: {
      en: 'Replaces light assembly housings if water droplets pool or if internal LED drivers fail.',
      sv: 'Byter ut strålkastarhusen om vattendroppar samlas eller om interna LED-drivrutiner går sönder.',
    },
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

  // Filter issues
  const filteredIssues = issueData.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesTab;

    const title = (isSv ? item.issue.sv : item.issue.en).toLowerCase();
    const affected = (isSv ? item.affectedYears.sv : item.affectedYears.en).toLowerCase();
    const symptoms = (isSv ? item.symptoms.sv : item.symptoms.en).toLowerCase();
    const diyText = (isSv ? item.diy.sv : item.diy.en).toLowerCase();
    const dealerText = (isSv ? item.dealer.sv : item.dealer.en).toLowerCase();

    const matchesSearch =
      title.includes(query) ||
      affected.includes(query) ||
      symptoms.includes(query) ||
      diyText.includes(query) ||
      dealerText.includes(query);

    return matchesTab && matchesSearch;
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
  }, { scope: containerRef, dependencies: [activeTab, searchQuery] });

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

  const getSeverityBadge = (severity: 'critical' | 'moderate' | 'minor') => {
    let colorClass = '';
    let label = '';

    switch (severity) {
      case 'critical':
        colorClass = 'border-[var(--ps-error)] text-[var(--ps-error)] bg-[var(--ps-error)]/5';
        label = t('severityCritical');
        break;
      case 'moderate':
        colorClass = 'border-[var(--ps-gold)] text-[var(--ps-gold)] bg-[var(--ps-gold)]/5';
        label = t('severityModerate');
        break;
      case 'minor':
        colorClass = 'border-[var(--ps-success)] text-[var(--ps-success)] bg-[var(--ps-success)]/5';
        label = t('severityMinor');
        break;
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 border text-[10px] tracking-wider uppercase font-medium rounded-none ${colorClass}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {label}
      </span>
    );
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
              className="text-[11px] uppercase tracking-wider text-[var(--ps-text-secondary)] hover:text-[var(--ps-text)] ml-2 transition-colors"
            >
              {t('resetCompare')}
            </button>
          )}
        </div>

        {/* Category Filter tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[var(--ps-border-light)] pb-4">
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
            const affected = isSv ? item.affectedYears.sv : item.affectedYears.en;
            const symptoms = isSv ? item.symptoms.sv : item.symptoms.en;
            const diyText = isSv ? item.diy.sv : item.diy.en;
            const dealerText = isSv ? item.dealer.sv : item.dealer.en;

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
                  <div className="space-y-1">
                    <h4 className="text-[15px] font-medium leading-snug" style={{ color: 'var(--ps-text)' }}>
                      {title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px]" style={{ color: 'var(--ps-text-secondary)' }}>
                      <span className="font-light">{categoryLabel}</span>
                      <span className="text-[var(--ps-text-tertiary)] font-light">•</span>
                      <span className="font-light">
                        {t('affectedYears')}: {affected}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    {getSeverityBadge(item.severity)}
                    <ChevronDown
                      size={16}
                      className="text-[var(--ps-text-tertiary)] transition-transform duration-250"
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </div>
                </button>

                {/* Details body */}
                {isExpanded && (
                  <div className="border-t border-[var(--ps-border-light)] p-5 bg-[var(--ps-bg-secondary)]/10 grid grid-cols-1 md:grid-cols-3 gap-6">
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

                    {/* Dealer Action Column */}
                    <div className="space-y-2">
                      <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
                        {t('dealerLabel')}
                      </h5>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                        {dealerText}
                      </p>
                    </div>
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
