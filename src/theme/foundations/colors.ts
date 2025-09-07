import { formatHex, oklch } from 'culori';

import tailwindColors from './tailwindColors';

export const colors = {
  // Update me with other Tailwind colors or with https://smart-swatch.netlify.app/
  neutral: {
    50: formatHex(oklch('oklch(0.985 0 0)')),
    100: formatHex(oklch('oklch(0.967 0.001 286.375)')),
    200: formatHex(oklch('oklch(0.92 0.004 286.32)')),
    300: formatHex(oklch('oklch(0.871 0.006 286.286)')),
    400: formatHex(oklch('oklch(0.705 0.015 286.067)')),
    500: formatHex(oklch('oklch(0.552 0.016 285.938)')),
    600: formatHex(oklch('oklch(0.442 0.017 285.786)')),
    700: formatHex(oklch('oklch(0.37 0.013 285.805)')),
    800: formatHex(oklch('oklch(0.274 0.006 286.033)')),
    900: formatHex(oklch('oklch(0.21 0.006 285.885)')),
    950: formatHex(oklch('oklch(0.141 0.005 285.823)')),
  },

  negative: {
    50: formatHex(oklch('oklch(0.971 0.013 17.38)')),
    100: formatHex(oklch('oklch(0.936 0.032 17.717)')),
    200: formatHex(oklch('oklch(0.885 0.062 18.334)')),
    300: formatHex(oklch('oklch(0.808 0.114 19.571)')),
    400: formatHex(oklch('oklch(0.704 0.191 22.216)')),
    500: formatHex(oklch('oklch(0.637 0.237 25.331)')),
    600: formatHex(oklch('oklch(0.577 0.245 27.325)')),
    700: formatHex(oklch('oklch(0.505 0.213 27.518)')),
    800: formatHex(oklch('oklch(0.444 0.177 26.899)')),
    900: formatHex(oklch('oklch(0.396 0.141 25.723)')),
    950: formatHex(oklch('oklch(0.258 0.092 26.042)')),
  },

  gray: tailwindColors.gray,

  success: tailwindColors.green,
  green: tailwindColors.green,

  error: tailwindColors.red,
  red: tailwindColors.rose,

  warning: tailwindColors.amber,
  orange: tailwindColors.amber,

  info: tailwindColors.sky,
  blue: tailwindColors.sky,
};
