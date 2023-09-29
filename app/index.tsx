import { StatusBar, View } from 'react-native';

import '@/config/axios';
import { useCallback, useContext, useEffect } from 'react';
import { ThemeContext } from 'react-native-ficus-ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme, { THEME_KEY } from '@/theme';

const Index = () => {
  const { setTheme } = useContext(ThemeContext);

  const loadTheme = useCallback(async () => {
    const themeValue = await AsyncStorage.getItem(THEME_KEY);
    if (themeValue === 'dark') {
      setTheme(theme.dark);
      StatusBar.setBarStyle('light-content');
    } else {
      setTheme(theme.light);
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return <View></View>;
};
export default Index;
