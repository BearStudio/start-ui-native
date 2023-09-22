import { useDarkMode } from '@/theme/useDarkMode';
import { FC, PropsWithChildren } from 'react';
import { Box, BoxProps, Text } from 'react-native-ficus-ui';

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
    <Box mt={5} {...rest}>
      {!!label && (
        <Text color={colorModeValue('black', 'gray.100')}>{label}</Text>
      )}
      {children}
      {showError && errorMessage && <Text color="red.500">{errorMessage}</Text>}
      {helper && (
        <Text fontSize="sm" color={colorModeValue('gray.500', 'gray.600')}>
          {helper}
        </Text>
      )}
    </Box>
  );
};
