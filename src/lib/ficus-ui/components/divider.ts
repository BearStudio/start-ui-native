import { defineStyleConfig, Dict, DividerProps } from 'react-native-ficus-ui';

export default defineStyleConfig<
  DividerProps,
  Dict<DividerProps>,
  Dict<DividerProps>
>({
  baseStyle: { color: 'neutral.200', _dark: { color: 'neutral.800' } },
  defaultProps: {},
  variants: {},
  sizes: {},
});
