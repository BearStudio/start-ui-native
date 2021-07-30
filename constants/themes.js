import {
  brandPrimaryColors,
  errorColors,
  grayColors,
  warningColors,
} from './colors';

export const primaryColor = brandPrimaryColors.brandPrimary600;
export const gray600Color = grayColors.gray600;
export const bodyColor = '#F2F3F4';
export const whiteColor = '#FFFFFF';

const THEMES = {
  default: {
    name: 'default',
    colors: {
      body: bodyColor,
      text: gray600Color,
      border: whiteColor,
      spinner: primaryColor,
      button: primaryColor,
      buttonBody: primaryColor,

      ...brandPrimaryColors,
      ...errorColors,
      ...warningColors,
      ...grayColors,
    },
    components: {
      Text: {
        color: gray600Color,
      },
    },
  },
};

export default THEMES;
