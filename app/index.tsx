import { useCallback, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, View } from 'react-native';
import { ThemeContext } from 'react-native-ficus-ui';

import theme, { THEME_KEY } from '@/theme';
import { useDarkMode } from '@/theme/useDarkMode';

SplashScreen.preventAutoHideAsync();

const Index = () => {
  const { setTheme } = useContext(ThemeContext);
  const { getThemeColor } = useDarkMode();

  const loadTheme = useCallback(async () => {
    const themeValue = await AsyncStorage.getItem(THEME_KEY);
    if (themeValue === 'dark') {
      setTheme(theme.dark);
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(getThemeColor('gray.800') || '');
    } else {
      setTheme(theme.light);
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(getThemeColor('gray.100') || '');
    }
  }, []);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return <View />;
};

export default Index;
