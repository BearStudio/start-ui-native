import { Text, TextProps } from 'react-native-ficus-ui';

export const FormFieldHelper = (props: TextProps) => {
  return (
    <Text
      color="neutral.600"
      _dark={{ color: 'neutral.400' }}
      fontSize="sm"
      fontWeight="regular"
      {...props}
    />
  );
};
