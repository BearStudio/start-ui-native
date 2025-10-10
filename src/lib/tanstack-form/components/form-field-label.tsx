import { Text, TextProps } from 'react-native-ficus-ui';

type FormFieldLabelProps = TextProps;

export const FormFieldLabel = (props: FormFieldLabelProps) => {
  return (
    <Text
      color="neutral.800"
      _dark={{ color: 'neutral.200' }}
      fontSize="sm"
      fontWeight="medium"
      {...props}
    />
  );
};
