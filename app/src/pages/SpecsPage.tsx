import { useState, useRef, useCallback, useMemo } from 'react';
import { useMarket } from '@/contexts/MarketContext';
import { useLocale } from '@/contexts/LocaleContext';
import { getCategoriesForMarket, getPaintColorsForMarket } from '@/data/marketData';
import { modelYearLabels } from '@/data/specData';
import type { Category } from '@/types/spec';
import Sidebar from '@/components/Sidebar';
import FilterPills from '@/components/FilterPills';
import PackageFilterPills from '@/components/PackageFilterPills';
import SpecTable from '@/components/SpecTable';
import PaintSection from '@/components/PaintSection';
import MilestoneHighlights from '@/components/MilestoneHighlights';
import { Globe, Search, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const specSectionIds = ['keys', 'infotainment', 'wheels', 'performance', 'seats', 'lights', 'safety', 'comfort', 'charging', 'packs', 'paint'];

export default function SpecsPage() {
  const { market, marketInfo } = useMarket();
  const { t } = useLocale();

  /* State filters & helpers */
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePackage, setActivePackage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<Set<number>>(new Set([0, 1, 2, 3, 4, 5, 6]));
  const [pinnedColumns, setPinnedColumns] = useState<Set<number>>(new Set());
  const [activeSection, setActiveSection] = useState('keys');
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  /* Market-aware data */
  const marketCategories = useMemo(() => getCategoriesForMarket(market), [market]);
  const marketPaintColors = useMemo(() => getPaintColorsForMarket(market), [market]);

  /* Filter categories by active category, search, and package options */
  const filteredCategories = useMemo<Category[]>(() => {
    let result = activeFilter === 'all' ? marketCategories : marketCategories.filter((c) => c.id === activeFilter);

    // Apply Live Search Filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result
        .map((cat) => ({
          ...cat,
          features: cat.features.filter(
            (f) =>
              t(f.name).toLowerCase().includes(term) ||
              (f.notes && t(f.notes).toLowerCase().includes(term))
          ),
        }))
        .filter((cat) => cat.features.length > 0);
    }

    // Apply Package Filter
    if (activePackage !== 'all') {
      result = result
        .map((cat) => ({
          ...cat,
          features: cat.features.filter((f) =>
            f.values.some((v) => {
              const trimmed = v.trim();
              if (activePackage === 'Plus') return trimmed === 'Plus' || (trimmed.includes('Plus') && !trimmed.includes('Perf'));
              if (activePackage === 'Pilot') return trimmed === 'Pilot' || trimmed.startsWith('Pilot');
              return trimmed.includes(activePackage);
            })
          ),
        }))
        .filter((cat) => cat.features.length > 0);
    }

    return result;
  }, [activeFilter, activePackage, searchTerm, marketCategories, t]);

  /* Dynamically update Sidebar sections list to match only visible sections */
  const visibleSidebarSections = useMemo(() => {
    const activeIds = specSectionIds.filter((id) => {
      if (id === 'paint') return true; // paint section is always present below the table
      return filteredCategories.some((c) => c.id === id);
    });
    return activeIds;
  }, [filteredCategories]);

  const handleFilterChange = useCallback((filter: string) => setActiveFilter(filter), []);
  const handlePackageChange = useCallback((pkg: string) => setActivePackage(pkg), []);

  const handleSectionClick = useCallback((id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const toggleColumn = useCallback((idx: number) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        if (next.size > 1) {
          next.delete(idx);
          // Auto unpin if hidden
          setPinnedColumns((pinned) => {
            const copy = new Set(pinned);
            copy.delete(idx);
            return copy;
          });
        }
      } else {
        next.add(idx);
      }
      return next;
    });
  }, []);

  const handleColumnClick = useCallback((idx: number) => {
    setPinnedColumns((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }, []);

  /* Scroll spy for Sidebar navigation */
  useGSAP(() => {
    visibleSidebarSections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#section-${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, { scope: mainRef, dependencies: [visibleSidebarSections] });

  const subtitleKey = market === 'se' ? 'seSpecs' : market === 'us' ? 'usSpecs' : 'ukSpecs';

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div>
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--ps-text-tertiary)] block mb-1">
          01 / Model Overview
        </span>
        <div className="flex items-center gap-3 mt-2 flex-wrap float-right">
          <span
            className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 border border-[var(--ps-border)] uppercase tracking-[0.1em]"
            style={{ color: 'var(--ps-text-secondary)' }}
          >
            <Globe size={11} className="mr-0.5" />
            {t(marketInfo.label)}
          </span>
        </div>
        <h1 className="text-[36px] font-light tracking-[-0.02em] leading-[1.2]" style={{ color: 'var(--ps-text)' }}>
          Polestar 2
        </h1>
        <p className="text-[18px] font-normal mt-1" style={{ color: 'var(--ps-text-secondary)' }}>
          {t(subtitleKey)}
        </p>
        <p className="text-[12px] mt-1" style={{ color: 'var(--ps-text-tertiary)' }}>
          {t('version')} &nbsp;|&nbsp; {t('collectedBy')}
        </p>
      </div>

      <hr className="border-0 border-t" style={{ borderColor: 'var(--ps-border)' }} />

      {/* Interactive Milestones Summary Cards */}
      <section className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: 'var(--ps-text-tertiary)' }}>
          02 / Evolution Milestones
        </p>
        <MilestoneHighlights />
      </section>

      {/* Main Table Content View */}
      <section className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: 'var(--ps-text-tertiary)' }}>
          03 / Technical Specifications
        </p>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pt-6">
          <Sidebar sections={visibleSidebarSections} activeSection={activeSection} onSectionClick={handleSectionClick} />

        <main ref={mainRef} className="flex-1 min-w-0 space-y-8">
          {/* Filtering & Live Search Controls */}
          <div className="flex flex-col xl:flex-row xl:items-end gap-6 justify-between p-6 border border-[var(--ps-border)] bg-[var(--ps-bg-secondary)]/10">
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] mb-2 font-medium" style={{ color: 'var(--ps-text-tertiary)' }}>
                  {t('category')}
                </p>
                <FilterPills activeFilter={activeFilter} onFilterChange={handleFilterChange} />
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-2 font-medium" style={{ color: 'var(--ps-text-tertiary)' }}>
                    {t('package')}
                  </p>
                  <PackageFilterPills activePackage={activePackage} onPackageChange={handlePackageChange} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-2 font-medium" style={{ color: 'var(--ps-text-tertiary)' }}>
                    {t('compareMode')}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {modelYearLabels.map((label, idx) => {
                      const isChecked = visibleColumns.has(idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleColumn(idx)}
                          className="px-2 py-1 transition-colors duration-150 border rounded-none text-[11px] tracking-[0.05em] uppercase font-mono"
                          style={{
                            borderColor: isChecked ? 'var(--ps-text)' : 'var(--ps-border-light)',
                            backgroundColor: isChecked ? 'var(--ps-pill-active-bg)' : 'transparent',
                            color: isChecked ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
                          }}
                        >
                          {label.replace('\n', ' ')}
                        </button>
                      );
                    })}
                    {visibleColumns.size < 7 && (
                      <button
                        onClick={() => setVisibleColumns(new Set([0, 1, 2, 3, 4, 5, 6]))}
                        className="text-[11px] underline ml-2 transition-colors duration-150 uppercase tracking-[0.1em]"
                        style={{ color: 'var(--ps-text-tertiary)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ps-text)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ps-text-tertiary)'}
                      >
                        {t('resetCompare')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Search Input Box */}
            <div className="w-full xl:w-[240px] shrink-0">
              <p className="text-[10px] uppercase tracking-[0.15em] mb-2 font-medium" style={{ color: 'var(--ps-text-tertiary)' }}>
                Search
              </p>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-8 pr-8 py-1.5 text-[13px] border bg-[var(--ps-bg)] text-[var(--ps-text)] focus:outline-none focus:border-[var(--ps-text)] transition-colors duration-150 rounded-none placeholder-[var(--ps-text-tertiary)]"
                  style={{ borderColor: 'var(--ps-border)' }}
                />
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--ps-text-tertiary)]" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors duration-150 hover:text-[var(--ps-text)] flex items-center justify-center cursor-pointer"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                    title="Clear search"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Legend instructions */}
          <div className="flex flex-wrap items-center justify-between gap-y-2 text-[11px]" style={{ color: 'var(--ps-text-tertiary)' }}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--ps-standard)' }} />
                Standard
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ border: '1.5px solid var(--ps-optional)' }} />
                Optional
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-[1.5px]" style={{ backgroundColor: 'var(--ps-unavailable)' }} />
                Not Available
              </span>
            </div>
            <span className="hidden sm:inline italic">
              * {t('pinColumn')}
            </span>
          </div>

          {/* Spec tables */}
          <SpecTable
            categories={filteredCategories}
            hoveredColumn={hoveredColumn}
            onColumnHover={setHoveredColumn}
            visibleColumns={visibleColumns}
            pinnedColumns={pinnedColumns}
            onColumnClick={handleColumnClick}
          />

          {/* Paint section */}
          <div id="section-paint" className="mt-16 scroll-mt-32">
            <hr className="border-0 border-t mb-6" style={{ borderColor: 'var(--ps-border)' }} />
            <h2 className="text-[24px] font-normal mb-2" style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}>
              {t('paintColours')}
            </h2>
            <p className="text-[13px] mb-6" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('paintDesc')}
            </p>
            <PaintSection
              colors={marketPaintColors}
              hoveredColumn={hoveredColumn}
              onColumnHover={setHoveredColumn}
              visibleColumns={visibleColumns}
              pinnedColumns={pinnedColumns}
              onColumnClick={handleColumnClick}
            />
          </div>
        </main>
      </div>
      </section>
    </div>
  );
}
