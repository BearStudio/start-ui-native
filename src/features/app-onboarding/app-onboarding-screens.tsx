import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Badge,
  Box,
  Center,
  HStack,
  Stack,
  Text,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'react-native-ficus-ui';

import { IconCheck } from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { Image } from '@/components/ui/image';

// @ts-expect-error TODO fix the import error
import mascotImage from '@/features/app-onboarding/mascot.png';

const containerHeight = WINDOW_HEIGHT / 2;

const OnboardingScreenContainer = (props: PropsWithChildren) => (
  <Center w={WINDOW_WIDTH} p={32}>
    <Stack maxW={400} w="100%" h={WINDOW_HEIGHT / 2}>
      {props.children}
    </Stack>
  </Center>
);

export const AppOnboardingScreenWelcome = () => {
  const { t } = useTranslation(['appOnboarding']);

  return (
    <OnboardingScreenContainer>
      <Text fontSize="xl" color="white">
        {t('appOnboarding:welcome.title')}
      </Text>
      <Text fontSize="6xl" fontWeight="bold" color="white">
        Start UI
      </Text>
      <Text fontSize="6xl" fontWeight="bold" color="white">
        Native
      </Text>
      <Box position="absolute" right={-32} bottom={containerHeight / 4}>
        <Image
          source={mascotImage}
          contentFit="contain"
          style={{
            height: containerHeight / 1.5,
            aspectRatio: 2 / 3,
          }}
        />
      </Box>
    </OnboardingScreenContainer>
  );
};

export const AppOnboardingScreenFeatures = () => {
  const { t } = useTranslation(['appOnboarding']);

  const features = [
    'authentication',
    'account',
    'darkMode',
    'translations',
    'storybook',
    'devtools',
  ];
  return (
    <OnboardingScreenContainer>
      <Stack gap={16}>
        <Stack>
          <Text fontSize="4xl" fontWeight="bold" color="white">
            {t('appOnboarding:features.titleOne')}
          </Text>
          <Text fontSize="4xl" fontWeight="bold" color="white">
            {t('appOnboarding:features.titleTwo')}
          </Text>
        </Stack>
        <Stack gap={8}>
          <HStack flexWrap="wrap" gap={8}>
            {features.map((feature) => (
              <Badge key={feature} variant="@secondary">
                <Box pr={4}>
                  <Icon top={2} icon={IconCheck} color="brand.900" size={16} />
                </Box>

                {t(`appOnboarding:features.${feature}`)}
              </Badge>
            ))}
          </HStack>
          <Text fontWeight="medium" opacity={0.8} color="white">
            {t('appOnboarding:features.more')}
          </Text>
        </Stack>
      </Stack>
    </OnboardingScreenContainer>
  );
};
