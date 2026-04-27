import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { IconCheck } from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';

import { deviceScreen } from '@/constants/device';

const OnboardingScreenContainer = (props: PropsWithChildren) => (
  <View
    className="w-full items-center justify-center p-8"
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
      <Text className="text-primary text-xl">
        {t('appOnboarding:welcome.title')}
      </Text>
      <Text className="text-primary text-6xl font-bold">Start UI</Text>
      <Text className="text-primary text-6xl font-bold">Native</Text>
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
          <Text className="text-primary text-4xl font-bold">
            {t('appOnboarding:features.titleOne')}
          </Text>
          <Text className="text-primary text-4xl font-bold">
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
                <Icon icon={IconCheck} className="text-neutral-900" />
                <Text className="text-neutral-900">
                  {t(`appOnboarding:features.${feature}`)}
                </Text>
              </Badge>
            ))}
          </View>
          <Text className="text-accent-foreground">
            {t('appOnboarding:features.more')}
          </Text>
        </View>
      </View>
    </OnboardingScreenContainer>
  );
};
