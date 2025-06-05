import logoBlack from '@assets/logo-black.png';
import logoWhite from '@assets/logo-white.png';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { Button, Icon, IconButton, Stack, Text } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

const Onboarding = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { colorModeValue, toggleColorMode, colorMode } = useDarkMode();

  const handleOpenLogin = () => {
    router.push('/login');
  };

  return (
    <Stack p={20} spacing="2xl" h="100%" justifyContent="center">
      <Stack>
        <Image
          source={colorModeValue(logoBlack, logoWhite)}
          style={{
            resizeMode: 'contain',
            width: '100%',
            height: 80,
          }}
          accessibilityLabel={t('onboarding:logo')}
        />
        <Text
          fontSize="lg"
          textAlign="center"
          color={colorModeValue('gray.900', 'gray.50')}
        >
          {t('onboarding:description')}
        </Text>
      </Stack>
      <Stack spacing="md" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Text
            onPress={handleOpenLogin}
            color={colorModeValue('gray.900', 'gray.50')}
          >
            {t('onboarding:actions.alreadyHaveAnAccount')}
          </Text>
          <Button onPress={handleOpenLogin} colorScheme="transparent">
            <Text
              fontWeight="500"
              textDecorLine="underline"
              color={colorModeValue('gray.900', 'gray.50')}
            >
              {t('onboarding:actions.login')}
            </Text>
          </Button>
        </Stack>
        <IconButton
          onPress={toggleColorMode}
          icon={
            <Icon
              name={colorMode === 'light' ? 'moon' : 'sun'}
              fontSize="lg"
              fontFamily="Feather"
              color="gray.50"
            />
          }
          isRound
          mt="xl"
        />
      </Stack>
    </Stack>
  );
};

export default Onboarding;
