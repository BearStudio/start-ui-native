import { getUiState } from '@bearstudio/ui-state';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { api } from '@/lib/hey-api/api';
import { useResponsiveValue } from '@/lib/responsive';

import { List } from '@/components/ui/list';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';

import {
  BOOK_COVER_ASPECT_RATIO,
  BookCover,
} from '@/features/books/book-cover';

const BOOKS_NUM_COLUMNS = {
  default: 2,
  sm: 3,
  md: 4,
  lg: 5,
} as const;

export const ViewBooks = () => {
  const { t } = useTranslation(['books']);
  const numColumns = useResponsiveValue(BOOKS_NUM_COLUMNS);

  const books = useInfiniteQuery({
    ...api.bookGetAllInfiniteOptions(),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: {},
  });

  const ui = getUiState((set) => {
    if (books.isPending) return set('pending');
    if (books.status === 'error') return set('error');

    if (!books.data.pages[0]?.total) return set('empty');

    return set('default', {
      data: books.data.pages.flatMap((page) => page.items),
    });
  });

  return (
    <View className="relative flex-1">
      {ui
        .match('pending', () => (
          <View className="flex-row flex-wrap p-safe">
            {Array.from({ length: numColumns * 2 }, (_, i) => i).map(
              (index) => (
                <View
                  key={index}
                  className="p-2"
                  style={{ width: `${100 / numColumns}%` }}
                >
                  <Skeleton
                    className="w-full rounded-sm"
                    style={{ aspectRatio: BOOK_COVER_ASPECT_RATIO }}
                  />
                </View>
              )
            )}
          </View>
        ))
        .match('error', () => <></>)
        .match('empty', () => (
          <View className="p-safe">
            <Text>{t('books:list.empty')}</Text>
          </View>
        ))
        .match('default', ({ data }) => (
          <List
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={BOOKS_NUM_COLUMNS}
            className="p-4"
            renderItem={({ item }) => (
              <Link
                asChild
                href={{
                  pathname: '/books/[id]',
                  params: { id: item.id, title: item.title },
                }}
              >
                <Link.Trigger>
                  <Pressable style={{ padding: 8, flex: 1 }}>
                    <BookCover book={item} />
                  </Pressable>
                </Link.Trigger>
                <Link.Preview />
              </Link>
            )}
            onEndReached={() => {
              if (!books.hasNextPage) {
                return;
              }
              books.fetchNextPage();
            }}
            ListFooterComponent={
              books.isFetchingNextPage ? <ActivityIndicator /> : undefined
            }
          />
        ))
        .exhaustive()}
    </View>
  );
};
