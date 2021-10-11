import React from 'react';

import { Box, Factory, Text } from 'native-base';
import PropTypes from 'prop-types';
import { ImageBackground as ImageBackgroundNative, Image } from 'react-native';

const ImageBackground = Factory(ImageBackgroundNative);

const EmptyState = ({ children, image, text, ...rest }) => {
  return (
    <Box
      column
      flex={1}
      justifyContent="center"
      alignItems="center"
      px={3}
      {...rest}
    >
      <Box h="1/2" w="4/5">
        <ImageBackground
          flex="1"
          alignSelf="stretch"
          source={image}
          resizeMode="contain"
        />
      </Box>
      <Text textAlign="center" fontSize="lg" fontWeight="bold" mt={4}>
        {text}
      </Text>
      {children && (
        <Box justifyContent="center" mt={4}>
          {children}
        </Box>
      )}
    </Box>
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
