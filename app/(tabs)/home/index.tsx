import { useRouter } from 'expo-router';
import { Box, Text } from 'react-native-ficus-ui';

import { ButtonIcon } from '@/components/ButtonIcon';
import { useDarkMode } from '@/theme/useDarkMode';

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
        An opinionated UI starter with Expo, Ficus UI, Zodios & Formiz
      </Text>
      <Text
        fontSize="lg"
        fontWeight="bold"
        mt="md"
        color={colorModeValue('black', 'gray.50')}
      >
        - From the BearStudio Team
      </Text>
      <Box mt="xl">
        <ButtonIcon
          icon="github"
          iconFamily="Feather"
          colorScheme="brand"
          onPress={() =>
            router.replace('https://github.com/BearStudio/start-ui-native')
          }
          full
        >
          Github Repository
        </ButtonIcon>

        <ButtonIcon
          mt="md"
          icon="alert-circle"
          iconFamily="Feather"
          colorScheme="brand"
          onPress={() =>
            router.replace(
              'https://github.com/BearStudio/start-ui-native/issues/new'
            )
          }
          full
        >
          Open issue
        </ButtonIcon>
      </Box>
    </Box>
  );
};

export default Home;
