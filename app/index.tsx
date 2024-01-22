import { useContext, useEffect } from 'react';

import { SplashScreen } from 'expo-router';
import { StatusBar, View } from 'react-native';
import { ThemeContext } from 'react-native-ficus-ui';

import useAuthStore from '@/modules/auth/auth.store';
import theme from '@/theme';

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync();

const Index = () => {
  const { setTheme } = useContext(ThemeContext);
  useEffect(() => {
    const appMode = useAuthStore.getState().appMode;
    if (appMode === 'dark') {
      setTheme(theme.dark);
      StatusBar.setBarStyle('light-content');
    } else {
      setTheme(theme.light);
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  return <View></View>;
};
export default Index;
