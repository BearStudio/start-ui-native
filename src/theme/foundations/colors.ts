import tailwindColors from './tailwindColors';

export const colors = {
  // Update me with other Tailwind colors or with https://smart-swatch.netlify.app/
  brand: {
    ...tailwindColors.trueGray,
    950: '#0A0A0A',
  },
  gray: tailwindColors.blueGray,

  success: tailwindColors.green,
  green: tailwindColors.green,

  error: tailwindColors.red,
  red: tailwindColors.rose,

  warning: tailwindColors.amber,
  orange: tailwindColors.amber,

  info: tailwindColors.sky,
  blue: tailwindColors.sky,
};
