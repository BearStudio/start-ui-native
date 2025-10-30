import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { FicusProvider } from 'react-native-ficus-ui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import 'react-native-reanimated';
import '@/lib/i18n';

import theme from '@/lib/ficus-ui/theme';

import { ThemeManager } from '@/components/theme-manager';
import { Sonner } from '@/components/ui/sonner';

import { DevTools } from '@/features/devtools/devtools';
import { SplashScreenManager } from '@/layout/splash-screen-manager';

export const queryClient = new QueryClient();

// SplashScreen hide management in on src/app/index.tsx
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <FicusProvider theme={theme}>
        <ThemeManager />
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <SplashScreenManager>
                <Slot />
              </SplashScreenManager>
              <Sonner />
              {process.env.NODE_ENV === 'development' && <DevTools />}
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </FicusProvider>
    </QueryClientProvider>
  );
}
