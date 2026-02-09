import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Uniwind } from 'uniwind';

import { useThemeMode } from '@/hooks/use-theme-mode';

export const ThemeManager = () => {
  const colorScheme = useColorScheme();

  const setUniwindTheme = Uniwind.setTheme;

  const themeQuery = useThemeMode();
  const currentTheme = themeQuery.data ?? 'system';

  useEffect(() => {
    if (colorScheme) {
      setUniwindTheme(currentTheme === 'system' ? colorScheme : currentTheme);
    }
  }, [currentTheme, colorScheme, setUniwindTheme]);

  return (
    <StatusBar style={currentTheme === 'system' ? 'auto' : currentTheme} />
  );
};
