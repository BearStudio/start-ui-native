import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import { Card, CardBody, CardHeader, CardTitle } from './card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    notes:
      'Card component using View and Text. Supports dark mode via Tailwind.',
  },
  decorators: [
    (Story) => (
      <View className="flex flex-1 justify-center bg-white p-4">
        <Story />
      </View>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  name: 'Basic',
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <Text>
          This is a simple card body. You can pass any children you want here.
        </Text>
      </CardBody>
    </Card>
  ),
};

export const WithHeaderAndBody: Story = {
  name: 'With Header & Body',
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Payment method</CardTitle>
        <View className="flex flex-row gap-2">
          <Button size="sm" variant="ghost">
            Edit
          </Button>
        </View>
      </CardHeader>

      <CardBody>
        <View className="gap-2">
          <View className="flex flex-row justify-between">
            <Text className="text-neutral-500">Card holder</Text>
            <Text className="font-semibold">Aziz Ouertani</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-neutral-500">Number</Text>
            <Text className="font-semibold">**** **** **** 4242</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-neutral-500">Expires</Text>
            <Text className="font-semibold">12/27</Text>
          </View>
        </View>
      </CardBody>
    </Card>
  ),
};

export const PressableHeaderActions: Story = {
  name: 'Header with actions',
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <View className="flex flex-row gap-2">
          <Button size="sm" variant="outline">
            Invite
          </Button>
          <Button size="sm">New</Button>
        </View>
      </CardHeader>
      <CardBody>
        <View className="gap-1.5">
          <Text>- Hugo Pérard</Text>
          <Text>- Nicolas Troion</Text>
          <Text>- Aziz Ouertani</Text>
          <Text>- Omar Borji</Text>
        </View>
      </CardBody>
    </Card>
  ),
};

export const DarkModeHint: Story = {
  name: 'Dark mode',
  render: (args) => (
    <View className="flex flex-1 justify-center bg-neutral-950 p-4">
      <Card {...args} className="self-center">
        <CardHeader>
          <CardTitle className="text-white">Dark mode preview</CardTitle>
        </CardHeader>
        <CardBody>
          <Text className="text-neutral-900">
            Surround with a dark container to preview dark styles.
          </Text>
        </CardBody>
      </Card>
    </View>
  ),
};
