import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'react-native-ficus-ui';

const meta: Meta<typeof Button> = {
  title: 'Theme/Button',
  component: Button,
  args: { children: 'Button' },
};
type Story = StoryObj<typeof Button>;

export default meta;

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: '@outline',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
};

export const Primary: Story = {
  args: {
    variant: '@primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: '@secondary',
  },
};
