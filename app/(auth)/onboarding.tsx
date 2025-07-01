import logoBlack from '@assets/logo-black.png';
import logoWhite from '@assets/logo-white.png';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import {
  Button,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { useAppColorMode } from '@/theme/hooks';

const Onboarding = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const { updateColorMode } = useAppColorMode();

  const handleOpenLogin = () => {
    router.push('/login');
  };

  return (
    <Stack p={20} spacing="2xl" h="100%" justifyContent="center">
      <Stack>
        <Image
          source={useColorModeValue(logoBlack, logoWhite)}
          style={{
            resizeMode: 'contain',
            width: '100%',
            height: 80,
          }}
          accessibilityLabel={t('onboarding:logo')}
        />
        <Text fontSize="lg" textAlign="center">
          {t('onboarding:description')}
        </Text>
      </Stack>
      <Stack spacing="md" alignItems="center">
        <Button
          onPress={() => router.push('/register')}
          colorScheme="brand"
          full
        >
          {t('onboarding:actions.register')}
        </Button>
        <Text onPress={handleOpenLogin} mt="lg">
          {t('onboarding:actions.alreadyHaveAnAccount')}
        </Text>
        <Button onPress={handleOpenLogin} alignSelf="center" variant="link">
          <Text fontWeight="500" textDecorLine="underline">
            {t('onboarding:actions.login')}
          </Text>
        </Button>
        <IconButton
          onPress={updateColorMode}
          icon={
            <Icon
              name={colorMode === 'light' ? 'moon' : 'sun'}
              color="gray.50"
              iconSet="Feather"
            />
          }
          isRound
          alignSelf="center"
          mt="xl"
        />
      </Stack>
    </Stack>
  );
};

export default Onboarding;
