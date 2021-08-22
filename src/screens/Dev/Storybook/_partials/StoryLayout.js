import React from 'react';
import { Div, Text } from 'react-native-magnus';
import PropTypes from 'prop-types';
import StoryTitle from './StoryTitle';

const StoryLayout = ({title, subtitle, children, ...rest}) => {
  return (
    <Div px="lg" py="xl" {...rest}>
      {title && <StoryTitle>{title}</StoryTitle>}
      {subtitle && <Text mb="2xl">{subtitle}</Text>}
      {children}
    </Div>
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
