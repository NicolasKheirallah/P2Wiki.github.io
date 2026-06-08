import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { useMarket } from '@/contexts/MarketContext';
import ChargingCurveChart from './ChargingCurveChart';
import { BatteryCharging, Clock, Zap, Gauge } from 'lucide-react';

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
    generation: 'charging_stdRangeEarly2022',
    gross: '64 kWh',
    usable: '61 kWh',
    peak: '116 kW',
  },
  {
    generation: 'charging_stdRangeLate2022',
    gross: '69 kWh',
    usable: '67 kWh',
    peak: '130–135 kW',
  },
  {
    generation: 'charging_lrPreFacelift',
    gross: '78 kWh',
    usable: '~75 kWh',
    peak: '150 kW',
  },
  {
    generation: 'charging_lrFacelift',
    gross: '82 kWh',
    usable: '79 kWh',
    peak: '205 kW',
  },
];

const batteryUsableCapacities = {
  standard64: 61,
  standard: 67,
  lrPre2024: 75,
  lrSiC: 79,
};

const chargingCurvesData = {
  standard64: [
    { soc: 0, power: 15 },
    { soc: 5, power: 70 },
    { soc: 10, power: 100 },
    { soc: 15, power: 110 },
    { soc: 20, power: 116 },
    { soc: 25, power: 116 },
    { soc: 30, power: 116 },
    { soc: 35, power: 110 },
    { soc: 40, power: 102 },
    { soc: 45, power: 94 },
    { soc: 50, power: 86 },
    { soc: 55, power: 78 },
    { soc: 60, power: 72 },
    { soc: 65, power: 66 },
    { soc: 70, power: 60 },
    { soc: 75, power: 50 },
    { soc: 80, power: 38 },
    { soc: 85, power: 28 },
    { soc: 90, power: 18 },
    { soc: 95, power: 12 },
    { soc: 100, power: 7 },
  ],
  standard: [
    { soc: 0, power: 20 },
    { soc: 5, power: 80 },
    { soc: 10, power: 120 },
    { soc: 15, power: 130 },
    { soc: 20, power: 135 },
    { soc: 25, power: 135 },
    { soc: 30, power: 135 },
    { soc: 35, power: 125 },
    { soc: 40, power: 115 },
    { soc: 45, power: 105 },
    { soc: 50, power: 95 },
    { soc: 55, power: 88 },
    { soc: 60, power: 82 },
    { soc: 65, power: 78 },
    { soc: 70, power: 72 },
    { soc: 75, power: 58 },
    { soc: 80, power: 45 },
    { soc: 85, power: 32 },
    { soc: 90, power: 22 },
    { soc: 95, power: 14 },
    { soc: 100, power: 8 },
  ],
  lrPre2024: [
    { soc: 0, power: 30 },
    { soc: 5, power: 100 },
    { soc: 10, power: 140 },
    { soc: 15, power: 148 },
    { soc: 20, power: 150 },
    { soc: 25, power: 150 },
    { soc: 30, power: 150 },
    { soc: 35, power: 140 },
    { soc: 40, power: 130 },
    { soc: 45, power: 120 },
    { soc: 50, power: 110 },
    { soc: 55, power: 100 },
    { soc: 60, power: 92 },
    { soc: 65, power: 84 },
    { soc: 70, power: 76 },
    { soc: 75, power: 62 },
    { soc: 80, power: 48 },
    { soc: 85, power: 35 },
    { soc: 90, power: 24 },
    { soc: 95, power: 15 },
    { soc: 100, power: 8 },
  ],
  lrSiC: [
    { soc: 0, power: 40 },
    { soc: 5, power: 140 },
    { soc: 10, power: 195 },
    { soc: 15, power: 203 },
    { soc: 20, power: 205 },
    { soc: 25, power: 205 },
    { soc: 30, power: 205 },
    { soc: 35, power: 190 },
    { soc: 40, power: 175 },
    { soc: 45, power: 160 },
    { soc: 50, power: 145 },
    { soc: 55, power: 130 },
    { soc: 60, power: 115 },
    { soc: 65, power: 100 },
    { soc: 70, power: 85 },
    { soc: 75, power: 68 },
    { soc: 80, power: 52 },
    { soc: 85, power: 38 },
    { soc: 90, power: 26 },
    { soc: 95, power: 16 },
    { soc: 100, power: 9 },
  ],
};

const acSpecs: AcSpec[] = [
  {
    configuration: 'charging_acThreePhase',
    power: '11 kW',
  },
  {
    configuration: 'charging_acSinglePhase',
    power: '7.4 kW',
  },
];

const curvePhases = [
  {
    range: 'charging_phaseRange1',
    description: 'charging_phaseDesc1',
  },
  {
    range: 'charging_phaseRange2',
    description: 'charging_phaseDesc2',
  },
  {
    range: 'charging_phaseRange3',
    description: 'charging_phaseDesc3',
  },
  {
    range: 'charging_phaseRange4',
    description: 'charging_phaseDesc4',
  },
];

const takeaways: Takeaway[] = [
  { text: 'charging_takeaway0' },
  { text: 'charging_takeaway1' },
  { text: 'charging_takeaway2' },
  { text: 'charging_takeaway3' },
  { text: 'charging_takeaway4' },
  { text: 'charging_takeaway5' },
  { text: 'charging_takeaway6' },
  { text: 'charging_takeaway7' },
  { text: 'charging_takeaway8' },
  { text: 'charging_takeaway9' },
];

export default function ChargingPerformance() {
  const { t } = useLocale();
  const { market } = useMarket();
  const useKm = market === 'se';

  const [batteryVariant, setBatteryVariant] = useState<'standard64' | 'standard' | 'lrPre2024' | 'lrSiC'>('lrSiC');
  const [chargerPowerLimit, setChargerPowerLimit] = useState<number>(350);
  const [startSoc, setStartSoc] = useState<number>(10);
  const [targetSoc, setTargetSoc] = useState<number>(80);
  const [isCalculating, setIsCalculating] = useState(false);

  const triggerCalculateAnimation = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 150);
  };

  const handleStartSocChange = (val: number) => {
    setStartSoc(val);
    triggerCalculateAnimation();
    if (val >= targetSoc) {
      setTargetSoc(Math.min(100, val + 5));
    }
  };

  const handleTargetSocChange = (val: number) => {
    setTargetSoc(val);
    triggerCalculateAnimation();
    if (val <= startSoc) {
      setStartSoc(Math.max(0, val - 5));
    }
  };

  const handleBatteryVariantChange = (val: 'standard64' | 'standard' | 'lrPre2024' | 'lrSiC') => {
    setBatteryVariant(val);
    triggerCalculateAnimation();
  };

  const handleChargerPowerChange = (val: number) => {
    setChargerPowerLimit(val);
    triggerCalculateAnimation();
  };

  // Estimator math
  const usableCap = batteryUsableCapacities[batteryVariant];
  const curve = chargingCurvesData[batteryVariant];

  let totalMinutes = 0;
  let totalEnergyAdded = 0;
  let totalPowerSum = 0;
  let stepCount = 0;

  for (let s = startSoc; s < targetSoc; s += 5) {
    const dp = curve.find((point) => point.soc === s) || curve[0];
    const actualPower = Math.min(chargerPowerLimit, dp.power);
    const energyStep = usableCap * 0.05;
    const timeStepMinutes = (energyStep / actualPower) * 60;

    totalMinutes += timeStepMinutes;
    totalEnergyAdded += energyStep;
    totalPowerSum += actualPower;
    stepCount++;
  }

  const avgPower = stepCount > 0 ? totalPowerSum / stepCount : 0;
  
  const consumptionRate = batteryVariant.startsWith('standard') ? 17.0 : 18.0;
  const rangeAddedKm = (totalEnergyAdded / consumptionRate) * 100;
  const rangeAddedMiles = rangeAddedKm * 0.621371;

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
                    {t(variant.generation)}
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
                {t(phase.range)}
              </h5>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                {t(phase.description)}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[13px] leading-relaxed mt-4 mb-6" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('dcChargingOutro')}
        </p>

        {/* Interactive Estimator Container */}
        <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-5 rounded-none relative mb-6">
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--ps-border)] opacity-35" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--ps-border)] opacity-35" />

          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-[var(--ps-gold)] font-semibold" />
            <h4 className="text-[13px] font-semibold uppercase tracking-wider" style={{ color: 'var(--ps-text)' }}>
              {t('estimatorTitle')}
            </h4>
          </div>

          <p className="text-[12.5px] text-[var(--ps-text-secondary)] leading-relaxed mb-5">
            {t('estimatorIntro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            {/* Left Column: Controls */}
            <div className="space-y-4">
              {/* Battery Variant Select */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-semibold block">
                  {t('selectBattery')}
                </label>
                <select
                  value={batteryVariant}
                  onChange={(e) => handleBatteryVariantChange(e.target.value as 'standard64' | 'standard' | 'lrPre2024' | 'lrSiC')}
                  className="w-full bg-[var(--ps-bg-secondary)] border border-[var(--ps-border)] hover:border-[var(--ps-text-secondary)] focus:border-[var(--ps-text)] p-2 text-[12px] text-[var(--ps-text)] outline-none rounded-none cursor-pointer"
                >
                  <option value="standard64">
                    {t('charging_selectStd64')}
                  </option>
                  <option value="standard">
                    {t('charging_selectStd69')}
                  </option>
                  <option value="lrPre2024">
                    {t('charging_selectLr78')}
                  </option>
                  <option value="lrSiC">
                    {t('charging_selectLr82')}
                  </option>
                </select>
              </div>

              {/* Charger Power Select */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-semibold block">
                  {t('selectChargerPower')}
                </label>
                <select
                  value={chargerPowerLimit}
                  onChange={(e) => handleChargerPowerChange(Number(e.target.value))}
                  className="w-full bg-[var(--ps-bg-secondary)] border border-[var(--ps-border)] hover:border-[var(--ps-text-secondary)] focus:border-[var(--ps-text)] p-2 text-[12px] text-[var(--ps-text)] outline-none rounded-none cursor-pointer"
                >
                  <option value="50">{t('charging_charger50kw')}</option>
                  <option value="150">{t('charging_charger150kw')}</option>
                  <option value="350">{t('charging_charger350kw')}</option>
                </select>
              </div>

              {/* Start SoC Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-semibold">
                  <span>{t('startSocLabel')}</span>
                  <span className="text-[var(--ps-text)] font-bold">{startSoc}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="95"
                  step="5"
                  value={startSoc}
                  onChange={(e) => handleStartSocChange(Number(e.target.value))}
                  className="w-full h-4 bg-transparent appearance-none cursor-pointer focus:outline-none
                    [&::-webkit-slider-runnable-track]:bg-[var(--ps-border)] [&::-webkit-slider-runnable-track]:h-[2px]
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[var(--ps-gold)] [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:-mt-[5px]
                    [&::-moz-range-track]:bg-[var(--ps-border)] [&::-moz-range-track]:h-[2px]
                    [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-[var(--ps-gold)] [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0"
                />
              </div>

              {/* Target SoC Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] uppercase tracking-wider text-[var(--ps-text-tertiary)] font-semibold">
                  <span>{t('targetSocLabel')}</span>
                  <span className="text-[var(--ps-text)] font-bold">{targetSoc}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={targetSoc}
                  onChange={(e) => handleTargetSocChange(Number(e.target.value))}
                  className="w-full h-4 bg-transparent appearance-none cursor-pointer focus:outline-none
                    [&::-webkit-slider-runnable-track]:bg-[var(--ps-border)] [&::-webkit-slider-runnable-track]:h-[2px]
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[var(--ps-gold)] [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:-mt-[5px]
                    [&::-moz-range-track]:bg-[var(--ps-border)] [&::-moz-range-track]:h-[2px]
                    [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-[var(--ps-gold)] [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0"
                />
              </div>

              {/* Visual charging window bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[9px] text-[var(--ps-text-tertiary)] uppercase tracking-wider font-semibold">
                  <span>{t('soc0')}</span>
                  <span>{t('soc50')}</span>
                  <span>{t('soc100')}</span>
                </div>
                <div className="flex gap-[2px] h-[6px] w-full bg-[var(--ps-border-light)]/20">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const blockSoc = i * 5;
                    const isSelected = blockSoc >= startSoc && blockSoc < targetSoc;
                    return (
                      <div
                        key={i}
                        className="h-full flex-1 transition-all duration-300"
                        style={{
                          backgroundColor: isSelected ? 'var(--ps-gold)' : 'var(--ps-border-light)',
                          opacity: isSelected ? 1 : 0.25,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Output Metrics */}
            <div 
              className={`grid grid-cols-2 gap-px border border-[var(--ps-border)] bg-[var(--ps-border)] rounded-none transition-opacity duration-200 ${isCalculating ? 'opacity-60' : 'opacity-100'}`}
            >
              {/* Box 1: Time */}
              <div className="bg-[var(--ps-bg-secondary)]/30 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--ps-text-tertiary)]">
                  <Clock size={12} className="text-[var(--ps-text-tertiary)]" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">{t('timeToCharge')}</span>
                </div>
                <p className="text-[20px] font-medium" style={{ color: 'var(--ps-text)' }}>
                  {Math.round(totalMinutes)} <span className="text-[11px] font-normal text-[var(--ps-text-secondary)]">{t('minutes')}</span>
                </p>
              </div>

              {/* Box 2: Energy */}
              <div className="bg-[var(--ps-bg-secondary)]/30 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--ps-text-tertiary)]">
                  <BatteryCharging size={12} className="text-[var(--ps-text-tertiary)]" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">{t('energyAdded')}</span>
                </div>
                <p className="text-[20px] font-medium" style={{ color: 'var(--ps-text)' }}>
                  {totalEnergyAdded.toFixed(1)} <span className="text-[11px] font-normal text-[var(--ps-text-secondary)]">kWh</span>
                </p>
              </div>

              {/* Box 3: Range */}
              <div className="bg-[var(--ps-bg-secondary)]/30 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--ps-text-tertiary)]">
                  <Gauge size={12} className="text-[var(--ps-text-tertiary)]" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">{t('rangeAdded')}</span>
                </div>
                <p className="text-[20px] font-medium" style={{ color: 'var(--ps-text)' }}>
                  {useKm ? Math.round(rangeAddedKm) : Math.round(rangeAddedMiles)}{' '}
                  <span className="text-[11px] font-normal text-[var(--ps-text-secondary)]">
                    {useKm ? t('rangeKm') : t('rangeMiles')}
                  </span>
                </p>
              </div>

              {/* Box 4: Avg Power */}
              <div className="bg-[var(--ps-bg-secondary)]/30 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--ps-text-tertiary)]">
                  <Zap size={12} className="text-[var(--ps-text-tertiary)]" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">{t('avgChargingPower')}</span>
                </div>
                <p className="text-[20px] font-medium" style={{ color: 'var(--ps-text)' }}>
                  {Math.round(avgPower)} <span className="text-[11px] font-normal text-[var(--ps-text-secondary)]">kW</span>
                </p>
              </div>
            </div>
          </div>
        </div>
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
                    {t(spec.configuration)}
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

      {/* Battery Chemistry Guides (LFP vs. NMC) */}
      <div>
        <h3
          className="text-[16px] font-medium mb-4"
          style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
        >
          {t('batteryChemistryTitle')}
        </h3>

        <p className="text-[13px] leading-relaxed mb-6" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('batteryChemistryIntro')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LFP Battery Guide */}
          <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-5 rounded-none relative">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--ps-border)] opacity-35" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--ps-border)] opacity-35" />

            <h4 className="text-[14px] font-semibold mb-2" style={{ color: 'var(--ps-text)' }}>
              {t('lfpTitle')}
            </h4>
            <p className="text-[12.5px] leading-relaxed mb-4 text-[var(--ps-text-secondary)]">
              {t('lfpDesc')}
            </p>

            <div className="p-4 border-l-[3px] border-[var(--ps-gold)] bg-[var(--ps-bg-secondary)]/5">
              <h5 className="text-[11.5px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--ps-gold)' }}>
                {t('lfpRecTitle')}
              </h5>
              <p className="text-[12px] leading-relaxed text-[var(--ps-text-secondary)]">
                {t('lfpRecDesc')}
              </p>
            </div>
          </div>

          {/* NMC Battery Guide */}
          <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-5 rounded-none relative">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--ps-border)] opacity-35" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--ps-border)] opacity-35" />

            <h4 className="text-[14px] font-semibold mb-2" style={{ color: 'var(--ps-text)' }}>
              {t('nmcTitle')}
            </h4>
            <p className="text-[12.5px] leading-relaxed mb-4 text-[var(--ps-text-secondary)]">
              {t('nmcDesc')}
            </p>

            <div className="p-4 border-l-[3px] border-[var(--ps-text-tertiary)] bg-[var(--ps-bg-secondary)]/5">
              <h5 className="text-[11.5px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--ps-text-tertiary)' }}>
                {t('nmcRecTitle')}
              </h5>
              <p className="text-[12px] leading-relaxed text-[var(--ps-text-secondary)]">
                {t('nmcRecDesc')}
              </p>
            </div>
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
            className="rounded-none p-4 border-l-[3px]"
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
            className="rounded-none p-4 border-l-[3px]"
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
            className="rounded-none p-4 border-l-[3px]"
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
            className="rounded-none p-4 border-l-[3px]"
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
        <div className="rounded-none p-4 mb-6" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
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
          <div className="rounded-none p-4" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
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
          <div className="rounded-none p-4" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
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
                {t(item.text)}
              </span>
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
          {t('chargingDisclaimer')}
        </p>
      </div>
    </div>
  );
}
