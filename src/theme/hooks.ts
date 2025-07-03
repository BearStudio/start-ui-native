import { useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, StatusBar } from 'react-native';
import { Dict, useColorMode, useTheme } from 'react-native-ficus-ui';

import { THEME_KEY } from './config';

export const useAppColorMode = () => {
  const { theme } = useTheme();
  const { colorMode, setColorMode, toggleColorMode } = useColorMode();

  const updateColorMode = async () => {
    await AsyncStorage.setItem(
      THEME_KEY,
      colorMode === 'light' ? 'dark' : 'light'
    );

    StatusBar.setBarStyle(`${colorMode}-content`);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(
        colorMode === 'light'
          ? (theme?.colors?.gray as Dict)?.[800]
          : (theme?.colors?.gray as Dict)?.[100]
      );
    }

    toggleColorMode();
  };

  const setDarkMode = useCallback(async () => {
    await AsyncStorage.setItem(THEME_KEY, 'dark');
    setColorMode('dark');
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor((theme?.colors?.gray as Dict)?.[800]);
    }
  }, [setColorMode, theme?.colors?.gray]);

  const setLightMode = useCallback(async () => {
    await AsyncStorage.setItem(THEME_KEY, 'light');
    setColorMode('light');
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor((theme?.colors?.gray as Dict)?.[100]);
    }
  }, [setColorMode, theme?.colors?.gray]);

  return { updateColorMode, setDarkMode, setLightMode };
};
