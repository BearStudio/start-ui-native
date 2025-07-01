import { useTranslation } from 'react-i18next';

import { Stack } from '@/layout/Stack';

const AuthStack = () => {
  const { t } = useTranslation();
  return (
    <Stack
      initialRouteName="welcome"
      screens={[
        {
          route: 'welcome',
          title: t('layouts:auth.welcome'),
          options: { headerShown: false },
        },
        { route: 'login', title: t('layouts:auth.login') },
        { route: 'register', title: t('layouts:auth.register') },
        { route: 'onboarding', title: t('layouts:auth.onboarding') },
      ]}
    />
  );
};

export default AuthStack;
