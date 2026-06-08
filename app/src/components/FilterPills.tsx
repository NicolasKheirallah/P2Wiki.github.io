import { filterCategories } from '@/data/specData';

interface FilterPillsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterPills({ activeFilter, onFilterChange }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterCategories.map((cat) => {
        const isActive = activeFilter === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onFilterChange(cat.id)}
            className="px-4 py-1.5 rounded-none text-[13px] font-normal transition-all duration-150 border"
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
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
