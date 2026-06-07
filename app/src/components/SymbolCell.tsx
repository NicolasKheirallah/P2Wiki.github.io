interface SymbolCellProps {
  value: string;
  isHovered?: boolean;
}

const textBadges = ['Plus', 'Pilot', 'Perf', 'Nappa', 'Pro', 'Climate', 'Pilot Lite'];

export default function SymbolCell({ value, isHovered }: SymbolCellProps) {
  const trimmed = value.trim();

  if (trimmed === '\u25CF') {
    return (
      <span className="inline-flex items-center justify-center" title="Standard">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: 'var(--ps-standard)' }}
        />
      </span>
    );
  }

  if (trimmed === '\u25CB') {
    return (
      <span className="inline-flex items-center justify-center" title="Optional Extra">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ border: '1.5px solid var(--ps-optional)' }}
        />
      </span>
    );
  }

  if (trimmed === '\u2014' || trimmed === '—' || trimmed === '-') {
    return (
      <span className="text-[13px]" style={{ color: 'var(--ps-unavailable)' }} title="Not Available">
        —
      </span>
    );
  }

  const isTextBadge = textBadges.some((badge) => trimmed.includes(badge));

  if (isTextBadge) {
    return (
      <span
        className="text-[12px] font-medium tracking-wide px-1.5 py-0.5 rounded-none transition-colors duration-150 border border-[var(--ps-border-light)]"
        style={{
          backgroundColor: isHovered ? 'var(--ps-pill-active-bg)' : 'var(--ps-pill-bg)',
          color: isHovered ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
        }}
      >
        {value}
      </span>
    );
  }

  return <span className="text-[13px]" style={{ color: 'var(--ps-text)' }}>{value}</span>;
}
