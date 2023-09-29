import { useDarkMode } from '@/theme/useDarkMode';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { Button, Icon, Stack, Text } from 'react-native-ficus-ui';

const Onboarding = () => {
  const router = useRouter();
  const { colorModeValue, toggleColorMode, colorMode } = useDarkMode();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logoWhite = require('../../assets/logo-white.png');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logoBlack = require('../../assets/logo-black.png');

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
          accessibilityLabel="Start UI Native Logo"
        />
        <Text
          fontSize="lg"
          textAlign="center"
          color={colorModeValue('gray.900', 'gray.50')}
        >
          An opinionated UI starter with Expo, Ficus UI, React Query & Formiz
        </Text>
      </Stack>
      <Stack spacing="md" alignItems="center">
        <Button onPress={() => router.push('/register')} colorScheme="blue">
          Sign up with mail
        </Button>
        <Stack direction="row" alignItems="center">
          <Text
            onPress={handleOpenLogin}
            fontSize="xs"
            color={colorModeValue('gray.900', 'gray.50')}
          >
            Already an account?
          </Text>
          <Button
            onPress={handleOpenLogin}
            fontSize="xs"
            colorScheme="transparent"
          >
            <Text
              fontWeight="500"
              textDecorLine="underline"
              color={colorModeValue('gray.900', 'gray.50')}
            >
              Sign in
            </Text>
          </Button>
        </Stack>
        <Button onPress={toggleColorMode} mt="xl">
          <Icon
            name={colorMode === 'light' ? 'moon' : 'sun'}
            fontSize="lg"
            fontFamily="Feather"
            color="gray.50"
          />
        </Button>
      </Stack>
    </Stack>
  );
};

export default Onboarding;
