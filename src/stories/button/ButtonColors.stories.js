import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Button } from 'native-base';

import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '@/screens/Dev/Storybook/_partials/StorySpacer';

const buttonStories = storiesOf('Buttons', module);
const storyTitle = 'Button colors';
const onPress = () => console.log('Pressed');

buttonStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} alignItems="flex-start">
    <Button onPress={onPress} colorScheme="primary">
      Primary
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="secondary">
      Secondary
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="success">
      Success
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="danger">
      Danger
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="warning">
      Warning
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="gray">
      Gray
    </Button>
  </StoryLayout>
));
