import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { Zap, Cpu, ChevronDown, ChevronUp, ShieldAlert, Package } from 'lucide-react';

interface PartNumberEntry {
  label: string;
  number: string;
  note?: string;
}

interface RetrofitItem {
  id: string;
  category: 'oem' | 'aftermarket' | 'diyCoding';
  title: string;
  feasibility: 'easy' | 'medium' | 'hard' | 'expert';
  description: string;
  warning?: string;
  steps?: string[];
  partNumbers?: PartNumberEntry[];
  link?: string;
  linkLabel?: string;
}

const retrofitsData: RetrofitItem[] = [
  {
    id: 'pixel-led',
    category: 'oem',
    title: 'retrofit_pixelLedTitle',
    feasibility: 'hard',
    description: 'retrofit_pixelLedDesc',
    warning: 'retrofit_pixelLedWarning',
    steps: [
      'retrofit_pixelLedStep1',
      'retrofit_pixelLedStep2',
      'retrofit_pixelLedStep3',
      'retrofit_pixelLedStep4',
    ],
  },
  {
    id: 'kick-sensor',
    category: 'oem',
    title: 'retrofit_kickSensorTitle',
    feasibility: 'hard',
    description: 'retrofit_kickSensorDesc',
    warning: 'retrofit_kickSensorWarning',
    partNumbers: [
      {
        label: 'retrofit_kickSensorPn1Label',
        number: '32337498',
        note: 'retrofit_kickSensorPn1Note',
      },
      {
        label: 'retrofit_kickSensorPn2Label',
        number: '32252119',
        note: 'retrofit_kickSensorPn2Note',
      },
    ],
    steps: [
      'retrofit_kickSensorStep1',
      'retrofit_kickSensorStep2',
      'retrofit_kickSensorStep3',
      'retrofit_kickSensorStep4',
      'retrofit_kickSensorStep5',
      'retrofit_kickSensorStep6',
      'retrofit_kickSensorStep7',
    ],
  },
  {
    id: 'magsafe-charging',
    category: 'aftermarket',
    title: 'retrofit_magsafeChargingTitle',
    feasibility: 'easy',
    description: 'retrofit_magsafeChargingDesc',
    steps: [
      'retrofit_magsafeChargingStep1',
      'retrofit_magsafeChargingStep2',
      'retrofit_magsafeChargingStep3',
      'retrofit_magsafeChargingStep4',
    ],
  },
  {
    id: 'mudflaps',
    category: 'aftermarket',
    title: 'retrofit_mudflapsTitle',
    feasibility: 'easy',
    description: 'retrofit_mudflapsDesc',
  },
  {
    id: 'console-insert',
    category: 'diyCoding',
    title: 'retrofit_consoleInsertTitle',
    feasibility: 'easy',
    description: 'retrofit_consoleInsertDesc',
  },
  {
    id: 'orbit-obd2',
    category: 'diyCoding',
    title: 'retrofit_orbitObd2Title',
    feasibility: 'medium',
    description: 'retrofit_orbitObd2Desc',
    steps: [
      'retrofit_orbitObd2Step1',
      'retrofit_orbitObd2Step2',
      'retrofit_orbitObd2Step3',
      'retrofit_orbitObd2Step4',
    ],
  },
  {
    id: 'smartzone-grille',
    category: 'oem',
    title: 'retrofit_smartzoneGrilleTitle',
    feasibility: 'expert',
    description: 'retrofit_smartzoneGrilleDesc',
    warning: 'retrofit_smartzoneGrilleWarning',
    partNumbers: [
      {
        label: 'retrofit_smartzonePn1Label',
        number: '32228862',
        note: 'retrofit_smartzonePn1Note',
      },
      {
        label: 'retrofit_smartzonePn2Label',
        number: '31663679',
        note: 'retrofit_smartzonePn2Note',
      },
      {
        label: 'retrofit_smartzonePn3Label',
        number: '32134966',
        note: 'retrofit_smartzonePn3Note',
      },
    ],
    steps: [
      'retrofit_smartzoneStep1',
      'retrofit_smartzoneStep2',
      'retrofit_smartzoneStep3',
      'retrofit_smartzoneStep4',
      'retrofit_smartzoneStep5',
    ],
  },
  {
    id: 'tow-bar',
    category: 'oem',
    title: 'retrofit_towBarTitle',
    feasibility: 'expert',
    description: 'retrofit_towBarDesc',
    warning: 'retrofit_towBarWarning',
    partNumbers: [
      {
        label: 'retrofit_towBarPn1Label',
        number: '32414268',
        note: 'retrofit_towBarPn1Note',
      },
      {
        label: 'retrofit_towBarPn2Label',
        number: '32386674',
        note: 'retrofit_towBarPn2Note',
      },
    ],
    steps: [
      'retrofit_towBarStep1',
      'retrofit_towBarStep2',
      'retrofit_towBarStep3',
      'retrofit_towBarStep4',
      'retrofit_towBarStep5',
      'retrofit_towBarStep6',
    ],
  },
  {
    id: 'fitcamx-dashcam',
    category: 'aftermarket',
    title: 'retrofit_fitcamxDashcamTitle',
    feasibility: 'easy',
    description: 'retrofit_fitcamxDashcamDesc',
    steps: [
      'retrofit_fitcamxDashcamStep1',
      'retrofit_fitcamxDashcamStep2',
      'retrofit_fitcamxDashcamStep3',
      'retrofit_fitcamxDashcamStep4',
      'retrofit_fitcamxDashcamStep5',
      'retrofit_fitcamxDashcamStep6',
    ],
  },
  {
    id: 'puddle-lights',
    category: 'aftermarket',
    title: 'retrofit_puddleLightsTitle',
    feasibility: 'easy',
    description: 'retrofit_puddleLightsDesc',
    warning: 'retrofit_puddleLightsWarning',
    steps: [
      'retrofit_puddleLightsStep1',
      'retrofit_puddleLightsStep2',
      'retrofit_puddleLightsStep3',
      'retrofit_puddleLightsStep4',
      'retrofit_puddleLightsStep5',
    ],
  },
  {
    id: 'ceramic-tint',
    category: 'aftermarket',
    title: 'retrofit_ceramicTintTitle',
    feasibility: 'medium',
    description: 'retrofit_ceramicTintDesc',
    steps: [
      'retrofit_ceramicTintStep1',
      'retrofit_ceramicTintStep2',
      'retrofit_ceramicTintStep3',
      'retrofit_ceramicTintStep4',
      'retrofit_ceramicTintStep5',
    ],
  },
  {
    id: 'frunk-led',
    category: 'diyCoding',
    title: 'retrofit_frunkLedTitle',
    feasibility: 'easy',
    description: 'retrofit_frunkLedDesc',
    warning: 'retrofit_frunkLedWarning',
    steps: [
      'retrofit_frunkLedStep1',
      'retrofit_frunkLedStep2',
      'retrofit_frunkLedStep3',
      'retrofit_frunkLedStep4',
      'retrofit_frunkLedStep5',
    ],
  },
];

export default function RetrofitsImprovements() {
  const { t } = useLocale();
  const [activeCategory, setActiveCategory] = useState<'all' | 'oem' | 'aftermarket' | 'diyCoding'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPerformanceBoosted, setIsPerformanceBoosted] = useState(false);

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
          const titleText = t(item.title);
          const descText = t(item.description);
          const warningText = item.warning ? t(item.warning) : null;
          const stepsList = item.steps ? item.steps.map((s) => t(s)) : null;

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

                {/* Specific Warning Box */}
                {warningText && (
                  <div className="p-3 bg-[var(--ps-bg-secondary)]/30 border border-[var(--ps-border)] flex gap-2.5 rounded-none">
                    <ShieldAlert size={14} className="text-[var(--ps-gold)] shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                      {warningText}
                    </p>
                  </div>
                )}

                {/* Expanded content / steps */}
                {isExpanded && stepsList && (
                  <div className="pt-4 border-t border-[var(--ps-border-light)] space-y-2.5">
                    <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
                      {t('retrofit_stepsLabel')}
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

                {/* Part Numbers Table */}
                {isExpanded && item.partNumbers && item.partNumbers.length > 0 && (
                  <div className="pt-4 border-t border-[var(--ps-border-light)] space-y-3">
                    <div className="flex items-center gap-1.5">
                      <Package size={13} className="text-[var(--ps-text-tertiary)]" />
                      <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
                        {t('retrofit_refPartNumbers')}
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
                              {t(pn.label)}
                            </span>
                            {pn.note && (
                              <span className="text-[10.5px] leading-snug block mt-0.5" style={{ color: 'var(--ps-text-tertiary)' }}>
                                {t(pn.note)}
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
                      {t('retrofit_partNumberDisclaimer')}
                    </p>
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
                        {t('retrofit_hideSteps')} <ChevronUp size={11} />
                      </>
                    ) : (
                      <>
                        {t('retrofit_viewSteps')} <ChevronDown size={11} />
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
              {isPerformanceBoosted ? t('retrofit_activeOtaUpgrade') : t('retrofit_toggleOtaUpgrade')}
            </button>
          </div>
        </div>

        {/* Visual Bar Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--ps-border-light)]">
          {/* Power comparison */}
          <div className="space-y-3">
            <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
              {t('retrofit_totalOutputPower')}
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
              {t('retrofit_engineTorque')}
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
