import { Routes, Route, Navigate } from 'react-router';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MarketProvider } from '@/contexts/MarketContext';
import { LocaleProvider, useLocale } from '@/contexts/LocaleContext';
import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
import SpecsPage from '@/pages/SpecsPage';
import KnownIssuesPage from '@/pages/KnownIssuesPage';
import PrintingPage from '@/pages/PrintingPage';
import ServicePage from '@/pages/ServicePage';
import ChargingPage from '@/pages/ChargingPage';
import RetrofitsPage from '@/pages/RetrofitsPage';

function AppLayout() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--ps-bg)' }}>
      <Header />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-10 pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/specs" element={<SpecsPage />} />
          <Route path="/known-issues" element={<KnownIssuesPage />} />
          <Route path="/3d-printing" element={<PrintingPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/charging" element={<ChargingPage />} />
          <Route path="/retrofits" element={<RetrofitsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Footer notes */}
        <div className="mt-16 pt-8 border-0 border-t" style={{ borderColor: 'var(--ps-border)' }}>
          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-tertiary)' }}>
            {t('allMY21')}
            <br />
            {t('allMY25')}
          </p>
          <p className="text-[12px] leading-relaxed mt-3" style={{ color: 'var(--ps-text-tertiary)' }}>
            {t('trademark')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <MarketProvider>
          <AppLayout />
        </MarketProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
