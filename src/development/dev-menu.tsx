import { registerDevMenuItems } from 'expo-dev-menu';
import { router } from 'expo-router';

import { isExpoGo } from '@/constants/environment';

const devMenuItems = [
  {
    name: 'Open Storybook',
    callback: () => {
      router.push('/storybook');
    },
  },
];
if (__DEV__ && !isExpoGo) {
  registerDevMenuItems(devMenuItems);
}
