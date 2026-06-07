import { useLocale } from '@/contexts/LocaleContext';
import { sectionLabelsEn, sectionLabelsSv } from '@/data/marketData';

interface SidebarProps {
  sections: string[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export default function Sidebar({ sections, activeSection, onSectionClick }: SidebarProps) {
  const { locale } = useLocale();
  const labels = locale === 'sv' ? sectionLabelsSv : sectionLabelsEn;

  return (
    <aside className="hidden lg:block w-[200px] flex-shrink-0">
      <nav className="sticky top-20">
        <ul className="space-y-0.5">
          {sections.map((id) => (
            <li key={id}>
              <button
                onClick={() => onSectionClick(id)}
                className="text-left w-full text-[14px] py-1.5 transition-colors duration-150"
                style={{
                  color: activeSection === id ? 'var(--ps-text)' : 'var(--ps-text-secondary)',
                  fontWeight: activeSection === id ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== id) e.currentTarget.style.color = 'var(--ps-text)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== id) e.currentTarget.style.color = 'var(--ps-text-secondary)';
                }}
              >
                {labels[id] || id}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
