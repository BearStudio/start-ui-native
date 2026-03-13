import { getUiState } from '@bearstudio/ui-state';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { api } from '@/lib/hey-api/api';

import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';

import { BookCover, COVER_HEIGHT } from '@/features/books/book-cover';
import { ViewTabContent } from '@/layout/view-tab-content';

export const ViewBooks = () => {
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
    <ViewTabContent withHeader>
      {ui
        .match('pending', () => (
          <View className="flex-row flex-wrap">
            {Array.from({ length: 4 }, (_, i) => i).map((index) => (
              <View key={index} className="w-1/2 p-2">
                <Skeleton
                  className="w-full rounded-lg"
                  style={{ height: COVER_HEIGHT }}
                />
              </View>
            ))}
          </View>
        ))
        .match('error', () => <></>)
        .match('empty', () => <Text>There is no books</Text>)
        .match('default', ({ data }) => (
          <FlashList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={2}
            horizontal={false}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: '/books/[id]',
                  params: { id: item.id, title: item.title },
                }}
                style={{ padding: 8, flex: 1 }}
              >
                <Link.Trigger>
                  <BookCover book={item} />
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
    </ViewTabContent>
  );
};
