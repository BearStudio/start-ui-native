import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';

import { IconCheck } from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { Badge } from '@/components/ui/badge';
import { Center, HStack, Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const OnboardingScreenContainer = (props: PropsWithChildren) => (
  <Center className="w-full p-8" style={{ width: WINDOW_WIDTH }}>
    <Stack
      className="h-1/2 w-full max-w-[400px]"
      style={{ height: WINDOW_HEIGHT / 2 }}
    >
      {props.children}
    </Stack>
  </Center>
);

export const AppOnboardingScreenWelcome = () => {
  const { t } = useTranslation(['appOnboarding']);

  return (
    <OnboardingScreenContainer>
      <Text className="text-xl text-white">
        {t('appOnboarding:welcome.title')}
      </Text>
      <Text className="text-6xl font-bold text-white">Start UI</Text>
      <Text className="text-6xl font-bold text-white">Native</Text>
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
      <Stack spacing={16}>
        <Stack>
          <Text className="text-4xl font-bold text-white">
            {t('appOnboarding:features.titleOne')}
          </Text>
          <Text className="text-4xl font-bold text-white">
            {t('appOnboarding:features.titleTwo')}
          </Text>
        </Stack>
        <Stack spacing={8}>
          <HStack spacing={8} className="flex-wrap">
            {features.map((feature) => (
              <Badge
                key={feature}
                className="flex-row items-center gap-1 bg-white text-neutral-900"
              >
                <Icon icon={IconCheck} size={16} color="#171717" />
                <Text className="text-neutral-900">
                  {t(`appOnboarding:features.${feature}`)}
                </Text>
              </Badge>
            ))}
          </HStack>
          <Text className="font-medium text-white opacity-80">
            {t('appOnboarding:features.more')}
          </Text>
        </Stack>
      </Stack>
    </OnboardingScreenContainer>
  );
};
