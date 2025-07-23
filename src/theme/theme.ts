import { ThemeProviderProps } from 'react-native-ficus-ui';

import { buttonTheme } from '@/theme/button.theme';
import { textTheme } from '@/theme/text.theme';

import foundations from './foundations';

export const theme = {
  name: 'startUINativeTheme',
  ...foundations,
  components: {
    Modal: {
      baseStyle: {
        bg: 'gray.100',
        _dark: {
          bg: 'gray.900',
        },
      },
    },
    Button: buttonTheme,
    Text: textTheme,
    Input: {
      baseStyle: {
        borderColor: 'brand.200',
        bg: 'transparent',

        _dark: {
          bg: 'transparent',
          borderColor: 'brand.800',
        },
      },
    },
  },
} as ThemeProviderProps['theme'];
