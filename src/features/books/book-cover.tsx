import { BookGetByIdResponse } from '@/lib/hey-api/generated';

import { Box, type BoxProps } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export type BookCoverProps = BoxProps & { book: BookGetByIdResponse };

const COVER_HEIGHT = 240;

export const BookCover = ({
  book,
  className,
  style,
  ...props
}: BookCoverProps) => {
  return (
    <Box
      className="flex aspect-[2/3] w-full justify-between rounded-lg p-4"
      style={[
        { height: COVER_HEIGHT, backgroundColor: book.genre?.color },
        style,
      ]}
      {...props}
    >
      <Text className="text-base font-bold text-white">{book.title}</Text>
      <Text className="text-xs font-medium text-white">{book.author}</Text>
    </Box>
  );
};
