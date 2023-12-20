import { FC, PropsWithChildren } from 'react';
import { Box, BoxProps } from 'react-native-ficus-ui';

export const Footer: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Box position="absolute" bottom={0} py="lg" px="xl" w="100%" {...rest}>
      {children}
    </Box>
  );
};
