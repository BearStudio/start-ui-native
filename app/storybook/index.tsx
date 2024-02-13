import React from 'react';

import { View } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const StorybookUI = require('../../.storybook').default;
const Storybook = () => {
  return (
    <View style={{ flex: 1 }}>
      <StorybookUI />
    </View>
  );
};

export default Storybook;
