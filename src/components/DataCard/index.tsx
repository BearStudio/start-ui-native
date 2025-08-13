import { FC } from 'react';

import {
  Box,
  BoxProps,
  Divider,
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
  <Text fontSize="md" variant="semiBold" mb="sm" {...props} />
);

interface DataCardRowProps extends BoxProps {
  label?: string;
  /** Right‐hand content */
  children: React.ReactNode;
  direction?: 'row' | 'column';
  contentProps?: BoxProps;
}

export const DataCardRow: FC<DataCardRowProps> = ({
  label,
  children,
  direction = 'column',
  contentProps,
  ...props
}) => {
  const labelColor = useColorModeValue('neutral.600', 'neutral.300');

  return (
    <Box
      px={direction === 'row' ? 0 : 16}
      py={12}
      flexDirection={direction}
      {...props}
    >
      {!!label && (
        <Box w={direction === 'row' ? 100 : undefined}>
          <Text
            fontSize={direction === 'row' ? 'sm' : 'xs'}
            variant="semiBold"
            color={labelColor}
          >
            {label}
          </Text>
        </Box>
      )}
      <Box
        // alignItems="center"
        gap={direction === 'row' ? 'md' : undefined}
        flex={direction === 'row' ? 1 : undefined}
        flexShrink={1}
        {...contentProps}
      >
        {children}
      </Box>
    </Box>
  );
};

export const DataCardRowDivider = (props: BoxProps) => {
  const border = useColorModeValue('neutral.200', 'neutral.800');

  return <Divider h={1} color={border} />;
};
