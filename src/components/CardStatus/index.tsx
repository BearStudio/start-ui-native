import React, { FC } from 'react';

import {
  Box,
  BoxProps,
  Icon,
  Text,
  useColorModeValue,
} from 'react-native-ficus-ui';

type CardStatusProps = {
  title: string;
  children: React.ReactNode;
  type: 'info' | 'warning' | 'error';
} & BoxProps;

const statusStyles = {
  info: {
    iconName: 'infocirlce',
    iconColor: 'blue.500',
    iconColorDark: 'blue.400',
  },
  warning: {
    iconName: 'exclamationcircle',
    iconColor: 'orange.500',
    iconColorDark: 'orange.400',
  },
  error: {
    iconName: 'closecircle',
    iconColor: 'red.500',
    iconColorDark: 'red.400',
  },
};

export const CardStatus: FC<CardStatusProps> = ({
  title,
  children,
  type,
  ...rest
}) => {
  const { iconName, iconColor, iconColorDark } =
    statusStyles[type] || statusStyles.info;
  return (
    <Box
      bg={useColorModeValue('neutral.200', 'neutral.600')}
      p="md"
      px="lg"
      borderRadius="md"
      overflow="hidden"
      justify="center"
      {...rest}
    >
      <Box flexDirection="row" alignItems="center">
        <Icon
          name={iconName}
          color={useColorModeValue(iconColor, iconColorDark)}
          iconSet="AntDesign"
        />
        {title && (
          <Text fontSize="lg" fontWeight="bold" ml="md">
            {title}
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
};
