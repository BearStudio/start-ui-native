import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Button } from 'native-base';

import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '@/screens/Dev/Storybook/_partials/StorySpacer';

const buttonStories = storiesOf('Buttons', module);
const storyTitle = 'Button variants';
const onPress = () => console.log('Pressed');

buttonStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} alignItems="flex-start">
    <Button variant="solid" onPress={onPress} colorScheme="primary">
      Solid
    </Button>

    <StorySpacer />
    <Button variant="outline" onPress={onPress} colorScheme="primary">
      Outline
    </Button>

    <StorySpacer />
    <Button variant="ghost" onPress={onPress} colorScheme="primary">
      Ghost
    </Button>

    <StorySpacer />
    <Button variant="link" onPress={onPress} colorScheme="primary">
      Link
    </Button>

    <StorySpacer />
    <Button variant="unstyled" onPress={onPress} colorScheme="primary">
      Unstyled
    </Button>

    <StorySpacer />
    <Button variant="subtle" onPress={onPress} colorScheme="primary">
      Subtle
    </Button>
  </StoryLayout>
));
