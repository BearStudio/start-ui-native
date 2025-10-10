import {
  defineStyle,
  defineStyleConfig,
  PinInputProps,
} from 'react-native-ficus-ui';

const baseStyle = defineStyle<PinInputProps>({
  alignSelf: 'flex-start',
  justifyContent: 'flex-start',
});

const variantOutline = defineStyle(() => {
  return {};
});

const variants = { outline: variantOutline };

export const pinInputTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: { variant: 'outline' },
});

const fieldBaseStyle = defineStyle({
  borderRadius: 'md',
  alignSelf: 'flex-start',
  fontWeight: 'bold',
  fontSize: 'md',
  bg: 'white',
  color: 'neutral.600',
  shadow: 0,
  mr: 'sm',
  justifyContent: 'center',
  alignItems: 'center',
  _disabled: { opacity: 0.6 },
  _dark: { bg: 'neutral.950', color: 'neutral.300' },
});

const fieldVariantOutline = defineStyle(() => {
  return {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'neutral.300',
    colorScheme: 'neutral',
    _focused: {
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'neutral.300',
      _dark: { borderColor: 'neutral.600' },
    },
    _dark: { borderColor: 'neutral.600' },
  };
});

const fieldVariants = { outline: fieldVariantOutline };

const sizes = {
  xs: defineStyle({ width: 24, height: 24 }),
  sm: defineStyle({ width: 32, height: 32 }),
  md: defineStyle({ width: 40, height: 40 }),
  lg: defineStyle({ width: 48, height: 48 }),
};

export const pinInputFieldTheme = defineStyleConfig({
  baseStyle: fieldBaseStyle,
  variants: fieldVariants,
  sizes,
  defaultProps: { variant: 'outline', size: 'md' },
});
