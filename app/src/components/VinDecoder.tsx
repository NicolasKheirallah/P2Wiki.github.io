import { useState, useRef } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { HelpCircle, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface DecodedField {
  label: string;
  value: string;
  charRange: string;
  isCustomValue?: boolean;
}

export default function VinDecoder() {
  const { t, locale } = useLocale();
  const isSv = locale === 'sv';

  const [vin, setVin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [decodedData, setDecodedData] = useState<DecodedField[] | null>(null);
  const [checkDigitStatus, setCheckDigitStatus] = useState<{ type: 'us_pass' | 'eu_pass' | 'fail'; expected?: string; got?: string } | null>(null);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  // Math check digit
  const calculateCheckDigit = (vin17: string): string => {
    const charValues: Record<string, number> = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9,
      'S': 2, 'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9,
      '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
    };
    const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
    
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      const char = vin17[i].toUpperCase();
      const val = charValues[char] ?? 0;
      sum += val * weights[i];
    }
    const remainder = sum % 11;
    return remainder === 10 ? 'X' : String(remainder);
  };

  const handleDecode = (inputVin: string) => {
    const cleaned = inputVin.trim().toUpperCase();
    setVin(cleaned);

    if (cleaned.length === 0) {
      setError(null);
      setDecodedData(null);
      setCheckDigitStatus(null);
      return;
    }

    if (cleaned.length !== 17) {
      setError(t('vinDecoderInvalidLength'));
      setDecodedData(null);
      setCheckDigitStatus(null);
      return;
    }

    if (/[IOQ]/.test(cleaned)) {
      setError(t('vinDecoderInvalidChars'));
      setDecodedData(null);
      setCheckDigitStatus(null);
      return;
    }

    // Polestar 2 constraint check: position 4 = V, position 5 = S
    if (cleaned[3] !== 'V' || cleaned[4] !== 'S') {
      setError(t('vinDecoderNotPolestar'));
      setDecodedData(null);
      setCheckDigitStatus(null);
      return;
    }

    setError(null);

    // WMI
    const wmi = cleaned.substring(0, 3);
    let wmiText: string;
    if (wmi === 'YSM') {
      wmiText = t('vinDecoderWmiPolestarSweden');
    } else if (wmi === 'LPS') {
      wmiText = t('vinDecoderWmiPolestarChina');
    } else {
      wmiText = t('vinDecoderWmiOther').replace('{wmi}', wmi);
    }

    // Series
    const series = cleaned[3];
    const seriesText = series === 'V' ? t('vinDecoderSeriesPolestar2') : t('vinDecoderSeriesOther').replace('{char}', series);

    // Body style
    const body = cleaned[4];
    const bodyText = body === 'S' ? t('vinDecoderBodyHatchback') : t('vinDecoderBodyOther').replace('{char}', body);

    // Motor (6-7)
    const motor = cleaned.substring(5, 7);
    let motorText: string;
    switch (motor) {
      case 'ED':
        motorText = isSv 
          ? 'AWD Dual Motor (Launch / Före facelift 300 kW / 408 hk eller Facelift 300 kW / 408 hk)' 
          : 'AWD Dual Motor (Launch / Pre-facelift 300 kW / 408 hp or Facelift 300 kW / 408 hp)';
        break;
      case 'EG':
        motorText = isSv
          ? 'FWD Single Motor (Före facelift 170 kW / 231 hk)'
          : 'FWD Single Motor (Pre-facelift 170 kW / 231 hp)';
        break;
      case 'EF':
        motorText = isSv
          ? 'FWD Single Motor Standard Range (Före facelift 165 kW / 224 hk)'
          : 'FWD Single Motor Standard Range (Pre-facelift 165 kW / 224 hp)';
        break;
      case 'FE':
        motorText = isSv
          ? 'RWD Single Motor Long Range (Facelift MY24+ 220 kW / 299 hk)'
          : 'RWD Single Motor Long Range (Facelift MY24+ 220 kW / 299 hp)';
        break;
      case 'FD':
        motorText = isSv
          ? 'RWD Single Motor Standard Range (Facelift MY24+ 200 kW / 272 hk)'
          : 'RWD Single Motor Standard Range (Facelift MY24+ 200 kW / 272 hp)';
        break;
      case 'EE':
        motorText = isSv
          ? 'AWD Dual Motor Performance (Facelift 350 kW / 476 hk eller Performance-mjukvara före facelift)'
          : 'AWD Dual Motor Performance (Facelift 350 kW / 476 hp or pre-facelift Performance Software Upgrade)';
        break;
      default:
        motorText = `${isSv ? 'Okänd drivlina' : 'Unknown Drivetrain'} (${motor})`;
    }

    // Safety/Gear
    const safety = cleaned[7];
    let safetyText: string;
    if (safety === 'E') {
      safetyText = isSv ? 'Standardväxellåda med enkel utväxling, krockkuddar (FWD/AWD)' : 'Standard single-speed gearbox, Airbags (FWD/AWD)';
    } else if (safety === 'R') {
      safetyText = isSv ? 'Bakhjulsdriven (RWD) växellådskonfiguration / krockkuddar' : 'RWD gear configuration / airbag systems';
    } else {
      safetyText = `${isSv ? 'Säkerhets-/växellådskod' : 'Safety & gear configuration'} (${safety})`;
    }

    // Check Digit (9)
    const checkDigit = cleaned[8];
    const calculated = calculateCheckDigit(cleaned);
    const isUSCheckDigit = /^[0-9X]$/.test(checkDigit);
    
    if (isUSCheckDigit) {
      if (checkDigit === calculated) {
        setCheckDigitStatus({ type: 'us_pass' });
      } else {
        setCheckDigitStatus({ type: 'fail', expected: calculated, got: checkDigit });
      }
    } else {
      // European options/safety code
      setCheckDigitStatus({ type: 'eu_pass', got: checkDigit });
    }

    // Model Year (10)
    const myCode = cleaned[9];
    const modelYears: Record<string, string> = {
      'M': '2021 (MY21)',
      'N': '2022 (MY22)',
      'P': '2023 (MY23)',
      'R': '2024 (MY24)',
      'S': '2025 (MY25)',
      'T': '2026 (MY26)',
      'V': '2027 (MY27)',
      'W': '2028 (MY28)',
      'X': '2029 (MY29)',
      'Y': '2030 (MY30)',
    };
    const myText = modelYears[myCode] || `${isSv ? 'Okänt årsmodell' : 'Unknown Model Year'} (${myCode})`;

    // Plant (11)
    const plant = cleaned[10];
    const plantText = plant === 'L' ? t('vinDecoderPlantLuqiao') : t('vinDecoderPlantOther').replace('{char}', plant);

    // Serial (12-17)
    const serial = cleaned.substring(11);

    const fields: DecodedField[] = [
      { label: t('vinDecoderInfoWmi'), value: wmiText, charRange: '1 - 3' },
      { label: t('vinDecoderInfoSeries'), value: seriesText, charRange: '4' },
      { label: t('vinDecoderInfoBody'), value: bodyText, charRange: '5' },
      { label: t('vinDecoderInfoMotor'), value: motorText, charRange: '6 - 7' },
      { label: t('vinDecoderInfoSafety'), value: safetyText, charRange: '8' },
      { label: t('vinDecoderInfoCheckDigit'), value: checkDigit, charRange: '9', isCustomValue: true },
      { label: t('vinDecoderInfoModelYear'), value: myText, charRange: '10' },
      { label: t('vinDecoderInfoPlant'), value: plantText, charRange: '11' },
      { label: t('vinDecoderInfoSerial'), value: serial, charRange: '12 - 17' },
    ];

    setDecodedData(fields);
  };

  useGSAP(() => {
    if (decodedData && resultsRef.current) {
      gsap.fromTo(
        resultsRef.current.querySelectorAll('.vin-card-animate'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [decodedData]);

  return (
    <div className="border border-[var(--ps-border)] bg-[var(--ps-bg-secondary)]/10 p-6 space-y-6">
      <div className="space-y-1">
        <h3 className="text-[18px] font-normal tracking-wide" style={{ color: 'var(--ps-text)' }}>
          {t('vinDecoderTitle')}
        </h3>
        <p className="text-[13px]" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('vinDecoderSubtitle')}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Input & Samples Panel */}
        <div className="flex-1 space-y-4">
          <div className="relative">
            <input
              type="text"
              maxLength={17}
              value={vin}
              onChange={(e) => handleDecode(e.target.value)}
              placeholder={t('vinDecoderPlaceholder')}
              className="w-full px-4 py-3 font-mono text-[16px] tracking-[0.2em] uppercase border bg-[var(--ps-bg)] text-[var(--ps-text)] focus:outline-none focus:border-[var(--ps-text)] transition-colors duration-150 rounded-none placeholder:text-[var(--ps-text-tertiary)] placeholder:tracking-normal placeholder:font-sans placeholder:text-[13px]"
              style={{ borderColor: 'var(--ps-border)' }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[var(--ps-text-tertiary)]">
              {vin.length} / 17
            </span>
          </div>

          {error && (
            <p className="text-[12px] text-red-500 font-medium leading-relaxed">
              {error}
            </p>
          )}
        </div>

        {/* Decoder Breakdown results */}
        {decodedData && (
          <div ref={resultsRef} className="flex-1 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--ps-border-light)] pb-2">
              <span className="text-[13px] font-semibold text-[var(--ps-gold)] flex items-center gap-1.5">
                <Sparkles size={13} />
                {t('vinDecoderSuccess')}
              </span>
              <span className="text-[11px] font-mono text-[var(--ps-text-tertiary)] tracking-wider">
                {vin}
              </span>
            </div>

            {/* Check Digit Status Banner */}
            {checkDigitStatus && (
              <div 
                className="p-3 border text-[11.5px] leading-relaxed rounded-none"
                style={{
                  backgroundColor: checkDigitStatus.type === 'fail' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(246, 190, 0, 0.03)',
                  borderColor: checkDigitStatus.type === 'fail' ? '#ef4444' : 'var(--ps-border)',
                }}
              >
                {checkDigitStatus.type === 'us_pass' && (
                  <span className="text-[var(--ps-text)] font-medium">{t('vinDecoderUSCheckDigitPass')}</span>
                )}
                {checkDigitStatus.type === 'eu_pass' && (
                  <span className="text-[var(--ps-text-secondary)]">{t('vinDecoderEUCheckDigitPass')}</span>
                )}
                {checkDigitStatus.type === 'fail' && (
                  <span className="text-red-500 font-medium">
                    {t('vinDecoderCheckDigitFail')
                      .replace('{expected}', checkDigitStatus.expected || '')
                      .replace('{got}', checkDigitStatus.got || '')}
                  </span>
                )}
              </div>
            )}

            {/* Fields List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto scrollbar-hide pr-1">
              {decodedData.map((f, idx) => (
                <div 
                  key={idx} 
                  className="vin-card-animate p-3 border border-[var(--ps-border)] bg-[var(--ps-bg)]/80 flex flex-col justify-between rounded-none"
                >
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <span className="text-[11px] font-medium tracking-wide text-[var(--ps-text-tertiary)] uppercase">
                      {f.label}
                    </span>
                    <span className="text-[9.5px] font-mono px-1 border border-[var(--ps-border)] text-[var(--ps-text-tertiary)] shrink-0">
                      Pos {f.charRange}
                    </span>
                  </div>
                  <span 
                    className="text-[13px] font-semibold tracking-normal" 
                    style={{ 
                      color: f.isCustomValue ? 'var(--ps-gold)' : 'var(--ps-text)',
                      fontFamily: f.isCustomValue ? 'monospace' : 'inherit'
                    }}
                  >
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Option Package Disclaimer & Visual Identification Guide */}
      {decodedData && (
        <div className="pt-4 border-t border-[var(--ps-border)] space-y-4">
          <div className="p-4 border border-[var(--ps-border)] bg-[var(--ps-bg-info)]/40 rounded-none relative">
            <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--ps-border)] opacity-35" />
            <h4 className="text-[13px] font-semibold text-[var(--ps-text)] mb-1 flex items-center gap-1.5">
              <HelpCircle size={14} className="text-[var(--ps-gold)] shrink-0" />
              {t('vinDecoderPackagesDisclaimerTitle')}
            </h4>
            <p className="text-[12px] leading-relaxed text-[var(--ps-text-secondary)]">
              {t('vinDecoderPackagesDisclaimerDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Plus Pack */}
            <div className="p-4 border border-[var(--ps-border)] bg-[var(--ps-bg)] relative rounded-none flex flex-col justify-between">
              <div className="space-y-1.5">
                <h5 className="text-[12px] font-semibold text-[var(--ps-text)] uppercase tracking-wider">
                  {t('vinDecoderPlusChecklist')}
                </h5>
                <p className="text-[11.5px] leading-relaxed text-[var(--ps-text-secondary)]">
                  {t('vinDecoderPlusChecklistDesc')}
                </p>
              </div>
            </div>

            {/* Pilot Pack */}
            <div className="p-4 border border-[var(--ps-border)] bg-[var(--ps-bg)] relative rounded-none flex flex-col justify-between">
              <div className="space-y-1.5">
                <h5 className="text-[12px] font-semibold text-[var(--ps-text)] uppercase tracking-wider">
                  {t('vinDecoderPilotChecklist')}
                </h5>
                <p className="text-[11.5px] leading-relaxed text-[var(--ps-text-secondary)]">
                  {t('vinDecoderPilotChecklistDesc')}
                </p>
              </div>
            </div>

            {/* Performance Pack */}
            <div className="p-4 border border-[var(--ps-border)] bg-[var(--ps-bg)] relative rounded-none flex flex-col justify-between">
              <div className="space-y-1.5">
                <h5 className="text-[12px] font-semibold text-[var(--ps-text)] uppercase tracking-wider">
                  {t('vinDecoderPerfChecklist')}
                </h5>
                <p className="text-[11.5px] leading-relaxed text-[var(--ps-text-secondary)]">
                  {t('vinDecoderPerfChecklistDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
