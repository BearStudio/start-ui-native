import { getUiState } from '@bearstudio/ui-state';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { api } from '@/lib/hey-api/api';

import { Card, CardBody } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';
import { FullLoader } from '@/components/ui/full-loader';
import { Text } from '@/components/ui/text';

import { BookCover } from '@/features/books/book-cover';
import { ViewSafeScrollContent } from '@/layout/view-safe-scroll-content';

export const ViewBook = (props: { bookId: string }) => {
  const { t } = useTranslation(['books']);

  const book = useQuery(api.bookGetByIdOptions({ path: { id: props.bookId } }));

  const ui = getUiState((set) => {
    if (book.isPending) return set('pending');
    if (book.status === 'error') return set('error');

    return set('default', {
      data: book.data,
    });
  });

  return (
    <ViewSafeScrollContent withHeader>
      {ui
        .match('pending', () => <FullLoader />)
        .match('error', () => <></>)
        .match('default', ({ data }) => (
          <View className="flex-col gap-4 md:flex-row md:items-start">
            <View className="md:flex-1">
              <Card>
                <CardBody className="py-1">
                  <View className="flex flex-row px-4 py-3">
                    <Text
                      className="flex-1 text-sm font-medium"
                      variant="muted"
                    >
                      {t('books:common.title')}
                    </Text>
                    <Text className="flex-2 text-sm font-medium">
                      {data.title}
                    </Text>
                  </View>
                  <Divider />
                  <View className="flex flex-row px-4 py-3">
                    <Text
                      className="flex-1 text-sm font-medium"
                      variant="muted"
                    >
                      {t('books:common.author')}
                    </Text>
                    <Text className="flex-2 text-sm font-medium">
                      {data.author}
                    </Text>
                  </View>
                  <Divider />
                  <View className="flex flex-row px-4 py-3">
                    <Text
                      className="flex-1 text-sm font-medium"
                      variant="muted"
                    >
                      {t('books:common.genre')}
                    </Text>
                    <Text className="flex-2 text-sm font-medium">
                      {data.genre?.name ?? 'Unknown'}
                    </Text>
                  </View>
                  <Divider />
                  <View className="flex flex-row px-4 py-3">
                    <Text
                      className="flex-1 text-sm font-medium"
                      variant="muted"
                    >
                      {t('books:common.publisher')}
                    </Text>
                    <Text className="flex-2 text-sm font-medium">
                      {data.publisher?.toString() ?? 'Unknown'}
                    </Text>
                  </View>
                </CardBody>
              </Card>
            </View>
            <View className="items-center">
              <BookCover book={data} className="w-40 md:w-56" />
            </View>
          </View>
        ))
        .exhaustive()}
    </ViewSafeScrollContent>
  );
};
