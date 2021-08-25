import React from 'react';

import PropTypes from 'prop-types';
import {ImageBackground, Image} from 'react-native';
import {Div, Text} from 'react-native-magnus';

import {imageStyles} from '../../styles/image.style';

const EmptyState = ({children, image, text, ...rest}) => {
  return (
    <Div
      column
      flex={1}
      justifyContent="center"
      alignItems="center"
      px="md"
      {...rest}>
      <Div h="50%" w="80%">
        <ImageBackground
          style={imageStyles.responsiveImage}
          source={image}
          resizeMode="contain"
        />
      </Div>
      <Text textAlign="center" fontSize="lg" fontWeight="bold" mt="lg">
        {text}
      </Text>
      {children && (
        <Div justifyContent="center" mt="xl">
          {children}
        </Div>
      )}
    </Div>
  );
};

export default EmptyState;

EmptyState.propTypes = {
  children: PropTypes.node,
  image: Image.propTypes.source.isRequired,
  text: PropTypes.string.isRequired,
};

EmptyState.defaultProps = {
  children: null,
};
