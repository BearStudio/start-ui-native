import React from 'react';

import PropTypes from 'prop-types';
import {Button as MagnusButton, Text} from 'react-native-magnus';

import {fontStyles} from '../../styles/font.style';
import {colorSchemes} from '../../theme/components/colorSchemes';
import {buttonSizes} from '../../theme/components/buttonSizes';

const BasicButton = ({size, children, ...otherProps}) => (
  <MagnusButton
    py="lg"
    px="xl"
    borderWidth={1}
    fontWeight="700"
    {...buttonSizes[size]}
    {...otherProps}>
    {children}
  </MagnusButton>
);

const Button = ({variant, colorScheme, size, children, ...otherProps}) => {
  switch (variant) {
    case 'outline':
      return (
        <BasicButton
          bg="transparent"
          color={colorSchemes[colorScheme].primaryColor}
          borderWidth={1}
          borderColor={colorSchemes[colorScheme].primaryColor}
          {...otherProps}>
          {children}
        </BasicButton>
      );
    case 'link':
      return (
        <BasicButton bg="transparent" borderWidth={0} {...otherProps}>
          <Text
            fontWeight="600"
            fontSize={18}
            color={colorSchemes[colorScheme].primaryColor}
            style={fontStyles.textUnderline}>
            {children}
          </Text>
        </BasicButton>
      );
    case 'block':
      return (
        <BasicButton
          block
          bg={colorSchemes[colorScheme].primaryColor}
          borderColor={colorSchemes[colorScheme].primaryColor}
          color={colorSchemes[colorScheme].secondaryColor}
          {...otherProps}>
          {children}
        </BasicButton>
      );
    case 'default':
      return (
        <BasicButton
          bg={colorSchemes[colorScheme].primaryColor}
          borderColor={colorSchemes[colorScheme].primaryColor}
          color={colorSchemes[colorScheme].secondaryColor}
          {...otherProps}>
          {children}
        </BasicButton>
      );
    default:
      console.warn('No variant named', {variant});
      return null;
  }
};

export default Button;

Button.propTypes = {
  variant: PropTypes.string,
  colorScheme: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'white',
    'dark',
    'danger',
    'warning',
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  children: PropTypes.node,
};

Button.defaultProps = {
  variant: 'default',
  colorScheme: 'default',
  size: 'md',
  children: null,
};
