import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Div } from 'react-native-magnus';

import GridView from '@/components/Lists/GridView';
import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';

const gridViewStories = storiesOf('GridView', module);
const storyTitle = 'Default';
const storySubtitle = `A GridView is a component that allows you to display items using as you would do with a grid in CSS.
It's using a FlatList with a numColumns under the hood, and all props are passed down to the FlatList component`;

gridViewStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} subtitle={storySubtitle}>
    <GridView
      renderItem={({ item }) => (
        <Div height={100} bg={item} rounded="md" shadow="md" />
      )}
      items={[
        'brandPrimary100',
        'brandPrimary200',
        'brandPrimary300',
        'brandPrimary400',
        'brandPrimary500',
        'brandPrimary600',
        'brandPrimary700',
        'brandPrimary800',
        'brandPrimary900',
      ]}
      numColumns={2}
      keyExtractor={(item) => item}
      columnSpacing={10}
      rowSpacing={15}
    />
  </StoryLayout>
));
