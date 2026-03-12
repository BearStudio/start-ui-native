import { View, type ViewProps } from 'react-native';

import { BookGetByIdResponse } from '@/lib/hey-api/generated';
import { cn } from '@/lib/tailwind/utils';

import { Text } from '@/components/ui/text';

export type BookCoverProps = ViewProps & {
  book: BookGetByIdResponse;
};

export const COVER_HEIGHT = 240;

export const BookCover = ({
  book,
  className,
  style,
  ...props
}: BookCoverProps) => {
  return (
    <View
      className={cn(
        'flex aspect-2/3 w-full justify-between rounded-lg p-4',
        className
      )}
      style={[
        { height: COVER_HEIGHT, backgroundColor: book.genre?.color },
        style,
      ]}
      {...props}
    >
      <Text className="font-bold text-neutral-50">{book.title}</Text>
      <Text className="text-xs font-medium text-neutral-50">{book.author}</Text>
    </View>
  );
};
