import { useTheme } from 'react-native-ficus-ui';
import Animated, { FadeOut } from 'react-native-reanimated';

import { BookCardSkeleon } from '@/modules/books/components/BookCard';

export const BooksSkeleton = ({ length }: { length: number }) => {
  const { theme } = useTheme();
  return (
    <Animated.FlatList
      data={Array.from({ length }).map((_, index) => index)}
      exiting={FadeOut.duration(250)}
      renderItem={() => <BookCardSkeleon />}
      keyExtractor={(i) => i.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', gap: 8 }}
      contentContainerStyle={{
        paddingHorizontal: theme?.space?.xl as number,
        paddingVertical: theme?.space?.md as number,
        gap: 8,
        overflow: 'visible',
      }}
    />
  );
};

export default BooksSkeleton;
