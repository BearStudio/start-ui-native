import { ThemeProviderProps } from 'react-native-ficus-ui';

import { buttonTheme } from '@/theme/button.theme';
import { textTheme } from '@/theme/text.theme';

import foundations from './foundations';

export const theme = {
  name: 'startUINativeTheme',
  ...foundations,
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
  components: {
    Modal: {
      baseStyle: {
        bg: 'neutral.100',
        _dark: {
          bg: 'neutral.900',
        },
      },
    },
    Button: buttonTheme,
    Text: textTheme,
    Input: {
      baseStyle: {
        borderColor: 'neutral.200',
        bg: 'transparent',

        _dark: {
          bg: 'transparent',
          borderColor: 'neutral.800',
        },
      },
    },
  },
} as ThemeProviderProps['theme'];
