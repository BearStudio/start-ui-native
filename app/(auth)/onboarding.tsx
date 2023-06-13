import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { Button, Div, Text } from 'react-native-magnus';

const Onboarding = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logoImage = require('../../assets/logo.png');

  const handleOpenRegister = () => {
    router.push('/register');
  };

  const handleOpenLogin = () => {
    router.push('/login');
  };

  return (
    <Div bg="body" p={20} h="100%" justifyContent="center">
      <Div>
        <Image
          source={logoImage}
          style={{
            resizeMode: 'contain',
            width: '100%',
            height: 100,
          }}
          accessibilityLabel="Start UI Native Logo"
        />
        <Text fontSize="lg" textAlign="center">
          An opinionated UI starter with Expo, Magnus UI, React Query & Formiz
        </Text>
        <Button mt="xl" bg="primary500" block onPress={handleOpenRegister}>
          {'Sign up with mail'}
        </Button>
        <Div flexDir="row" justifyContent="center" p={10}>
          <Button
            bg="transparent"
            color="pText"
            fontSize={16}
            onPress={handleOpenLogin}
            px={0}
          >
            Already an account?
          </Button>
          <Button
            bg="transparent"
            color="primary600"
            fontSize={16}
            onPress={handleOpenLogin}
            px={0}
            ml={20}
          >
            Sign in
          </Button>
        </Div>
      </Div>
    </Div>
  );
};

export default Onboarding;
