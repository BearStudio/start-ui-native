import { useEffect } from 'react';

import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Box, Center, Spinner, Text } from 'react-native-ficus-ui';

import { apiHooks } from '@/api/api-hooks';

const BookDetails = () => {
  const { getParent, setOptions } = useNavigation();
  useEffect(() => {
    getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [getParent]);

  const { id, title } = useLocalSearchParams<{
    id: string;
    title?: string;
  }>();

  useEffect(() => {
    setOptions({ headerShown: true, title });
  }, [setOptions, title]);

  const bookQuery = apiHooks.useBookGetById({
    params: {
      id,
    },
  });

  if (bookQuery.isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      <Text>Book details</Text>
    </Box>
  );
};

export default BookDetails;
