import React from 'react';
import {Div, Text} from 'react-native-magnus';

const StoryLayout = ({title, children, ...rest}) => {
  return (
    <Div px="lg" py="xl" {...rest}>
      {title && (
        <Text fontSize="2xl" fontWeight="bold" mb="xl">
          {title}
        </Text>
      )}
      {children}
    </Div>
  );
};

export default StoryLayout;
