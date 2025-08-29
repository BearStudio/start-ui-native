import { FC, PropsWithChildren } from 'react';

import { Box, BoxProps, Text, useColorModeValue } from 'react-native-ficus-ui';

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
  const errorTextColor = useColorModeValue('red.500', 'red.300');

  return (
    <Box {...rest}>
      {!!label && <Text variant="semiBold">{label}</Text>}
      {children}
      {helper && <Text fontSize="sm">{helper}</Text>}
      {showError && errorMessage && (
        <Text color={errorTextColor}>{errorMessage}</Text>
      )}
    </Box>
  );
};
