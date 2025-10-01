import { Box, BoxProps, Text } from 'react-native-ficus-ui';

import { BookGetByIdResponse } from '@/lib/hey-api/generated';

export type BookCoverProps = BoxProps & { book: BookGetByIdResponse };

const COVER_HEIGHT = 240;

export const BookCover = ({
  book,
  h = COVER_HEIGHT,
  ...props
}: BookCoverProps) => {
  return (
    <Box
      justifyContent="space-between"
      p={16}
      bg={book.genre?.color}
      h={h}
      w="100%"
      aspectRatio={2 / 3}
      borderRadius="lg"
      {...props}
    >
      <Text fontSize="xl" fontWeight="500" color="white">
        {book.title}
      </Text>
      <Text fontWeight="200" color="white">
        {book.author}
      </Text>
    </Box>
  );
};
