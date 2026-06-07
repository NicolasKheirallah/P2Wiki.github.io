import RetrofitsImprovements from '@/components/RetrofitsImprovements';
import { useLocale } from '@/contexts/LocaleContext';

export default function RetrofitsPage() {
  const { t } = useLocale();

  return (
    <main>
      <h2 className="text-[24px] font-normal mb-6" style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}>
        {t('retrofitsTitle')}
      </h2>
      <RetrofitsImprovements />
    </main>
  );
}
