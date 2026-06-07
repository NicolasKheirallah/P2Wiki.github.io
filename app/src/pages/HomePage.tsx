import { Link } from 'react-router';
import { useLocale } from '@/contexts/LocaleContext';
import { Sliders, ShieldAlert, Cpu, Wrench, Zap, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { t } = useLocale();

  const cards = [
    {
      to: '/specs',
      index: '01',
      title: t('tabSpecs'),
      desc: t('homeSpecsDesc'),
      icon: Sliders,
    },
    {
      to: '/known-issues',
      index: '02',
      title: t('tabKnownIssues'),
      desc: t('homeKnownIssuesDesc'),
      icon: ShieldAlert,
    },
    {
      to: '/3d-printing',
      index: '03',
      title: t('tabPrinting'),
      desc: t('homePrintingDesc'),
      icon: Cpu,
    },
    {
      to: '/service',
      index: '04',
      title: t('tabService'),
      desc: t('homeServiceDesc'),
      icon: Wrench,
    },
    {
      to: '/charging',
      index: '05',
      title: t('tabCharging'),
      desc: t('homeChargingDesc'),
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section — Minimalist Typographic Layout with Spacious Whitespace */}
      <section className="max-w-[700px] space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[var(--ps-text-tertiary)]">
            01 / OVERVIEW
          </span>
          <h1 className="text-[54px] sm:text-[64px] font-extralight tracking-[-0.03em] leading-[1.05]" style={{ color: 'var(--ps-text)' }}>
            Polestar 2
          </h1>
          <span className="text-[11px] font-normal tracking-[0.3em] uppercase text-[var(--ps-gold)] block">
            Specifications & Buying Guide
          </span>
        </div>

        <p className="text-[14px] leading-relaxed max-w-[480px]" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('homeSubtitle')}
        </p>

        <div className="pt-2">
          <Link
            to="/specs"
            className="inline-flex items-center gap-4 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] transition-all duration-300 rounded-none border border-[var(--ps-text)] hover:bg-[var(--ps-text)] hover:text-[var(--ps-bg)]"
            style={{
              backgroundColor: 'var(--ps-pill-active-bg)',
              color: 'var(--ps-pill-active-text)',
            }}
          >
            {t('homeCta')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Grid of Sections — Architectural Segmented Border Layout */}
      <section>
        <div className="border border-[var(--ps-border)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[var(--ps-border-light)] bg-[var(--ps-bg)]">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={idx}
                to={card.to}
                className="group block p-6 transition-colors duration-300 hover:bg-[var(--ps-bg-secondary)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-widest text-[var(--ps-text-tertiary)]">
                    {card.index}
                  </span>
                  <IconComponent
                    size={16}
                    className="text-[var(--ps-text-secondary)] transition-colors duration-300 group-hover:text-[var(--ps-gold)]"
                  />
                </div>

                <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] mt-12 mb-3 transition-colors duration-300 group-hover:text-[var(--ps-gold)]" style={{ color: 'var(--ps-text)' }}>
                  {card.title}
                </h3>

                <p className="text-[12px] leading-relaxed min-h-[60px]" style={{ color: 'var(--ps-text-secondary)' }}>
                  {card.desc}
                </p>

                <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[var(--ps-text-tertiary)] group-hover:text-[var(--ps-text)] transition-colors duration-300">
                  <span>Explore</span>
                  <ArrowRight
                    size={10}
                    className="transform transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
