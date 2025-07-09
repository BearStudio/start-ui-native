import { FlatList } from 'react-native';
import { useTheme } from 'react-native-ficus-ui';

import { BookCardSkeleon } from '@/modules/books/bookCard';

export const BooksSkeleton = ({ length }: { length: number }) => {
  const { theme } = useTheme();
  return (
    <FlatList
      data={Array.from({ length }).map((_, index) => index)}
      renderItem={() => <BookCardSkeleon />}
      keyExtractor={(i) => i.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', gap: 8 }}
      contentContainerStyle={{
        paddingHorizontal: theme?.spacing?.xl,
        paddingVertical: theme?.spacing?.md,
        gap: 8,
        overflow: 'visible',
      }}
    />
  );
};
