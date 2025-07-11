import { View } from 'react-native';

const StorybookUI = require('../../.storybook').default;
const Storybook = () => {
  return (
    <View style={{ flex: 1 }}>
      <StorybookUI />
    </View>
  );
};

export default Storybook;
