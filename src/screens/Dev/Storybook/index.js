import asyncStorage from '@react-native-async-storage/async-storage';
import { getStorybookUI, configure } from '@storybook/react-native';

configure(() => require('@/stories'), module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage,
});

export default StorybookUIRoot;
