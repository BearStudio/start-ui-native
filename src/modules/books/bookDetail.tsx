import { useEffect } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Center,
  Divider,
  HStack,
  Stack,
  Text,
} from 'react-native-ficus-ui';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { apiHooks } from '@/api/api-hooks';
import { Skeleton } from '@/components/Skeleton';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { BookCard, BookCardSkeleon } from '@/modules/books/bookCard';
import { useDarkMode } from '@/theme/useDarkMode';

const BookDetails = () => {
  const { setOptions } = useNavigation();
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const { colorModeValue } = useDarkMode();
  const { t } = useTranslation('books');

  // fetch book
  const bookQuery = apiHooks.useBookGetById({ params: { id } });
  useEffect(() => {
    setOptions({
      headerShown: true,
      title,
    });
  }, [setOptions, title]);

  return (
    <Container>
      <Content>
        {!!bookQuery.isError && !bookQuery.isLoading && (
          <Center flex={1}>
            <Text fontSize="lg" color="error.600">
              {t('error')}
            </Text>
          </Center>
        )}
        {!bookQuery.isLoading && !bookQuery.isError && !bookQuery.data && (
          <Center flex={1}>
            <Text fontSize="lg" color="error.600">
              {t('notFound')}
            </Text>
          </Center>
        )}
        {(!!bookQuery.data || !!bookQuery.isLoading) && (
          <Stack spacing={24}>
            {/* Hero Cover */}
            <Center>
              <Box
                w={180}
                h={270}
                borderRadius="lg"
                overflow="hidden"
                shadow="xl"
              >
                {!bookQuery.isLoading && !!bookQuery?.data ? (
                  <Animated.View entering={FadeIn.duration(250)}>
                    <BookCard book={bookQuery?.data} />
                  </Animated.View>
                ) : (
                  <Animated.View exiting={FadeOut.duration(250)}>
                    <BookCardSkeleon />
                  </Animated.View>
                )}
                <BookCardSkeleon visible={!bookQuery.isLoading}>
                  {!!bookQuery?.data && <BookCard book={bookQuery?.data} />}
                </BookCardSkeleon>
              </Box>
            </Center>

            {/* Info Card */}
            <Stack borderWidth={2} borderRadius="md" borderColor="gray.300">
              {/* Title */}
              <HStack justifyContent="space-between" alignItems="center" p={8}>
                <Text color={colorModeValue('gray.600', 'gray.200')}>
                  {t('fields.title')}
                </Text>
                <Skeleton.Text visible={!bookQuery.isLoading}>
                  <Text
                    fontWeight="bold"
                    color={colorModeValue('gray.900', 'gray.50')}
                  >
                    {bookQuery.data?.title}
                  </Text>
                </Skeleton.Text>
              </HStack>
              <Divider />

              {/* Author */}
              <HStack justifyContent="space-between" alignItems="center" p={8}>
                <Text color={colorModeValue('gray.600', 'gray.200')}>
                  {t('fields.author')}
                </Text>
                <Skeleton.Text visible={!bookQuery.isLoading}>
                  <Text color={colorModeValue('gray.900', 'gray.50')}>
                    {bookQuery.data?.author}
                  </Text>
                </Skeleton.Text>
              </HStack>
              <Divider />

              {/* Genre */}
              <HStack justifyContent="space-between" alignItems="center" p={8}>
                <Text color={colorModeValue('gray.600', 'gray.200')}>
                  {t('fields.genre')}
                </Text>
                <Skeleton.Text visible={!bookQuery.isLoading}>
                  <HStack alignItems="center" spacing={4}>
                    <Box
                      bg={bookQuery.data?.genre?.color}
                      w={4}
                      h={4}
                      borderRadius="full"
                    />
                    <Text color={colorModeValue('gray.900', 'gray.50')}>
                      {bookQuery.data?.genre?.name}
                    </Text>
                  </HStack>
                </Skeleton.Text>
              </HStack>
              <Divider />

              {/* Publisher */}
              <HStack justifyContent="space-between" alignItems="center" p={8}>
                <Text color={colorModeValue('gray.600', 'gray.200')}>
                  {t('fields.publisher')}
                </Text>
                <Skeleton.Text visible={!bookQuery.isLoading}>
                  <Text color={colorModeValue('gray.900', 'gray.50')}>
                    {(bookQuery.data?.publisher as string) ?? '—'}
                  </Text>
                </Skeleton.Text>
              </HStack>
              <Divider />

              {/* Created At */}
              <HStack justifyContent="space-between" alignItems="center" p={8}>
                <Text color={colorModeValue('gray.600', 'gray.200')}>
                  {t('fields.createdAt')}
                </Text>
                <Skeleton.Text visible={!bookQuery.isLoading}>
                  <Text color={colorModeValue('gray.900', 'gray.50')}>
                    {dayjs(bookQuery.data?.createdAt).format('D MMMM YYYY')}
                  </Text>
                </Skeleton.Text>
              </HStack>
              <Divider />

              {/* Updated At */}
              <HStack justifyContent="space-between" alignItems="center" p={8}>
                <Text color={colorModeValue('gray.600', 'gray.200')}>
                  {t('fields.updatedAt')}
                </Text>
                <Skeleton.Text visible={!bookQuery.isLoading}>
                  <Text color={colorModeValue('gray.900', 'gray.50')}>
                    {dayjs(bookQuery.data?.updatedAt).format('D MMMM YYYY')}
                  </Text>
                </Skeleton.Text>
              </HStack>
            </Stack>
          </Stack>
        )}
      </Content>
    </Container>
  );
};

export default BookDetails;
