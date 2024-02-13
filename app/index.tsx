import { useCallback, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from 'expo-router';
import { StatusBar, View } from 'react-native';
import { ThemeContext } from 'react-native-ficus-ui';

import theme, { THEME_KEY } from '@/theme';

SplashScreen.preventAutoHideAsync();

const Index = () => {
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

  return <View />;
};

export default Index;
