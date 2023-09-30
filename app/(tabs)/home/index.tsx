import { useDarkMode } from '@/theme/useDarkMode';
import { useRouter } from 'expo-router';
import { Button, Box, Text, Icon } from 'react-native-ficus-ui';

const Home = () => {
  const router = useRouter();
  const { colorModeValue } = useDarkMode();
  return (
    <Box p={20} h="100%">
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color={colorModeValue('black', 'gray.50')}
      >
        Welcome to 🚀 Start UI [native]
      </Text>
      <Text fontSize="lg" mt="md" color={colorModeValue('black', 'gray.50')}>
        An opinionated UI starter with Expo, Ficus UI, React Query & Formiz
      </Text>
      <Text
        fontSize="lg"
        fontWeight="bold"
        mt="md"
        color={colorModeValue('black', 'gray.50')}
      >
        - From the BearStudio Team
      </Text>
      <Box mt={20}>
        <Button
          full
          prefix={
            <Icon
              name="github"
              fontSize="lg"
              fontFamily="Feather"
              color="gray.50"
            />
          }
          colorScheme="brand"
          onPress={() =>
            router.replace('https://github.com/BearStudio/start-ui-native')
          }
        >
          <Text ml={10} fontSize="lg" color="gray.50">
            Github Repository
          </Text>
        </Button>
        <Button
          mt={10}
          full
          prefix={
            <Icon
              name="alert-circle"
              fontSize="lg"
              fontFamily="Feather"
              color="gray.50"
            />
          }
          colorScheme="brand"
          onPress={() =>
            router.replace(
              'https://github.com/BearStudio/start-ui-native/issues/new'
            )
          }
        >
          <Text ml={10} fontSize="lg" color="gray.50">
            Open issue
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
