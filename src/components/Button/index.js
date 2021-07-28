import React from 'react';

import PropTypes from 'prop-types';
import {Button as MagnusButton, Text} from 'react-native-magnus';

import {fontStyles} from '../../styles/font.style';

const BasicButton = ({size, children, ...otherProps}) => (
  <MagnusButton
    py="lg"
    px="xl"
    borderWidth={1}
    fontWeight="600"
    {...(size === 'full' ? {w: '100%'} : {})}
    {...otherProps}>
    {children}
  </MagnusButton>
);

const colorSchemes = {
  default: {
    primaryColor: 'white',
    secondaryColor: 'gray600',
  },
  gray: {
    primaryColor: 'gray100',
    secondaryColor: 'gray600',
  },
  dark: {
    primaryColor: 'gray600',
    secondaryColor: 'white',
  },
  primary: {
    primaryColor: 'brandPrimary600',
    secondaryColor: 'white',
  },
  secondary: {
    primaryColor: 'brandSecondary600',
    secondaryColor: 'white',
  },
  accent: {
    primaryColor: 'accent600',
    secondaryColor: 'white',
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
    default:
      return (
        <BasicButton
          bg={colorSchemes[colorScheme].primaryColor}
          borderColor={colorSchemes[colorScheme].primaryColor}
          color={colorSchemes[colorScheme].secondaryColor}
          {...otherProps}>
          {children}
        </BasicButton>
      );
  }
};

export default Button;

Button.propTypes = {
  variant: PropTypes.string,
  colorScheme: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'accent',
    'gray',
    'dark',
  ]),
  children: PropTypes.node,
};

Button.defaultProps = {
  variant: null,
  colorScheme: 'default',
  children: null,
};
