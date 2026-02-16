import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Uniwind } from 'uniwind';

import { STORAGE_KEY_THEME } from '@/features/theme/constants';

/**
 * Sync the theme from the AsyncStorage to the Uniwind theme
 * @returns void
 */
export const useThemeSync = () => {
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_THEME).then((stored) => {
      const theme = (
        stored === 'light' || stored === 'dark' || stored === 'system'
          ? stored
          : 'system'
      ) as 'light' | 'dark' | 'system';
      Uniwind.setTheme(theme);
    });
  }, []);
};
