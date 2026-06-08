import { useState, useRef } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { Search, ChevronDown, Check, Copy, Package, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PartNumberEntry {
  labelKey: string;
  number: string;
  noteKey?: string;
}

interface IssueItem {
  id: string;
  category: 'software' | 'drivetrain' | 'electrical' | 'body';
  severity: 'critical' | 'moderate' | 'minor';
  issueKey: string;
  affectedYearsList: string[];
  symptomsKey: string;
  diyKey: string;
  partNumbers?: PartNumberEntry[];
}

const issueData: IssueItem[] = [
    {
    id: 'ihu-instability',
    category: 'software',
    severity: 'minor',
    issueKey: 'issues_ihu_instability_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23', 'MY24', 'MY25'],
    symptomsKey: 'issues_ihu_instability_symptoms',
    diyKey: 'issues_ihu_instability_diy',
  },
    {
    id: 'tcam-failure',
    category: 'software',
    severity: 'critical',
    issueKey: 'issues_tcam_failure_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptomsKey: 'issues_tcam_failure_symptoms',
    diyKey: 'issues_tcam_failure_diy',
  },
    {
    id: 'rearview-camera-glitch',
    category: 'software',
    severity: 'critical',
    issueKey: 'issues_rearview_camera_glitch_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23', 'MY24', 'MY25'],
    symptomsKey: 'issues_rearview_camera_glitch_symptoms',
    diyKey: 'issues_rearview_camera_glitch_diy',
  },
    {
    id: 'rear-axle-click',
    category: 'drivetrain',
    severity: 'moderate',
    issueKey: 'issues_rear_axle_click_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptomsKey: 'issues_rear_axle_click_symptoms',
    diyKey: 'issues_rear_axle_click_diy',
  },
    {
    id: 'front-suspension-knocking',
    category: 'drivetrain',
    severity: 'moderate',
    issueKey: 'issues_front_suspension_knocking_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptomsKey: 'issues_front_suspension_knocking_symptoms',
    diyKey: 'issues_front_suspension_knocking_diy',
  },
    {
    id: 'propeller-shaft-vibration',
    category: 'drivetrain',
    severity: 'moderate',
    issueKey: 'issues_propeller_shaft_vibration_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptomsKey: 'issues_propeller_shaft_vibration_symptoms',
    diyKey: 'issues_propeller_shaft_vibration_diy',
  },
    {
    id: '12v-battery-drain',
    category: 'electrical',
    severity: 'critical',
    issueKey: 'issues_12v_battery_drain_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptomsKey: 'issues_12v_battery_drain_symptoms',
    diyKey: 'issues_12v_battery_drain_diy',
  },
    {
    id: 'hvch-failure',
    category: 'electrical',
    severity: 'critical',
    issueKey: 'issues_hvch_failure_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptomsKey: 'issues_hvch_failure_symptoms',
    diyKey: 'issues_hvch_failure_diy',
  },
    {
    id: 'power-inverter-failure',
    category: 'electrical',
    severity: 'critical',
    issueKey: 'issues_power_inverter_failure_title',
    affectedYearsList: ['MY21'],
    symptomsKey: 'issues_power_inverter_failure_symptoms',
    diyKey: 'issues_power_inverter_failure_diy',
  },
    {
    id: 'blend-door-actuator',
    category: 'body',
    severity: 'minor',
    issueKey: 'issues_blend_door_actuator_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptomsKey: 'issues_blend_door_actuator_symptoms',
    diyKey: 'issues_blend_door_actuator_diy',
  },
    {
    id: 'door-latch-freezing',
    category: 'body',
    severity: 'moderate',
    issueKey: 'issues_door_latch_freezing_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23'],
    symptomsKey: 'issues_door_latch_freezing_symptoms',
    diyKey: 'issues_door_latch_freezing_diy',
  },
    {
    id: 'lamp-condensation',
    category: 'body',
    severity: 'minor',
    issueKey: 'issues_lamp_condensation_title',
    affectedYearsList: ['All'],
    symptomsKey: 'issues_lamp_condensation_symptoms',
    diyKey: 'issues_lamp_condensation_diy',
  },
    {
    id: 'tailgate-spindle-failure',
    category: 'body',
    severity: 'moderate',
    issueKey: 'issues_tailgate_spindle_failure_title',
    affectedYearsList: ['MY21', 'MY22', 'MY23', 'MY24'],
    symptomsKey: 'issues_tailgate_spindle_failure_symptoms',
    diyKey: 'issues_tailgate_spindle_failure_diy',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLocale();

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
      title={t("copyDiyInstructions")}
    >
      {copied ? (
        <>
          <Check size={12} className="text-[var(--ps-gold)]" />
          <span className="text-[var(--ps-gold)]">{t("copied")}</span>
        </>
      ) : (
        <>
          <Copy size={12} />
          <span>{t("copy")}</span>
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
  const { t } = useLocale();

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

    const title = t(item.issueKey).toLowerCase();
    const symptoms = t(item.symptomsKey).toLowerCase();
    const diyText = t(item.diyKey).toLowerCase();

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
              title={t("clearSearch")}
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
            {t("modelYear")}
          </span>
          {modelYearsList.map((yr) => {
            const isActive = activeYearFilter === yr;
            const label = yr === 'all' ? t('allYears') : yr;
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
            {t("noIssuesMatch")}
          </div>
        ) : (
          filteredIssues.map((item) => {
            const isExpanded = expandedIds.has(item.id);
            const title = t(item.issueKey);
            const symptoms = t(item.symptomsKey);
            const diyText = t(item.diyKey);

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
                        const displayYr = isAll ? t('allYears') : yr;
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
                            {t("referencePartNumbers")}
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
                                  {t(pn.labelKey)}
                                </span>
                                {pn.noteKey && (
                                  <span className="text-[10.5px] leading-snug block mt-0.5" style={{ color: 'var(--ps-text-tertiary)' }}>
                                    {t(pn.noteKey)}
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
                          {t('partNumberDisclaimer')}
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
