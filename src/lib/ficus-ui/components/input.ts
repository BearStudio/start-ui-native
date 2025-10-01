import { defineStyleConfig, Dict, InputProps } from 'react-native-ficus-ui';

export default defineStyleConfig<
  InputProps,
  Dict<InputProps>,
  Dict<InputProps>
>({
  defaultProps: { variant: 'default', size: 'lg' },
  baseStyle: {
    borderRadius: 'md',
    _disabled: { opacity: 0.7 },
  },
  sizes: { sm: { h: 32 }, md: { h: 36 }, lg: { h: 40 } },
  variants: {
    default: {
      borderColor: 'neutral.200',
      borderWidth: 1,
      placeholderTextColor: 'neutral.600',
      backgroundColor: 'white',
      _focused: { borderWidth: 2 },
    },
  },
});
