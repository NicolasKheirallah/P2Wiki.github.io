import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { useMarket } from '@/contexts/MarketContext';
import { Check, Copy, ChevronDown, ShieldAlert, ClipboardList } from 'lucide-react';

interface TorqueSpec {
  item: string;
  value: string | { en: string; sv: string };
  note?: string;
}

interface DrivetrainSpec {
  item: string;
  value: string | { en: string; sv: string };
  note?: string;
}

interface FluidSpec {
  item: string;
  value: string | { en: string; sv: string };
  note?: string;
}

interface BatterySpec {
  item: string;
  value: string | { en: string; sv: string };
}

interface ServiceRow {
  operation: string;
  intervals: boolean[];
}

interface PartReference {
  name: string;
  number: string;
  purpose: string;
}

const torqueSpecs: TorqueSpec[] = [
  {
    item: 'service_wheelLugBolts',
    value: '140 Nm',
    note: 'service_wheelLugBoltsNote',
  },
  {
    item: 'service_strutTopCenterNut',
    value: '81 Nm',
    note: 'service_strutTopCenterNutNote',
  },
  {
    item: 'service_hubAxleBolt',
    value: '45 Nm + 90°',
    note: 'service_hubAxleBoltNote',
  },
];

const drivetrainSpecs: DrivetrainSpec[] = [
  {
    item: 'service_wheelBoltPattern',
    value: '5 x 108 mm',
    note: 'service_wheelBoltPatternNote',
  },
  {
    item: 'service_hubCenterBore',
    value: '63.4 mm',
    note: 'service_hubCenterBoreNote',
  },
  {
    item: 'service_lugBoltSize',
    value: 'M14 x 1.5',
    note: 'service_lugBoltSizeNote',
  },
  {
    item: 'service_transmissionOil',
    value: {
      en: '1.6 Litres per motor',
      sv: '1,6 liter per motor',
    },
    note: 'service_transmissionOilNote',
  },
  {
    item: 'service_coolantSystemCapacity',
    value: {
      en: '15 Litres',
      sv: '15 liter',
    },
    note: 'service_coolantSystemCapacityNote',
  },
];

const fluidSpecs: FluidSpec[] = [
  {
    item: 'service_brakeFluid',
    value: 'DOT 4 / DOT 4 LV',
    note: 'service_brakeFluidNote',
  },
  {
    item: 'service_acRefrigerant',
    value: {
      en: 'R1234yf or R134a',
      sv: 'R1234yf eller R134a',
    },
    note: 'service_acRefrigerantNote',
  },
];

const batterySpecs: BatterySpec[] = [
  { item: 'service_groupSize', value: 'H6 (LN3) AGM' },
  { item: 'service_capacity', value: '70 Ah' },
  { item: 'service_cca', value: '760 A' },
  { item: 'service_dimensions', value: '277.7 × 174.4 × 188.5 mm' },
];

const partReferences: PartReference[] = [
  {
    name: 'service_cabinAirFilter',
    number: 'Volvo 31497285',
    purpose: 'service_cabinAirFilterPurpose',
  },
  {
    name: 'service_wiperBladeSet',
    number: 'Volvo 31693568',
    purpose: 'service_wiperBladeSetPurpose',
  },
  {
    name: 'service_12vAuxBattery',
    number: 'Volvo 31652063',
    purpose: 'service_12vAuxBatteryPurpose',
  },
];

const serviceIntervalsKm = [
  '32 000 km',
  '64 000 km',
  '96 000 km',
  '128 000 km',
  '160 000 km',
  '192 000 km',
  '224 000 km',
];

const serviceIntervalsMi = [
  '20k mi',
  '40k mi',
  '60k mi',
  '80k mi',
  '100k mi',
  '120k mi',
  '140k mi',
];

const serviceRows: ServiceRow[] = [
  { operation: 'service_sriReset', intervals: [true, true, true, true, true, true, true] },
  { operation: 'service_coolantCheck', intervals: [true, true, true, true, true, true, true] },
  { operation: 'service_cabinAirFilterReplace', intervals: [true, true, true, true, true, true, true] },
  { operation: 'service_cleanWindshield', intervals: [true, false, false, false, false, false, false] },
  { operation: 'service_seatbeltsCheck', intervals: [true, true, true, true, true, true, true] },
  { operation: 'service_washerFluidCheck', intervals: [true, true, true, true, true, true, true] },
  { operation: 'service_externalLightingCheck', intervals: [true, true, true, true, true, true, true] },
  { operation: 'service_brakeFluidCheck', intervals: [true, true, true, true, true, true, true] },
  { operation: 'service_wheelsTiresCheck', intervals: [true, true, true, true, true, true, true] },
  { operation: 'service_brakeFluidReplace', intervals: [false, true, false, true, false, true, false] },
  { operation: 'service_brakeHosesCheck', intervals: [false, true, false, true, false, true, false] },
  { operation: 'service_suspensionCheck', intervals: [false, true, false, true, false, true, false] },
  { operation: 'service_driveshaftCheck', intervals: [false, true, false, true, false, true, false] },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLocale();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center justify-center w-6 h-6 border border-[var(--ps-border)] hover:border-[var(--ps-text)] bg-[var(--ps-bg-secondary)] hover:bg-[var(--ps-bg-elevated)] transition-all duration-200 rounded-none ml-2 text-[var(--ps-text-secondary)] hover:text-[var(--ps-text)] opacity-0 group-hover:opacity-100 focus:opacity-100"
      style={{
        transform: copied ? 'scale(1.1)' : 'scale(1)',
      }}
      title={t('service_copyToClipboard')}
    >
      {copied ? <Check size={12} className="text-[var(--ps-gold)]" /> : <Copy size={12} />}
    </button>
  );
}

export default function ServiceMaintenance() {
  const { t, locale } = useLocale();
  const isSv = locale === 'sv';
  const { market } = useMarket();
  const useKm = market === 'uk' || market === 'se';

  const resolveVal = (val: string | { en: string; sv: string }) => {
    return typeof val === 'string' ? val : (isSv ? val.sv : val.en);
  };

  const serviceIntervals = useKm ? serviceIntervalsKm : serviceIntervalsMi;
  const [selectedIntervalIndex, setSelectedIntervalIndex] = useState<number>(0);
  const [expandedSRI, setExpandedSRI] = useState(false);

  // Manual reset steps text
  const sriResetText = t('service_sriResetSteps');

  const handleCopySRI = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(sriResetText);
    } catch {
      // ignore
    }
  };

  // Filter due items for active mileage checklist card
  const dueOperations = serviceRows.filter((row) => row.intervals[selectedIntervalIndex]);

  return (
    <div className="space-y-10">
      {/* Technical Specifications & Critical Data */}
      <div className="space-y-6">
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('techSpecsTitle')}
        </h3>

        {/* Torque Values */}
        <div>
          <h4
            className="text-[13px] font-medium mb-3 uppercase tracking-wider"
            style={{ color: 'var(--ps-text-tertiary)' }}
          >
            {t('torqueValues')}
          </h4>
          <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ps-table-border)' }}>
                  <th
                    className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[200px]"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('item')}
                  </th>
                  <th
                    className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[160px]"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('value')}
                  </th>
                  <th
                    className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('notes')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {torqueSpecs.map((spec, idx) => (
                  <tr key={idx} className="group hover:bg-[var(--ps-bg-secondary)]/50" style={{ borderBottom: '1px solid var(--ps-table-row)' }}>
                    <td
                      className="py-3 pr-4 text-[13px] font-medium align-top"
                      style={{ color: 'var(--ps-text)' }}
                    >
                      {t(spec.item)}
                    </td>
                    <td
                      className="py-3 pr-4 text-[13px] align-top flex items-center"
                      style={{ color: 'var(--ps-text)' }}
                    >
                      <span>{resolveVal(spec.value)}</span>
                      <CopyButton text={resolveVal(spec.value)} />
                    </td>
                    <td
                      className="py-3 pr-4 text-[12px] leading-relaxed align-top"
                      style={{ color: 'var(--ps-text-secondary)' }}
                    >
                      {spec.note ? t(spec.note) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drivetrain & Wheel Fitment Specifications */}
        <div>
          <h4
            className="text-[13px] font-medium mb-3 uppercase tracking-wider"
            style={{ color: 'var(--ps-text-tertiary)' }}
          >
            {t('service_drivetrainWheelSpecs')}
          </h4>
          <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ps-table-border)' }}>
                  <th
                    className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[240px]"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('item')}
                  </th>
                  <th
                    className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[160px]"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('value')}
                  </th>
                  <th
                    className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('notes')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {drivetrainSpecs.map((spec, idx) => (
                  <tr key={idx} className="group hover:bg-[var(--ps-bg-secondary)]/50" style={{ borderBottom: '1px solid var(--ps-table-row)' }}>
                    <td
                      className="py-3 pr-4 text-[13px] font-medium align-top"
                      style={{ color: 'var(--ps-text)' }}
                    >
                      {t(spec.item)}
                    </td>
                    <td
                      className="py-3 pr-4 text-[13px] align-top flex items-center"
                      style={{ color: 'var(--ps-text)' }}
                    >
                      <span>{resolveVal(spec.value)}</span>
                      <CopyButton text={resolveVal(spec.value)} />
                    </td>
                    <td
                      className="py-3 pr-4 text-[12px] leading-relaxed align-top"
                      style={{ color: 'var(--ps-text-secondary)' }}
                    >
                      {spec.note ? t(spec.note) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fluid & Capacities */}
        <div>
          <h4
            className="text-[13px] font-medium mb-3 uppercase tracking-wider"
            style={{ color: 'var(--ps-text-tertiary)' }}
          >
            {t('fluidCapacities')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fluidSpecs.map((fluid) => (
              <div
                key={fluid.item}
                className="rounded-none p-4 border border-[var(--ps-border)] relative overflow-hidden"
                style={{ backgroundColor: 'var(--ps-bg-secondary)/5' }}
              >
                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--ps-border)] opacity-35" />
                <div className="space-y-1">
                  <span className="text-[13px] font-semibold block" style={{ color: 'var(--ps-text)' }}>
                    {t(fluid.item)}
                  </span>
                  <span className="text-[13.5px] font-medium block text-[var(--ps-gold)]">
                    {resolveVal(fluid.value)}
                  </span>
                  {fluid.note && (
                    <p className="text-[12px] leading-relaxed pt-1" style={{ color: 'var(--ps-text-secondary)' }}>
                      {t(fluid.note)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auxiliary 12V Battery & Parts Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* 12V Battery details */}
          <div className="space-y-3">
            <h4
              className="text-[13px] font-medium uppercase tracking-wider"
              style={{ color: 'var(--ps-text-tertiary)' }}
            >
              {t('aux12vBattery')}
            </h4>
            <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-4 rounded-none space-y-2 relative">
              <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--ps-border)] opacity-35" />
              {batterySpecs.map((spec, idx) => (
                <div key={idx} className="flex justify-between border-b border-[var(--ps-border-light)] pb-1.5 last:border-b-0 last:pb-0 text-[12.5px]">
                  <span className="font-semibold text-[var(--ps-text-secondary)]">{t(spec.item)}</span>
                  <span className="text-[var(--ps-text)]">{resolveVal(spec.value)}</span>
                </div>
              ))}
            </div>
            <div
              className="rounded-none p-4 border border-[var(--ps-border)]"
              style={{ backgroundColor: 'var(--ps-bg-info)' }}
            >
              <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="font-semibold" style={{ color: 'var(--ps-text)' }}>{t('calibrationNote')}:</span>{' '}
                {t('batteryCalibration')}
              </p>
            </div>
          </div>

          {/* OEM Parts references */}
          <div className="space-y-3">
            <h4
              className="text-[13px] font-medium uppercase tracking-wider"
              style={{ color: 'var(--ps-text-tertiary)' }}
            >
              {t('service_oemPartsReference')}
            </h4>
            <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-4 rounded-none space-y-3 relative">
              <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--ps-border)] opacity-35" />
              {partReferences.map((part, idx) => (
                <div key={idx} className="space-y-0.5 border-b border-[var(--ps-border-light)] pb-2 last:border-b-0 last:pb-0 text-[12.5px]">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[var(--ps-text)]">{t(part.name)}</span>
                    <span className="font-mono text-[var(--ps-gold)]">{part.number}</span>
                  </div>
                  <p className="text-[11.5px] text-[var(--ps-text-secondary)] leading-relaxed">{t(part.purpose)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Manual SRI Reset Accordion DIY Guide */}
      <div className="border border-[var(--ps-border)] rounded-none overflow-hidden bg-[var(--ps-bg)]">
        <button
          onClick={() => setExpandedSRI(!expandedSRI)}
          className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[var(--ps-bg-secondary)]/25 transition-colors duration-150 rounded-none cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-[var(--ps-gold)]" />
            <h4 className="text-[13.5px] font-medium tracking-wide uppercase" style={{ color: 'var(--ps-text)' }}>
              {t('service_sriResetTitle')}
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopySRI}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-[var(--ps-border)] hover:border-[var(--ps-text)] bg-[var(--ps-bg-secondary)] hover:bg-[var(--ps-bg-elevated)] transition-colors rounded-none text-[10px] font-semibold tracking-wider uppercase text-[var(--ps-text-secondary)] hover:text-[var(--ps-text)]"
            >
              <Copy size={10} />
              <span>{t('service_copy')}</span>
            </button>
            <ChevronDown
              size={16}
              className="text-[var(--ps-text-secondary)] transition-transform duration-250"
              style={{
                transform: expandedSRI ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>
        </button>

        {expandedSRI && (
          <div className="border-t border-[var(--ps-border-light)] p-5 bg-[var(--ps-bg-secondary)]/5 text-[13px] leading-relaxed space-y-2 text-[var(--ps-text-secondary)]">
            {sriResetText.split('\n').map((line, idx) => (
              <p key={idx} className="first:mt-0 mt-1">{line}</p>
            ))}
          </div>
        )}
      </div>

      {/* Maintenance Operations Service Schedule */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3
            className="text-[16px] font-medium"
            style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
          >
            {t('maintenanceScheduleTitle')}
          </h3>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
            {useKm ? t('maintenanceIntervalDescKm') : t('maintenanceIntervalDescMi')}
          </p>
        </div>

        {/* Milestone interval selector calculator */}
        <div className="space-y-3">
          <label className="text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-semibold block">
            {t('service_selectInterval')}
          </label>
          <div className="flex flex-wrap gap-2">
            {serviceIntervals.map((label, idx) => {
              const isActive = selectedIntervalIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIntervalIndex(idx)}
                  className="px-3 py-1.5 border text-[11px] font-normal transition-all duration-150 rounded-none"
                  style={{
                    borderColor: isActive ? 'var(--ps-text)' : 'var(--ps-border)',
                    backgroundColor: isActive ? 'var(--ps-pill-active-bg)' : 'transparent',
                    color: isActive ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--ps-bg-secondary)';
                      e.currentTarget.style.borderColor = 'var(--ps-text-secondary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'var(--ps-border)';
                    }
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Service Table */}
        <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ps-table-border)' }}>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[280px]"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('serviceOperation')}
                </th>
                {serviceIntervals.map((label, i) => {
                  const isHighlighted = selectedIntervalIndex === i;
                  return (
                    <th
                      key={i}
                      className="text-center py-3 px-1 text-[11px] font-semibold uppercase tracking-wider min-w-[70px] transition-colors duration-150"
                      style={{
                        color: isHighlighted ? 'var(--ps-gold)' : 'var(--ps-text-tertiary)',
                        backgroundColor: isHighlighted ? 'rgba(246, 190, 0, 0.03)' : 'transparent',
                      }}
                    >
                      {label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {serviceRows.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--ps-table-row)' }}>
                  <td
                    className="py-3 pr-4 text-[13px] align-top"
                    style={{ color: 'var(--ps-text)' }}
                  >
                    {t(row.operation)}
                  </td>
                  {row.intervals.map((due, i) => {
                    const isHighlighted = selectedIntervalIndex === i;
                    return (
                      <td
                        key={i}
                        className="text-center py-3 px-1 align-middle transition-colors duration-150"
                        style={{
                          backgroundColor: isHighlighted ? 'rgba(246, 190, 0, 0.03)' : 'transparent',
                        }}
                      >
                        {due ? (
                          <span
                            className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                            style={{
                              backgroundColor: isHighlighted ? 'var(--ps-gold)' : 'var(--ps-standard)',
                              color: isHighlighted ? '#000000' : 'var(--ps-bg)',
                            }}
                          >
                            ✓
                          </span>
                        ) : (
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: 'var(--ps-unavailable)' }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Due Checklist Card */}
        <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-5 rounded-none relative">
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--ps-border)]" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--ps-border)]" />
          
          <div className="flex items-center gap-2 mb-3">
            <ClipboardList size={16} className="text-[var(--ps-gold)]" />
            <h4 className="text-[13px] font-semibold uppercase tracking-wider" style={{ color: 'var(--ps-text)' }}>
              {t('service_dueOperationsAt')} {serviceIntervals[selectedIntervalIndex]}
            </h4>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 pt-1">
            {dueOperations.map((op, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[12.5px] text-[var(--ps-text-secondary)] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ps-gold)] mt-2 shrink-0" />
                <span>{t(op.operation)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Disclaimer Box */}
        <div
          className="mt-6 rounded-none p-5 border border-[var(--ps-border)] relative overflow-hidden"
          style={{ backgroundColor: 'var(--ps-bg-info)' }}
        >
          {/* Subtle corner design detail */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--ps-border)] opacity-35" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--ps-border)] opacity-35" />

          <h4 className="text-[13px] font-semibold mb-2" style={{ color: 'var(--ps-text)' }}>
            {t('disclaimerTitle')}
          </h4>
          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
            {t('serviceMaintenanceDisclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
}
