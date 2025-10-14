import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

import { STORAGE_KEY_THEME } from '@/lib/ficus-ui/theme';

export const themeQueryKey = ['app-theme', STORAGE_KEY_THEME];

const zTheme = () => z.enum(['system', 'light', 'dark']).default('system');

export const useThemeMode = () => {
  return useQuery({
    queryKey: themeQueryKey,
    queryFn: () =>
      AsyncStorage.getItem(STORAGE_KEY_THEME).then((value) =>
        zTheme().parse(value)
      ),
  });
};
