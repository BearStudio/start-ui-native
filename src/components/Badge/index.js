import React from 'react';

import PropTypes from 'prop-types';
import {Badge as MagnusBadge, Button} from 'react-native-magnus';
import {colorSchemes} from '../Button';

const BasicBadge = ({colorScheme, ...rest}) => (
  <MagnusBadge
    bg={colorSchemes[colorScheme].primaryColor}
    color={colorSchemes[colorScheme].secondaryColor}
    fontSize="md"
    pb={2}
    {...rest}
  />
);

const Badge = ({onPress, colorScheme, children, ...rest}) => {
  if (onPress) {
    return (
      <Button bg="transparent" p={0} onPress={onPress}>
        <BasicBadge children={children} colorScheme={colorScheme} {...rest} />
      </Button>
    );
  }

  return <BasicBadge children={children} colorScheme={colorScheme} {...rest} />;
};

export default Badge;

Badge.propTypes = {
  colorScheme: PropTypes.oneOf(Object.keys(colorSchemes)),
};

Badge.defaultProps = {
  colorScheme: 'default',
};
