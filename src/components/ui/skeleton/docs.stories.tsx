import type { Meta, StoryObj } from '@storybook/react-native';
import { Box } from 'react-native-ficus-ui';

import { Skeleton } from '.';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    notes: 'Basic skeleton component using react-native-ficus-ui.',
  },
  decorators: [
    (Story) => (
      <Box
        p={16}
        bg="white"
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Story />
      </Box>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  name: 'Basic',
  render: (args) => <Skeleton {...args} />,
};
