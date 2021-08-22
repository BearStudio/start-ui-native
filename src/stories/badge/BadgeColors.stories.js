import React from 'react';
import {storiesOf} from '@storybook/react-native';
import StoryLayout from '../../screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '../../screens/Dev/Storybook/_partials/StorySpacer';
import Badge from '../../components/Badge';

const badgeStories = storiesOf('Badge', module);
const storyTitle = 'Badge colors';

badgeStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle}>
    <Badge colorScheme="default">Default</Badge>

    <StorySpacer />
    <Badge colorScheme="primary">Primary</Badge>

    <StorySpacer />
    <Badge colorScheme="secondary">Secondary</Badge>

    <StorySpacer />
    <Badge colorScheme="dark">Dark</Badge>

    <StorySpacer />
    <Badge colorScheme="warning">Warning</Badge>

    <StorySpacer />
    <Badge colorScheme="danger">Danger</Badge>

    <StorySpacer />
    <Badge colorScheme="white">White</Badge>

    <StorySpacer />
    <Badge colorScheme="primary" onPress={() => console.log('Pressed')}>
      Clickable badge
    </Badge>
  </StoryLayout>
));
