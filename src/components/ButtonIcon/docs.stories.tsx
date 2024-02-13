import type { Meta, StoryObj } from '@storybook/react';

import { ButtonIcon } from '.';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
};
type Story = StoryObj<typeof ButtonIcon>;

export default meta;

export const Default: Story = {
  args: {
    icon: 'star',
    children: 'Default Button',
    colorScheme: 'brand',
  },
};

export const WithCustomColor: Story = {
  args: {
    icon: 'heart',
    children: 'Heart Button',
    colorScheme: 'success',
    iconColor: 'yellow',
  },
};

export const WithDifferentIcon: Story = {
  args: {
    icon: 'message1',
    children: 'Message Button',
    colorScheme: 'info',
  },
};

export const LargeSize: Story = {
  args: {
    icon: 'setting',
    children: 'Settings Button',
    iconSize: '2xl',
    colorScheme: 'warning',
  },
};

export const DisabledButton: Story = {
  args: {
    icon: 'lock',
    children: 'Disabled Button',
    disabled: true,
    colorScheme: 'error',
  },
};

export const DifferentIconFamily: Story = {
  args: {
    icon: 'apple1',
    iconFamily: 'AntDesign',
    children: 'Apple Button',
    colorScheme: 'brand',
  },
};
