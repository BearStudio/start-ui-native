import { useCallback } from 'react';

import { StatusBar } from 'react-native';
import { useTheme } from 'react-native-ficus-ui';

import useAuthStore from '@/modules/auth/auth.store';
import ficusThemes from '@/theme';

export const useDarkMode = () => {
  const { theme, setTheme } = useTheme();
  const setAppMode = useAuthStore((state) => state.setAppMode);

  const colorModeValue = useCallback(
    <Value = unknown>(lightValue: Value, darkValue: Value) =>
      theme.name === 'dark' ? darkValue : lightValue,
    [theme.name]
  );

  const setColorMode = async (colorMode: 'dark' | 'light') => {
    setTheme(ficusThemes[colorMode]);
    StatusBar.setBarStyle(`${colorMode}-content`);
    setAppMode(colorMode);
  };

  const toggleColorMode = () => {
    const newTheme = theme.name === 'dark' ? 'light' : 'dark';
    StatusBar.setBarStyle(`${theme.name as 'dark' | 'light'}-content`);
    setTheme(ficusThemes[newTheme]);
    setAppMode(newTheme);
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
