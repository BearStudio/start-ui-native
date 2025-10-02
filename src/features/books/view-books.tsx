import { getUiState } from '@bearstudio/ui-state';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Button, FlashList, Text } from 'react-native-ficus-ui';

import { api } from '@/lib/hey-api/api';

import { FullLoader } from '@/components/ui/full-loader';

import { BookCover } from '@/features/books/book-cover';
import { ViewTabContent } from '@/layout/view-tab-content';

export const ViewBooks = () => {
  const books = useInfiniteQuery({
    ...api.bookGetAllInfiniteOptions(),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
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
    <ViewTabContent>
      {ui
        .match('pending', () => <FullLoader />)
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
                href={{ pathname: '/books/[id]', params: { id: item.id } }}
                style={{ padding: 8, flex: 1 }}
              >
                <Link.Trigger>
                  <BookCover book={item} />
                </Link.Trigger>
                {/* <Link.Preview /> */}
              </Link>
            )}
            ListFooterComponent={() => (
              <Button
                variant="@ghost"
                onPress={() => books.fetchNextPage()}
                isDisabled={!books.hasNextPage}
              >
                Load more
              </Button>
            )}
          />
        ))
        .exhaustive()}
    </ViewTabContent>
  );
};
