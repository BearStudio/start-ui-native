import { useCallback, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, Platform, StatusBar } from 'react-native';
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
          ? (theme?.colors?.neutral as Dict)?.[800]
          : (theme?.colors?.neutral as Dict)?.[100]
      );
    }

    toggleColorMode();
  };

  const setDarkMode = useCallback(async () => {
    await AsyncStorage.setItem(THEME_KEY, 'dark');
    setColorMode('dark');
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor((theme?.colors?.neutral as Dict)?.[800]);
    }
  }, [setColorMode, theme?.colors?.neutral]);

  const setLightMode = useCallback(async () => {
    await AsyncStorage.setItem(THEME_KEY, 'light');
    setColorMode('light');
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor((theme?.colors?.neutral as Dict)?.[100]);
    }
  }, [setColorMode, theme?.colors?.neutral]);

  return { updateColorMode, setDarkMode, setLightMode };
};

export const useColorSchemeListener = () => {
  const { setDarkMode, setLightMode } = useAppColorMode();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({ colorScheme: newColorScheme }) => {
        if (newColorScheme === 'dark') {
          setDarkMode();
        } else {
          setLightMode();
        }
      }
    );

    return () => subscription.remove();
  }, [setDarkMode, setLightMode]);
};
