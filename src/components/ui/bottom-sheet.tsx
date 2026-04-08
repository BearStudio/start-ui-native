import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetHandle,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef } from 'react';
import { withUniwind } from 'uniwind';

import { cn } from '@/lib/tailwind/utils';

const SheetBackdrop = withUniwind(BottomSheetBackdrop);
const SheetModal = withUniwind(BottomSheetModal);
const SheetView = withUniwind(BottomSheetView);
const SheetHandle = withUniwind(BottomSheetHandle);

export const BottomSheet = ({
  isOpen,
  onClose,
  ...props
}: BottomSheetModalProps & { isOpen?: boolean; onClose?: () => void }) => {
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

  const renderBackdrop = useMemo(
    () => (backdropProps: BottomSheetBackdropProps) => (
      <SheetBackdrop
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
    <SheetModal
      {...props}
      backdropComponent={renderBackdrop}
      handleComponent={SheetHandle}
      handleClassName="w-full"
      handleIndicatorClassName="bg-muted-foreground/50 w-36 h-1"
      backgroundClassName="bg-background flex flex-1 rounded-t-2xl"
      ref={ref}
      onChange={handleChange}
    />
  );
};

type BottomSheetContentProps = React.ComponentProps<typeof BottomSheetView> & {
  className?: string;
};

export const BottomSheetContent = ({
  className,
  style,
  ...props
}: BottomSheetContentProps) => (
  <SheetView
    className={cn('flex flex-1 gap-4 px-8 pt-4 pb-16', className)}
    {...props}
  />
);
