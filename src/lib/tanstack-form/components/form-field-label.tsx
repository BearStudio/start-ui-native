import { Text, TextProps } from 'react-native-ficus-ui';

type FormFieldLabelProps = TextProps;

export const FormFieldLabel = (props: FormFieldLabelProps) => {
  return (
    <Text color="neutral.800" fontSize="sm" fontWeight="medium" {...props} />
  );
};
