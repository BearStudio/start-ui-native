import { getUiState } from '@bearstudio/ui-state';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import {
  Box,
  FlashList,
  HStack,
  Text,
  useMediaQuery,
} from 'react-native-ficus-ui';

import { api } from '@/lib/hey-api/api';

import { Skeleton } from '@/components/ui/skeleton';

import { BookCover } from '@/features/books/book-cover';
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

  const [isTablet] = useMediaQuery({
    minWidth: 480,
  });

  return (
    <ViewTabContent withHeader>
      {ui
        .match('pending', () => (
          <HStack>
            <Box flex={1} p={8} aspectRatio={2 / 3}>
              <Skeleton />
            </Box>
            <Box flex={1} p={8} aspectRatio={2 / 3}>
              <Skeleton />
            </Box>
            {isTablet && (
              <>
                <Box flex={1} p={8} aspectRatio={2 / 3}>
                  <Skeleton />
                </Box>
                <Box flex={1} p={8} aspectRatio={2 / 3}>
                  <Skeleton />
                </Box>
              </>
            )}
          </HStack>
        ))
        .match('error', () => <></>)
        .match('empty', () => <Text>There is no books</Text>)
        .match('default', ({ data }) => (
          <FlashList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={isTablet ? 4 : 2}
            horizontal={false}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: '/books/[id]',
                  params: { id: item.id, title: item.title },
                }}
                style={{ aspectRatio: 2 / 3 }}
              >
                <Link.Trigger>
                  <BookCover book={item} p={8} />
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
