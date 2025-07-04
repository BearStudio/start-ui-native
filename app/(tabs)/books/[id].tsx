import React, { useEffect } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ActivityIndicator, ScrollView } from 'react-native';
import {
  Box,
  Center,
  Divider,
  HStack,
  Stack,
  Text,
} from 'react-native-ficus-ui';

import { apiHooks } from '@/api/api-hooks';
import { BookCard } from '@/modules/books/bookCard';
import { useDarkMode } from '@/theme/useDarkMode';

const BookDetails: React.FC = () => {
  const { getParent, setOptions } = useNavigation();
  const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();
  const { colorModeValue } = useDarkMode();

  // hide tab bar
  useEffect(() => {
    getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
  }, [getParent]);

  // set header title
  useEffect(() => {
    setOptions({
      headerShown: true,
      title: title ?? 'Détails du livre',
    });
  }, [setOptions, title]);

  // fetch book
  const bookQuery = apiHooks.useBookGetById({ params: { id } });

  // loading
  if (bookQuery.isLoading) {
    return (
      <Center flex={1}>
        <ActivityIndicator
          size="large"
          color={colorModeValue('black', 'white')}
        />
      </Center>
    );
  }

  // not found
  if (!bookQuery.data) {
    return (
      <Center flex={1} px="md">
        <Text fontSize="lg" color="error.600">
          Livre introuvable.
        </Text>
      </Center>
    );
  }

  // error
  if (bookQuery.isError) {
    return (
      <Center flex={1} px="md">
        <Text fontSize="lg" color="error.600">
          Une erreur est survenue. Veuillez réessayer.
        </Text>
      </Center>
    );
  }

  const book = bookQuery.data;

  return (
    <ScrollView>
      <Stack spacing={24} p={24}>
        {/* Hero Cover */}
        <Center>
          <Box w={180} h={270} borderRadius="lg" overflow="hidden" shadow="xl">
            <BookCard book={book} />
          </Box>
        </Center>

        {/* Info Card */}
        <Stack borderWidth={2} borderRadius="md" borderColor="gray.300">
          {/* Titre */}
          <HStack justifyContent="space-between" alignItems="center" p={8}>
            <Text color="gray.600">Titre</Text>
            <Text fontWeight="bold">{book.title}</Text>
          </HStack>
          <Divider />

          {/* Auteur */}
          <HStack justifyContent="space-between" alignItems="center" p={8}>
            <Text color="gray.600">Auteur</Text>
            <Text>{book.author}</Text>
          </HStack>
          <Divider />

          {/* Genre */}
          <HStack justifyContent="space-between" alignItems="center" p={8}>
            <Text color="gray.600">Genre</Text>
            <HStack alignItems="center" spacing={4}>
              <Box bg={book.genre?.color} w={4} h={4} borderRadius="full" />
              <Text>{book.genre?.name}</Text>
            </HStack>
          </HStack>
          <Divider />

          {/* Éditeur */}
          <HStack justifyContent="space-between" alignItems="center" p={8}>
            <Text color="gray.600">Éditeur</Text>
            <Text>{(book.publisher as string) ?? '—'}</Text>
          </HStack>
          <Divider />

          {/* Date d’ajout */}
          <HStack justifyContent="space-between" alignItems="center" p={8}>
            <Text color="gray.600">Date d’ajout</Text>
            <Text>{dayjs(book.createdAt).format('D MMMM YYYY')}</Text>
          </HStack>
          <Divider />

          {/* Dernière mise à jour */}
          <HStack justifyContent="space-between" alignItems="center" p={8}>
            <Text color="gray.600">Dernière MAJ</Text>
            <Text>{dayjs(book.updatedAt).format('D MMMM YYYY')}</Text>
          </HStack>
        </Stack>
      </Stack>
    </ScrollView>
  );
};

export default BookDetails;
