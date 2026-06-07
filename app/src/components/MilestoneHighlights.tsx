import { useState, useRef } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MilestoneData {
  year: string;
  labelKey: string;
  summaryKey: string;
  bulletKeys: string[];
}

const milestoneData: MilestoneData[] = [
  {
    year: 'MY21',
    labelKey: 'milestone_my21_label',
    summaryKey: 'milestone_my21_summary',
    bulletKeys: [
      'milestone_my21_bullet0',
      'milestone_my21_bullet1',
      'milestone_my21_bullet2',
      'milestone_my21_bullet3',
    ],
  },
  {
    year: 'MY22',
    labelKey: 'milestone_my22_label',
    summaryKey: 'milestone_my22_summary',
    bulletKeys: [
      'milestone_my22_bullet0',
      'milestone_my22_bullet1',
      'milestone_my22_bullet2',
      'milestone_my22_bullet3',
    ],
  },
  {
    year: 'MY23',
    labelKey: 'milestone_my23_label',
    summaryKey: 'milestone_my23_summary',
    bulletKeys: [
      'milestone_my23_bullet0',
      'milestone_my23_bullet1',
      'milestone_my23_bullet2',
      'milestone_my23_bullet3',
    ],
  },
  {
    year: 'MY24',
    labelKey: 'milestone_my24_label',
    summaryKey: 'milestone_my24_summary',
    bulletKeys: [
      'milestone_my24_bullet0',
      'milestone_my24_bullet1',
      'milestone_my24_bullet2',
      'milestone_my24_bullet3',
    ],
  },
  {
    year: 'MY25',
    labelKey: 'milestone_my25_label',
    summaryKey: 'milestone_my25_summary',
    bulletKeys: [
      'milestone_my25_bullet0',
      'milestone_my25_bullet1',
      'milestone_my25_bullet2',
      'milestone_my25_bullet3',
    ],
  },
  {
    year: 'MY26',
    labelKey: 'milestone_my26_label',
    summaryKey: 'milestone_my26_summary',
    bulletKeys: [
      'milestone_my26_bullet0',
      'milestone_my26_bullet1',
      'milestone_my26_bullet2',
      'milestone_my26_bullet3',
    ],
  },
];

export default function MilestoneHighlights() {
  const { t } = useLocale();
  const [activeYear, setActiveYear] = useState('MY24');
  const detailsRef = useRef<HTMLDivElement>(null);

  const currentMilestone = milestoneData.find((m) => m.year === activeYear)!;

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
            {t(currentMilestone.labelKey)}
          </span>
        </div>

        <p className="text-[13px] leading-relaxed max-w-[700px]" style={{ color: 'var(--ps-text-secondary)' }}>
          {t(currentMilestone.summaryKey)}
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 pt-2">
          {currentMilestone.bulletKeys.map((key, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--ps-gold)]" />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
