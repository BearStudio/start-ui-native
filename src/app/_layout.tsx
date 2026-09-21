import { QueryClientProvider } from '@tanstack/react-query';
import { Slot, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import 'react-native-reanimated';
import '@/lib/i18n';

import '../app.css';

import { queryClient } from '@/lib/query-client';

import { ThemedStatusBar } from '@/components/themed-status-bar';
import { Sonner } from '@/components/ui/sonner';

import { env } from '@/env';
import { DevTools } from '@/features/devtools/devtools';
import { useThemeSync } from '@/features/theme/use-theme-sync';
import { useThemedStyle } from '@/features/theme/use-themed-style';
import { SplashScreenManager } from '@/layout/splash-screen-manager';

// SplashScreen hide management in splash-screen-manager.tsx
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useThemeSync();
  const themedStyle = useThemedStyle();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets);
        }}
      >
        <ThemeProvider value={themedStyle.navigationTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View className="flex-1 bg-background">
              <ThemedStatusBar />
              <SplashScreenManager>
                <Slot />
              </SplashScreenManager>
              <Sonner />
              {env.NODE_ENV === 'development' && (
                <DevTools queryClient={queryClient} />
              )}
            </View>
          </GestureHandlerRootView>
        </ThemeProvider>
      </SafeAreaListener>
    </QueryClientProvider>
  );
}
