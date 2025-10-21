import { Box, BoxProps, ScrollBox } from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WITH_NATIVE_TABS } from '@/app/(logged)/(tabs)/_layout';
import { isApple } from '@/constants/device';

export const ViewTabContent = ({
  withHeader = isApple && WITH_NATIVE_TABS,
  children,
  ...props
}: BoxProps & { withHeader?: boolean }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollBox
      p={16}
      pt={(withHeader ? 0 : insets.top) + 16}
      flex={1}
      {...props}
    >
      {children}
      <Box h={insets.bottom} />
    </ScrollBox>
  );
};
