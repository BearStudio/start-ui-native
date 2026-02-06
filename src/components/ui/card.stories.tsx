import type { Meta, StoryObj } from '@storybook/react-native';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack, Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

import { Card, CardBody, CardHeader, CardTitle } from './card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    notes:
      'Card component using custom Box, HStack, Text. Supports dark mode via Tailwind.',
  },
  decorators: [
    (Story) => (
      <Box className="flex flex-1 justify-center bg-white p-4">
        <Story />
      </Box>
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
        <HStack spacing={8}>
          <Button size="sm" variant="ghost">
            Edit
          </Button>
        </HStack>
      </CardHeader>

      <CardBody>
        <Stack spacing={8}>
          <HStack className="justify-between">
            <Text className="text-neutral-500">Card holder</Text>
            <Text className="font-semibold">Aziz Ouertani</Text>
          </HStack>
          <HStack className="justify-between">
            <Text className="text-neutral-500">Number</Text>
            <Text className="font-semibold">**** **** **** 4242</Text>
          </HStack>
          <HStack className="justify-between">
            <Text className="text-neutral-500">Expires</Text>
            <Text className="font-semibold">12/27</Text>
          </HStack>
        </Stack>
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
        <HStack spacing={8}>
          <Button size="sm" variant="outline">
            Invite
          </Button>
          <Button size="sm">New</Button>
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack spacing={6}>
          <Text>- Hugo Pérard</Text>
          <Text>- Nicolas Troion</Text>
          <Text>- Aziz Ouertani</Text>
          <Text>- Omar Borji</Text>
        </Stack>
      </CardBody>
    </Card>
  ),
};

export const DarkModeHint: Story = {
  name: 'Dark mode',
  render: (args) => (
    <Box className="flex flex-1 justify-center bg-neutral-950 p-4">
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
    </Box>
  ),
};
