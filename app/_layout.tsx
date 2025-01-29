import { useCallback } from 'react';

import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { I18nextProvider } from 'react-i18next';
import { View } from 'react-native';
import { ThemeProvider } from 'react-native-ficus-ui';
import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from 'react-native-reanimated';

import { queryClient } from '@/api/query-client';
import i18n from '@/lib/i18n';
import useProtectedRoute from '@/modules/auth/auth.hook';
import theme from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  useProtectedRoute();

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme.light}>
        <I18nextProvider i18n={i18n}>
          <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <Slot />
          </View>
        </I18nextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
