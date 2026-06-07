import ChargingPerformance from '@/components/ChargingPerformance';
import { useLocale } from '@/contexts/LocaleContext';

export default function ChargingPage() {
  const { t } = useLocale();

  return (
    <main>
      <h2 className="text-[24px] font-normal mb-6" style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}>
        {t('chargingPerfTitle')}
      </h2>
      <ChargingPerformance />
    </main>
  );
}
