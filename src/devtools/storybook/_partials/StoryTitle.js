import React from 'react';

import { Text } from 'native-base';

const StoryTitle = ({ ...rest }) => (
  <Text fontSize="2xl" fontWeight="bold" mb={5} {...rest} />
);

export default StoryTitle;
