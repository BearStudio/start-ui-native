import { FC } from 'react';

import {
  Box,
  BoxProps,
  Divider,
  HStack,
  Text,
  TextProps,
  useColorModeValue,
} from 'react-native-ficus-ui';

export const AccountCard = ({ children, ...props }: BoxProps) => {
  const bg = useColorModeValue('white', 'neutral.900');
  const border = useColorModeValue('neutral.200', 'neutral.800');

  return (
    <Box flexDirection="row">
      <Box
        bg={bg}
        flex={1}
        borderRadius="md"
        borderWidth={1}
        borderColor={border}
        shadow="card"
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
};

export const AccountCardTitle = (props: TextProps) => (
  <Text fontSize="lg" fontWeight="bold" mb="sm" {...props} />
);

interface AccountCardRowProps extends BoxProps {
  label?: string;
  /** Right‐hand content */
  children: React.ReactNode;
}

export const AccountCardRow: FC<AccountCardRowProps> = ({
  label,
  children,
  ...props
}) => {
  const labelColor = useColorModeValue('neutral.600', 'neutral.400');

  return (
    <Box px="md" py="md" {...props}>
      {!!label && (
        <Text fontSize="sm" fontWeight="medium" color={labelColor}>
          {label}
        </Text>
      )}
      <HStack alignItems="center" gap="md">
        {children}
      </HStack>
    </Box>
  );
};

export const AccountCardRowDivider = (props: BoxProps) => {
  const border = useColorModeValue('neutral.200', 'neutral.800');

  return <Divider h={1} color={border} />;
};
