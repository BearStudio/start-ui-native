import React from 'react';

import { Factory, Image as ImageBase } from 'native-base';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

const IS_IMAGE_IN_CACHE = false;

const Image = ({ isImageInCache, source, alt, ...props }) => {
  const FactoryImage = Factory(FastImage);
  return isImageInCache ? (
    <FactoryImage source={source} {...props} />
  ) : (
    <ImageBase source={source} alt={alt} {...props} />
  );
};

Image.propTypes = {
  isImageInCache: PropTypes.bool,
  source: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
};

Image.defaultProps = {
  isImageInCache: IS_IMAGE_IN_CACHE,
};

export default Image;
