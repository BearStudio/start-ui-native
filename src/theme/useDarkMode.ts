import { useCallback } from 'react';
import { useTheme } from 'react-native-ficus-ui';
import ficusThemes from '@/theme';

export const useDarkMode = () => {
  const { theme, setTheme } = useTheme();

  const colorModeValue = useCallback(
    <Value = unknown>(lightValue: Value, darkValue: Value) =>
      theme.name === 'dark' ? darkValue : lightValue,
    [theme.name]
  );

  const setColorMode = (colorMode: 'dark' | 'light') =>
    setTheme(ficusThemes[colorMode]);

  const toggleColorMode = () =>
    setTheme(ficusThemes[theme.name === 'dark' ? 'light' : 'dark']);

  const getThemeColor = (color: `${string}.${ColorShade}`) => {
    const [mainColor, shade] = color.split('.');
    return ficusThemes['colors']?.[mainColor]?.[shade as ColorShade];
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
