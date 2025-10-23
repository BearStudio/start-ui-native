import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import 'react-native-reanimated';
import '@/lib/i18n';

import '@/styles/app.css';

import { ThemeProvider } from '@/lib/tailwind/theme-context';

import { ThemeManager } from '@/components/theme-manager';
import { Sonner } from '@/components/ui/sonner';

import { SplashScreenManager } from '@/layout/splash-screen-manager';

const queryClient = new QueryClient();

// SplashScreen hide management in on src/app/index.tsx
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <SplashScreenManager>
                <Slot />
              </SplashScreenManager>
              <Sonner />
              <ThemeManager />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
