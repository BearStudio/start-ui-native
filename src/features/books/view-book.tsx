import { getUiState } from '@bearstudio/ui-state';
import { useQuery } from '@tanstack/react-query';
import { useIsPreview, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Divider, HStack, Stack, Text } from 'react-native-ficus-ui';

import { api } from '@/lib/hey-api/api';

import { Card, CardBody } from '@/components/ui/card';
import { FullLoader } from '@/components/ui/full-loader';

import { BookCover } from '@/features/books/book-cover';
import { ViewTabContent } from '@/layout/view-tab-content';

export const ViewBook = (props: { bookId: string }) => {
  const navigation = useNavigation();
  const isPreview = useIsPreview();
  const { t } = useTranslation(['books']);

  const book = useQuery(api.bookGetByIdOptions({ path: { id: props.bookId } }));

  useEffect(() => {
    if (!isPreview && navigation.isFocused()) {
      navigation.setOptions({ title: book.data?.title });
    }
  }, [navigation, book.data?.title, isPreview]);

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
          <Stack gap={16} flex={1}>
            <Card>
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
            <Center flex={1}>
              <BookCover book={data} alignSelf="center" h="80%" />
            </Center>
          </Stack>
        ))
        .exhaustive()}
    </ViewTabContent>
  );
};
