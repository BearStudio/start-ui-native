import React from 'react';
import {storiesOf} from '@storybook/react-native';
import StoryLayout from '../../screens/Dev/Storybook/_partials/StoryLayout';
import Button from '../../components/Button';
import StorySpacer from '../../screens/Dev/Storybook/_partials/StorySpacer';

const buttonStories = storiesOf('Buttons', module);
const storyTitle = 'Button colors';
const onPress = () => console.log('Pressed');

buttonStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle}>
    <Button onPress={onPress} colorScheme="default">
      Default
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="primary">
      Primary
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="secondary">
      Secondary
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="dark">
      Dark
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="warning">
      Warning
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="danger">
      Danger
    </Button>

    <StorySpacer />
    <Button onPress={onPress} colorScheme="white">
      White
    </Button>
  </StoryLayout>
));
