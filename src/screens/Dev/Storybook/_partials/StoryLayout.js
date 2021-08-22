import React from 'react';
import {Div} from 'react-native-magnus';
import PropTypes from 'prop-types';
import StoryTitle from './StoryTitle';

const StoryLayout = ({title, children, ...rest}) => {
  return (
    <Div px="lg" py="xl" {...rest}>
      {title && <StoryTitle>{title}</StoryTitle>}
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
