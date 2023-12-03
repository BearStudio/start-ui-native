import React, { FC } from 'react';
import { useDarkMode } from '@/theme/useDarkMode';
import { Box, Text, Icon, BoxProps } from 'react-native-ficus-ui';

type CardInfoProps = {
  title: string;
  children: React.ReactNode;
} & BoxProps;

export const CardInfo: FC<CardInfoProps> = ({ title, children, ...rest }) => {
  const { colorModeValue } = useDarkMode();

  return (
    <Box
      bg={colorModeValue('gray.200', 'gray.900')}
      p="sm"
      borderRadius="md"
      shadow="md"
      justify="center"
      {...rest}
    >
      <Box flexDirection="row" alignItems="center">
        <Icon
          name="infocirlce"
          fontFamily="AntDesign"
          fontSize="xl"
          color={colorModeValue('blue.500', 'blue.400')}
        />
        {title && (
          <Text
            fontSize="lg"
            fontWeight="bold"
            color={colorModeValue('gray.800', 'gray.100')}
            ml={2}
          >
            {title}
          </Text>
        )}
      </Box>
      {children}
    </Box>
  );
};
