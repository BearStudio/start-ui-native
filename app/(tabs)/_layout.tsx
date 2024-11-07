import { useTranslation } from 'react-i18next';

import { Tabs } from '@/layout/Tabs';

const HomeTabs = () => {
  const { t } = useTranslation();
  return (
    <Tabs
      screens={[
        {
          route: 'home',
          title: t('layouts:tabs.home'),
          icon: 'home',
          options: { headerShown: false },
        },
        {
          route: 'repositories',
          title: t('layouts:tabs.repositories'),
          icon: 'folder',
          options: { headerShown: false },
        },
        {
          route: 'account',
          title: t('layouts:tabs.account'),
          icon: 'user',
          options: { headerShown: false },
        },
      ]}
    />
  );
};

export default HomeTabs;
