import { getStorybookUI, configure } from '@storybook/react-native';

configure(() => require('@/stories'), module);

const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
