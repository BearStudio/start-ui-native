import {
  Box,
  BoxProps,
  HStack,
  StackProps,
  Text,
  TextProps,
} from 'react-native-ficus-ui';

export const Card = (props: BoxProps) => {
  return (
    <Box
      borderRadius="md"
      borderWidth={1}
      borderColor="neutral.200"
      bg="white"
      _dark={{ bg: 'neutral.950', borderColor: 'neutral.800' }}
      {...props}
    />
  );
};

export const CardHeader = (props: StackProps) => {
  return <HStack p={16} justifyContent="space-between" {...props} />;
};

export const CardTitle = (props: TextProps) => {
  return <Text fontWeight="bold" {...props} />;
};

export const CardBody = (props: BoxProps) => {
  return <Box p={16} {...props} />;
};
