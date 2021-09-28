import React from 'react';

import { storiesOf } from '@storybook/react-native';

import EmptyState from '@/components/Layout/EmptyState';
import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';

const wipImage = require('@/assets/images/wip-illustration.png'); // https://undraw.co/search => search for "mobile"

const badgeStories = storiesOf('Layout', module);
const storyTitle = 'Empty state standard';

badgeStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} h="100%">
    <EmptyState image={wipImage} text="Work in progress" />
  </StoryLayout>
));
