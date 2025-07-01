import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Center,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { ButtonIcon } from '@/components/ButtonIcon';

const Home = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Stack p={20} h="100%" spacing={12}>
      <Text fontSize="2xl" fontWeight="bold">
        {t('home:welcome.title')}
      </Text>
      <Box>
        <Text fontSize="lg">{t('home:welcome.description')}</Text>
        <Text fontSize="lg" mt="md">
          {t('home:welcome.from')}{' '}
          <Text fontWeight="bold">{t('home:welcome.author')}</Text>
        </Text>
      </Box>
      <VStack spacing="lg">
        <ButtonIcon
          icon="github"
          onPress={() =>
            router.replace('https://github.com/BearStudio/start-ui-native')
          }
          variant="outline"
          full
          iconSet="Feather"
        >
          {t('home:links.github')}
        </ButtonIcon>

        <ButtonIcon
          icon="alert-circle"
          onPress={() =>
            router.replace(
              'https://github.com/BearStudio/start-ui-native/issues/new'
            )
          }
          variant="outline"
          full
        >
          {t('home:links.openIssue')}
        </ButtonIcon>
      </VStack>

      <Center>
        <Box
          h={100}
          w="90%"
          bg={useColorModeValue('white', 'gray.900')}
          m="md"
          borderRadius="sm"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Using React Native 0.79 with New Architecture ! 🎉
          </Text>
        </Box>
      </Center>
    </Stack>
  );
};

export default Home;
