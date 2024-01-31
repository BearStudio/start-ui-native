import { useCallback, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { StatusBar } from 'react-native';
import { ThemeContext } from 'react-native-ficus-ui';

import useAuthStore from '@/modules/auth/auth.store';
import theme, { THEME_KEY } from '@/theme';

const Index = () => {
  const isAuthenticated = useAuthStore((state) => !!state.token);
  const { setTheme } = useContext(ThemeContext);

  const loadTheme = useCallback(async () => {
    const themeValue = await AsyncStorage.getItem(THEME_KEY);
    if (themeValue === 'dark') {
      setTheme(theme.dark);
      StatusBar.setBarStyle('light-content');
    } else {
      setTheme(theme.light);
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  if (!isAuthenticated) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)/home" />;
};
export default Index;
