import { useTranslation } from 'react-i18next';

import { Stack } from '@/layout/Stack';

const HomeStack = () => {
  const { t } = useTranslation();
  return (
    <Stack
      screens={[
        {
          route: 'index',
          title: t('layouts:tabs.home'),
          options: {
            headerShown: false,
          },
        },
      ]}
    />
  );
};

export default HomeStack;
