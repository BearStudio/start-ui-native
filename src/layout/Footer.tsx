import { FC, PropsWithChildren } from 'react';

import { Box, BoxProps, useColorModeValue } from 'react-native-ficus-ui';

export const Footer: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Box
      position="absolute"
      bottom={0}
      py="lg"
      px="xl"
      w="100%"
      bg={useColorModeValue('gray.50', 'gray.800')}
      {...rest}
    >
      {children}
    </Box>
  );
};
