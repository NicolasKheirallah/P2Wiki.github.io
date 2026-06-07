import { useTheme } from './ThemeContext';

export interface ColorTokens {
  // Backgrounds
  bg: string;
  bgSecondary: string;
  bgElevated: string;
  bgInfo: string;

  // Text
  text: string;
  textSecondary: string;
  textTertiary: string;
  textOnDark: string;

  // Borders
  border: string;
  borderLight: string;

  // UI
  pillBg: string;
  pillBgHover: string;
  pillActiveBg: string;
  pillActiveText: string;

  // Table
  tableBorder: string;
  tableRowBorder: string;
  tableHover: string;

  // Status
  standard: string;
  optional: string;
  notAvailable: string;

  // Accent
  swedishGold: string;
}

const lightColors: ColorTokens = {
  bg: '#FFFFFF',
  bgSecondary: '#F7F7F7',
  bgElevated: '#FFFFFF',
  bgInfo: '#ECECE7',

  text: '#000000',
  textSecondary: '#75787B',
  textTertiary: '#97999B',
  textOnDark: '#FFFFFF',

  border: '#D9D9D6',
  borderLight: '#ECECE7',

  pillBg: '#ECECE7',
  pillBgHover: '#D9D9D6',
  pillActiveBg: '#000000',
  pillActiveText: '#FFFFFF',

  tableBorder: '#D9D9D6',
  tableRowBorder: '#ECECE7',
  tableHover: '#ECECE7',

  standard: '#000000',
  optional: '#75787B',
  notAvailable: '#C8C9C7',

  swedishGold: '#F6BE00',
};

const darkColors: ColorTokens = {
  bg: '#000000',           /* Polestar Black */
  bgSecondary: '#53565A',   /* Polestar Grey 11 */
  bgElevated: '#53565A',    /* Polestar Grey 11 */
  bgInfo: '#53565A',        /* Polestar Grey 11 */

  text: '#FFFFFF',          /* White */
  textSecondary: '#C8C9C7', /* Polestar Grey 3 */
  textTertiary: '#97999B',  /* Polestar Grey 7 */
  textOnDark: '#000000',    /* Black */

  border: '#53565A',        /* Polestar Grey 11 */
  borderLight: '#53565A',   /* Polestar Grey 11 */

  pillBg: '#53565A',        /* Polestar Grey 11 */
  pillBgHover: '#75787B',   /* Polestar Grey 9 */
  pillActiveBg: '#FFFFFF',  /* White */
  pillActiveText: '#000000',/* Black */

  tableBorder: '#53565A',   /* Polestar Grey 11 */
  tableRowBorder: '#3A3A3C',
  tableHover: '#53565A',    /* Polestar Grey 11 */

  standard: '#FFFFFF',      /* White */
  optional: '#C8C9C7',      /* Polestar Grey 3 */
  notAvailable: '#53565A',  /* Polestar Grey 11 */

  swedishGold: '#F6BE00',
};

export function useColors(): ColorTokens {
  const { isDark } = useTheme();
  return isDark ? darkColors : lightColors;
}
