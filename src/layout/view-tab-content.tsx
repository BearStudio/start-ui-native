import { Box, BoxProps } from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ViewTabContent = ({
  withHeader,
  ...props
}: BoxProps & { withHeader?: boolean }) => {
  const insets = useSafeAreaInsets();
  return (
    <Box p={16} flex={1} mt={withHeader ? undefined : insets.top} {...props} />
  );
};
