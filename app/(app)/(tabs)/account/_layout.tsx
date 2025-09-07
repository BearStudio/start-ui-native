import { useTranslation } from 'react-i18next';

import { Stack } from '@/layout/Stack';

const AccountStack = () => {
  const { t } = useTranslation();
  return (
    <Stack
      screens={[
        {
          route: 'index',
          title: t('layouts:tabs.account'),
          options: {
            isTabBarScreen: true,
          },
        },
      ]}
    />
  );
};

export default AccountStack;
