import React from 'react';

import { Box, Text } from 'native-base';
import PropTypes from 'prop-types';

import StoryTitle from './StoryTitle';

const StoryLayout = ({ title, subtitle, children, ...rest }) => {
  return (
    <Box px={3} py={5} {...rest}>
      {title && <StoryTitle>{title}</StoryTitle>}
      {subtitle && <Text mb={8}>{subtitle}</Text>}
      {children}
    </Box>
  );
};

export default StoryLayout;

StoryLayout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

StoryLayout.defaultProps = {
  title: null,
  subtitle: null,
};
