import React from 'react';

import PropTypes from 'prop-types';
import { Button as MagnusButton, Text } from 'react-native-magnus';

import { fontStyles } from '@/styles/font.style';
import { buttonSizes } from '@/theme/components/buttonSizes';
import { colorSchemes } from '@/theme/components/colorSchemes';

const BasicButton = ({ size, children, ...otherProps }) => (
  <MagnusButton
    py="lg"
    px="xl"
    borderWidth={1}
    fontWeight="700"
    {...buttonSizes[size]}
    {...otherProps}
  >
    {children}
  </MagnusButton>
);

const Button = ({ variant, colorScheme, children, ...otherProps }) => {
  switch (variant) {
    case 'outline':
      return (
        <BasicButton
          bg="transparent"
          color={colorSchemes[colorScheme].primaryColor}
          borderWidth={1}
          borderColor={colorSchemes[colorScheme].primaryColor}
          {...otherProps}
        >
          {children}
        </BasicButton>
      );
    case 'link':
      const { size } = otherProps;
      return (
        <BasicButton bg="transparent" borderWidth={0} {...otherProps}>
          <Text
            fontWeight="700"
            color={colorSchemes[colorScheme].primaryColor}
            fontSize={buttonSizes[size].fontSize}
            style={fontStyles.textUnderline}
          >
            {children}
          </Text>
        </BasicButton>
      );
    case 'default':
      return (
        <BasicButton
          bg={colorSchemes[colorScheme].primaryColor}
          borderColor={colorSchemes[colorScheme].primaryColor}
          color={colorSchemes[colorScheme].secondaryColor}
          {...otherProps}
        >
          {children}
        </BasicButton>
      );
    default:
      console.warn('No variant named', { variant });
      return null;
  }
};

export default Button;

Button.propTypes = {
  variant: PropTypes.string,
  colorScheme: PropTypes.oneOf(Object.keys(colorSchemes)),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  block: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  variant: 'default',
  colorScheme: 'default',
  size: 'md',
  block: false,
  children: null,
};
