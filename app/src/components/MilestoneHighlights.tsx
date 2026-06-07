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
      sv: 'Polestar 2:s premiärår, lanserades exklusivt i en högspecificerad Dual Motor-variant.',
    },
    bullets: {
      en: [
        'Dual Motor AWD powertrain (300 kW / 408 hp) standard.',
        'Plus and Pilot packages included as standard equipment on all cars.',
        'High gloss black roof segment and pixel LED headlights included.',
        '78 kWh battery capacity supporting up to 150 kW DC charging.',
      ],
      sv: [
        'Drivlina med Dual Motor AWD (300 kW / 408 hk) standard.',
        'Plus- och Pilot-paket ingår som standardutrustning på alla bilar.',
        'Högglansigt svart taksegment och pixel-LED-strålkastare ingår.',
        '78 kWh batterikapacitet med stöd för upp till 150 kW DC-snabbladdning.',
      ],
    },
  },
  {
    year: 'MY22',
    label: { en: 'Drivetrain Expansion', sv: 'Drivlineexpansion' },
    summary: {
      en: 'Introduction of Single Motor (Front-Wheel Drive) configurations and the splitting of equipment packs into optional packages.',
      sv: 'Introduktion av Single Motor (framhjulsdrift) och uppdelning av utrustningspaket till tillval.',
    },
    bullets: {
      en: [
        'Launch of Standard Range (69 kWh) and Long Range (78 kWh) Single Motor FWD options.',
        'Plus and Pilot packages separated into optional extras.',
        'Introduction of optional Performance pack and standalone ventilated Nappa leather upgrade.',
        'Heat pump introduced as part of the optional Plus pack.',
      ],
      sv: [
        'Lansering av framhjulsdrivna Single Motor Standard Range (69 kWh) och Long Range (78 kWh).',
        'Plus- och Pilot-paket separerades till separata tillval.',
        'Introduktion av valbart Performance-paket och ventilerat Nappa-läder.',
        'Värmepump introducerades som en del av det valbara Plus-paketet.',
      ],
    },
  },
  {
    year: 'MY23',
    label: { en: 'Range & Aesthetic Refinements', sv: 'Räckvidd & Designuppdateringar' },
    summary: {
      en: 'Incremental battery cell updates boosting efficiency alongside fresh paint and wheel designs.',
      sv: 'Inkrementella batteriuppdateringar som ökade effektiviteten, samt nya lacker och fälgar.',
    },
    bullets: {
      en: [
        'Optimized cell chemistry slightly increases range on Standard Range models.',
        'New exterior paint options: Space (metallic black) and Jupiter (gold-grey metallic).',
        'Updated standard 19-inch and optional 20-inch wheel designs.',
        'Cabin air quality sensor (PM2.5) added to the Plus package.',
      ],
      sv: [
        'Optimerad cellkemi ökade räckvidden något på Standard Range-modellerna.',
        'Nya lackfärger: Space (metallic-svart) och Jupiter (guld-grå metallic).',
        'Uppdaterad design på standard 19" och tillval 20" fälgar.',
        'Kupéluftfiltersensor (PM2.5) lades till i Plus-paketet.',
      ],
    },
  },
  {
    year: 'MY24',
    label: { en: 'Major Facelift & Drivetrain Shift', sv: 'Stor Ansiktslyftning & Drivlinebyte' },
    summary: {
      en: 'A massive architectural refresh: Single Motor models transitioned from FWD to Rear-Wheel Drive (RWD) with next-generation motors.',
      sv: 'En massiv arkitektonisk uppdatering: Single Motor-modellerna bytte från framhjulsdrift till bakhjulsdrift (RWD) med nästa generations motorer.',
    },
    bullets: {
      en: [
        'Switched from FWD to RWD layout, drastically improving handling and traction.',
        'Next-generation highly efficient inverter and motors, boosting peak ranges up to 22% and acceleration.',
        'New CATL 82 kWh battery pack for Long Range models, raising peak DC charging to 205 kW.',
        'SmartZone shield replaces the mesh grille to house front radar and cameras.',
      ],
      sv: [
        'Bytte från framhjulsdrift (FWD) till bakhjulsdrift (RWD) för kraftigt förbättrad körkänsla.',
        'Nästa generations högeffektiva växelriktare och motorer, vilket ökade räckvidden med upp till 22%.',
        'Nytt CATL 82 kWh batteripaket för Long Range, vilket höjde max DC-laddning till 205 kW.',
        'SmartZone-front ersatte den traditionella grillen för att husera radar och kameror.',
      ],
    },
  },
  {
    year: 'MY25',
    label: { en: 'Package Reorganization', sv: 'Paketomstrukturering' },
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
        'Harman Kardon-ljudet separerades från Plus-paketet och blev ett fristående tillval.',
        'Climate-paket introducerades för att bunta ihop baksätesvärme, rattvärme och värmepump.',
        'Ny Storm-grå lackfärg och uppdaterade interiörklädselval.',
        'Plus- och Pilot-paket blev åter standard på sena modeller på vissa marknader.',
      ],
    },
  },
  {
    year: 'MY26',
    label: { en: 'Hardware & Infotainment Upgrades', sv: 'Hårdvara & Infotainmentuppgraderingar' },
    summary: {
      en: 'Major processor upgrade to Qualcomm Snapdragon and introduction of high-end audio options.',
      sv: 'Stor processoruppgradering till Qualcomm Snapdragon samt introduktion av Bowers & Wilkins.',
    },
    bullets: {
      en: [
        'New Qualcomm Snapdragon infotainment processor dramatically improves system responsiveness.',
        'Introduction of the Bowers & Wilkins 14-speaker (1350W) premium sound system option.',
        'New 70 kWh CATL battery pack replaces the previous 69 kWh battery on Standard Range.',
        'Standard Range peak charging increased to 180 kW (up from 135 kW).',
      ],
      sv: [
        'Ny Qualcomm Snapdragon infotainmentprocessor ger betydligt snabbare systemrespons.',
        'Introduktion av Bowers & Wilkins premiumljudsystem (14 högtalare, 1350W) som tillval.',
        'Nytt 70 kWh CATL-batteripaket ersätter tidigare 69 kWh batteri på Standard Range.',
        'Standard Range maxladdning höjd till 180 kW (upp från 135 kW).',
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
      <div className="border border-[var(--ps-border)] grid grid-cols-6 divide-x divide-[var(--ps-border-light)] bg-[var(--ps-bg)]">
        {milestoneData.map((m) => {
          const isActive = m.year === activeYear;
          return (
            <button
              key={m.year}
              onClick={() => setActiveYear(m.year)}
              className="py-3 text-[12px] uppercase tracking-[0.15em] font-normal transition-colors duration-150 rounded-none"
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
