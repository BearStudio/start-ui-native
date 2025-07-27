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

export const DataCard = ({ children, ...props }: BoxProps) => {
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

export const DataCardTitle = (props: TextProps) => (
  <Text fontSize="lg" fontWeight="bold" mb="sm" {...props} />
);

interface DataCardRowProps extends BoxProps {
  label?: string;
  /** Right‐hand content */
  children: React.ReactNode;
  direction?: 'row' | 'column';
}

export const DataCardRow: FC<DataCardRowProps> = ({
  label,
  children,
  direction = 'column',
  ...props
}) => {
  const labelColor = useColorModeValue('neutral.600', 'neutral.300');

  return (
    <Box px="md" py="md" flexDirection={direction} {...props}>
      {!!label && (
        <Text
          fontSize="md"
          w={direction === 'row' ? '30%' : 'full'}
          variant="semiBold"
          color={labelColor}
        >
          {label}
        </Text>
      )}
      <HStack alignItems="center" gap="md">
        {children}
      </HStack>
    </Box>
  );
};

export const DataCardRowDivider = (props: BoxProps) => {
  const border = useColorModeValue('neutral.200', 'neutral.800');

  return <Divider h={1} color={border} />;
};
