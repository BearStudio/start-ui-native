import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef } from 'react';
import { ficus, useColorModeValue, useDisclosure } from 'react-native-ficus-ui';

import theme from '@/lib/ficus-ui/theme';

const FicusBottomSheet = ficus(BottomSheetModal, {
  baseStyle: { flex: 1, borderRadius: 'md' },
});

export const BottomSheet = ({
  isOpen,
  onClose,
  ...props
}: BottomSheetModalProps &
  Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onClose'>) => {
  const ref = useRef<BottomSheetModal>(null);

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

  const backgroundColor = useColorModeValue('white', theme.colors.neutral[900]);
  const handleColor = useColorModeValue(
    theme.colors.neutral[200],
    theme.colors.neutral[500]
  );

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
    <FicusBottomSheet
      {...props}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: handleColor,
        width: 64,
        height: 5,
      }}
      backgroundStyle={{ backgroundColor }}
      handleStyle={{ backgroundColor: 'transparent' }}
      ref={ref}
      onChange={handleChange}
    />
  );
};

export const BottomSheetBox = ficus(BottomSheetView, {
  baseStyle: { flex: 1, px: 24, pt: 12, pb: 64, minH: 260 },
});
