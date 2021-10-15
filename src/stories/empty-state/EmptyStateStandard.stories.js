import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { EmptyState, wipIllustration } from '@/components/EmptyState';
import StoryLayout from '@/devtools/storybook/_partials/StoryLayout';

const badgeStories = storiesOf('Layout', module);
const storyTitle = 'Empty state standard';

badgeStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} h="100%">
    <EmptyState image={wipIllustration} text="Work in progress" />
  </StoryLayout>
));
