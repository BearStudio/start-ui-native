import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Image from '@/components/Image';
import StoryLayout from '@/screens/Dev/Storybook/_partials/StoryLayout';
import StorySpacer from '@/screens/Dev/Storybook/_partials/StorySpacer';

import image from './image-illustration.png';

const imageStories = storiesOf('Image', module);
const storyTitle = 'Default';
const storySubtitle = `An Image is a component that allows you to display images.
By default, every images are not saved in cache. To use the cache for images, you can add the property "imageInCache" to the Image component;`;

imageStories.add(storyTitle, () => (
  <StoryLayout title={storyTitle} subtitle={storySubtitle}>
    <Image h={200} w={200} source={image} alt="A value" />
    <StorySpacer />
    <Image imageInCache h={200} w={200} source={image} alt="A value" />
  </StoryLayout>
));
