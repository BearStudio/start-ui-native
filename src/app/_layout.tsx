import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Box, FicusProvider, useColorMode } from 'react-native-ficus-ui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import theme from '@/lib/ficus-ui/theme';

import { Sonner } from '@/components/ui/sonner';

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

  const colorScheme = useColorScheme();
  const { setColorMode } = useColorMode();

  // Update app theme on device preference appearance update
  useEffect(() => {
    setColorMode(colorScheme ?? 'light');
  }, [colorScheme, setColorMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <FicusProvider theme={theme}>
        <Box flex={1} bg="white" _dark={{ bg: 'neutral.950' }}>
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
