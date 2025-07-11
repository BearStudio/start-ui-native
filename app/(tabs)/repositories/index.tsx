import { Link, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  List,
  Stack,
  Text,
  TouchableOpacity,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { LoadingScreen } from '@/layout/LoadingScreen';
import { useRepositories } from '@/modules/repositories/repositories.service';

const Repositories = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const repositories = useRepositories();

  const color = useColorModeValue('white', 'gray.700');

  return (
    <Box p={20} h="100%">
      {repositories.isLoading && <LoadingScreen />}

      {repositories.isSuccess &&
        !repositories.data.pages.flatMap((page) => page.items).length && (
          <Text fontSize="sm" color="text-dimmed">
            {t('repositories:noRepositories')}
          </Text>
        )}

      <List
        keyExtractor={(item) => `repository-${item?.id}`}
        data={repositories?.data?.pages
          .flatMap((page) => page.items)
          .filter((item) => !!item)}
        renderItem={({ item: repository }) => (
          <TouchableOpacity onPress={() => router.replace(repository.link)}>
            <Stack p={14} bg={color} borderRadius="md">
              <Stack spacing={10}>
                <Text fontSize="xl" fontWeight="bold">
                  {repository.name}
                </Text>
                {!!repository.description && (
                  <Text>{repository.description}</Text>
                )}
                <Link href={repository.link}>
                  <Text fontSize="sm" textDecorLine="underline">
                    {repository.link}
                  </Text>
                </Link>
              </Stack>
            </Stack>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Box h={10} />}
      />
      {repositories.hasNextPage && (
        <Box>
          <Button
            onPress={() => repositories.fetchNextPage()}
            isLoading={repositories.isFetchingNextPage}
          >
            {t('repositories:loadMore')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Repositories;
