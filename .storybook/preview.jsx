import { View } from 'react-native';

import { colors } from '../src/theme/foundations/colors';

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story, { parameters }) => (
      <View
        style={{
          flex: 1,
          backgroundColor:
            parameters.noBackground === true ? undefined : colors.gray[100],
          padding: 8,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default preview;
