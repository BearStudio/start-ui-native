import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Badge } from 'native-base';

import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '@/screens/Dev/Storybook/_partials/StorySpacer';

const badgeStories = storiesOf('Badge', module);
const storyTitle = 'Badge colors';

badgeStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} alignItems="flex-start">
    <Badge colorScheme="primary">Primary</Badge>

    <StorySpacer />
    <Badge colorScheme="secondary">Secondary</Badge>

    <StorySpacer />
    <Badge colorScheme="success">Success</Badge>

    <StorySpacer />
    <Badge colorScheme="danger">Danger</Badge>

    <StorySpacer />
    <Badge colorScheme="warning">Warning</Badge>

    <StorySpacer />
    <Badge colorScheme="gray">Gray</Badge>
  </StoryLayout>
));
