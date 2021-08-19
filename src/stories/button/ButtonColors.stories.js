import React from 'react';
import {storiesOf} from '@storybook/react-native';
import StoryLayout from '../../screens/Dev/Storybook/_partials/StoryLayout';
import Button from '../../components/Button';
import StorySpacer from '../../screens/Dev/Storybook/_partials/StorySpacer';

const buttonStories = storiesOf('Buttons', module);
const storyTitle = 'Button colors';

buttonStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle}>
    <Button onPress={() => console.log('clicked')} colorScheme="default">
      Default
    </Button>

    <StorySpacer />
    <Button onPress={() => console.log('clicked')} colorScheme="primary">
      Primary
    </Button>

    <StorySpacer />
    <Button onPress={() => console.log('clicked')} colorScheme="secondary">
      Secondary
    </Button>

    <StorySpacer />
    <Button onPress={() => console.log('clicked')} colorScheme="dark">
      Dark
    </Button>

    <StorySpacer />
    <Button onPress={() => console.log('clicked')} colorScheme="warning">
      Warning
    </Button>

    <StorySpacer />
    <Button onPress={() => console.log('clicked')} colorScheme="danger">
      Danger
    </Button>

    <StorySpacer />
    <Button onPress={() => console.log('clicked')} colorScheme="white">
      White
    </Button>
  </StoryLayout>
));
