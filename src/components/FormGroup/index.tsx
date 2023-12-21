import { FC, PropsWithChildren } from 'react';

import { Box, BoxProps, Text } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

export type FormGroupProps = BoxProps & {
  label?: string;
  showError?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  helper?: string;
};

export const FormGroup: FC<PropsWithChildren<FormGroupProps>> = ({
  label,
  children,
  errorMessage,
  showError,
  helper,
  ...rest
}) => {
  const { colorModeValue } = useDarkMode();
  return (
    <Box {...rest}>
      {!!label && (
        <Text color={colorModeValue('black', 'gray.100')}>{label}</Text>
      )}
      {children}
      {helper && (
        <Text fontSize="sm" color={colorModeValue('gray.700', 'gray.300')}>
          {helper}
        </Text>
      )}
      {showError && errorMessage && <Text color="red.500">{errorMessage}</Text>}
    </Box>
  );
};
