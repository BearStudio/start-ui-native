import {
  FlashList,
  type FlashListProps,
  type FlashListRef,
} from '@shopify/flash-list';
import { useWindowDimensions, type ViewStyle } from 'react-native';
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

  return (
    <UniwindFlashList
      key={resolvedNumColumns}
      extraData={{ extraData, numColumns: resolvedNumColumns, width }}
      numColumns={resolvedNumColumns}
      className={cn('flex-1', className)}
      style={{ width, ...style } as ViewStyle}
      contentContainerClassName={cn('p-safe', contentContainerClassName)}
      {...props}
    />
  );
};
