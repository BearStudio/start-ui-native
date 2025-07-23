import { useTranslation } from 'react-i18next';

import { Stack } from '@/layout/Stack';

const BooksStack = () => {
  const { t } = useTranslation();
  return (
    <Stack
      initialRouteName="index"
      screens={[
        {
          route: 'index',
          title: t('layouts:tabs.books'),
          options: {
            isTabBarScreen: true,
          },
        },
      ]}
    />
  );
};

export default BooksStack;
