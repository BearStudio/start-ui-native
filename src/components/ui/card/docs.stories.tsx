import type { Meta, StoryObj } from '@storybook/react-native';
import { Box, Button, HStack, Text, VStack } from 'react-native-ficus-ui';

import { Card, CardBody, CardHeader, CardTitle } from '.';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  argTypes: {
    borderRadius: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    borderWidth: { control: 'number' },
    borderColor: { control: 'text' },
    bg: { control: 'text' },
  },
  args: {
    borderRadius: 'md',
    borderWidth: 1,
    borderColor: 'pink.200',
    bg: 'white',
  },
  parameters: {
    notes:
      'Card basique basé sur react-native-ficus-ui. Utilise `_dark` pour le thème sombre.',
  },
  decorators: [
    (Story) => (
      <Box p={16} bg="white" justifyContent="center" flex={1}>
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
        <HStack gap={8}>
          <Button size="sm" variant="ghost">
            Edit
          </Button>
        </HStack>
      </CardHeader>

      <CardBody>
        <VStack gap={8}>
          <HStack justifyContent="space-between">
            <Text color="neutral.500">Card holder</Text>
            <Text fontWeight="semibold">Aziz Ouertani</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color="neutral.500">Number</Text>
            <Text fontWeight="semibold">**** **** **** 4242</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color="neutral.500">Expires</Text>
            <Text fontWeight="semibold">12/27</Text>
          </HStack>
        </VStack>
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
        <HStack gap={8}>
          <Button size="sm" variant="outline">
            Invite
          </Button>
          <Button size="sm">New</Button>
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack gap={6}>
          <Text>- Hugo Pérard</Text>
          <Text>- Nicolas Troion</Text>
          <Text>- Aziz Ouertani</Text>
          <Text>- Omar Borji</Text>
        </VStack>
      </CardBody>
    </Card>
  ),
};

export const DarkModeHint: Story = {
  name: 'Dark mode (via `_dark`)',
  render: (args) => (
    <Box bg="neutral.950" p={16} flex={1} justifyContent="center">
      <Card {...args} alignSelf="center">
        <CardHeader>
          <CardTitle color="white">Dark mode preview</CardTitle>
        </CardHeader>
        <CardBody>
          <Text color="gray.900">
            Surround with a dark container to preview the `_dark` styles.
          </Text>
        </CardBody>
      </Card>
    </Box>
  ),
};
