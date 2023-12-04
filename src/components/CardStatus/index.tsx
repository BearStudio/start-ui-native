import React, { FC } from 'react';
import { useDarkMode } from '@/theme/useDarkMode';
import { Box, Text, Icon, BoxProps } from 'react-native-ficus-ui';

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
  const { colorModeValue } = useDarkMode();
  const { iconName, iconColor, iconColorDark } =
    statusStyles[type] || statusStyles.info;
  console.log({ iconName });
  return (
    <Box
      bg={colorModeValue('gray.200', 'gray.900')}
      p="md"
      px="lg"
      borderRadius="md"
      shadow="md"
      justify="center"
      {...rest}
    >
      <Box flexDirection="row" alignItems="center">
        <Icon
          name={iconName}
          fontFamily="AntDesign"
          fontSize="xl"
          color={colorModeValue(iconColor, iconColorDark)}
        />
        {title && (
          <Text
            fontSize="lg"
            fontWeight="bold"
            color={colorModeValue('gray.800', 'gray.100')}
            ml="md"
          >
            {title}
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
};
