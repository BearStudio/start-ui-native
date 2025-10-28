import { Center, Stack, Text, WINDOW_WIDTH } from 'react-native-ficus-ui';

import { Image } from '@/components/ui/image';

import mascotImage from '@/features/app-onboarding/mascot.png';
import { ViewSafeContent } from '@/layout/view-safe-content';

export const AppOnboardingScreenWelcome = () => {
  return (
    <ViewSafeContent w={WINDOW_WIDTH}>
      <Center flex={1}>
        <Stack flex={0.5} w="100%" alignItems="center" gap={16}>
          <Image
            source={mascotImage}
            contentFit="contain"
            style={{ flex: 4, width: '80%' }}
          />
          <Stack flex={1} gap={16}>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Welcome on Start UI [native]
            </Text>
            <Center>
              <Text fontSize="lg" textAlign="center">
                Our opinionated expo project starter at BearStudio
              </Text>
            </Center>
          </Stack>
        </Stack>
      </Center>
    </ViewSafeContent>
  );
};

export const AppOnboardingScreenTwo = () => {
  return (
    <ViewSafeContent w={WINDOW_WIDTH}>
      <Center flex={1}>
        <Stack flex={0.5} w="100%" alignItems="center" gap={16}>
          <Image
            source={mascotImage}
            contentFit="contain"
            style={{ flex: 1, width: '80%' }}
          />
          <Stack flex={1} gap={24} w="full">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              With Start UI [native]...
            </Text>
            <Center>
              <Text
                bg="neutral.100"
                fontSize="xl"
                fontWeight="medium"
                px={2}
                py={1}
                borderRadius="md"
              >
                Easy connection with REST API
              </Text>
            </Center>
          </Stack>
        </Stack>
      </Center>
    </ViewSafeContent>
  );
};
