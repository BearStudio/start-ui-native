import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Box } from 'native-base';

import { PhoneNumberInput } from '@/components/PhoneNumberInput';
import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';

const phoneNumberInputStories = storiesOf('PhoneNumberInput', module);
const storyTitle = 'Default';

phoneNumberInputStories.add(storyTitle, () => {
  return (
    <StoryLayout title={storyTitle}>
      <Box>
        <PhoneNumberInput />
      </Box>
    </StoryLayout>
  );
});
