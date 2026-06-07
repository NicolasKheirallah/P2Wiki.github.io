import { useLocale } from '@/contexts/LocaleContext';

interface IssueRow {
  issue: string;
  symptoms: string;
  diy: string;
}

interface IssueCategory {
  title: string;
  rows: IssueRow[];
}

const issueData: IssueCategory[] = [
  {
    title: 'Software & Connectivity Systems',
    rows: [
      {
        issue: 'Infotainment (IHU) Instability',
        symptoms: 'UI lag, boot loops, system crashes due to Android Automotive OS memory leaks.',
        diy: 'Soft Reset: Hold home button for 20 seconds.\nHard Reset: Recovery menu wipe (requires VIDA key re-pairing).',
      },
      {
        issue: 'TCAM Module Failure',
        symptoms: 'Total loss of LTE, GPS, eCall, and Phone-as-Key (PAK).',
        diy: 'Soft Reset: Hold front defroster button for 20 seconds.\nHard Reset: Disconnect TCAM 12V backup battery under rear roof trim.',
      },
    ],
  },
  {
    title: 'Drivetrain & Suspension',
    rows: [
      {
        issue: 'Rear Axle "Clicking" (Dual Motor)',
        symptoms: 'Low-speed clicking/ticking from rear. Often misdiagnosed as CV joints; root cause is often ERAD internal wear.',
        diy: 'Checks: Verify axle bolt torque. Note: Axle nut is single-use (45 Nm + 90 degrees).',
      },
      {
        issue: 'Front Suspension Knocking',
        symptoms: 'Popping/grinding during low-speed steering over uneven surfaces. Premature strut top bearing wear.',
        diy: 'Repair: Replace strut top mounts in pairs. Apply final torque (81 Nm) only when suspension is fully loaded on the ground.',
      },
    ],
  },
  {
    title: 'High-Voltage & Auxiliary Electrical',
    rows: [
      {
        issue: '12V Auxiliary Battery Drain',
        symptoms: 'Total vehicle immobilization. Contactor fails to close regardless of high-voltage pack state of charge.',
        diy: 'Preventative: Replace 12V lead-acid battery every 36 months.',
      },
      {
        issue: 'HVCH (High Voltage Coolant Heater) Failure',
        symptoms: 'Loss of cabin heat, "Parking Climate Temporarily Unavailable" error. Blown 15A inverter fuse.',
        diy: 'Not recommended: High-voltage (400V) system hazard.',
      },
    ],
  },
  {
    title: 'Climate Control & Body Hardware',
    rows: [
      {
        issue: 'HVAC Blend Door Actuator Failure',
        symptoms: 'Extreme temperature delta across zones (e.g., hot driver, cold passenger), rapid dashboard clicking.',
        diy: 'Repair: Replace stripped damper motors (shared Volvo XC40 part). Requires VIDA for end-stop recalibration.',
      },
      {
        issue: 'Frozen Rear Door Latches',
        symptoms: 'Rear exterior/interior handles freeze shut or fail to latch < -10 °C. Factory grease inadequacy.',
        diy: 'Mitigation: Apply water-displacing silicone lubricant inside latch assembly (temporary fix).',
      },
    ],
  },
];

function formatMultiline(text: string) {
  return text.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}

export default function KnownIssues() {
  const { t } = useLocale();

  return (
    <div className="space-y-10">
      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
        {t('knownIssuesDesc')}
      </p>

      {issueData.map((category) => (
        <div key={category.title}>
          <h3
            className="text-[16px] font-medium mb-4"
            style={{ color: 'var(--ps-text)', letterSpacing: '-0.01em' }}
          >
            {category.title}
          </h3>

          <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ps-table-border)' }}>
                  <th
                    className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[200px]"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('issue')}
                  </th>
                  <th
                    className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider w-[360px]"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('symptoms')}
                  </th>
                  <th
                    className="text-left py-3 pr-4 text-[12px] font-normal uppercase tracking-wider"
                    style={{ color: 'var(--ps-text-tertiary)' }}
                  >
                    {t('diyRemediation')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{ borderBottom: '1px solid var(--ps-table-row)' }}
                  >
                    <td
                      className="py-4 pr-4 text-[13px] font-medium align-top"
                      style={{ color: 'var(--ps-text)' }}
                    >
                      {row.issue}
                    </td>
                    <td
                      className="py-4 pr-4 text-[13px] leading-relaxed align-top"
                      style={{ color: 'var(--ps-text-secondary)' }}
                    >
                      {row.symptoms}
                    </td>
                    <td
                      className="py-4 pr-4 text-[13px] leading-relaxed align-top"
                      style={{ color: 'var(--ps-text-secondary)' }}
                    >
                      {formatMultiline(row.diy)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="mt-6 rounded-lg p-4" style={{ backgroundColor: 'var(--ps-bg-info)' }}>
        <h4 className="text-[13px] font-medium mb-2" style={{ color: 'var(--ps-text)' }}>
          {t('disclaimerTitle')}
        </h4>
        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('knownIssuesDisclaimer')}
        </p>
      </div>
    </div>
  );
}
