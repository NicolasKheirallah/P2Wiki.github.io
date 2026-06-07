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
            className="px-4 py-1.5 rounded-full text-[13px] font-normal transition-all duration-150"
            style={{
              backgroundColor: isActive ? 'var(--ps-pill-active-bg)' : 'var(--ps-pill-bg)',
              color: isActive ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg-hover)';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg)';
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
