import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { IconPlus } from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    notes:
      'Pressable button with variant and size props. String children render as Button.Text.',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <View className="flex flex-1 items-center justify-center bg-white p-4">
        <Story />
      </View>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <View className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </View>
  ),
};

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <View className="items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" accessibilityLabel="Add">
        <Icon icon={IconPlus} />
      </Button>
    </View>
  ),
};

export const Disabled: Story = {
  render: () => (
    <View className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        Disabled outline
      </Button>
    </View>
  ),
};

export const WithIcon: Story = {
  name: 'With icon',
  render: () => (
    <Button>
      <Icon icon={IconPlus} />
      <Button.Text>Add item</Button.Text>
    </Button>
  ),
};

export const CustomText: Story = {
  name: 'Custom text',
  render: () => (
    <Button variant="outline">
      <Button.Text className="font-semibold">Custom label</Button.Text>
    </Button>
  ),
};
