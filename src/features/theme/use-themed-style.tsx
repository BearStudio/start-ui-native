import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';
import { useUniwind } from 'uniwind';

const neutral950 = '#0a0a0a';

export const useThemedStyle = () => {
  const { theme } = useUniwind();
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? neutral950 : 'white';
  const color = isDark ? 'white' : neutral950;
  const baseTheme = isDark ? DarkTheme : DefaultTheme;

  return {
    backgroundColor,
    color,
    navigationTheme: {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: backgroundColor,
        card: backgroundColor,
        text: color,
      },
    } satisfies Theme,
  };
};
