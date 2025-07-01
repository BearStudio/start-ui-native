import { useCallback, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import {
  Appearance,
  Platform,
  StatusBar,
  View,
  useColorScheme,
} from 'react-native';
import { Dict, useColorMode, useTheme } from 'react-native-ficus-ui';

import { THEME_KEY } from '@/theme';

SplashScreen.preventAutoHideAsync();

const Index = () => {
  const { theme } = useTheme();
  const { setColorMode } = useColorMode();
  const colorScheme = useColorScheme();

  const setDarkMode = useCallback(async () => {
    setColorMode('dark');
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor((theme?.colors?.gray as Dict)?.[800]);
    }
  }, [setColorMode, theme?.colors?.gray]);

  const setLightMode = useCallback(async () => {
    setColorMode('light');
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor((theme?.colors?.gray as Dict)?.[100]);
    }
  }, [setColorMode, theme?.colors?.gray]);

  const loadTheme = useCallback(async () => {
    console.log({ colorScheme });
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

  return <View />;
};

export default Index;
