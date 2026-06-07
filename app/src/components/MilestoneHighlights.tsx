import { useState, useRef } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MilestoneData {
  year: string;
  label: Record<'en' | 'sv', string>;
  summary: Record<'en' | 'sv', string>;
  bullets: Record<'en' | 'sv', string[]>;
}

const milestoneData: MilestoneData[] = [
  {
    year: 'MY21',
    label: { en: 'Launch Edition', sv: 'Lanseringsutgåva' },
    summary: {
      en: 'The inaugural year of the Polestar 2, launched exclusively in a high-specification Dual Motor variant.',
      sv: 'Introduktionsåret för Polestar 2, som lanserades exklusivt som en välutrustad Dual Motor-variant.',
    },
    bullets: {
      en: [
        'Dual Motor AWD powertrain (300 kW / 408 hp) standard.',
        'Plus and Pilot packages included as standard equipment on all cars.',
        'High gloss black roof segment and pixel LED headlights included.',
        '78 kWh battery capacity supporting up to 150 kW DC charging.',
      ],
      sv: [
        'Drivlina med fyrhjulsdriven Dual Motor (AWD) på 300 kW / 408 hk som standard.',
        'Plus- och Pilot-paket ingick som standardutrustning på alla bilar.',
        'Högglanspolerat svart taksegment och Pixel LED-strålkastare ingick.',
        'Batterikapacitet på 78 kWh med stöd för DC-snabbladdning upp till 150 kW.',
      ],
    },
  },
  {
    year: 'MY22',
    label: { en: 'Drivetrain Expansion', sv: 'Utökat drivlineutbud' },
    summary: {
      en: 'Introduction of Single Motor (Front-Wheel Drive) configurations and the splitting of equipment packs into optional packages.',
      sv: 'Introduktion av framhjulsdrivna (FWD) Single Motor-varianter och uppdelning av utrustningspaketen till tillval.',
    },
    bullets: {
      en: [
        'Launch of Standard Range (initially 64 kWh, upgraded to 69 kWh in March 2022) and Long Range (78 kWh) Single Motor FWD options.',
        'Plus and Pilot packages separated into optional extras.',
        'Introduction of optional Performance pack and standalone ventilated Nappa leather upgrade.',
        'Heat pump introduced as part of the optional Plus pack.',
      ],
      sv: [
        'Lansering av framhjulsdriven Single Motor i utförandena Standard Range (ursprungligen 64 kWh, uppgraderad till 69 kWh i mars 2022) och Long Range (78 kWh).',
        'Plus- och Pilot-paketen blev separata tillval.',
        'Introduktion av Performance-paket som tillval samt ventilerad Nappa-läderklädsel som fristående uppgradering.',
        'Värmepump introducerades som en del av tillvalet Plus-paket.',
      ],
    },
  },
  {
    year: 'MY23',
    label: { en: 'Range & Aesthetic Refinements', sv: 'Räckvidd & designuppdateringar' },
    summary: {
      en: 'Incremental battery cell updates boosting efficiency alongside fresh paint and wheel designs.',
      sv: 'Smärre uppdateringar av battericellerna förbättrade effektiviteten, samtidigt som nya lackfärger och fälgdesigner lanserades.',
    },
    bullets: {
      en: [
        'Optimized cell chemistry slightly increases range on Standard Range models.',
        'New exterior paint options: Space (metallic black) and Jupiter (gold-grey metallic).',
        'Updated standard 19-inch and optional 20-inch wheel designs.',
        'Cabin air quality sensor (PM2.5) added to the Plus package.',
      ],
      sv: [
        'Optimerad cellkemi gav något längre räckvidd för Standard Range-modellerna.',
        'Nya exteriörfärger: Space (metallicsvart) och Jupiter (guldgrå metallic).',
        'Ny design på standardmonterade 19-tumsfälgar och tillvalet 20-tumsfälgar.',
        'Sensor för partikelmätning i kupéluften (PM2.5) lades till i Plus-paketet.',
      ],
    },
  },
  {
    year: 'MY24',
    label: { en: 'Major Facelift & Drivetrain Shift', sv: 'Stort ansiktslyft & ny drivlina' },
    summary: {
      en: 'A massive architectural refresh: Single Motor models transitioned from FWD to Rear-Wheel Drive (RWD) with next-generation motors.',
      sv: 'En omfattande teknisk uppdatering: Single Motor-modellerna gick från framhjulsdrift till bakhjulsdrift (RWD) med nästa generations elmotorer.',
    },
    bullets: {
      en: [
        'Switched from FWD to RWD layout, drastically improving handling and traction.',
        'Next-generation highly efficient inverter and motors, boosting peak ranges up to 22% and acceleration.',
        'New CATL 82 kWh battery pack for Long Range models, raising peak DC charging to 205 kW.',
        'SmartZone shield replaces the mesh grille to house front radar and cameras.',
      ],
      sv: [
        'Skifte från framhjulsdrift (FWD) till bakhjulsdrift (RWD), vilket markant förbättrade vägegenskaper och grepp.',
        'Nästa generations högeffektiva växelriktare (inverter) och elmotorer, vilket ökade räckvidden med upp till 22 % och förbättrade accelerationen.',
        'Nytt 82 kWh CATL-batteripaket för Long Range-modeller, vilket höjde maximal DC-snabbladdning till 205 kW.',
        'SmartZone-panelen ersatte den traditionella grillen och hyser nu den främre radarn och kamerorna.',
      ],
    },
  },
  {
    year: 'MY25',
    label: { en: 'Package Reorganization', sv: 'Omstrukturerade utrustningspaket' },
    summary: {
      en: 'Visual tweaks and reorganization of optional packages to allow more standalone customization.',
      sv: 'Designjusteringar och omstrukturering av tillvalspaket för mer fristående anpassning.',
    },
    bullets: {
      en: [
        'Harman Kardon premium audio separated from the Plus pack and made a standalone option.',
        'Climate pack introduced to bundle heated rear seats, heated steering wheel, and heat pump.',
        'New Storm grey paint and updated interior upholstery choices.',
        'Plus and Pilot packages standard again on late-production models in select markets.',
      ],
      sv: [
        'Harman Kardon Premium Sound lyftes ur Plus-paketet och blev ett fristående tillval.',
        'Klimatpaket (Climate) introducerades som samlar eluppvärmda baksäten, eluppvärmd ratt samt värmepump.',
        'Ny exteriörfärg (Storm-grå) och uppdaterade val för interiörklädsel.',
        'Plus- och Pilot-paketen blev åter standardutrustning på sent producerade bilar på vissa marknader.',
      ],
    },
  },
  {
    year: 'MY26',
    label: { en: 'Hardware & Infotainment Upgrades', sv: 'Processor- & ljuduppgraderingar' },
    summary: {
      en: 'Major processor upgrade to Qualcomm Snapdragon and introduction of high-end audio options.',
      sv: 'Betydande processoruppgradering till Qualcomm Snapdragon samt introduktion av avancerade ljudsystem.',
    },
    bullets: {
      en: [
        'New Qualcomm Snapdragon infotainment processor dramatically improves system responsiveness.',
        'Introduction of the Bowers & Wilkins 14-speaker (1350W) premium sound system option.',
        'New 70 kWh CATL battery pack replaces the previous 69 kWh battery on Standard Range.',
        'Standard Range peak charging increased to 180 kW (up from 135 kW).',
      ],
      sv: [
        'Ny Qualcomm Snapdragon-infotainmentprocessor ger avsevärt snabbare systemrespons.',
        'Introduktion av Bowers & Wilkins premiumljudsystem (14 högtalare, 1350 W) som tillval.',
        'Nytt 70 kWh CATL-batteripaket ersatte det tidigare 69 kWh-batteriet på Standard Range.',
        'Maximal laddhastighet för Standard Range höjdes till 180 kW (tidigare 135 kW).',
      ],
    },
  },
];

export default function MilestoneHighlights() {
  const { locale } = useLocale();
  const [activeYear, setActiveYear] = useState('MY24');
  const detailsRef = useRef<HTMLDivElement>(null);

  const currentMilestone = milestoneData.find((m) => m.year === activeYear)!;
  const isSv = locale === 'sv';
  const label = isSv ? currentMilestone.label.sv : currentMilestone.label.en;
  const summary = isSv ? currentMilestone.summary.sv : currentMilestone.summary.en;
  const bullets = isSv ? currentMilestone.bullets.sv : currentMilestone.bullets.en;

  /* GSAP animation when switching active year */
  useGSAP(() => {
    if (!detailsRef.current) return;

    gsap.fromTo(
      detailsRef.current,
      { opacity: 0, x: 15 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
    );
  }, [activeYear]);

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="border border-[var(--ps-border)] flex overflow-x-auto scrollbar-hide divide-x divide-[var(--ps-border-light)] bg-[var(--ps-bg)]">
        {milestoneData.map((m) => {
          const isActive = m.year === activeYear;
          return (
            <button
              key={m.year}
              onClick={() => setActiveYear(m.year)}
              className="flex-1 min-w-[70px] py-3 text-[12px] uppercase tracking-[0.15em] font-normal transition-colors duration-150 rounded-none text-center"
              style={{
                backgroundColor: isActive ? 'var(--ps-pill-active-bg)' : 'transparent',
                color: isActive ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'var(--ps-bg-secondary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {m.year}
            </button>
          );
        })}
      </div>

      {/* Details Box */}
      <div
        ref={detailsRef}
        className="p-6 border border-[var(--ps-border)] bg-[var(--ps-bg-secondary)]/10 space-y-4 rounded-none relative"
      >
        {/* Subtle corner detail */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--ps-border)]" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--ps-border)]" />

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
          <span className="text-[20px] font-light tracking-[-0.01em]" style={{ color: 'var(--ps-text)' }}>
            {activeYear}
          </span>
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--ps-gold)]">
            {label}
          </span>
        </div>

        <p className="text-[13px] leading-relaxed max-w-[700px]" style={{ color: 'var(--ps-text-secondary)' }}>
          {summary}
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 pt-2">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--ps-gold)]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
