import { useTranslation } from 'react-i18next';

import { HeaderAuth } from '@/layout/Header';
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
            header: () => <HeaderAuth />,
          },
        },
        {
          route: 'onboarding',
          title: t('layouts:auth.onboarding'),
          options: {
            header: () => <HeaderAuth />,
          },
        },
        {
          route: 'verify',
          title: t('layouts:auth.verify'),
          options: {
            header: () => <HeaderAuth />,
          },
        },
      ]}
    />
  );
};

export default AuthStack;
