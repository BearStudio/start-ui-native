// components/BookCard.tsx
import React from 'react';

import CoverSvg from '@assets/cover.svg';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-ficus-ui';

// <-- make sure your metro.config.js is set up
import { Book } from '@/modules/books/books.service';
import { useDarkMode } from '@/theme/useDarkMode';

export const BookCard: React.FC<{
  book: Book;
  onPress?: () => void;
}> = ({ book, onPress }) => {
  const { colorModeValue } = useDarkMode();
  const bg = book.genre?.color ?? colorModeValue('gray.200', 'gray.700');

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <Box
        position="relative"
        borderRadius="sm"
        overflow="hidden"
        style={{ aspectRatio: 2 / 3, overflow: 'hidden' }}
        shadowColor="red"
      >
        {/* 3D SVG cover */}
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          pointerEvents="none"
        >
          <CoverSvg
            width="100%"
            height="100%"
            // This will override every shape’s fill in the SVG
            color={bg}
          />
        </Box>

        {/* Title & author overlay */}
        <Box flex={1} p="md" justifyContent="space-between" pl="xl">
          <Text color="white" fontSize="lg" fontWeight="bold" numberOfLines={2}>
            {book.title}
          </Text>
          {book.author && (
            <Text color="white" fontSize="sm" opacity={0.7} numberOfLines={1}>
              By {book.author}
            </Text>
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
