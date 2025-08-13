import { ThemeProviderProps } from 'react-native-ficus-ui';

import { colors } from './colors';

const foundations = {
  colors,
  shadows: {
    xs: {
      boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.05)',
    },
    sm: {
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    },
    base: {
      boxShadow:
        '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    },
    card: {
      boxShadow:
        '0px 1px 8px rgba(0, 0, 0, 0.05), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
    },
    layout: {
      boxShadow: '0px 0px 24px 1px rgba(0, 0, 0, 0.08)',
    },
    md: {
      boxShadow:
        '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    lg: {
      boxShadow:
        '0px 4px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    xl: {
      boxShadow:
        '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    '2xl': {
      boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
  },
  fontSizes: {
    '3xs': 8,
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
} as ThemeProviderProps['theme'];

export default foundations;
