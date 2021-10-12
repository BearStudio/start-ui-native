import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Button } from 'native-base';

import { useToast } from '@/components/Toast';
import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '@/screens/Dev/Storybook/_partials/StorySpacer';

const toastStory = storiesOf('Toast', module);
const storyTitle = 'Toast statuses';

toastStory.add(storyTitle, () =>
  React.createElement(() => {
    const { showSuccess, showWarning, showError, showInfo } = useToast();

    return (
      <StoryLayout title={storyTitle} h="100%">
        <Button onPress={() => showSuccess('Some success message to toast')}>
          Show success
        </Button>

        <StorySpacer />
        <Button onPress={() => showWarning('Some warning message to toast')}>
          Show warning
        </Button>

        <StorySpacer />
        <Button onPress={() => showError('Some error message to toast')}>
          Show error
        </Button>

        <StorySpacer />
        <Button onPress={() => showInfo('Some info message to toast')}>
          Show info
        </Button>
      </StoryLayout>
    );
  })
);
