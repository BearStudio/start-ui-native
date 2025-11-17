import { ButtonProps, defineStyleConfig, Dict } from 'react-native-ficus-ui';

export default defineStyleConfig<
  ButtonProps,
  Dict<ButtonProps>,
  Dict<ButtonProps>
>({
  defaultProps: { variant: '@primary', size: 'lg' },
  sizes: {
    xs: { h: 28, fontSize: 'xs', fontWeight: 'medium' },
    sm: { h: 32, fontSize: 'sm', fontWeight: 'medium' },
    md: { h: 36, fontSize: 'sm', fontWeight: 'medium' },
    lg: { h: 40, fontSize: 'sm', fontWeight: 'medium' },
  },
  baseStyle: {
    gap: 4,
    borderRadius: 'md',
    borderColor: 'brand.200',
    _disabled: { opacity: 0.5 },
    _dark: {
      borderColor: 'brand.600',
    },
    _pressed: { opacity: 0.7 },
  },
  variants: {
    '@primary': {
      backgroundColor: 'brand.900',
      color: 'white',
      _dark: {
        backgroundColor: 'brand.50',
        color: 'brand.900',
      },
    },
    '@secondary': {
      backgroundColor: 'white',
      color: 'brand.950',
      borderWidth: 1,
      _dark: {
        backgroundColor: 'brand.800',
        color: 'brand.50',
      },
    },
    '@destructive': {
      backgroundColor: 'negative.600',
      color: 'white',
    },
    '@ghost': {
      backgroundColor: 'transparent',
      color: 'neutral.950',
      _dark: { color: 'neutral.100' },
    },
    '@link': {
      px: 0,
      backgroundColor: 'transparent',
      color: 'neutral.950',
      _dark: { color: 'neutral.100' },
    },
  },
});
