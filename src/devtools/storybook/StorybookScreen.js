import asyncStorage from '@react-native-async-storage/async-storage';
import { getStorybookUI, configure } from '@storybook/react-native';

configure(() => require('@/stories'), module);

export const StorybookScreen = getStorybookUI({
  asyncStorage,
});
