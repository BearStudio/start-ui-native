import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from '@/components/ui/box';
import { ScrollBox } from '@/components/ui/scroll-box';

import { WITH_NATIVE_TABS } from '@/app/(logged)/(tabs)/_layout';
import { isApple } from '@/constants/device';

type ViewTabContentProps = Omit<
  React.ComponentProps<typeof ScrollBox>,
  'gap'
> & {
  withHeader?: boolean;
  gap?: number;
};

export const ViewTabContent = ({
  withHeader = isApple && WITH_NATIVE_TABS,
  children,
  contentContainerStyle,
  gap = 16,
  ...props
}: ViewTabContentProps) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollBox
      className="flex-1 p-4"
      contentContainerStyle={[
        {
          paddingTop: (withHeader ? 0 : insets.top) + 16,
          gap,
        },
        contentContainerStyle,
      ]}
      {...props}
    >
      {children}
      <Box style={{ height: insets.bottom }} />
    </ScrollBox>
  );
};
