import { FC, PropsWithChildren } from 'react';

import { Box, BoxProps } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

export const Footer: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  const { colorModeValue } = useDarkMode();

  return (
    <Box
      position="absolute"
      bottom={0}
      py="lg"
      px="xl"
      w="100%"
      bg={colorModeValue('gray.50', 'gray.800')}
      {...rest}
    >
      {children}
    </Box>
  );
};
