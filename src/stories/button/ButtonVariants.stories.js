import React from 'react';
import {storiesOf} from '@storybook/react-native';
import StoryLayout from '../../screens/Dev/Storybook/_partials/StoryLayout';
import Button from '../../components/Button';
import StorySpacer from '../../screens/Dev/Storybook/_partials/StorySpacer';

const buttonStories = storiesOf('Buttons', module);
const storyTitle = 'Button variants';
const onPress = () => console.log('Pressed');

buttonStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle}>
    <Button variant="default" onPress={onPress} colorScheme="primary">
      Default
    </Button>

    <StorySpacer />
    <Button variant="outline" onPress={onPress} colorScheme="primary">
      Outline
    </Button>

    <StorySpacer />
    <Button variant="block" onPress={onPress} colorScheme="primary">
      Block
    </Button>

    <StorySpacer />
    <Button variant="link" onPress={onPress} colorScheme="primary">
      Link
    </Button>
  </StoryLayout>
));
