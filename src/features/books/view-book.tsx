import { getUiState } from '@bearstudio/ui-state';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Center, Divider, HStack, Stack, Text } from 'react-native-ficus-ui';

import { api } from '@/lib/hey-api/api';

import { Card, CardBody } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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
    <ViewTabContent withHeader fixed>
      {ui
        .match('pending', () => <Skeleton style={{ maxHeight: 170 }} />)
        .match('error', () => <></>)
        .match('default', ({ data }) => (
          <Stack gap={16} flex={1}>
            <Card maxW={500}>
              <CardBody py={4}>
                <HStack gap={8} py={12}>
                  <Text
                    flex={1}
                    fontWeight="medium"
                    fontSize="sm"
                    variant="muted"
                  >
                    {t('books:common.title')}
                  </Text>
                  <Text flex={2} fontWeight="medium" fontSize="sm">
                    {data.title}
                  </Text>
                </HStack>
                <Divider />
                <HStack gap={8} py={12}>
                  <Text
                    flex={1}
                    fontWeight="medium"
                    fontSize="sm"
                    variant="muted"
                  >
                    {t('books:common.author')}
                  </Text>
                  <Text flex={2} fontWeight="medium" fontSize="sm">
                    {data.author}
                  </Text>
                </HStack>
                <Divider />
                <HStack gap={8} py={12}>
                  <Text
                    flex={1}
                    fontWeight="medium"
                    fontSize="sm"
                    variant="muted"
                  >
                    {t('books:common.genre')}
                  </Text>
                  <Text flex={2} fontWeight="medium" fontSize="sm">
                    {data.genre?.name ?? 'Unknown'}
                  </Text>
                </HStack>
                <Divider />
                <HStack gap={8} py={12}>
                  <Text
                    flex={1}
                    fontWeight="medium"
                    fontSize="sm"
                    variant="muted"
                  >
                    {t('books:common.publisher')}
                  </Text>
                  <Text flex={2} fontWeight="medium" fontSize="sm">
                    {data.publisher?.toString() ?? 'Unknown'}
                  </Text>
                </HStack>
              </CardBody>
            </Card>
            <Center h="60%" p={16}>
              <BookCover book={data} />
            </Center>
          </Stack>
        ))
        .exhaustive()}
    </ViewTabContent>
  );
};
