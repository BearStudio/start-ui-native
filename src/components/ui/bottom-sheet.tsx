import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef } from 'react';
import { useColorScheme } from 'react-native';

import { cn } from '@/lib/tailwind/utils';

const neutral200 = '#e5e5e5';
const neutral500 = '#737373';
const neutral900 = '#171717';

export const BottomSheet = ({
  isOpen,
  onClose,
  ...props
}: BottomSheetModalProps & { isOpen?: boolean; onClose?: () => void }) => {
  const ref = useRef<BottomSheetModal>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (isOpen) {
      ref.current.present();
      ref.current.snapToIndex(0);
    } else {
      ref.current.close();
    }
  }, [isOpen]);

  const handleChange = (index: number) => {
    if (index === -1 && onClose) {
      onClose();
    }
  };

  const backgroundColor = colorScheme === 'dark' ? neutral900 : 'white';
  const handleColor = colorScheme === 'dark' ? neutral500 : neutral200;

  const renderBackdrop = useMemo(
    () => (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.8}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      {...props}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: handleColor,
        width: 64,
        height: 5,
      }}
      backgroundStyle={{ backgroundColor, flex: 1, borderRadius: 8 }}
      handleStyle={{ backgroundColor: 'transparent' }}
      ref={ref}
      onChange={handleChange}
    />
  );
};

type BottomSheetContentProps = React.ComponentProps<typeof BottomSheetView> & {
  className?: string;
  gap?: number;
};

export const BottomSheetContent = ({
  className,
  style,
  gap,
  ...props
}: BottomSheetContentProps) => (
  <BottomSheetView
    style={[
      {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 64,
        minHeight: 260,
        gap,
      },
      style,
    ]}
    className={cn(className)}
    {...props}
  />
);
