import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Button from '@/components/Button';
import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '@/screens/Dev/Storybook/_partials/StorySpacer';
import StoryTitle from '@/screens/Dev/Storybook/_partials/StoryTitle';

const buttonStories = storiesOf('Buttons', module);
const storyTitle = 'Button sizes';
const onPress = () => console.log('Pressed');

buttonStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle}>
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
    <Button size="xl" onPress={onPress} colorScheme="primary">
      Size: xl
    </Button>

    <StoryTitle mt="2xl">Block sized and variants</StoryTitle>
    <Button size="xs" variant="outline" onPress={onPress} colorScheme="primary">
      xs - outline
    </Button>

    <StorySpacer />
    <Button size="xs" variant="link" onPress={onPress} colorScheme="primary">
      xs - link
    </Button>

    <StorySpacer />
    <Button size="xs" block onPress={onPress} colorScheme="primary">
      xs - block
    </Button>
  </StoryLayout>
));
