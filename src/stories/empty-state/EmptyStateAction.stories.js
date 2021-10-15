import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Button } from 'native-base';

import { EmptyState, bugIllustration } from '@/components/EmptyState';
import StoryLayout from '@/devtools/storybook/_partials/StoryLayout';

const badgeStories = storiesOf('Layout', module);
const storyTitle = 'Empty state with action';

badgeStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} h="100%">
    <EmptyState
      image={bugIllustration}
      text="Unfortunately, there was an error"
    >
      <Button colorScheme="primary">Retry</Button>
    </EmptyState>
  </StoryLayout>
));
