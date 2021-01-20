import React from 'react';
import {Button as MagnusButton} from 'react-native-magnus';

const Button = ({variant, children, size, ...otherProps}) => {
  const renderBlockButton = () => (
    <MagnusButton
      p="lg"
      bg="buttonBody"
      borderWidth={1}
      borderColor="border"
      {...(size === 'full' ? {w: '100%'} : {})}
      {...otherProps}>
      {children}
    </MagnusButton>
  );

  switch (variant) {
    case 'outline':
      return (
        <MagnusButton
          p="lg"
          bg="body"
          color="text"
          borderWidth={1}
          borderColor="text"
          {...(size === 'full' ? {w: '100%'} : {})}
          {...otherProps}>
          {children}
        </MagnusButton>
      );
    case 'link':
      return (
        <MagnusButton
          p="lg"
          bg="body"
          color="text"
          {...(size === 'full' ? {w: '100%'} : {})}
          {...otherProps}>
          {children}
        </MagnusButton>
      );
    case 'block':
      return renderBlockButton();
    default:
      return renderBlockButton();
  }
};

export default Button;
