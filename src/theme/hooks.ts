import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, StatusBar } from 'react-native';
import { Dict, useColorMode, useTheme } from 'react-native-ficus-ui';

import { THEME_KEY } from './config';

export const useAppColorMode = () => {
  const { theme } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  const updateColorMode = async () => {
    await AsyncStorage.setItem(
      THEME_KEY,
      colorMode === 'light' ? 'dark' : 'light'
    );

    StatusBar.setBarStyle(`${colorMode}-content`);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(
        colorMode === 'light'
          ? (theme?.colors?.gray as Dict)?.[800]
          : (theme?.colors?.gray as Dict)?.[100]
      );
    }

    toggleColorMode();
  };

  return { updateColorMode };
};
