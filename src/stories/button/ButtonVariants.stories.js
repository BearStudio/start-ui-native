import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Button from '@/components/Button';
import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '@/screens/Dev/Storybook/_partials/StorySpacer';
import StoryTitle from '@/screens/Dev/Storybook/_partials/StoryTitle';

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
    <Button variant="link" onPress={onPress} colorScheme="primary">
      Link
    </Button>

    <StoryTitle mt="2xl">Block buttons</StoryTitle>
    <Button variant="default" onPress={onPress} colorScheme="primary" block>
      Block - Default
    </Button>

    <StorySpacer />
    <Button variant="outline" onPress={onPress} colorScheme="primary" block>
      Block - Outline
    </Button>

    <StorySpacer />
    <Button variant="link" onPress={onPress} colorScheme="primary" block>
      Block - Link
    </Button>
  </StoryLayout>
));
