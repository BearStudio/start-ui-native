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
import { ViewTabContent } from '@/layout/view-tab-content';

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
    <ViewTabContent withHeader>
      {ui
        .match('pending', () => <FullLoader />)
        .match('error', () => <></>)
        .match('default', ({ data }) => (
          <View className="flex-1 gap-4">
            <Card>
              <CardBody className="py-1">
                <View className="flex flex-row py-3 px-4">
                  <Text className="flex-1 text-sm font-medium" variant="muted">
                    {t('books:common.title')}
                  </Text>
                  <Text className="flex-2 text-sm font-medium">
                    {data.title}
                  </Text>
                </View>
                <Divider />
                <View className="flex flex-row py-3 px-4">
                  <Text className="flex-1 text-sm font-medium" variant="muted">
                    {t('books:common.author')}
                  </Text>
                  <Text className="flex-2 text-sm font-medium">
                    {data.author}
                  </Text>
                </View>
                <Divider />
                <View className="flex flex-row py-3 px-4">
                  <Text className="flex-1 text-sm font-medium" variant="muted">
                    {t('books:common.genre')}
                  </Text>
                  <Text className="flex-2 text-sm font-medium">
                    {data.genre?.name ?? 'Unknown'}
                  </Text>
                </View>
                <Divider />
                <View className="flex flex-row py-3 px-4">
                  <Text className="flex-1 text-sm font-medium" variant="muted">
                    {t('books:common.publisher')}
                  </Text>
                  <Text className="flex-2 text-sm font-medium">
                    {data.publisher?.toString() ?? 'Unknown'}
                  </Text>
                </View>
              </CardBody>
            </Card>
            <View className="flex-1 items-center justify-center">
              <BookCover book={data} className="h-[80%] self-center" />
            </View>
          </View>
        ))
        .exhaustive()}
    </ViewTabContent>
  );
};
