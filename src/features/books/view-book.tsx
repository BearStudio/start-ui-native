import { getUiState } from '@bearstudio/ui-state';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Box, Divider, Flex, HStack, Stack, Text } from 'react-native-ficus-ui';

import { api } from '@/lib/hey-api/api';

import { FullLoader } from '@/components/full-loader';

import { BookCover } from '@/features/books/book-cover';

export const ViewBook = (props: { bookId: string }) => {
  const navigation = useNavigation();

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
            <Box
              bg="white"
              px={16}
              py={4}
              gap={4}
              borderRadius="lg"
              borderWidth={1}
              borderColor="neutral.200"
            >
              <HStack gap={8} py={12}>
                <Text
                  flex={1}
                  fontWeight="medium"
                  fontSize="sm"
                  color="neutral.600"
                >
                  Title
                </Text>
                <Text flex={2} fontWeight="medium" fontSize="sm">
                  {data.title}
                </Text>
              </HStack>
              <Divider color="neutral.200" />
              <HStack gap={8} py={12}>
                <Text
                  flex={1}
                  fontWeight="medium"
                  fontSize="sm"
                  color="neutral.600"
                >
                  Author
                </Text>
                <Text flex={2} fontWeight="medium" fontSize="sm">
                  {data.author}
                </Text>
              </HStack>
              <Divider color="neutral.200" />
              <HStack gap={8} py={12}>
                <Text
                  flex={1}
                  fontWeight="medium"
                  fontSize="sm"
                  color="neutral.600"
                >
                  Genre
                </Text>
                <Text flex={2} fontWeight="medium" fontSize="sm">
                  {data.genre?.name ?? 'Unknown'}
                </Text>
              </HStack>
              <Divider color="neutral.200" />
              <HStack gap={8} py={12}>
                <Text
                  flex={1}
                  fontWeight="medium"
                  fontSize="sm"
                  color="neutral.600"
                >
                  Publisher
                </Text>
                <Text flex={2} fontWeight="medium" fontSize="sm">
                  {data.publisher?.toString() ?? 'Unknown'}
                </Text>
              </HStack>
            </Box>
            <BookCover book={data} alignSelf="center" h="60%" />
          </Stack>
        ))
        .exhaustive()}
    </Flex>
  );
};
