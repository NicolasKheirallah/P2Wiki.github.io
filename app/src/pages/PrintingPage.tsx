import PrintingFabrication from '@/components/PrintingFabrication';
import { useLocale } from '@/contexts/LocaleContext';

export default function PrintingPage() {
  const { t } = useLocale();

  return (
    <main>
      <h2 className="text-[24px] font-normal mb-6" style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}>
        {t('printingTitle')}
      </h2>
      <PrintingFabrication />
    </main>
  );
}
