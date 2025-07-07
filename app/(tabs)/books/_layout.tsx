import { useTranslation } from 'react-i18next';

import { Stack } from '@/layout/Stack';

const RepositoriesStack = () => {
  const { t } = useTranslation();
  return (
    <Stack
      initialRouteName="index"
      screens={[
        { route: 'index', title: t('layouts:tabs.books') },
        {
          route: '[id]',
          options: {
            headerShown: false,
          },
        },
      ]}
    />
  );
};

export default RepositoriesStack;
