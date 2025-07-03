import { useCallback, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { View, useColorScheme } from 'react-native';

import { THEME_KEY } from '@/theme';
import { useAppColorMode } from '@/theme/hooks';

SplashScreen.preventAutoHideAsync();

const Index = () => {
  const { setDarkMode, setLightMode } = useAppColorMode();
  const colorScheme = useColorScheme();

  const loadTheme = useCallback(async () => {
    if (colorScheme === 'dark') {
      setDarkMode();
    } else {
      const themeValue = await AsyncStorage.getItem(THEME_KEY);
      if (!!themeValue) {
        if (themeValue === 'dark') {
          setDarkMode();
        } else {
          setLightMode();
        }
      }
    }
  }, [setDarkMode, setLightMode, colorScheme]);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return <View />;
};

export default Index;
