import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { useMarket } from '@/contexts/MarketContext';
import { Check, Copy } from 'lucide-react';

interface TorqueSpec {
  item: string;
  value: string;
  note?: string;
}

interface FluidSpec {
  item: string;
  value: string;
  note?: string;
}

interface BatterySpec {
  item: string;
  value: string;
}

interface ServiceRow {
  operation: string;
  intervals: boolean[];
}

const torqueSpecs: TorqueSpec[] = [
  {
    item: 'Wheel Lug Bolts',
    value: '140 Nm',
    note: 'Strictly dry threads; do not lubricate.',
  },
  {
    item: 'Strut Top Center Nut',
    value: '81 Nm',
    note: 'Must be torqued at ride height.',
  },
  {
    item: 'Hub / Axle Bolt',
    value: '45 Nm + 90°',
    note: 'Single-use torque-to-yield item; replace every removal.',
  },
];

const fluidSpecs: FluidSpec[] = [
  {
    item: 'Brake Fluid',
    value: 'DOT 4 / DOT 4 LV',
    note: 'Low Viscosity variant preferred for enhanced ABS/stability control response in cold climates.',
  },
  {
    item: 'A/C Refrigerant',
    value: 'R1234yf or R134a',
    note: 'Varies strictly by regional production destination; check the specification label located on the underside of the front hood.',
  },
];

const batterySpecs: BatterySpec[] = [
  { item: 'Group Size Designation', value: 'H6 (LN3) AGM' },
  { item: 'Capacity', value: '70 Ah' },
  { item: 'Cold Cranking Amps (CCA)', value: '760 A' },
  { item: 'Dimensions', value: '277.7 × 174.4 × 188.5 mm' },
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
  { operation: 'Service Reminder Indicator (SRI), reset', intervals: [true, true, true, true, true, true, true] },
  { operation: 'Coolant check & adjust antifreeze/anti-corrosion', intervals: [true, true, true, true, true, true, true] },
  { operation: 'Cabin air filter, replace', intervals: [true, true, true, true, true, true, true] },
  { operation: 'Clean inside windshield in front of camera', intervals: [true, false, false, false, false, false, false] },
  { operation: 'Seatbelts, check function', intervals: [true, true, true, true, true, true, true] },
  { operation: 'Washer fluid & wiper blades/washers, check', intervals: [true, true, true, true, true, true, true] },
  { operation: 'External lighting & horn, check/align', intervals: [true, true, true, true, true, true, true] },
  { operation: 'Brake fluid level, pads, discs & parking brake, check', intervals: [true, true, true, true, true, true, true] },
  { operation: 'Wheels and tires, check wear & pressure', intervals: [true, true, true, true, true, true, true] },
  { operation: 'Brake fluid, replace', intervals: [false, true, false, true, false, true, false] },
  { operation: 'Brake hoses and lines, check for leaks', intervals: [false, true, false, true, false, true, false] },
  { operation: 'Front & rear suspension/steering wear check', intervals: [false, true, false, true, false, true, false] },
  { operation: 'Driveshaft joints & rubber boots, check', intervals: [false, true, false, true, false, true, false] },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

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
      className="inline-flex items-center gap-1 ml-2 text-[11px] opacity-0 group-hover:opacity-100 transition-all duration-200"
      style={{
        color: copied ? 'var(--ps-gold)' : 'var(--ps-text-tertiary)',
        transform: copied ? 'scale(1.2)' : 'scale(1)',
      }}
      onMouseEnter={(e) => {
        if (!copied) e.currentTarget.style.color = 'var(--ps-text)';
      }}
      onMouseLeave={(e) => {
        if (!copied) e.currentTarget.style.color = 'var(--ps-text-tertiary)';
      }}
      title="Copy to clipboard"
    >
      {copied ? <Check size={12} className="text-[var(--ps-gold)]" /> : <Copy size={12} />}
    </button>
  );
}

export default function ServiceMaintenance() {
  const { t } = useLocale();
  const { market } = useMarket();
  const useKm = market === 'uk' || market === 'se';
  const serviceIntervals = useKm ? serviceIntervalsKm : serviceIntervalsMi;

  return (
    <div className="space-y-10">
      {/* Technical Specifications & Critical Data */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('techSpecsTitle')}
        </h3>

        {/* Torque Values */}
        <div className="mb-6">
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
                      {spec.item}
                    </td>
                    <td
                      className="py-3 pr-4 text-[13px] align-top flex items-center"
                      style={{ color: 'var(--ps-text)' }}
                    >
                      <span>{spec.value}</span>
                      <CopyButton text={spec.value} />
                    </td>
                    <td
                      className="py-3 pr-4 text-[12px] leading-relaxed align-top"
                      style={{ color: 'var(--ps-text-secondary)' }}
                    >
                      {spec.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fluid & Capacities */}
        <div className="mb-6">
          <h4
            className="text-[13px] font-medium mb-3 uppercase tracking-wider"
            style={{ color: 'var(--ps-text-tertiary)' }}
          >
            {t('fluidCapacities')}
          </h4>
          <div className="space-y-3">
            {fluidSpecs.map((fluid) => (
              <div
                key={fluid.item}
                className="rounded-none p-4 border border-[var(--ps-border)]"
                style={{ backgroundColor: 'var(--ps-bg-info)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="text-[13px] font-medium w-[140px] shrink-0" style={{ color: 'var(--ps-text)' }}>
                    {fluid.item}
                  </span>
                  <span className="text-[13px]" style={{ color: 'var(--ps-text)' }}>
                    {fluid.value}
                  </span>
                </div>
                {fluid.note && (
                  <p className="text-[12px] leading-relaxed mt-1" style={{ color: 'var(--ps-text-secondary)' }}>
                    {fluid.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Auxiliary 12V Battery */}
        <div>
          <h4
            className="text-[13px] font-medium mb-3 uppercase tracking-wider"
            style={{ color: 'var(--ps-text-tertiary)' }}
          >
            {t('aux12vBattery')}
          </h4>
          <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
            <table className="w-full min-w-[400px] border-collapse">
              <tbody>
                {batterySpecs.map((spec, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--ps-table-row)' }}>
                    <td
                      className="py-3 pr-4 text-[13px] font-medium w-[200px] align-top"
                      style={{ color: 'var(--ps-text)' }}
                    >
                      {spec.item}
                    </td>
                    <td
                      className="py-3 pr-4 text-[13px] align-top"
                      style={{ color: 'var(--ps-text-secondary)' }}
                    >
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="mt-3 rounded-none p-4 border border-[var(--ps-border)]"
            style={{ backgroundColor: 'var(--ps-bg-info)' }}
          >
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              <span className="font-medium" style={{ color: 'var(--ps-text)' }}>{t('calibrationNote')}:</span>{' '}
              {t('batteryCalibration')}
            </p>
          </div>
        </div>
      </div>

      {/* Maintenance Operations Service Schedule */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('maintenanceScheduleTitle')}
        </h3>
        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ps-text-secondary)' }}>
          {useKm ? t('maintenanceIntervalDescKm') : t('maintenanceIntervalDescMi')}
        </p>

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
                {serviceIntervals.map((label, i) => (
                  <th
                    key={i}
                    className="text-center py-3 px-1 text-[11px] font-normal uppercase tracking-wider min-w-[70px]"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {serviceRows.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--ps-table-row)' }}>
                  <td
                    className="py-3 pr-4 text-[13px] align-top"
                    style={{ color: 'var(--ps-text)' }}
                  >
                    {row.operation}
                  </td>
                  {row.intervals.map((due, i) => (
                    <td key={i} className="text-center py-3 px-1 align-middle">
                      {due ? (
                        <span
                          className="inline-flex items-center justify-center w-5 h-5 rounded-none text-[10px] font-bold"
                          style={{
                            backgroundColor: 'var(--ps-standard)',
                            color: 'var(--ps-bg)',
                          }}
                        >
                          ✓
                        </span>
                      ) : (
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-none"
                          style={{ backgroundColor: 'var(--ps-unavailable)' }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
