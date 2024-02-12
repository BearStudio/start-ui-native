import { useCallback, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from 'expo-router';
import { StatusBar, View } from 'react-native';
import { ThemeContext } from 'react-native-ficus-ui';

import theme, { THEME_KEY } from '@/theme';

// Prevent native splash screen from autohiding before App component declaration if Storybook is not enabled
if (process.env.STORYBOOK_ENABLED !== 'true') {
  SplashScreen.preventAutoHideAsync();
}

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

  return <View />;
};

let AppEntryPoint = Index;
if (process.env.STORYBOOK_ENABLED === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const StorybookUI = require('../.storybook').default;
  AppEntryPoint = () => {
    return (
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    );
  };
}

export default AppEntryPoint;
