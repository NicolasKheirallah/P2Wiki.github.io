import { packageFilters } from '@/data/specData';

interface PackageFilterPillsProps {
  activePackage: string;
  onPackageChange: (pkg: string) => void;
}

export default function PackageFilterPills({ activePackage, onPackageChange }: PackageFilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {packageFilters.map((pkg) => {
        const isActive = activePackage === pkg.id;
        return (
          <button
            key={pkg.id}
            onClick={() => onPackageChange(pkg.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-none text-[13px] font-normal transition-all duration-150 border"
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
            {pkg.color && (
              <span
                className="inline-block w-2 h-2 shrink-0"
                style={{
                  backgroundColor: isActive ? 'var(--ps-gold)' : pkg.color,
                }}
              />
            )}
            {pkg.label}
          </button>
        );
      })}
    </div>
  );
}
