import KnownIssues from '@/components/KnownIssues';
import { useLocale } from '@/contexts/LocaleContext';

export default function KnownIssuesPage() {
  const { t } = useLocale();

  return (
    <main>
      <h2 className="text-[24px] font-normal mb-6" style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}>
        {t('knownIssuesTitle')}
      </h2>
      <KnownIssues />
    </main>
  );
}
