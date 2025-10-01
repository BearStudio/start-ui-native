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
    _focused: { borderWidth: 2 },
  },
  sizes: { sm: { h: 32 }, md: { h: 36 }, lg: { h: 40 } },
  variants: {
    default: {
      borderWidth: 1,
      borderColor: 'neutral.300',
      placeholderTextColor: 'neutral.600',
      backgroundColor: 'white',
      _dark: {
        borderColor: 'neutral.600',
        backgroundColor: 'neutral.950',
        placeholderTextColor: 'neutral.300',
      },
    },
  },
});
