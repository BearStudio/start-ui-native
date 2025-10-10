import { defineStyleConfig, Dict, TextProps } from 'react-native-ficus-ui';

export default defineStyleConfig<TextProps, Dict<TextProps>, Dict<TextProps>>({
  baseStyle: { color: 'neutral.900', _dark: { color: 'neutral.100' } },
  variants: {
    muted: {
      color: 'neutral.600',
      _dark: { color: 'neutral.400' },
    },
  },
});
