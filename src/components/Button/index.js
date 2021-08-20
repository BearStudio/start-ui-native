import React from 'react';

import PropTypes from 'prop-types';
import {Button as MagnusButton, Text} from 'react-native-magnus';

import {fontStyles} from '../../styles/font.style';

const BasicButton = ({size, children, ...otherProps}) => (
  <MagnusButton
    py="lg"
    px="xl"
    borderWidth={1}
    fontWeight="700"
    {...(size === 'full' ? {w: '100%'} : {})}
    {...otherProps}>
    {children}
  </MagnusButton>
);

export const colorSchemes = {
  default: {
    primaryColor: 'gray100',
    secondaryColor: 'gray600',
  },
  primary: {
    primaryColor: 'brandPrimary600',
    secondaryColor: 'white',
  },
  secondary: {
    primaryColor: 'brandPrimary50',
    secondaryColor: 'brandPrimary700',
  },
  white: {
    primaryColor: 'white',
    secondaryColor: 'gray600',
  },
  dark: {
    primaryColor: 'gray600',
    secondaryColor: 'white',
  },
  danger: {
    primaryColor: 'error100',
    secondaryColor: 'error700',
  },
  warning: {
    primaryColor: 'warning100',
    secondaryColor: 'warning700',
  },
};

const Button = ({variant, colorScheme, children, ...otherProps}) => {
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
  colorScheme: PropTypes.oneOf(Object.keys(colorSchemes)),
  children: PropTypes.node,
};

Button.defaultProps = {
  variant: 'default',
  colorScheme: 'default',
  children: null,
};
