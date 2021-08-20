import React from 'react';
import {Div, Text} from 'react-native-magnus';
import PropTypes from 'prop-types';

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

StoryLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

StoryLayout.defaultProps = {
  title: null,
};
