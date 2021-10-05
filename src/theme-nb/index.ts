import { extendTheme } from 'native-base';

import { base } from './base';
import * as components from './components';

export const theme = extendTheme({
  ...base,
  components: { ...(components as any) },
});
