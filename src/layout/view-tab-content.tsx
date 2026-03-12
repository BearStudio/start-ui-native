import { ScrollView, type ScrollViewProps, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WITH_NATIVE_TABS } from '@/app/(logged)/(tabs)/_layout';
import { isApple } from '@/constants/device';

type ViewTabContentProps = Omit<ScrollViewProps, 'gap'> & {
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
    <ScrollView
      className="flex-1 p-4 bg-background"
      contentContainerStyle={[
        {
          paddingTop: (withHeader ? 0 : insets.top) + 16,
          gap,
        },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
      <View style={{ height: insets.bottom }} />
    </ScrollView>
  );
};
