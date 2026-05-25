import {
  BottomSheet as ExpoBottomSheet,
  type BottomSheetProps as ExpoBottomSheetProps,
  RNHostView,
  RNHostViewProps,
} from '@expo/ui';
import { useWindowDimensions, View, type ViewProps } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

const SHEET_HORIZONTAL_PADDING = 40;

export type BottomSheetProps = Omit<
  ExpoBottomSheetProps,
  'isPresented' | 'onDismiss' | 'children'
> & {
  isOpen?: boolean;
  onClose?: () => void;
  children: RNHostViewProps['children'];
};

/**
 * Modal bottom sheet backed by Expo UI (SwiftUI / Jetpack Compose / vaul on web).
 * @see https://docs.expo.dev/versions/latest/sdk/ui/universal/bottomsheet/
 */
export const BottomSheet = ({
  isOpen = false,
  onClose,
  children,
  showDragIndicator = true,
  snapPoints,
  testID,
  modifiers,
}: BottomSheetProps) => {
  const fitToContents = !snapPoints?.length;
  const { width: windowWidth } = useWindowDimensions();

  return (
    <ExpoBottomSheet
      isPresented={isOpen}
      onDismiss={() => onClose?.()}
      showDragIndicator={showDragIndicator}
      snapPoints={snapPoints}
      testID={testID}
      modifiers={modifiers}
    >
      <RNHostView matchContents={fitToContents}>
        <View style={{ width: windowWidth - SHEET_HORIZONTAL_PADDING }}>
          {children}
        </View>
      </RNHostView>
    </ExpoBottomSheet>
  );
};

type BottomSheetContentProps = ViewProps & {
  className?: string;
};

export const BottomSheetContent = ({
  className,
  ...props
}: BottomSheetContentProps) => (
  <View className={cn('w-full gap-2 px-2 py-4', className)} {...props} />
);
