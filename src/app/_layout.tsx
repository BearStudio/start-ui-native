import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import 'react-native-reanimated';
import '@/lib/i18n';

import '@/global.css';

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
      <ThemeManager />
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets);
        }}
      >
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <SplashScreenManager>
              <Slot />
            </SplashScreenManager>
            <Sonner />
            {process.env.NODE_ENV === 'development' && <DevTools />}
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaListener>
    </QueryClientProvider>
  );
}
