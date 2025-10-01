import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Box, FicusProvider } from 'react-native-ficus-ui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import theme from '@/lib/ficus-ui/theme';

import { Sonner } from '@/components/sonner';

import { authClient } from '@/features/auth/client';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const session = authClient.useSession();

  const isAppReady = !session.isPending;

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hide();
    }
  }, [isAppReady]);

  return (
    <QueryClientProvider client={queryClient}>
      <FicusProvider theme={theme}>
        <Box flex={1}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <Slot />
              <Sonner />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </Box>
      </FicusProvider>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
