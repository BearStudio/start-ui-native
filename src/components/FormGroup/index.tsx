import { FC, PropsWithChildren } from 'react';
import { Div, DivProps, Text } from 'react-native-magnus';

export type FormGroupProps = DivProps & {
  label?: string;
  showError?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
};

export const FormGroup: FC<PropsWithChildren<FormGroupProps>> = ({
  label,
  children,
  errorMessage,
  showError,
  ...rest
}) => {
  return (
    <Div mt={5} {...rest}>
      {!!label && <Text>{label}</Text>}
      {children}
      {showError && errorMessage && <Text color="red500">{errorMessage}</Text>}
    </Div>
  );
};
