// screens/Books.tsx
import { useCallback } from 'react';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList } from 'react-native';
import { Box, Button, Text } from 'react-native-ficus-ui';

import { BookCard } from '@/modules/books/bookCard';
import { Book, useBooksInfinite } from '@/modules/books/books.service';

export default function Books() {
  const { t } = useTranslation();

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useBooksInfinite();

  const items: Book[] = data?.pages.flatMap((p) => p.items) ?? [];

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  const router = useRouter();
  const renderFooter = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator style={{ marginVertical: 16 }} />;
    }
    if (hasNextPage) {
      return (
        <Button
          variant="ghost"
          my="md"
          onPress={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
        >
          {t('books:loadMore')}
        </Button>
      );
    }
    return null;
  };

  if (status === 'loading') {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }
  if (status === 'error') {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" p={20}>
        <Text color="red.500" mb="md">
          {t('books:error')}
        </Text>
        <Button onPress={() => refetch()}>{t('common:retry')}</Button>
      </Box>
    );
  }
  if (items.length === 0) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text color="muted.500">{t('books:empty')}</Text>
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <FlatList
        data={items}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          overflow: 'visible',
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => {
              router.navigate(`/books/${item.id}`);
            }}
          />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
      />
    </Box>
  );
}
