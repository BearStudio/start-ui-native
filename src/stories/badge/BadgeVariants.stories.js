import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Badge, HStack } from 'native-base';

import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '@/screens/Dev/Storybook/_partials/StorySpacer';

const badgeStories = storiesOf('Badge', module);
const storyTitle = 'Badge variants';

badgeStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} alignItems="flex-start">
    <HStack space="2">
      <Badge variant="solid" colorScheme="primary">
        Solid
      </Badge>
      <Badge variant="outline" colorScheme="primary">
        Outline
      </Badge>
      <Badge variant="subtle" colorScheme="primary">
        Subtle
      </Badge>
    </HStack>

    <StorySpacer />
    <HStack space="2">
      <Badge variant="solid" colorScheme="success">
        Solid
      </Badge>
      <Badge variant="outline" colorScheme="success">
        Outline
      </Badge>
      <Badge variant="subtle" colorScheme="success">
        Subtle
      </Badge>
    </HStack>

    <StorySpacer />
    <HStack space="2">
      <Badge variant="solid" colorScheme="danger">
        Solid
      </Badge>
      <Badge variant="outline" colorScheme="danger">
        Outline
      </Badge>
      <Badge variant="subtle" colorScheme="danger">
        Subtle
      </Badge>
    </HStack>

    <StorySpacer />
    <HStack space="2">
      <Badge variant="solid" colorScheme="warning">
        Solid
      </Badge>
      <Badge variant="outline" colorScheme="warning">
        Outline
      </Badge>
      <Badge variant="subtle" colorScheme="warning">
        Subtle
      </Badge>
    </HStack>

    <StorySpacer />
    <HStack space="2">
      <Badge variant="solid" colorScheme="gray">
        Solid
      </Badge>
      <Badge variant="outline" colorScheme="gray">
        Outline
      </Badge>
      <Badge variant="subtle" colorScheme="gray">
        Subtle
      </Badge>
    </HStack>
  </StoryLayout>
));
