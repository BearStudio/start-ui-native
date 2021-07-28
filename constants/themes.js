export const primaryColor = '#0049C2';
export const gray600Color = '#3E4B5D';
export const bodyColor = '#F2F3F4';
export const whiteColor = '#FFFFFF';

const THEMES = {
  default: {
    name: 'default',
    colors: {
      body: bodyColor,
      text: gray600Color,
      border: '#fff',
      spinner: primaryColor,
      button: primaryColor,
      buttonBody: primaryColor,

      // You can use tools like https://smart-swatch.netlify.app/ to generate colors
      // Primary colors
      brandPrimary50: '#e0f4ff',
      brandPrimary100: '#b8dcfa',
      brandPrimary200: '#8ec4f1',
      brandPrimary300: '#63ace8',
      brandPrimary400: '#3994e0',
      brandPrimary500: '#1f7bc6',
      brandPrimary600: '#135f9b',
      brandPrimary700: '#084470',
      brandPrimary800: '#002946',
      brandPrimary900: '#000f1d',

      // Secondary colors
      brandSecondary100: '#fff5f7',
      brandSecondary200: '#fed7e2',
      brandSecondary300: '#fbb6ce',
      brandSecondary400: '#f687b3',
      brandSecondary500: '#ed64a6',
      brandSecondary600: '#d53f8c',
      brandSecondary700: '#b83280',
      brandSecondary800: '#97266d',
      brandSecondary900: '#702459',
      // Accent Colors
      accent050: '#FFF8EA',
      accent100: '#FEEBD0',
      accent200: '#FDD8A7',
      accent300: '#F9C074',
      accent400: '#F69F34',
      accent500: '#E87D0C',
      accent600: '#BD6101',
      accent700: '#803C00',
      accent800: '#471F00',
      accent900: '#290F00',
      // Error Colors
      error050: '#FFEFF0',
      error100: '#FFE0E2',
      error200: '#FDC7CD',
      error300: '#FC9AA6',
      error400: '#F9677A',
      error500: '#F13955',
      error600: '#DB1F41',
      error700: '#B51636',
      error800: '#941533',
      error900: '#7C1530',
      // Grayscale Colors
      gray050: '#F9F9F9',
      gray100: '#EFF3F8',
      gray200: '#DEE5ED',
      gray300: '#C4CFDC',
      gray400: '#8999AE',
      gray500: '#59697F',
      gray600: gray600Color,
      gray700: '#2D394A',
      gray800: '#1C2533',
      gray900: '#111724',
    },
    components: {
      Text: {
        color: gray600Color,
      },
    },
  },
};

export default THEMES;
