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
    borderRadius: 'md',
    _disabled: { opacity: 0.7 },
  },
  variants: {
    '@primary': {
      backgroundColor: 'brand.900',
      color: 'white',
    },
    '@secondary': {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'brand.200',
      color: 'brand.950',
    },
    '@destructive': {
      backgroundColor: 'negative.600',
      color: 'white',
    },
    '@ghost': {
      backgroundColor: 'transparent',
      color: 'neutral.950',
    },
    '@link': {
      backgroundColor: 'transparent',
      color: 'neutral.950',
      px: 0,
    },
  },
});
