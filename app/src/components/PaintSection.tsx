import type { PaintColor } from '@/types/spec';
import { modelYearLabels } from '@/data/specData';
import { useLocale } from '@/contexts/LocaleContext';
import SymbolCell from './SymbolCell';

interface PaintSectionProps {
  colors: PaintColor[];
  hoveredColumn: number | null;
  onColumnHover: (index: number | null) => void;
  visibleColumns: Set<number>;
  pinnedColumns: Set<number>;
  onColumnClick: (index: number) => void;
}

export default function PaintSection({
  colors,
  hoveredColumn,
  onColumnHover,
  visibleColumns,
  pinnedColumns,
  onColumnClick,
}: PaintSectionProps) {
  const { t } = useLocale();

  return (
    <div className="overflow-x-auto overflow-y-clip scrollbar-hide -mx-2 px-2">
      <table className="w-full min-w-[900px] border-collapse">
        <thead className="z-30 border-b border-[var(--ps-table-border)]">
          <tr>
            <th className="sticky top-14 left-0 bg-[var(--ps-bg)] text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[40px] z-40" style={{ color: 'var(--ps-text-tertiary)' }}>
              {t('swatch')}
            </th>
            <th className="sticky top-14 left-[40px] bg-[var(--ps-bg)] text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[160px] z-40 border-r border-[var(--ps-border-light)] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" style={{ color: 'var(--ps-text-tertiary)' }}>
              {t('colour')}
            </th>
            <th className="sticky top-14 text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[180px] bg-[var(--ps-bg)] z-30" style={{ color: 'var(--ps-text-tertiary)' }}>
              {t('volvoEquivalent')}
            </th>
            <th className="sticky top-14 text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[100px] bg-[var(--ps-bg)] z-30" style={{ color: 'var(--ps-text-tertiary)' }}>
              {t('code')}
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
          </tr>
        </thead>
        <tbody>
          {colors.map((color, idx) => (
            <tr
              key={idx}
              className="group transition-all duration-200 hover:bg-[var(--ps-bg-secondary)]"
              style={{ borderBottom: '1px solid var(--ps-table-row)', opacity: color.replacedBy ? 0.5 : 1 }}
            >
              <td className="sticky left-0 bg-[var(--ps-bg)] group-hover:bg-[var(--ps-bg-secondary)] py-4 pr-4 z-10 transition-colors duration-150">
                <span
                  className="inline-block w-6 h-6 rounded-none shadow-sm"
                  style={{
                    backgroundColor: color.hex,
                    border: color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase() === '#f5f5f5'
                      ? '1px solid var(--ps-border)'
                      : 'none',
                  }}
                  title={`${color.name} (${color.polestarCode})`}
                />
              </td>
              <td className="sticky left-[40px] bg-[var(--ps-bg)] group-hover:bg-[var(--ps-bg-secondary)] py-4 pr-4 z-10 border-r border-[var(--ps-border-light)] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-colors duration-150">
                <div className="flex items-center gap-2">
                  <span className="text-[14px]" style={{ color: 'var(--ps-text)' }}>{color.name}</span>
                  <span className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--ps-text-tertiary)' }}>
                    {color.isMetallic ? t('metallic') : t('solid')}
                  </span>
                </div>
                {color.replacedBy && (
                  <span className="text-[11px]" style={{ color: 'var(--ps-text-secondary)' }}>
                    {t('replacedBy')} {color.replacedBy} {t('inMY26')}
                  </span>
                )}
              </td>
              <td className="py-4 pr-4 text-[14px] transition-colors duration-150" style={{ color: 'var(--ps-text-secondary)' }}>
                {color.volvoName}
              </td>
              <td className="py-4 pr-4 transition-colors duration-150">
                <span className="text-[12px] font-mono px-2 py-0.5 rounded-none border border-[var(--ps-border-light)]" style={{ backgroundColor: 'var(--ps-pill-bg)', color: 'var(--ps-text-secondary)' }}>
                  {color.polestarCode}
                </span>
                <span className="text-[11px] ml-2" style={{ color: 'var(--ps-text-tertiary)' }}>
                  ({color.volvoCode})
                </span>
              </td>
              {color.values.map((value, i) => {
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
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 rounded-none p-4 border border-[var(--ps-border)]" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
        <h4 className="text-[13px] font-medium mb-2" style={{ color: 'var(--ps-text)' }}>
          {t('aboutPaint')}
        </h4>
        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('paintExplainer')}
        </p>
      </div>
    </div>
  );
}
