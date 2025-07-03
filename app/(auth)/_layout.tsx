import { useTranslation } from 'react-i18next';

import { Stack } from '@/layout/Stack';
import { useColorSchemeListener } from '@/theme/hooks';

const AuthStack = () => {
  const { t } = useTranslation();

  useColorSchemeListener();

  return (
    <Stack
      initialRouteName="onboarding"
      screens={[
        {
          route: 'onboarding',
          title: t('layouts:auth.onboarding'),
          options: { headerShown: false },
        },
        { route: 'login', title: t('layouts:auth.login') },
        { route: 'register', title: t('layouts:auth.register') },
      ]}
    />
  );
};

export default AuthStack;
