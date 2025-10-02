import { getUiState } from '@bearstudio/ui-state';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Flex, HStack, Stack, Text } from 'react-native-ficus-ui';

import { api } from '@/lib/hey-api/api';

import { Card, CardBody } from '@/components/ui/card';
import { FullLoader } from '@/components/ui/full-loader';

import { BookCover } from '@/features/books/book-cover';

export const ViewBook = (props: { bookId: string }) => {
  const navigation = useNavigation();
  const { t } = useTranslation(['books']);

  const book = useQuery(api.bookGetByIdOptions({ path: { id: props.bookId } }));

  useEffect(() => {
    navigation.setOptions({ title: book.data?.title });
  }, [navigation, book.data?.title]);

  const ui = getUiState((set) => {
    if (book.isPending) return set('pending');
    if (book.status === 'error') return set('error');

    return set('default', {
      data: book.data,
    });
  });

  return (
    <Flex p={16}>
      {ui
        .match('pending', () => <FullLoader />)
        .match('error', () => <></>)
        .match('default', ({ data }) => (
          <Stack gap={16}>
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
            <BookCover book={data} alignSelf="center" h="60%" />
          </Stack>
        ))
        .exhaustive()}
    </Flex>
  );
};
