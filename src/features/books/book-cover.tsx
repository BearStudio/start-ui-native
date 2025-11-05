import { Box, BoxProps, Flex, Text } from 'react-native-ficus-ui';

import { BookGetByIdResponse } from '@/lib/hey-api/generated';

export type BookCoverProps = BoxProps & { book: BookGetByIdResponse };

export const BookCover = ({ book, ...props }: BookCoverProps) => {
  return (
    <Box flex={1} aspectRatio={2 / 3} {...props}>
      <Flex
        aspectRatio={2 / 3}
        p={16}
        bg={book.genre?.color}
        borderRadius="lg"
        justifyContent="space-between"
      >
        <Text fontSize="md" fontWeight="bold" color="white">
          {book.title}
        </Text>
        <Text fontSize="xs" fontWeight="medium" color="white">
          {book.author}
        </Text>
      </Flex>
    </Box>
  );
};
