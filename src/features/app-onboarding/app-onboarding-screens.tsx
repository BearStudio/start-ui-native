import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { IconCheck } from '@/components/icons/generated';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';

import { deviceScreen } from '@/constants/device';

const OnboardingScreenContainer = (props: PropsWithChildren) => (
  <View
    className="w-full p-8 items-center justify-center"
    style={{ width: deviceScreen.width }}
  >
    <View
      className="h-1/2 w-full max-w-[400px]"
      style={{ height: deviceScreen.height / 2 }}
    >
      {props.children}
    </View>
  </View>
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
      <View className="gap-4">
        <View>
          <Text className="text-4xl font-bold text-white">
            {t('appOnboarding:features.titleOne')}
          </Text>
          <Text className="text-4xl font-bold text-white">
            {t('appOnboarding:features.titleTwo')}
          </Text>
        </View>
        <View className="gap-2">
          <View className="flex flex-row flex-wrap gap-2">
            {features.map((feature) => (
              <Badge
                key={feature}
                className="flex-row items-center gap-1 bg-white text-neutral-900"
              >
                <IconCheck className="text-neutral-900 w-8 h-8" />
                <Text className="text-neutral-900">
                  {t(`appOnboarding:features.${feature}`)}
                </Text>
              </Badge>
            ))}
          </View>
          <Text className="font-medium text-white opacity-80">
            {t('appOnboarding:features.more')}
          </Text>
        </View>
      </View>
    </OnboardingScreenContainer>
  );
};
