import { useRouter } from 'expo-router';
import { Box, Stack, Text, VStack } from 'react-native-ficus-ui';

import { ButtonIcon } from '@/components/ButtonIcon';
import { useDarkMode } from '@/theme/useDarkMode';

const Home = () => {
  const router = useRouter();
  const { colorModeValue, getThemeColor } = useDarkMode();
  return (
    <Stack p={20} h="100%" spacing={12}>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color={colorModeValue('black', 'gray.50')}
      >
        Welcome to 🚀 Start UI [native]
      </Text>
      <Box>
        <Text fontSize="lg" color={colorModeValue('black', 'gray.50')}>
          An opinionated UI starter with Expo, Ficus UI, Zodios & Formiz
        </Text>
        <Text fontSize="lg" mt="md" color={colorModeValue('black', 'gray.50')}>
          - From the{' '}
          <Text fontWeight="bold" color={colorModeValue('black', 'gray.50')}>
            BearStudio Team
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
          Github Repository
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
          Open issue
        </ButtonIcon>
      </VStack>
    </Stack>
  );
};

export default Home;
