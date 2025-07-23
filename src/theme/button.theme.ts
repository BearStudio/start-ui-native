import { defineStyle, defineStyleConfig } from 'react-native-ficus-ui';

type AccessibleColor = {
  bg?: string;
  color?: string;
  pressedBg?: string;
  loaderColor?: string;
};

const accessibleColorMap: Record<string, AccessibleColor> = {
  brand: {
    bg: 'brand.900',
    color: 'white',
    pressedBg: 'brand.800',
    loaderColor: 'brand.900',
  },
  red: {
    bg: 'red.500',
    color: 'white',
    pressedBg: 'red.600',
    loaderColor: 'white',
  },
};

const baseStyle = defineStyle({
  shadow: 0,
  rounded: 'md',
  _disabled: { opacity: 0.4 },
});

const variantGhost = defineStyle((props) => {
  const { colorScheme: c } = props;
  if (c === 'brand') {
    return {
      bg: 'transparent',
      color: 'brand.950',
      _dark: { color: 'white' },
      _pressed: { bg: 'brand.100', _dark: { bg: 'brand.800' } },
    };
  }
  return {
    bg: 'transparent',
    color: `${c}.500`,
    _dark: { color: `${c}.300` },
    _pressed: { bg: `${c}.50`, _dark: { bg: `${c}.900` } },
  };
});

const variantOutline = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: `${c}.200`,
    _dark: { color: 'white' },
  };
});

const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props;
  const {
    bg = `${c}.500`,
    color = 'white',
    pressedBg = `${c}.600`,
  } = accessibleColorMap[c] ?? {};
  return {
    bg,
    color,
    _dark: { bg: `${c}.300`, color: 'gray.800' },
    _pressed: { bg: pressedBg, _dark: { bg: `${c}.400`, color: 'gray.800' } },
  };
});

const variantLink = defineStyle((props) => {
  const { colorScheme: c } = props;
  const linkColor = c === 'brand' ? 'brand.950' : `${c}.500`;
  return {
    bg: 'transparent',
    color: linkColor,
    _dark: { color: c === 'brand' ? 'white' : `${c}.300` },
    textDecorationLine: 'underline',
    shadow: 0,
    _pressed: { opacity: 0.8 },
  };
});

// Aliases “@primary”, “@secondary”, “@dangerPrimary”, “@dangerSecondary”
const variantPrimary = defineStyle((props) =>
  variantSolid({ ...props, colorScheme: 'brand' })
);
const variantSecondary = defineStyle((props) =>
  variantOutline({ ...props, colorScheme: 'brand' })
);
const variantDangerPrimary = defineStyle((props) =>
  variantSolid({ ...props, colorScheme: 'red' })
);
const variantDangerSecondary = defineStyle((props) =>
  variantOutline({ ...props, colorScheme: 'red' })
);

const sizes = {
  xs: defineStyle({
    rounded: 'lg',
    h: 28,
    px: 8,
    gap: 4,
    fontSize: 12,
  }),
  sm: defineStyle({
    rounded: 'lg',
    h: 32,
    px: 12,
    gap: 6,
    fontSize: 14,
  }),
  md: defineStyle({
    rounded: 'lg',
    h: 36,
    px: 14,
    gap: 8,
    fontSize: 14,
  }),
  lg: defineStyle({
    rounded: 'lg',
    h: 40,
    px: 16,
    gap: 12,
    fontSize: 17,
  }),
};

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    '@primary': variantPrimary,
    '@secondary': variantSecondary,
    '@dangerPrimary': variantDangerPrimary,
    '@dangerSecondary': variantDangerSecondary,
    ghost: variantGhost,
    outline: variantOutline,
    solid: variantSolid,
    link: variantLink,
  },
  sizes,
  defaultProps: {
    variant: '@primary',
    size: 'md',
  },
});
