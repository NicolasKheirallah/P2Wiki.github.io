import { useLocale } from '@/contexts/LocaleContext';

interface PrintableComponent {
  name: string;
  description: string;
  material: string;
  link: string;
  linkLabel: string;
}

interface MaterialGuideline {
  name: string;
  description: string;
}

const materialGuidelines: MaterialGuideline[] = [
  {
    name: 'Acrylonitrile Styrene Acrylate (ASA)',
    description:
      'Recommended for interior trim and exterior components. Provides high UV resistance, thermal stability, and a matte finish suitable for matching OEM aesthetics.',
  },
  {
    name: 'Polycarbonate (PC)',
    description:
      'Required for structural components, parts exposed to high mechanical stress, or extreme temperature environments.',
  },
  {
    name: 'Thermoplastic Polyurethane (TPU)',
    description:
      'Optimal for cup holder inserts, gaskets, or vibration-dampening mounts.',
  },
];

const printableComponents: PrintableComponent[] = [
  {
    name: 'Cupholder & Armrest Extension',
    description: 'Double cupholder supporting 330 ml cans and an elevated armrest extension.',
    material: 'ASA / PETG',
    link: 'https://www.printables.com/model/85125-polestar-2-cupholder-and-armrest',
    linkLabel: 'Printables: 85125',
  },
  {
    name: 'MagSafe Phone Mount',
    description: 'Bracket fitting around the center screen with interchangeable phone holders.',
    material: 'ASA / PC',
    link: 'https://www.thingiverse.com/thing:7271739',
    linkLabel: 'Thingiverse: 7271739',
  },
  {
    name: 'USB Shelf Tidy',
    description: 'Shelf insert for the USB port area to reclaim space, featuring cable pass-through notches.',
    material: 'ASA / PLA+',
    link: 'https://www.thingiverse.com/thing:6577352',
    linkLabel: 'Thingiverse: 6577352',
  },
  {
    name: 'Charge Port Snow Cover',
    description: 'Protective cover fitting precisely over the charging area to prevent snow and debris accumulation.',
    material: 'ASA',
    link: 'https://www.printables.com/model/1482336-polestar-2-charge-snow-cover',
    linkLabel: 'Printables: 1482336',
  },
  {
    name: 'Speaker Adapters',
    description: 'Aftermarket speaker adapters compatible with the Polestar 2 and Volvo XC40.',
    material: 'PC / ASA',
    link: 'https://www.thingiverse.com/thing:6207821',
    linkLabel: 'Thingiverse: 6207821',
  },
  {
    name: 'General Community Hub',
    description: 'Primary index for community-generated Polestar 2 models.',
    material: 'Varies',
    link: 'https://www.printables.com/tag/polestar2',
    linkLabel: 'Printables: Polestar 2 Tag',
  },
];

const reverseEngineeringTips = [
  {
    title: 'Dimensional Extraction',
    description:
      'Utilize photogrammetry or reference scaling from module photographs to build initial CAD wireframes for custom trim.',
  },
  {
    title: 'OEM Integration',
    description:
      'Apply standardized dimensions for replicating factory mounting clips to secure custom components without permanent modifications.',
  },
  {
    title: 'Material Tolerances',
    description:
      'Apply scaling compensation factors within the slicer or CAD software to account for material shrinkage when printing functional engineering filaments like PC or ASA.',
  },
];

export default function PrintingFabrication() {
  const { t } = useLocale();

  return (
    <div className="space-y-10">
      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
        {t('printingDesc')}
      </p>

      {/* Material Selection Guidelines */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('materialGuidelines')}
        </h3>
        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('materialWarning')}
        </p>
        <div className="space-y-3">
          {materialGuidelines.map((mat) => (
            <div
              key={mat.name}
              className="rounded-lg p-4"
              style={{ backgroundColor: 'var(--ps-bg-info)' }}
            >
              <h4 className="text-[13px] font-medium mb-1" style={{ color: 'var(--ps-text)' }}>
                {mat.name}
              </h4>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {mat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reverse Engineering & CAD Modeling */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('reverseEngineering')}
        </h3>
        <div className="space-y-3">
          {reverseEngineeringTips.map((tip) => (
            <div
              key={tip.title}
              className="rounded-lg p-4"
              style={{ backgroundColor: 'var(--ps-bg-info)' }}
            >
              <h4 className="text-[13px] font-medium mb-1" style={{ color: 'var(--ps-text)' }}>
                {tip.title}
              </h4>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Component Repository */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('printableRepository')}
        </h3>

        <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ps-table-border)' }}>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[220px]"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('componentType')}
                </th>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[320px]"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('description')}
                </th>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[160px]"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('recommendedMaterial')}
                </th>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('resourceLink')}
                </th>
              </tr>
            </thead>
            <tbody>
              {printableComponents.map((comp, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--ps-table-row)' }}>
                  <td
                    className="py-4 pr-4 text-[13px] font-medium align-top"
                    style={{ color: 'var(--ps-text)' }}
                  >
                    {comp.name}
                  </td>
                  <td
                    className="py-4 pr-4 text-[13px] leading-relaxed align-top"
                    style={{ color: 'var(--ps-text-secondary)' }}
                  >
                    {comp.description}
                  </td>
                  <td
                    className="py-4 pr-4 text-[13px] align-top"
                    style={{ color: 'var(--ps-text-secondary)' }}
                  >
                    {comp.material}
                  </td>
                  <td className="py-4 pr-4 text-[13px] align-top">
                    <a
                      href={comp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-150 hover:underline"
                      style={{ color: 'var(--ps-text-secondary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--ps-text)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--ps-text-secondary)';
                      }}
                    >
                      {comp.linkLabel}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
