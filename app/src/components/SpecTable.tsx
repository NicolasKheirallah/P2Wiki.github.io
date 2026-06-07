import { useRef } from 'react';
import type { Category } from '@/types/spec';
import { modelYearLabels } from '@/data/specData';
import { useLocale } from '@/contexts/LocaleContext';
import SymbolCell from './SymbolCell';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SpecTableProps {
  categories: Category[];
  hoveredColumn: number | null;
  onColumnHover: (index: number | null) => void;
  visibleColumns: Set<number>;
  pinnedColumns: Set<number>;
  onColumnClick: (index: number) => void;
}

export default function SpecTable({
  categories,
  hoveredColumn,
  onColumnHover,
  visibleColumns,
  pinnedColumns,
  onColumnClick,
}: SpecTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();

  useGSAP(() => {
    const rows = gsap.utils.toArray<HTMLElement>('.spec-row');
    if (rows.length === 0) return;

    ScrollTrigger.batch('.spec-row', {
      interval: 0.05,
      batchMax: 30,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, stagger: 0.015, ease: 'power2.out', overwrite: true }
        );
      },
      start: 'top 95%',
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, { scope: containerRef, dependencies: [categories, visibleColumns] });

  if (categories.length === 0) {
    return (
      <div className="text-center py-16 text-[14px]" style={{ color: 'var(--ps-text-tertiary)' }}>
        {t('noMatch')}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-10">
      {categories.map((category) => (
        <section key={category.id} id={`section-${category.id}`} className="scroll-mt-24">
          <hr className="border-0 border-t" style={{ borderColor: 'var(--ps-table-border)' }} />
          <h2
            className="text-[24px] font-normal mt-4 mb-6"
            style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
          >
            {category.title}
          </h2>

          <div className="overflow-x-auto overflow-y-clip scrollbar-hide -mx-2 px-2">
            <table className="w-full min-w-[800px] border-collapse">
              <thead className="z-30 border-b border-[var(--ps-table-border)]">
                <tr>
                  <th
                    className="sticky top-14 left-0 bg-[var(--ps-bg)] text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[260px] min-w-[200px] z-40 border-r border-[var(--ps-border-light)] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('feature')}
                  </th>
                  {modelYearLabels.map((label, i) => {
                    if (!visibleColumns.has(i)) return null;
                    const isPinned = pinnedColumns.has(i);
                    return (
                      <th
                        key={i}
                        className="sticky top-14 text-center py-3 px-1 text-[12px] font-normal uppercase tracking-wider cursor-pointer transition-colors duration-150 min-w-[70px] bg-[var(--ps-bg)] hover:bg-[var(--ps-bg-secondary)] z-30"
                        style={{
                          color: isPinned || hoveredColumn === i ? 'var(--ps-text)' : 'var(--ps-text-tertiary)',
                          borderBottom: isPinned ? '2px solid var(--ps-gold)' : 'none',
                        }}
                        onMouseEnter={() => onColumnHover(i)}
                        onMouseLeave={() => onColumnHover(null)}
                        onClick={() => onColumnClick(i)}
                        title={t('pinColumn')}
                      >
                        <span className="whitespace-pre-line leading-tight">{label}</span>
                      </th>
                    );
                  })}
                  <th
                    className="sticky top-14 text-left py-3 pl-4 text-[12px] font-normal w-[220px] min-w-[180px] bg-[var(--ps-bg)] z-30"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('notes')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.features.map((feature, idx) => (
                  <tr key={idx} className="spec-row group hover:bg-[var(--ps-bg-secondary)]" style={{ borderBottom: '1px solid var(--ps-table-row)' }}>
                    <td
                      className="sticky left-0 bg-[var(--ps-bg)] group-hover:bg-[var(--ps-bg-secondary)] py-4 pr-4 text-[14px] z-10 border-r border-[var(--ps-border-light)] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-colors duration-150"
                      style={{ color: 'var(--ps-text)' }}
                    >
                      {feature.name}
                    </td>
                    {feature.values.map((value, i) => {
                      if (!visibleColumns.has(i)) return null;
                      const isPinned = pinnedColumns.has(i);
                      const bg = isPinned
                        ? 'rgba(246, 190, 0, 0.08)'
                        : hoveredColumn === i
                        ? 'var(--ps-table-hover)'
                        : 'transparent';

                      return (
                        <td
                          key={i}
                          className="text-center py-4 px-1 transition-colors duration-150"
                          style={{ backgroundColor: bg }}
                        >
                          <SymbolCell value={value} isHovered={isPinned || hoveredColumn === i} />
                        </td>
                      );
                    })}
                    <td className="py-4 pl-4 text-[12px] leading-relaxed max-w-[220px]" style={{ color: 'var(--ps-text-tertiary)' }}>
                      {feature.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
