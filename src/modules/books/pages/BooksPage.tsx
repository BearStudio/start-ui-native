import { useCallback } from 'react';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Box, Button, Text, useTheme } from 'react-native-ficus-ui';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Container } from '@/layout/Container';
import { BookCard } from '@/modules/books/components/BookCard';
import { BooksSkeleton } from '@/modules/books/components/BooksSkeleton';
import { Book, useBooksInfinite } from '@/modules/books/services/books.service';

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
    if (isFetchingNextPage || hasNextPage) {
      return <BooksSkeleton length={2} />;
    }

    return null;
  }, [hasNextPage, isFetchingNextPage]);

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
        <Animated.FlatList
          entering={FadeIn.duration(250)}
          data={items}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', gap: 8 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: theme?.space?.md as number,
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
