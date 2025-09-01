import React, { ReactNode } from 'react';

import CoverSvg from '@assets/cover.svg';
import { TouchableOpacity } from 'react-native';
import {
  Box,
  BoxProps,
  Dict,
  Text,
  useColorModeValue,
  useTheme,
} from 'react-native-ficus-ui';

import { Skeleton } from '@/components/Skeleton';
import { Book } from '@/modules/books/services/books.service';

const Card = (props: BoxProps) => {
  return (
    <Box
      position="relative"
      borderRadius="sm"
      overflow="hidden"
      style={{ aspectRatio: 2 / 3, overflow: 'hidden' }}
      shadowColor="red"
      {...props}
    />
  );
};

const CardBackground = ({ color }: { color: string }) => {
  return (
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
        color={color}
      />
    </Box>
  );
};

const CardContent = (props: BoxProps) => (
  <Box flex={1} p="md" justifyContent="space-between" pl="xl" {...props} />
);

export const BookCard: React.FC<{
  book: Book;
  onPress?: () => void;
}> = ({ book, onPress }) => {
  const bg =
    book.genre?.color ?? useColorModeValue('neutral.200', 'neutral.700');

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <Card>
        {/* 3D SVG cover */}
        <CardBackground color={bg} />
        {/* Title & author overlay */}
        <CardContent>
          <Text color="white" fontSize="lg" fontWeight="bold" numberOfLines={2}>
            {book.title}
          </Text>
          {book.author && (
            <Text color="white" fontSize="sm" opacity={0.7} numberOfLines={1}>
              By {book.author}
            </Text>
          )}
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};

export const BookCardDetails: React.FC<{
  book: Book;
  onPress?: () => void;
}> = ({ book, onPress }) => {
  const bg =
    book.genre?.color ?? useColorModeValue('neutral.200', 'neutral.700');

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <Card>
        {/* 3D SVG cover */}
        <CardBackground color={bg} />
        {/* Title & author overlay */}
        <CardContent pl="2xl" p="xl">
          <Text color="white" fontSize="xl" variant="bold" numberOfLines={2}>
            {book.title}
          </Text>
          {book.author && (
            <Text color="white" fontSize="sm" opacity={0.7} numberOfLines={1}>
              By {book.author}
            </Text>
          )}
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};

export const BookCardSkeleon = ({
  visible,
  children,
}: {
  visible?: boolean;
  children?: ReactNode;
}) => {
  const { theme } = useTheme();
  if (visible) {
    return <>{children}</>;
  }
  return (
    <Card flex={1}>
      {/* 3D SVG cover */}
      <CardBackground
        color={(theme?.colors?.neutral as Dict)?.[300] ?? 'neutral'}
      />

      {/* Title & author overlay */}
      <CardContent>
        <Skeleton.Text />
        <Skeleton.Text />
      </CardContent>
    </Card>
  );
};
