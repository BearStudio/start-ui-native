import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Div, Text } from 'react-native-magnus';

const Home = () => {
  const router = useRouter();
  return (
    <Div bg="body" p={20} h="100%">
      <Text color="pText" fontSize="2xl" fontWeight="bold">
        Welcome to 🚀 Start UI [native]
      </Text>
      <Text color="pText" fontSize="lg" mt="md">
        An opinionated UI starter with Expo, Magnus UI, React Query & Formiz
      </Text>
      <Text color="pText" fontSize="lg" fontWeight="bold" mt="md">
        - From the BearStudio Team
      </Text>
      <Div mt={20}>
        <Button
          block
          prefix={<Feather name="github" size={24} color="white" />}
          bg="primary500"
          onPress={() =>
            router.replace('https://github.com/BearStudio/start-ui-native')
          }
        >
          <Text ml={10} fontSize="lg" color="white">
            Github Repository
          </Text>
        </Button>
        <Button
          mt={10}
          block
          prefix={<Feather name="alert-circle" size={24} color="white" />}
          bg="primary500"
          onPress={() =>
            router.replace(
              'https://github.com/BearStudio/start-ui-native/issues/new'
            )
          }
        >
          <Text ml={10} fontSize="lg" color="white">
            Open issue
          </Text>
        </Button>
      </Div>
    </Div>
  );
};

export default Home;
