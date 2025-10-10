import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

import { THEME_KEY } from '@/lib/ficus-ui/theme';

export const themeQueryKey = ['app-theme', THEME_KEY];

const zTheme = () => z.enum(['system', 'light', 'dark']).default('system');

export const useThemeMode = () => {
  return useQuery({
    queryKey: themeQueryKey,
    queryFn: () =>
      AsyncStorage.getItem(THEME_KEY).then((value) => zTheme().parse(value)),
  });
};
