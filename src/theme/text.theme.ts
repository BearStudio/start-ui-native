import { defineStyle, defineStyleConfig } from 'react-native-ficus-ui';

/* ------------------------------------------------------------------ */
/* 1.  Échelles de taille (3xs → 6xl) – aucune police imposée         */
/* ------------------------------------------------------------------ */
const sizes = {
  '3xs': defineStyle({ fontSize: 8, lineHeight: 12 }),
  '2xs': defineStyle({ fontSize: 10, lineHeight: 14 }),
  xs: defineStyle({ fontSize: 12, lineHeight: 18 }),
  sm: defineStyle({ fontSize: 14, lineHeight: 21 }),
  md: defineStyle({ fontSize: 16, lineHeight: 24 }),
  lg: defineStyle({ fontSize: 18, lineHeight: 27 }),
  xl: defineStyle({ fontSize: 20, lineHeight: 30 }),
  '2xl': defineStyle({ fontSize: 24, lineHeight: 32 }),
  '3xl': defineStyle({ fontSize: 30, lineHeight: 40 }),
  '4xl': defineStyle({ fontSize: 36, lineHeight: 46 }),
  '5xl': defineStyle({ fontSize: 48, lineHeight: 62 }),
  '6xl': defineStyle({ fontSize: 60, lineHeight: 74 }),
};

/* ------------------------------------------------------------------ */
/* 2.  Variants = « style » (graisse + décorations)                    */
/* ------------------------------------------------------------------ */
const variants = {
  /** 400 – pas de décor */
  regular: defineStyle({ fontWeight: '400' }),

  /** 500 – pas de décor */
  medium: defineStyle({ fontWeight: '500' }),

  /** 600 – pas de décor */
  semiBold: defineStyle({ fontWeight: '600' }),

  /** 700 – pas de décor */
  bold: defineStyle({ fontWeight: '700' }),

  /** 400 + underline */
  underline: defineStyle({
    fontWeight: '400',
    textDecorationLine: 'underline',
  }),

  /** 400 + strike */
  strikethrough: defineStyle({
    fontWeight: '400',
    textDecorationLine: 'line-through',
  }),
};

/* ------------------------------------------------------------------ */
/* 3.  Config Ficus-UI du composant Text                               */
/* ------------------------------------------------------------------ */
export const textTheme = defineStyleConfig({
  baseStyle: {
    // couleur “par défaut” : on laisse Ficus gérer _dark/_light si présent.
    color: 'neutral.900',
    _dark: {
      color: 'white',
    },
  },
  sizes,
  variants,
  defaultProps: {
    size: 'md',
    variant: 'regular',
  },
});
