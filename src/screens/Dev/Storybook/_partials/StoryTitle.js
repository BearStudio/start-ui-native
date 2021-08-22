import React from 'react';
import {Text} from 'react-native-magnus';

const StoryTitle = ({...rest}) => (
  <Text fontSize="2xl" fontWeight="bold" mb="xl" {...rest} />
);

export default StoryTitle;
