import { useTranslation } from 'react-i18next';

import { Stack } from '@/layout/Stack';
import { useColorSchemeListener } from '@/theme/hooks';

const AuthStack = () => {
  const { t } = useTranslation();

  useColorSchemeListener();

  return (
    <Stack
      initialRouteName="login"
      screens={[
        {
          route: 'login',
          title: t('layouts:auth.login'),
          options: {
            headerShown: false,
          },
        },
        {
          route: 'onboarding',
          title: t('layouts:auth.onboarding'),
          options: {
            headerShown: false,
          },
        },
        {
          route: 'verify',
          title: t('layouts:auth.verify'),
          options: {
            headerShown: false,
          },
        },
      ]}
    />
  );
};

export default AuthStack;
