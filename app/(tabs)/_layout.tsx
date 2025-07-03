import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Appearance } from 'react-native';

import { Tabs } from '@/layout/Tabs';
import { useAppColorMode } from '@/theme/hooks';

const HomeTabs = () => {
  const { t } = useTranslation();
  const { setDarkMode, setLightMode } = useAppColorMode();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({ colorScheme: newColorScheme }) => {
        console.log('Color scheme changed to', newColorScheme);
        if (newColorScheme === 'dark') {
          setDarkMode();
        } else {
          setLightMode();
        }
      }
    );

    return () => subscription.remove();
  }, [setDarkMode, setLightMode]);

  return (
    <Tabs
      initialRouteName="home"
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
