import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Button } from 'native-base';

import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '@/screens/Dev/Storybook/_partials/StorySpacer';

const buttonStories = storiesOf('Buttons', module);
const storyTitle = 'Button sizes';
const onPress = () => console.log('Pressed');

buttonStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} alignItems="flex-start">
    <Button size="xs" onPress={onPress} colorScheme="primary">
      Size: xs
    </Button>

    <StorySpacer />
    <Button size="sm" onPress={onPress} colorScheme="primary">
      Size: sm
    </Button>

    <StorySpacer />
    <Button size="md" onPress={onPress} colorScheme="primary">
      Size: md
    </Button>

    <StorySpacer />
    <Button size="lg" onPress={onPress} colorScheme="primary">
      Size: lg
    </Button>

    <StorySpacer />
    <Button w="100%" onPress={onPress} colorScheme="primary">
      Full width
    </Button>
  </StoryLayout>
));
