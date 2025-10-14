import appConfig from 'app.config';

import components from '@/lib/ficus-ui/components';
import foundations from '@/lib/ficus-ui/foundations';

export const STORAGE_KEY_THEME = `${appConfig.scheme}-theme`;

export default {
  name: STORAGE_KEY_THEME,
  ...foundations,
  components,
};
