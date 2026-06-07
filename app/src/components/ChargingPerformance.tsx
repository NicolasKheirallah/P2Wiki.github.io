import { useLocale } from '@/contexts/LocaleContext';
import ChargingCurveChart from './ChargingCurveChart';

interface DcVariant {
  generation: string;
  gross: string;
  usable: string;
  peak: string;
}

interface AcSpec {
  configuration: string;
  power: string;
}

interface Takeaway {
  text: string;
}

const dcVariants: DcVariant[] = [
  {
    generation: 'Pre-Facelift Long Range',
    gross: '78 kWh',
    usable: '~75 kWh',
    peak: '150 kW',
  },
  {
    generation: '2024+ Facelift Long Range',
    gross: '82 kWh',
    usable: '79 kWh',
    peak: '205 kW',
  },
];

const acSpecs: AcSpec[] = [
  {
    configuration: 'Three-Phase AC (400 V, 3 × 16 A)',
    power: '11 kW',
  },
  {
    configuration: 'Single-Phase AC (230 V, 1 × 32 A)',
    power: '7.4 kW',
  },
];

const curvePhases = [
  {
    range: '10–30% SoC',
    description:
      'Highest charging rates are typically available when battery temperature is within the optimal range.',
  },
  {
    range: '30–70% SoC',
    description: 'Charging power gradually tapers as SoC increases.',
  },
  {
    range: '70–80% SoC',
    description: 'Charging rates reduce more noticeably.',
  },
  {
    range: '80–100% SoC',
    description:
      'Charging power decreases significantly to protect battery longevity and minimize cell stress.',
  },
];

const takeaways: Takeaway[] = [
  { text: 'Long Range Polestar 2 models support up to 150 kW or 205 kW DC charging depending on generation.' },
  { text: 'AC charging supports up to 11 kW on a three-phase connection.' },
  { text: "Battery preconditioning requires navigation to a DC charger using the vehicle's native Google Maps system." },
  { text: 'Charging speed naturally tapers as battery state of charge increases.' },
  { text: 'Polestar officially recommends a 90% charge limit for daily use; charge to 100% only when full range is needed.' },
  { text: 'Avoid letting SoC fall below 20% — deep discharge can cause serious battery damage.' },
  { text: 'AC charging is preferred for daily use; reserve DC fast charging for long-distance travel.' },
  { text: 'Long-term storage is best performed with the battery maintained around 40–60% state of charge.' },
  { text: 'The 8-year / 160,000 km battery warranty guarantees at least 70% of original capacity.' },
  { text: 'The emergency charging cable release is located beneath the cargo floor on the left side.' },
];

export default function ChargingPerformance() {
  const { t } = useLocale();

  return (
    <div className="space-y-10">
      {/* DC Fast Charging */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('dcFastChargingTitle')}
        </h3>

        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('dcChargingIntro')}
        </p>

        <h4
          className="text-[13px] font-medium mb-3 uppercase tracking-wider"
          style={{ color: 'var(--ps-text-tertiary)' }}
        >
          {t('longRangeVariants')}
        </h4>

        <div className="overflow-x-auto scrollbar-hide -mx-2 px-2 mb-6">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ps-table-border)' }}>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('modelGeneration')}
                </th>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('batteryCapacityGross')}
                </th>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('usableCapacity')}
                </th>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('peakDcPower')}
                </th>
              </tr>
            </thead>
            <tbody>
              {dcVariants.map((variant, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--ps-table-row)' }}>
                  <td
                    className="py-3 pr-4 text-[13px] font-medium align-top"
                    style={{ color: 'var(--ps-text)' }}
                  >
                    {variant.generation}
                  </td>
                  <td
                    className="py-3 pr-4 text-[13px] align-top"
                    style={{ color: 'var(--ps-text-secondary)' }}
                  >
                    {variant.gross}
                  </td>
                  <td
                    className="py-3 pr-4 text-[13px] align-top"
                    style={{ color: 'var(--ps-text-secondary)' }}
                  >
                    {variant.usable}
                  </td>
                  <td
                    className="py-3 pr-4 text-[13px] align-top"
                    style={{ color: 'var(--ps-text)' }}
                  >
                    {variant.peak}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4
          className="text-[13px] font-medium mb-3 uppercase tracking-wider"
          style={{ color: 'var(--ps-text-tertiary)' }}
        >
          {t('chargingCurveTitle')}
        </h4>

        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('chargingCurveIntro')}
        </p>

        <div className="mb-6 rounded-none p-4 border border-[var(--ps-border)]" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
          <ChargingCurveChart />
        </div>

        <div className="space-y-3">
          {curvePhases.map((phase) => (
            <div
              key={phase.range}
              className="rounded-none p-4 border border-l-[3px]"
              style={{
                backgroundColor: 'var(--ps-bg-info)',
                borderColor: 'var(--ps-border)',
                borderLeftColor: 'var(--ps-gold)',
              }}
            >
              <h5 className="text-[12px] font-medium mb-1 uppercase tracking-wide" style={{ color: 'var(--ps-gold)' }}>
                {phase.range}
              </h5>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[13px] leading-relaxed mt-4" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('dcChargingOutro')}
        </p>
      </div>

      {/* AC Charging */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('acInfrastructureTitle')}
        </h3>

        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('acChargingIntro')}
        </p>

        <h4
          className="text-[13px] font-medium mb-3 uppercase tracking-wider"
          style={{ color: 'var(--ps-text-tertiary)' }}
        >
          {t('acChargingSpecs')}
        </h4>

        <div className="overflow-x-auto scrollbar-hide -mx-2 px-2 mb-4">
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--ps-table-border)' }}>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('chargingConfiguration')}
                </th>
                <th
                  className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider"
                  style={{ color: 'var(--ps-text-tertiary)' }}
                >
                  {t('maximumPower')}
                </th>
              </tr>
            </thead>
            <tbody>
              {acSpecs.map((spec, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--ps-table-row)' }}>
                  <td
                    className="py-3 pr-4 text-[13px] align-top"
                    style={{ color: 'var(--ps-text)' }}
                  >
                    {spec.configuration}
                  </td>
                  <td
                    className="py-3 pr-4 text-[13px] font-medium align-top"
                    style={{ color: 'var(--ps-text)' }}
                  >
                    {spec.power}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('acChargingOutro')}
        </p>
      </div>

      {/* Thermal Preconditioning */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('thermalPreconditioningTitle')}
        </h3>

        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('preconditioningIntro')}
        </p>

        <div className="space-y-3">
          <div className="rounded-none p-4 border border-[var(--ps-border)]" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('preconditioningNativeMaps')}
            </p>
          </div>
          <div className="rounded-none p-4 border border-[var(--ps-border)]" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('preconditioningAutoPrepare')}
            </p>
          </div>
          <div className="rounded-none p-4 border border-[var(--ps-border)]" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('preconditioningThirdParty')}
            </p>
          </div>
        </div>

        <p className="text-[13px] leading-relaxed mt-4" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('preconditioningFactors')}
        </p>
      </div>

      {/* Heat Pump */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('heatPumpTitle')}
        </h3>

        <div className="space-y-4">
          <div>
            <h4
              className="text-[13px] font-medium mb-2"
              style={{ color: 'var(--ps-text)' }}
            >
              {t('vehiclesWithoutHeatPump')}
            </h4>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('withoutHeatPumpDesc')}
            </p>
          </div>

          <div>
            <h4
              className="text-[13px] font-medium mb-2"
              style={{ color: 'var(--ps-text)' }}
            >
              {t('vehiclesWithHeatPump')}
            </h4>
            <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('withHeatPumpDesc')}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('heatPumpBenefit1')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('heatPumpBenefit2')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('heatPumpBenefit3')}
              </li>
            </ul>
            <p className="text-[13px] leading-relaxed mt-3" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('heatPumpVariability')}
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('chargingTroubleshootingTitle')}
        </h3>

        <div className="space-y-6">
          <div>
            <h4
              className="text-[13px] font-medium mb-3"
              style={{ color: 'var(--ps-text)' }}
            >
              {t('cableLockingIssues')}
            </h4>
            <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('cableLockingDesc')}
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {t('lockingAction1')}
              </li>
              <li className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {t('lockingAction2')}
              </li>
              <li className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {t('lockingAction3')}
              </li>
            </ol>
          </div>

          <div>
            <h4
              className="text-[13px] font-medium mb-3"
              style={{ color: 'var(--ps-text)' }}
            >
              {t('emergencyReleaseTitle')}
            </h4>
            <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('emergencyReleaseDesc')}
            </p>
            <p className="text-[13px] font-medium mb-2" style={{ color: 'var(--ps-text)' }}>
              {t('procedure')}:
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {t('releaseStep1')}
              </li>
              <li className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {t('releaseStep2')}
              </li>
              <li className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {t('releaseStep3')}
              </li>
              <li className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {t('releaseStep4')}
              </li>
              <li className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {t('releaseStep5')}
              </li>
            </ol>
            <p className="text-[13px] leading-relaxed mt-3" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('emergencyReleaseOutro')}
            </p>
          </div>
        </div>
      </div>

      {/* NMC Battery Care */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('nmcMaintenanceTitle')}
        </h3>

        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('nmcIntro')}
        </p>

        <div className="space-y-6">
          <div>
            <h4
              className="text-[13px] font-medium mb-3"
              style={{ color: 'var(--ps-text)' }}
            >
              {t('dailyUseTitle')}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('dailyUse1')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('dailyUse2')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('dailyUse3')}
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-[13px] font-medium mb-3"
              style={{ color: 'var(--ps-text)' }}
            >
              {t('deepDischargeTitle')}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('deepDischarge1')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('deepDischarge2')}
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-[13px] font-medium mb-3"
              style={{ color: 'var(--ps-text)' }}
            >
              {t('chargingStrategyTitle')}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('chargingStrategy1')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('chargingStrategy2')}
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-[13px] font-medium mb-3"
              style={{ color: 'var(--ps-text)' }}
            >
              {t('longTermStorageTitle')}
            </h4>
            <p className="text-[13px] font-medium mb-2" style={{ color: 'var(--ps-text)' }}>
              {t('storageOneToThreeMonths')}:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('storageShort1')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('storageShort2')}
              </li>
            </ul>
            <p className="text-[13px] font-medium mb-2" style={{ color: 'var(--ps-text)' }}>
              {t('storageOverThreeMonths')}:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('storageLong1')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('storageLong2')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('storageLong3')}
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-[13px] font-medium mb-3"
              style={{ color: 'var(--ps-text)' }}
            >
              {t('environmentalTitle')}
            </h4>
            <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('environmentalIntro')}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('environmental1')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('environmental2')}
              </li>
              <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('environmental3')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Battery Health & Longevity */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('batteryHealthTitle')}
        </h3>

        <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('batteryHealthIntro')}
        </p>

        {/* SoC Thresholds */}
        <h4
          className="text-[13px] font-medium mb-3 uppercase tracking-wider"
          style={{ color: 'var(--ps-text-tertiary)' }}
        >
          {t('socThresholdsTitle')}
        </h4>

        <div className="space-y-3 mb-6">
          <div
            className="rounded-lg p-4 border-l-[3px]"
            style={{
              backgroundColor: 'var(--ps-bg-info)',
              borderColor: 'var(--ps-gold)',
            }}
          >
            <h5 className="text-[12px] font-medium mb-1 uppercase tracking-wide" style={{ color: 'var(--ps-gold)' }}>
              {t('socDailyLimit')}
            </h5>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('socDailyLimitDesc')}
            </p>
          </div>
          <div
            className="rounded-lg p-4 border-l-[3px]"
            style={{
              backgroundColor: 'var(--ps-bg-info)',
              borderColor: 'var(--ps-text-tertiary)',
            }}
          >
            <h5 className="text-[12px] font-medium mb-1 uppercase tracking-wide" style={{ color: 'var(--ps-text-tertiary)' }}>
              {t('socRoadTrips')}
            </h5>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('socRoadTripsDesc')}
            </p>
          </div>
          <div
            className="rounded-lg p-4 border-l-[3px]"
            style={{
              backgroundColor: 'var(--ps-bg-info)',
              borderColor: 'var(--ps-error)',
            }}
          >
            <h5 className="text-[12px] font-medium mb-1 uppercase tracking-wide" style={{ color: 'var(--ps-error)' }}>
              {t('socLowWarning')}
            </h5>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('socLowWarningDesc')}
            </p>
          </div>
          <div
            className="rounded-lg p-4 border-l-[3px]"
            style={{
              backgroundColor: 'var(--ps-bg-info)',
              borderColor: 'var(--ps-success)',
            }}
          >
            <h5 className="text-[12px] font-medium mb-1 uppercase tracking-wide" style={{ color: 'var(--ps-success)' }}>
              {t('socSweetSpot')}
            </h5>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('socSweetSpotDesc')}
            </p>
          </div>
        </div>

        {/* AC vs DC */}
        <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
          <h4
            className="text-[13px] font-medium mb-2"
            style={{ color: 'var(--ps-text)' }}
          >
            {t('acVsDcTitle')}
          </h4>
          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
            {t('acVsDcDesc')}
          </p>
        </div>

        {/* Extreme Temperatures */}
        <h4
          className="text-[13px] font-medium mb-3 uppercase tracking-wider"
          style={{ color: 'var(--ps-text-tertiary)' }}
        >
          {t('extremeTempTitle')}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
            <h5 className="text-[13px] font-medium mb-2" style={{ color: 'var(--ps-text)' }}>
              {t('extremeTempHotTitle')}
            </h5>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[12px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('extremeTempHot1')}
              </li>
              <li className="flex items-start gap-2 text-[12px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('extremeTempHot2')}
              </li>
              <li className="flex items-start gap-2 text-[12px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('extremeTempHot3')}
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
            <h5 className="text-[13px] font-medium mb-2" style={{ color: 'var(--ps-text)' }}>
              {t('extremeTempColdTitle')}
            </h5>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[12px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('extremeTempCold1')}
              </li>
              <li className="flex items-start gap-2 text-[12px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('extremeTempCold2')}
              </li>
              <li className="flex items-start gap-2 text-[12px]" style={{ color: 'var(--ps-text-secondary)' }}>
                <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
                {t('extremeTempCold3')}
              </li>
            </ul>
          </div>
        </div>

        {/* Battery Warranty */}
        <h4
          className="text-[13px] font-medium mb-3 uppercase tracking-wider"
          style={{ color: 'var(--ps-text-tertiary)' }}
        >
          {t('batteryWarrantyTitle')}
        </h4>

        <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('batteryWarrantyDesc')}
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
            <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
            {t('batteryWarrantyReplace')}
          </li>
          <li className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
            <span className="mt-1.5 inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--ps-text-tertiary)' }} />
            {t('batteryWarrantyCert')}
          </li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div className="rounded-none p-5 border border-[var(--ps-border)]" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('keyTakeaways')}
        </h3>
        <ul className="space-y-3">
          {takeaways.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: 'var(--ps-gold)' }}
              />
              <span className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
