import {
  FlashList,
  type FlashListProps,
  type FlashListRef,
} from '@shopify/flash-list';
import { StyleSheet, useWindowDimensions, type ViewStyle } from 'react-native';
import { withUniwind } from 'uniwind';

import { type ResponsiveValue, useResponsiveValue } from '@/lib/responsive';
import { cn } from '@/lib/tailwind/utils';

const UniwindFlashList = withUniwind(FlashList) as typeof FlashList;

export type ListProps<T> = Omit<FlashListProps<T>, 'numColumns'> & {
  className?: string;
  contentContainerClassName?: string;
  ListHeaderComponentClassName?: string;
  ListFooterComponentClassName?: string;
  numColumns?: ResponsiveValue<number>;
  ref?: React.Ref<FlashListRef<T>>;
};

export const List = <T,>({
  className,
  extraData,
  numColumns = 1,
  style,
  contentContainerClassName,
  ...props
}: ListProps<T>) => {
  const resolvedNumColumns = useResponsiveValue(numColumns);
  const { width } = useWindowDimensions();

  const listStyle = StyleSheet.flatten([{ width }, style]) as ViewStyle;

  return (
    <UniwindFlashList
      extraData={{ extraData, numColumns: resolvedNumColumns, width }}
      numColumns={resolvedNumColumns}
      className={cn('flex-1', className)}
      style={listStyle}
      contentContainerClassName={cn(
        'pt-safe-offset-0 px-safe-offset-2 pb-safe-offset-16 md:px-safe-offset-4',
        contentContainerClassName
      )}
      {...props}
    />
  );
};
