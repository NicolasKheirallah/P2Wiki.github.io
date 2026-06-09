import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLocale } from '@/contexts/LocaleContext';

export type TabId = 'specs' | 'knownIssues' | 'printing' | 'service' | 'chargingPerf' | 'retrofits';

interface TabDef {
  path: string;
  label: string;
}

const tabs: TabDef[] = [
  { path: '/specs', label: 'tabSpecs' },
  { path: '/known-issues', label: 'tabKnownIssues' },
  { path: '/3d-printing', label: 'tabPrinting' },
  { path: '/service', label: 'tabService' },
  { path: '/charging', label: 'tabCharging' },
  { path: '/retrofits', label: 'tabRetrofits' },
];

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [ref, handler]);
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t, availableLocales } = useLocale();
  const location = useLocation();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useClickOutside(langRef, () => setLangOpen(false));

  const currentPath = location.pathname;

  const currentLocale = availableLocales.find((l) => l.code === locale) ?? availableLocales[0];

  return (
    <header
      className="sticky top-0 z-50 border-b transition-colors duration-200"
      style={{
        backgroundColor: 'var(--ps-bg)',
        borderColor: 'var(--ps-border)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
        <div className="h-14 flex items-center gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-[20px] font-medium tracking-[-0.01em] select-none shrink-0 transition-opacity duration-150 hover:opacity-70"
            style={{ color: 'var(--ps-text)' }}
          >
            {t('siteTitle')}
          </Link>

          {/* Tabs */}
          <nav className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 min-w-max">
              {tabs.map((tab) => {
                const isActive = currentPath === tab.path;
                return (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    className="relative px-3 py-1.5 text-[13px] font-normal transition-all duration-150 rounded-none border"
                    style={{
                      color: isActive ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
                      backgroundColor: isActive ? 'var(--ps-pill-active-bg)' : 'transparent',
                      borderColor: isActive ? 'var(--ps-text)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg)';
                        e.currentTarget.style.color = 'var(--ps-text)';
                        e.currentTarget.style.borderColor = 'var(--ps-border)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--ps-text-secondary)';
                        e.currentTarget.style.borderColor = 'transparent';
                      }
                    }}
                  >
                    {t(tab.label)}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Controls */}
          <div className="shrink-0 flex items-center gap-2">
            {/* Language + Region picker (combined) */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-[13px] rounded-none border transition-colors duration-150"
                style={{
                  color: 'var(--ps-text-secondary)',
                  backgroundColor: langOpen ? 'var(--ps-pill-bg)' : 'transparent',
                  borderColor: langOpen ? 'var(--ps-text)' : 'var(--ps-border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--ps-text)';
                  if (!langOpen) {
                    e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg)';
                    e.currentTarget.style.borderColor = 'var(--ps-text-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--ps-text-secondary)';
                  if (!langOpen) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--ps-border)';
                  }
                }}
              >
                <span className="text-[16px] leading-none">{currentLocale.flag}</span>
                <span>{t(currentLocale.labelKey)}</span>
                <ChevronDown size={12} className={`transition-transform duration-150 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-2 rounded-none z-[100] min-w-[180px] py-1.5"
                  style={{
                    backgroundColor: 'var(--ps-bg-elevated)',
                    border: '1px solid var(--ps-border)',
                  }}
                >
                  {availableLocales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLocale(l.code); setLangOpen(false); }}
                      className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] transition-colors"
                      style={{
                        backgroundColor: locale === l.code ? 'var(--ps-pill-active-bg)' : 'transparent',
                        color: locale === l.code ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
                      }}
                      onMouseEnter={(e) => {
                        if (locale !== l.code) {
                          e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg)';
                          e.currentTarget.style.color = 'var(--ps-text)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (locale !== l.code) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--ps-text-secondary)';
                        }
                      }}
                    >
                      <span className="text-[16px]">{l.flag}</span>
                      <span className="flex-1 text-left">{t(l.labelKey)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-4" style={{ backgroundColor: 'var(--ps-border)' }} />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-none border transition-colors duration-150"
              style={{
                color: 'var(--ps-text-secondary)',
                backgroundColor: 'var(--ps-pill-bg)',
                borderColor: 'var(--ps-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--ps-text)';
                e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg-hover)';
                e.currentTarget.style.borderColor = 'var(--ps-text-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--ps-text-secondary)';
                e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg)';
                e.currentTarget.style.borderColor = 'var(--ps-border)';
              }}
              title={t(theme === 'dark' ? 'switchToLight' : 'switchToDark')}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
