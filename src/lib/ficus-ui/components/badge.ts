import { BadgeProps, defineStyleConfig, Dict } from 'react-native-ficus-ui';

export default defineStyleConfig<
  BadgeProps,
  Dict<BadgeProps>,
  Dict<BadgeProps>
>({
  defaultProps: { variant: '@primary', size: 'md' },
  sizes: {
    xs: { h: 16, fontSize: '2xs', fontWeight: 'medium' },
    sm: { h: 20, fontSize: 'xs', fontWeight: 'medium' },
    md: { h: 24, fontSize: 'sm', fontWeight: 'medium' },
    lg: { h: 32, fontSize: 'md', fontWeight: 'medium' },
  },
  baseStyle: {
    px: 8,
    textTransform: 'none',
    borderRadius: 'md',
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
      _dark: {
        backgroundColor: 'brand.800',
        color: 'brand.50',
      },
    },
    '@error': {
      backgroundColor: 'negative.100',
      color: 'negative.800',
    },
    '@warning': {
      backgroundColor: 'warning.100',
      color: 'warning.800',
    },
    '@success': {
      backgroundColor: 'positive.100',
      color: 'positive.600',
    },
  },
});
