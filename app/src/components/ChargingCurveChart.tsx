import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';

interface DataPoint {
  soc: number;
  standard: number;
  lrPre2024: number;
  lrSiC: number;
}

const data: DataPoint[] = [
  { soc: 0, standard: 20, lrPre2024: 30, lrSiC: 40 },
  { soc: 5, standard: 80, lrPre2024: 100, lrSiC: 140 },
  { soc: 10, standard: 120, lrPre2024: 140, lrSiC: 195 },
  { soc: 15, standard: 130, lrPre2024: 148, lrSiC: 203 },
  { soc: 20, standard: 135, lrPre2024: 150, lrSiC: 205 },
  { soc: 25, standard: 135, lrPre2024: 150, lrSiC: 205 },
  { soc: 30, standard: 135, lrPre2024: 150, lrSiC: 205 },
  { soc: 35, standard: 125, lrPre2024: 140, lrSiC: 190 },
  { soc: 40, standard: 115, lrPre2024: 130, lrSiC: 175 },
  { soc: 45, standard: 105, lrPre2024: 120, lrSiC: 160 },
  { soc: 50, standard: 95, lrPre2024: 110, lrSiC: 145 },
  { soc: 55, standard: 88, lrPre2024: 100, lrSiC: 130 },
  { soc: 60, standard: 82, lrPre2024: 92, lrSiC: 115 },
  { soc: 65, standard: 78, lrPre2024: 84, lrSiC: 100 },
  { soc: 70, standard: 72, lrPre2024: 76, lrSiC: 85 },
  { soc: 75, standard: 58, lrPre2024: 62, lrSiC: 68 },
  { soc: 80, standard: 45, lrPre2024: 48, lrSiC: 52 },
  { soc: 85, standard: 32, lrPre2024: 35, lrSiC: 38 },
  { soc: 90, standard: 22, lrPre2024: 24, lrSiC: 26 },
  { soc: 95, standard: 14, lrPre2024: 15, lrSiC: 16 },
  { soc: 100, standard: 8, lrPre2024: 8, lrSiC: 9 },
];

type VariantKey = 'all' | 'standard' | 'lrPre2024' | 'lrSiC';

const variants: { key: VariantKey; label: string; color: string }[] = [
  { key: 'all', label: 'All Variants', color: '' },
  { key: 'standard', label: 'Standard Range (69 kWh)', color: '#75787B' },
  { key: 'lrPre2024', label: 'Long Range Pre-2024 (78 kWh)', color: '#97999B' },
  { key: 'lrSiC', label: 'Long Range 2024+ SiC (82 kWh)', color: '#F6BE00' },
];

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: number;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-lg px-3 py-2 text-[12px] shadow-lg"
      style={{
        backgroundColor: 'var(--ps-bg-elevated)',
        border: '1px solid var(--ps-border)',
      }}
    >
      <p className="font-medium mb-1" style={{ color: 'var(--ps-text)' }}>
        {label}% SoC
      </p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span style={{ color: 'var(--ps-text-secondary)' }}>
            {entry.name}: {entry.value} kW
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ChargingCurveChart() {
  const [activeVariant, setActiveVariant] = useState<VariantKey>('all');

  const lines = [
    { key: 'standard', dataKey: 'standard' as const, name: 'Standard Range', color: '#75787B', strokeWidth: 2 },
    { key: 'lrPre2024', dataKey: 'lrPre2024' as const, name: 'Long Range Pre-2024', color: '#97999B', strokeWidth: 2 },
    { key: 'lrSiC', dataKey: 'lrSiC' as const, name: 'Long Range 2024+ SiC', color: '#F6BE00', strokeWidth: 2.5 },
  ];

  const visibleLines = activeVariant === 'all'
    ? lines
    : lines.filter((l) => l.key === activeVariant);

  return (
    <div className="space-y-4">
      {/* Variant filter pills */}
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.key}
            onClick={() => setActiveVariant(v.key)}
            className="px-3 py-1.5 rounded-full text-[12px] font-normal transition-all duration-150"
            style={{
              backgroundColor: activeVariant === v.key ? 'var(--ps-pill-active-bg)' : 'var(--ps-pill-bg)',
              color: activeVariant === v.key ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
            }}
            onMouseEnter={(e) => {
              if (activeVariant !== v.key) e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg-hover)';
            }}
            onMouseLeave={(e) => {
              if (activeVariant !== v.key) e.currentTarget.style.backgroundColor = 'var(--ps-pill-bg)';
            }}
          >
            {v.key !== 'all' && (
              <span
                className="inline-block w-2 h-2 rounded-full mr-1.5"
                style={{ backgroundColor: v.color }}
              />
            )}
            {v.label}
          </button>
        ))}
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--ps-border-light)" />
            <XAxis
              dataKey="soc"
              tick={{ fontSize: 11, fill: 'var(--ps-text-tertiary)' }}
              axisLine={{ stroke: 'var(--ps-border)' }}
              tickLine={false}
              label={{ value: 'State of Charge (%)', position: 'insideBottom', offset: -5, fontSize: 11, fill: 'var(--ps-text-tertiary)' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--ps-text-tertiary)' }}
              axisLine={{ stroke: 'var(--ps-border)' }}
              tickLine={false}
              label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft', fontSize: 11, fill: 'var(--ps-text-tertiary)' }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Optimal charging window highlight */}
            <ReferenceArea
              x1={10}
              x2={30}
              fill="var(--ps-gold)"
              fillOpacity={0.06}
            />
            {/* Taper window highlight */}
            <ReferenceArea
              x1={30}
              x2={70}
              fill="var(--ps-text-secondary)"
              fillOpacity={0.04}
            />

            {visibleLines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={line.strokeWidth}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                animationDuration={800}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend for reference areas */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px]" style={{ color: 'var(--ps-text-tertiary)' }}>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--ps-gold)', opacity: 0.15 }} />
          Peak window (10–30% SoC)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--ps-text-secondary)', opacity: 0.1 }} />
          Taper window (30–70% SoC)
        </span>
      </div>
    </div>
  );
}
