import { useEffect } from 'react';

import 'dayjs/locale/fr';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Box, Center, Text, useColorModeValue } from 'react-native-ficus-ui';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { apiHooks } from '@/api/api-hooks';
import {
  DataCard,
  DataCardRow,
  DataCardRowDivider,
  DataCardTitle,
} from '@/components/DataCard';
import { Skeleton } from '@/components/Skeleton';
import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';
import { BookCardDetails, BookCardSkeleon } from '@/modules/books/bookCard';

const BookDetails = () => {
  const { setOptions } = useNavigation();
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
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
          <>
            {/* Info Card */}
            <DataCard>
              <DataCardRow direction="row" label={t('fields.title')}>
                <DataCardTitle>
                  {bookQuery.data?.title || t('fields.title')}
                </DataCardTitle>
              </DataCardRow>
              <DataCardRowDivider />

              <DataCardRow direction="row" label={t('fields.author')}>
                <Skeleton.Text visible={!bookQuery.isLoading}>
                  <Text
                    color={useColorModeValue('neutral.900', 'neutral.50')}
                    fontSize="md"
                    variant="semiBold"
                  >
                    {bookQuery.data?.author}
                  </Text>
                </Skeleton.Text>
              </DataCardRow>
              <DataCardRowDivider />

              <DataCardRow direction="row" label={t('fields.genre')}>
                <Skeleton.Text visible={!bookQuery.isLoading}>
                  <Box flexDirection="row" alignItems="center">
                    <Box
                      bg={bookQuery.data?.genre?.color}
                      w={4}
                      h={4}
                      borderRadius="full"
                      mr={2}
                    />
                    <Text
                      color={useColorModeValue('neutral.900', 'neutral.50')}
                      fontSize="md"
                      variant="semiBold"
                    >
                      {bookQuery.data?.genre?.name}
                    </Text>
                  </Box>
                </Skeleton.Text>
              </DataCardRow>
              <DataCardRowDivider />

              <DataCardRow direction="row" label={t('fields.publisher')}>
                <Skeleton.Text visible={!bookQuery.isLoading}>
                  <Text
                    color={useColorModeValue('neutral.900', 'neutral.50')}
                    fontSize="md"
                    variant="semiBold"
                  >
                    {(bookQuery.data?.publisher as string) ?? '—'}
                  </Text>
                </Skeleton.Text>
              </DataCardRow>
              <DataCardRowDivider />
            </DataCard>

            {/* Hero Cover */}
            <Center mt="2xl">
              <Box
                w={240}
                h={360}
                borderRadius="lg"
                overflow="hidden"
                shadow="xl"
              >
                {!bookQuery.isLoading && !!bookQuery?.data ? (
                  <Animated.View entering={FadeIn.duration(250)}>
                    <BookCardDetails book={bookQuery?.data} />
                  </Animated.View>
                ) : (
                  <Animated.View exiting={FadeOut.duration(250)}>
                    <BookCardSkeleon />
                  </Animated.View>
                )}
                <BookCardSkeleon visible={!bookQuery.isLoading}>
                  {!!bookQuery?.data && (
                    <BookCardDetails book={bookQuery?.data} />
                  )}
                </BookCardSkeleon>
              </Box>
            </Center>
          </>
        )}
      </Content>
    </Container>
  );
};

export default BookDetails;
