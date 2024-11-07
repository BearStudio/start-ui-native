import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Box, Stack, Text, VStack } from 'react-native-ficus-ui';

import { ButtonIcon } from '@/components/ButtonIcon';
import { useDarkMode } from '@/theme/useDarkMode';

const Home = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { colorModeValue, getThemeColor } = useDarkMode();
  return (
    <Stack p={20} h="100%" spacing={12}>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color={colorModeValue('black', 'gray.50')}
      >
        {t('home:welcome.title')}
      </Text>
      <Box>
        <Text fontSize="lg" color={colorModeValue('black', 'gray.50')}>
          {t('home:welcome.description')}
        </Text>
        <Text fontSize="lg" mt="md" color={colorModeValue('black', 'gray.50')}>
          {t('home:welcome.from')}{' '}
          <Text fontWeight="bold" color={colorModeValue('black', 'gray.50')}>
            {t('home:welcome.author')}
          </Text>
        </Text>
      </Box>
      <VStack spacing="lg">
        <ButtonIcon
          icon="github"
          iconFamily="Feather"
          onPress={() =>
            router.replace('https://github.com/BearStudio/start-ui-native')
          }
          iconColor={colorModeValue('gray.500', 'gray.300')}
          color={colorModeValue(
            getThemeColor('gray.500'),
            getThemeColor('gray.200')
          )}
          bg={colorModeValue('white', 'gray.700')}
          colorScheme="white"
          borderWidth={1}
          borderColor={colorModeValue('gray.200', 'gray.600')}
          full
        >
          {t('home:links.github')}
        </ButtonIcon>

        <ButtonIcon
          icon="alert-circle"
          iconFamily="Feather"
          onPress={() =>
            router.replace(
              'https://github.com/BearStudio/start-ui-native/issues/new'
            )
          }
          iconColor={colorModeValue('gray.500', 'gray.300')}
          color={colorModeValue(
            getThemeColor('gray.500'),
            getThemeColor('gray.200')
          )}
          bg={colorModeValue('white', 'gray.700')}
          colorScheme="white"
          borderWidth={1}
          borderColor={colorModeValue('gray.200', 'gray.600')}
          full
        >
          {t('home:links.openIssue')}
        </ButtonIcon>
      </VStack>
    </Stack>
  );
};

export default Home;
