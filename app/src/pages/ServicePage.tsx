import ServiceMaintenance from '@/components/ServiceMaintenance';
import { useLocale } from '@/contexts/LocaleContext';

export default function ServicePage() {
  const { t } = useLocale();

  return (
    <main>
      <h2 className="text-[24px] font-normal mb-6" style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}>
        {t('serviceTitle')}
      </h2>
      <ServiceMaintenance />
    </main>
  );
}
