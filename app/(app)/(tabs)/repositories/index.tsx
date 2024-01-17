import { Link } from 'expo-router';
import { Box, Button, Stack, Text } from 'react-native-ficus-ui';

import { LoadingScreen } from '@/layout/LoadingScreen';
import { useRepositories } from '@/modules/repositories/repositories.service';
import { useDarkMode } from '@/theme/useDarkMode';

const Repositories = () => {
  const { colorModeValue } = useDarkMode();

  const repositories = useRepositories();
  return (
    <Box p={20} h="100%">
      {repositories.isLoading && <LoadingScreen />}

      {repositories.isSuccess &&
        !repositories.data.pages.flatMap((page) => page.items).length && (
          <Text fontSize="sm" color="text-dimmed">
            No repositories
          </Text>
        )}

      <Stack flex={1} spacing={6}>
        {repositories.isSuccess &&
          repositories.data.pages
            .flatMap((page) => page.items)
            .map((repository) => (
              <Stack
                key={repository.id}
                p={14}
                bg={colorModeValue('white', 'gray.700')}
                borderRadius="md"
              >
                <Stack spacing={10}>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={colorModeValue('gray.900', 'gray.50')}
                  >
                    {repository.name}
                  </Text>
                  {!!repository.description && (
                    <Text color={colorModeValue('gray.900', 'gray.50')}>
                      {repository.description}
                    </Text>
                  )}
                  <Link href={repository.link}>
                    <Text
                      fontSize="sm"
                      color={colorModeValue('gray.900', 'gray.50')}
                      textDecorLine="underline"
                    >
                      {repository.link}
                    </Text>
                  </Link>
                </Stack>
              </Stack>
            ))}
      </Stack>
      {repositories.hasNextPage && (
        <Box>
          <Button
            onPress={() => repositories.fetchNextPage()}
            isLoading={repositories.isFetchingNextPage}
          >
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Repositories;
