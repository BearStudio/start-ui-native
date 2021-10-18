import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { HStack, Box, Flex, Text } from 'native-base';

import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '@/screens/Dev/Storybook/_partials/StorySpacer';

const colorStories = storiesOf('Styleguide', module);
const storyTitle = 'Colors';

export const Color = ({ children, ...rest }) => (
  <Flex flex="1" h="16" {...rest}>
    <Box
      bg="white"
      d="inline-block"
      m="auto"
      p="1"
      fontSize="xs"
      fontWeight="bold"
      borderRadius="md"
    >
      {children}
    </Box>
  </Flex>
);

export const Colors = ({ colorScheme = 'gray', ...rest }) => (
  <HStack
    spacing="0"
    my="1"
    overflow="hidden"
    boxShadow="lg"
    color={`${colorScheme}.700`}
    borderRadius="md"
    {...rest}
  >
    <Color bg={`${colorScheme}.50`}>50</Color>
    <Color bg={`${colorScheme}.100`}>100</Color>
    <Color bg={`${colorScheme}.200`}>200</Color>
    <Color bg={`${colorScheme}.300`}>300</Color>
    <Color bg={`${colorScheme}.400`}>400</Color>
    <Color bg={`${colorScheme}.500`}>500</Color>
    <Color bg={`${colorScheme}.600`}>600</Color>
    <Color bg={`${colorScheme}.700`}>700</Color>
    <Color bg={`${colorScheme}.800`}>800</Color>
    <Color bg={`${colorScheme}.900`}>900</Color>
  </HStack>
);

colorStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} alignItems="flex-start">
    <Text>Primary</Text>
    <Colors colorScheme="primary" />
    <StorySpacer />
    <Text>Success</Text>
    <Colors colorScheme="success" />
    <StorySpacer />
    <Text>Error</Text>
    <Colors colorScheme="error" />
    <StorySpacer />
    <Text>Warning</Text>
    <Colors colorScheme="warning" />
    <StorySpacer />
    <Text>Gray</Text>
    <Colors colorScheme="gray" />
  </StoryLayout>
));
