import { useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import { useTheme } from 'react-native-ficus-ui';

import ficusThemes, { THEME_KEY } from '@/theme';

export const useDarkMode = () => {
  const { theme, setTheme } = useTheme();

  const colorModeValue = useCallback(
    <Value = unknown>(lightValue: Value, darkValue: Value) =>
      theme.name === 'dark' ? darkValue : lightValue,
    [theme.name]
  );

  const setColorMode = async (colorMode: 'dark' | 'light') => {
    setTheme(ficusThemes[colorMode]);
    StatusBar.setBarStyle(`${colorMode}-content`);
    await AsyncStorage.setItem(THEME_KEY, colorMode);
  };

  const toggleColorMode = async () => {
    const newTheme = theme.name === 'dark' ? 'light' : 'dark';
    StatusBar.setBarStyle(`${theme.name as 'dark' | 'light'}-content`);
    setTheme(ficusThemes[newTheme]);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  const getThemeColor = (color: `${string}.${ColorShade}`) => {
    const [mainColor, shade] = color.split('.');
    return ficusThemes?.[theme.name as 'dark' | 'light']?.['colors']?.[
      mainColor
    ]?.[shade as ColorShade];
  };

  return {
    colorMode: theme.name,
    setColorMode,
    toggleColorMode,
    colorModeValue,
    getThemeColor,
  };
};

type ColorShade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
