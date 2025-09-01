import { useCallback, useEffect } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import { Appearance, View } from 'react-native';

import useSessionStore from '@/modules/auth/stores/auth.store';
import { useAppColorMode } from '@/theme/hooks';

SplashScreen.preventAutoHideAsync();

const Index = () => {
  const { setDarkMode, setLightMode } = useAppColorMode();
  const themeMode = useSessionStore((state) => state.theme);

  const loadTheme = useCallback(() => {
    if (themeMode === 'dark') {
      setDarkMode();
    } else if (themeMode === 'light') {
      setLightMode();
    } else if (themeMode === 'system') {
      // Default to system theme
      const systemColorScheme = Appearance.getColorScheme();
      if (systemColorScheme === 'dark') {
        setDarkMode();
      }
      if (systemColorScheme === 'light') {
        setLightMode();
      }
    }
  }, [themeMode, setDarkMode, setLightMode]);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return <View />;
};

export default Index;
