import React from 'react';
import {storiesOf} from '@storybook/react-native';
import StoryLayout from '../../screens/Dev/Storybook/_partials/StoryLayout';
import EmptyState from '../../components/Layout/EmptyState';
import Button from '../../components/Button';

const bugImage = require('../../assets/images/bug-illustration.png'); // https://undraw.co/search => search for "bug"

const badgeStories = storiesOf('Layout', module);
const storyTitle = 'Empty state with action';

badgeStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} h="100%">
    <EmptyState image={bugImage} text="Unfortunately, there was an error">
      <Button colorScheme="primary">Retry</Button>
    </EmptyState>
  </StoryLayout>
));