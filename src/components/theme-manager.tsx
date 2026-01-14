import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { useColorMode } from 'react-native-ficus-ui';

import { useThemeMode } from '@/hooks/use-theme-mode';

export const ThemeManager = () => {
  const colorScheme = useColorScheme();
  const ficusColorMode = useColorMode();

  const setFicusColorMode = ficusColorMode.setColorMode;

  const themeQuery = useThemeMode();
  const currentTheme = themeQuery.data ?? 'system';

  const getAutoTheme = (colorScheme: ColorSchemeName) =>
    colorScheme === 'unspecified' ? 'light' : colorScheme;

  useEffect(() => {
    if (colorScheme) {
      setFicusColorMode(
        currentTheme === 'system' ? getAutoTheme(colorScheme) : currentTheme
      );
    }
  }, [currentTheme, colorScheme, setFicusColorMode]);

  return (
    <StatusBar style={currentTheme === 'system' ? 'auto' : currentTheme} />
  );
};
