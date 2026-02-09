import { View, type ViewProps } from 'react-native';

import { BookGetByIdResponse } from '@/lib/hey-api/generated';

import { Text } from '@/components/ui/text';

export type BookCoverProps = ViewProps & { book: BookGetByIdResponse };

const COVER_HEIGHT = 240;

export const BookCover = ({
  book,
  className,
  style,
  ...props
}: BookCoverProps) => {
  return (
    <View
      className="flex aspect-[2/3] w-full justify-between rounded-lg p-4"
      style={[
        { height: COVER_HEIGHT, backgroundColor: book.genre?.color },
        style,
      ]}
      {...props}
    >
      <Text className="text-base font-bold text-white">{book.title}</Text>
      <Text className="text-xs font-medium text-white">{book.author}</Text>
    </View>
  );
};
