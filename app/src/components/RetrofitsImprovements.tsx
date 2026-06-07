import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { Zap, Cpu, ChevronDown, ChevronUp } from 'lucide-react';

interface RetrofitItem {
  id: string;
  category: 'oem' | 'aftermarket' | 'diyCoding';
  title: Record<'en' | 'sv', string>;
  feasibility: 'easy' | 'medium' | 'hard' | 'expert';
  description: Record<'en' | 'sv', string>;
  steps?: Record<'en' | 'sv', string[]>;
  link?: string;
  linkLabel?: Record<'en' | 'sv', string>;
}

const retrofitsData: RetrofitItem[] = [
  {
    id: 'pixel-led',
    category: 'oem',
    title: {
      en: 'Pixel Active High Beam Software Enable',
      sv: 'Pixel Aktivt Helljus Mjukvaruaktivering',
    },
    feasibility: 'hard',
    description: {
      en: 'Enable steering-responsive adaptive headlights that dynamically dim individual pixel sections to prevent glare for oncoming drivers. Hardware must be physically present on Launch Edition or Pilot package cars (MY21-MY23). Note that MY22-MY23 cars with Pilot Lite packages lack the pixel LED light source assemblies.',
      sv: 'Aktivera styrresponsiva adaptiva strålkastare som dynamiskt dämpar enskilda pixeldelar för att förhindra bländning av mötande förare. Hårdvaran måste finnas fysiskt på Launch Edition eller bilar med Pilot-paket (MY21-MY23). Observera att MY22-MY23-bilar med Pilot Lite-paket saknar pixelljuskällorna.',
    },
    steps: {
      en: [
        'Verify physical headlamps feature the "Polestar Pixel Technology" lettering on the inner bezel.',
        'Connect an OBD2 cable/adapter to the vehicle OBD port.',
        'Use third-party Car Configuration File (CCF) editing tools (like Orbit) to change the Headlight Configuration value to Pixel Adaptive.',
        'Perform an ECU reset (CEM and VMCU) to apply and index the new headlight settings.',
      ],
      sv: [
        'Verifiera att de fysiska strålkastarna har texten "Polestar Pixel Technology" på den inre ramen.',
        'Anslut en OBD2-kabel/adapter till fordonets OBD-uttag.',
        'Använd tredjepartsverktyg för ändring av Car Configuration File (CCF), till exempel Orbit, för att ändra strålkastarinställningen till Pixel Adaptive.',
        'Utför en återställning av styrenheter (CEM och VMCU) för att tillämpa och indexera de nya strålkastarinställningarna.',
      ],
    },
  },
  {
    id: 'kick-sensor',
    category: 'oem',
    title: {
      en: 'Power Tailgate Kick Sensor Retrofit',
      sv: 'Kick-sensor för baklucka Retrofit',
    },
    feasibility: 'medium',
    description: {
      en: 'Add the hands-free tailgate kick sensor module that was deleted from select late MY22 vehicles due to global semiconductor shortages. Most cars still have the wiring connector pre-installed in the bumper harness.',
      sv: 'Lägg till den handsfree-styrda kick-sensorn för bakluckan som togs bort från vissa sena MY22-fordon på grund av den globala halvledarbristen. De flesta bilar har fortfarande kablageförbindelsen förinstallerad bakom stötfångaren.',
    },
    steps: {
      en: [
        'Purchase the kick sensor module (Part number 32252119 or equivalent) and dual antenna tubes.',
        'Safely raise the rear of the car or unclip the lower rear bumper valence panel.',
        'Mount the sensor antenna tubes into the pre-marked retaining clips on the inside bumper cover.',
        'Locate the dummy plug on the bumper harness and plug in the sensor control module.',
        'Clip everything back together. No software coding is required; the tailgate module detects the hardware automatically on start.',
      ],
      sv: [
        'Köp kick-sensormodulen (artikelnummer 32252119 eller motsvarande) samt de dubbla antennrören.',
        'Lossa försiktigt den nedre delen av bakre stötfångarplasten.',
        'Montera sensorantennrören i de förberedda fästklämmorna på insidan av stötfångarhöljet.',
        'Leta reda på blindpluggen på stötfångarkablage och anslut sensorns styrmodul.',
        'Klicka tillbaka delarna. Ingen mjukvarukodning krävs; bakluckans modul upptäcker hårdvaran automatiskt vid start.',
      ],
    },
  },
  {
    id: 'magsafe-charging',
    category: 'aftermarket',
    title: {
      en: 'MagSafe Console Wireless Charger Upgrade',
      sv: 'MagSafe Magnetisk Trådlös Laddare',
    },
    feasibility: 'easy',
    description: {
      en: 'The standard OEM wireless charging pad is slow, generates significant heat, and allows devices to slide off on turns. Upgrading to a custom 3D-printed MagSafe tray mount provides fast, stable charging and holds the phone securely.',
      sv: 'Den trådlösa standardladdaren i bilen är långsam, genererar mycket värme och gör att telefonen glider runt i kurvorna. Att uppgradera till ett specialanpassat 3D-utskrivet MagSafe-fack ger snabb och stabil laddning samt håller mobilen på plats.',
    },
    steps: {
      en: [
        'Print or purchase a custom center console wireless charging replacement insert.',
        'Insert a standard 15W MagSafe magnetic puck into the designated circular cutout.',
        'Route the USB-C power wire under the trim to the console USB ports.',
        'Place the assembly in the wireless charging slot for a flush, OEM-like look.',
      ],
      sv: [
        'Skriv ut eller köp en anpassad trådlös laddningsinsats för mittkonsolen.',
        'Placera en standard 15W MagSafe-laddningspuck i det avsedda runda uttaget.',
        'Dra USB-C-kabeln under panelen till mittkonsolens USB-portar.',
        'Placera monteringen i det trådlösa laddningsfacket för ett snyggt, integrerat utseende.',
      ],
    },
  },
  {
    id: 'mudflaps',
    category: 'aftermarket',
    title: {
      en: 'Fitted Contoured Mud Guards',
      sv: 'Formanpassade Stänkskydd',
    },
    feasibility: 'easy',
    description: {
      en: 'Polestar 2 paint is susceptible to stone chips and road debris damage along the lower sills and rear wheel arches due to the flared body styling. Fitted aftermarket mud guards offer subtle, functional protection.',
      sv: 'Lacken på Polestar 2 är känslig för stenskott och vägsmuts längs trösklarna och bakre hjulhusen på grund av den utställda karossformen. Formanpassade stänkskydd ger diskret och funktionellt skydd.',
    },
  },
  {
    id: 'console-insert',
    category: 'diyCoding',
    title: {
      en: 'Dual-Tier Center Armrest Organizer',
      sv: 'Förvaringsfack för Mittkonsol',
    },
    feasibility: 'easy',
    description: {
      en: 'A drop-in divider tray designed specifically for the deep under-armrest storage well. It creates a practical upper shelf for sunglasses, keys, and coins while leaving the lower main compartment accessible.',
      sv: 'En insatslåda speciellt utformad för det djupa förvaringsfacket under armstödet. Den skapar en praktisk övre hylla för solglasögon, nycklar och mynt samtidigt som det nedre huvudfacket förblir tillgängligt.',
    },
  },
  {
    id: 'orbit-obd2',
    category: 'diyCoding',
    title: {
      en: 'Orbit Car Configuration Coding',
      sv: 'Bilkonfiguration via Orbit',
    },
    feasibility: 'medium',
    description: {
      en: 'Modify your vehicle Car Configuration File (CCF) using Orbit software. This utility lets you connect your computer to the OBD port to unlock factory features that were disabled in your region, modify lighting patterns, or configure pilot package upgrades.',
      sv: 'Ändra bilens konfigurationsfil (CCF) med programvaran Orbit. Det här verktyget gör det möjligt att ansluta en dator till OBD-uttaget för att låsa upp fabriksfunktioner som inaktiverats i din region, ändra ljusmönster eller konfigurera förarassistentuppgraderingar.',
    },
    steps: {
      en: [
        'Obtain a compatible OBD2 adapter (OBDLink MX+ or an ENET cable with a USB-C Ethernet adapter).',
        'Download Orbit and purchase a subscription license.',
        'Connect the adapter to the OBD2 port located in the driver-side footwell.',
        'Read current CCF configurations and make adjustments carefully. Keep a backup copy of your original configuration file.',
      ],
      sv: [
        'Skaffa en kompatibel OBD2-adapter (OBDLink MX+ eller en ENET-kabel med USB-C-nätverksadapter).',
        'Ladda ner Orbit och köp en prenumerationslicens.',
        'Anslut adaptern till OBD2-uttaget i fotutrymmet på förarsidan.',
        'Läs in aktuella CCF-inställningar och gör ändringar försiktigt. Spara alltid en säkerhetskopia av din ursprungliga konfigurationsfil.',
      ],
    },
  },
];

export default function RetrofitsImprovements() {
  const { locale, t } = useLocale();
  const [activeCategory, setActiveCategory] = useState<'all' | 'oem' | 'aftermarket' | 'diyCoding'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPerformanceBoosted, setIsPerformanceBoosted] = useState(false);

  const isSv = locale === 'sv';

  const filteredItems = retrofitsData.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getFeasibilityLabel = (level: string) => {
    switch (level) {
      case 'easy':
        return t('feasibilityEasy');
      case 'medium':
        return t('feasibilityMedium');
      case 'hard':
        return t('feasibilityHard');
      case 'expert':
        return t('feasibilityExpert');
      default:
        return level;
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--ps-border)] pb-4">
        {(
          [
            { id: 'all', label: t('categoryAll') },
            { id: 'oem', label: t('categoryOem') },
            { id: 'aftermarket', label: t('categoryAftermarket') },
            { id: 'diyCoding', label: t('categoryDiyCoding') },
          ] as const
        ).map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-4 py-2 text-[12px] uppercase tracking-wider transition-all duration-150 border rounded-none"
              style={{
                borderColor: isActive ? 'var(--ps-text)' : 'transparent',
                backgroundColor: isActive ? 'var(--ps-pill-active-bg)' : 'transparent',
                color: isActive ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--ps-bg-secondary)';
                  e.currentTarget.style.color = 'var(--ps-text)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--ps-text-secondary)';
                }
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid Layout of Retrofit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const titleText = isSv ? item.title.sv : item.title.en;
          const descText = isSv ? item.description.sv : item.description.en;
          const stepsList = item.steps ? (isSv ? item.steps.sv : item.steps.en) : null;

          return (
            <div
              key={item.id}
              className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-5 rounded-none flex flex-col justify-between transition-all duration-200 hover:border-[var(--ps-text-secondary)]"
            >
              <div className="space-y-4">
                {/* Badge Category */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 border border-[var(--ps-border)]"
                    style={{
                      color:
                        item.category === 'oem'
                          ? 'var(--ps-gold)'
                          : item.category === 'aftermarket'
                          ? 'var(--ps-text-secondary)'
                          : 'var(--ps-text)',
                      backgroundColor: 'var(--ps-bg-secondary)/10',
                    }}
                  >
                    {item.category === 'oem'
                      ? t('oemUpgrade')
                      : item.category === 'aftermarket'
                      ? t('aftermarket')
                      : t('diyCoding')}
                  </span>

                  {/* Feasibility Difficulty Badge */}
                  <span className="text-[11px]" style={{ color: 'var(--ps-text-tertiary)' }}>
                    {getFeasibilityLabel(item.feasibility)}
                  </span>
                </div>

                <h3 className="text-[17px] font-medium" style={{ color: 'var(--ps-text)' }}>
                  {titleText}
                </h3>

                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                  {descText}
                </p>

                {/* Expanded content / steps */}
                {isExpanded && stepsList && (
                  <div className="pt-4 border-t border-[var(--ps-border-light)] space-y-2.5">
                    <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
                      Instructions / Steps:
                    </h5>
                    <ol className="list-decimal pl-4 text-[12.5px] space-y-2" style={{ color: 'var(--ps-text-secondary)' }}>
                      {stepsList.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {stepsList && (
                <div className="mt-5 pt-4 border-t border-[var(--ps-border-light)] flex items-center justify-end">
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--ps-border)] text-[11px] uppercase tracking-wider hover:border-[var(--ps-text)] transition-colors rounded-none"
                    style={{ color: 'var(--ps-text-secondary)' }}
                  >
                    {isExpanded ? (
                      <>
                        Hide steps <ChevronUp size={11} />
                      </>
                    ) : (
                      <>
                        View steps <ChevronDown size={11} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* OEM Performance Software Upgrade OTA Widget */}
      <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-6 rounded-none space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1 md:max-w-2xl">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[var(--ps-gold)] font-semibold animate-pulse" />
              <h3 className="text-[18px] font-semibold" style={{ color: 'var(--ps-text)' }}>
                {t('perfSoftwareTitle')}
              </h3>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('perfSoftwareDesc')}
            </p>
          </div>

          <div className="shrink-0 flex items-center self-start">
            <button
              onClick={() => setIsPerformanceBoosted((b) => !b)}
              className="px-4 py-2 text-[11px] uppercase tracking-widest font-normal transition-all duration-200 border rounded-none"
              style={{
                backgroundColor: isPerformanceBoosted ? 'var(--ps-gold)' : 'transparent',
                borderColor: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-border)',
                color: isPerformanceBoosted ? '#000000' : 'var(--ps-text)',
              }}
            >
              {isPerformanceBoosted ? 'Active: +68 HP / +20 Nm' : 'Toggle OTA Upgrade'}
            </button>
          </div>
        </div>

        {/* Visual Bar Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--ps-border-light)]">
          {/* Power comparison */}
          <div className="space-y-3">
            <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
              Total Output Power (kW)
            </h5>
            <div className="space-y-2">
              {/* Standard */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-light">
                  <span style={{ color: 'var(--ps-text-secondary)' }}>{t('standardPower')}</span>
                  <span className="font-semibold" style={{ color: 'var(--ps-text)' }}>300 kW (408 hp)</span>
                </div>
                <div className="w-full bg-[var(--ps-bg-secondary)] h-[4px]">
                  <div
                    className="bg-[var(--ps-text-secondary)] h-full transition-all duration-500"
                    style={{ width: '85%' }}
                  />
                </div>
              </div>

              {/* Upgraded */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-light">
                  <span style={{ color: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text-secondary)' }}>
                    {t('upgradedPower')}
                  </span>
                  <span className="font-semibold" style={{ color: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text)' }}>
                    350 kW (476 hp)
                  </span>
                </div>
                <div className="w-full bg-[var(--ps-bg-secondary)] h-[4px]">
                  <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{
                      width: isPerformanceBoosted ? '100%' : '85%',
                      backgroundColor: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text-secondary)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Torque comparison */}
          <div className="space-y-3">
            <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
              Engine Torque (Nm)
            </h5>
            <div className="space-y-2">
              {/* Standard */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-light">
                  <span style={{ color: 'var(--ps-text-secondary)' }}>{t('standardTorque')}</span>
                  <span className="font-semibold" style={{ color: 'var(--ps-text)' }}>660 Nm</span>
                </div>
                <div className="w-full bg-[var(--ps-bg-secondary)] h-[4px]">
                  <div
                    className="bg-[var(--ps-text-secondary)] h-full transition-all duration-500"
                    style={{ width: '91%' }}
                  />
                </div>
              </div>

              {/* Upgraded */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-light">
                  <span style={{ color: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text-secondary)' }}>
                    {t('upgradedTorque')}
                  </span>
                  <span className="font-semibold" style={{ color: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text)' }}>
                    680 Nm
                  </span>
                </div>
                <div className="w-full bg-[var(--ps-bg-secondary)] h-[4px]">
                  <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{
                      width: isPerformanceBoosted ? '100%' : '91%',
                      backgroundColor: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text-secondary)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orbit & Coding Guide block */}
      <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-6 rounded-none space-y-4">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-[var(--ps-text-secondary)]" />
          <h3 className="text-[18px] font-semibold" style={{ color: 'var(--ps-text)' }}>
            {t('orbitGuideTitle')}
          </h3>
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('orbitGuideDesc')}
        </p>

        <ul className="space-y-2 text-[13px] pl-5 list-disc" style={{ color: 'var(--ps-text-secondary)' }}>
          <li>
            <strong style={{ color: 'var(--ps-text)' }}>{t('pixelActivation')}</strong>
          </li>
          <li>
            <strong style={{ color: 'var(--ps-text)' }}>{t('pilotAssistEnable')}</strong>
          </li>
          <li>
            <strong style={{ color: 'var(--ps-text)' }}>{t('regionChange')}</strong>
          </li>
        </ul>

        <div className="bg-[var(--ps-bg-secondary)]/30 p-4 rounded-none space-y-1">
          <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
            {t('obdHardwareTitle')}
          </h5>
          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
            {t('obdHardwareDesc')}
          </p>
        </div>
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
          {t('retrofitsDisclaimer')}
        </p>
      </div>
    </div>
  );
}
