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
