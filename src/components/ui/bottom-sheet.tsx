import {
  BottomSheet as ExpoBottomSheet,
  type BottomSheetProps as ExpoBottomSheetProps,
  RNHostView,
} from '@expo/ui';
import type { ReactNode } from 'react';
import { View } from 'react-native';

export type BottomSheetProps = Omit<
  ExpoBottomSheetProps,
  'isPresented' | 'onDismiss' | 'children'
> & {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
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
        <View className="gap-2 px-2 pt-4">{children}</View>
      </RNHostView>
    </ExpoBottomSheet>
  );
};
