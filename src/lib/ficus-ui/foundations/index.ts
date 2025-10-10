import { Dict, Theme } from 'react-native-ficus-ui';

import colors from '@/lib/ficus-ui/foundations/colors';
import fontSizes from '@/lib/ficus-ui/foundations/font-sizes';
import fonts from '@/lib/ficus-ui/foundations/fonts';

export default {
  colors,
  fonts,
  fontSizes,
} satisfies {
  colors: Dict;
  fonts: Theme['fonts'];
  fontSizes: Theme['fontSizes'];
};
