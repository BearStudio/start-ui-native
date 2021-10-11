import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Box } from 'native-base';

import GridView from '@/components/Lists/GridView';
import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';

const gridViewStories = storiesOf('GridView', module);
const storyTitle = 'Default';
const storySubtitle = `A GridView is a component that allows you to display items using as you would do with a grid in CSS.
It's using a FlatList with a numColumns under the hood, and all props are passed down to the FlatList component. The red Box is here to show overflow issues.`;

gridViewStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} subtitle={storySubtitle}>
    <Box h={4} bg="red.400" zIndex="1" />
    <GridView
      renderItem={({ item }) => (
        <Box height={100} bg={item} borderRadius="md" shadow="1" />
      )}
      items={[
        'primary.100',
        'primary.200',
        'primary.300',
        'primary.400',
        'primary.500',
        'primary.600',
        'primary.700',
        'primary.800',
        'primary.900',
      ]}
      numColumns={2}
      keyExtractor={(item) => item}
      columnSpacing={3}
      rowSpacing={3}
    />
  </StoryLayout>
));
