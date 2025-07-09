import { useCallback } from 'react';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { Box, Button, Text, useTheme } from 'react-native-ficus-ui';

import { Container } from '@/layout/Container';
import { BookCard } from '@/modules/books/bookCard';
import { Book, useBooksInfinite } from '@/modules/books/books.service';
import { BooksSkeleton } from '@/modules/books/books.skeleton';

const BooksPage = () => {
  const { t } = useTranslation('books');

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useBooksInfinite();

  const items: Book[] = data?.pages.flatMap((p) => p.items) ?? [];
  const { theme } = useTheme();
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  const router = useRouter();

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return <BooksSkeleton length={2} />;
    }
    if (hasNextPage) {
      return (
        <Button
          variant="ghost"
          my="md"
          onPress={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
        >
          {t('loadMore')}
        </Button>
      );
    }
    return null;
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, t]);

  return (
    <Container px={0} py={0}>
      {status === 'loading' && <BooksSkeleton length={6} />}
      {status === 'error' && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text color="red.500" mb="md">
            {t('error')}
          </Text>
          <Button onPress={() => refetch()}>
            {t('commons:actions.retry')}
          </Button>
        </Box>
      )}
      {status === 'success' && (
        <FlatList
          data={items}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', gap: 8 }}
          contentContainerStyle={{
            paddingHorizontal: theme?.spacing?.xl,
            paddingVertical: theme?.spacing?.md,
            gap: 8,
            overflow: 'visible',
          }}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text color="muted.500">{t('empty')}</Text>
            </Box>
          }
          renderItem={({ item }) => (
            <BookCard
              book={item}
              onPress={() => {
                router.navigate({
                  pathname: `/book/${item.id}`,
                  params: {
                    title: item.title,
                  },
                });
              }}
            />
          )}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
        />
      )}
    </Container>
  );
};

export default BooksPage;
