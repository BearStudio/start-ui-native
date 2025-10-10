import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Box, FicusProvider } from 'react-native-ficus-ui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import '@/lib/i18n';

import theme from '@/lib/ficus-ui/theme';

import { ThemeManager } from '@/components/theme-manager';
import { Sonner } from '@/components/ui/sonner';

const queryClient = new QueryClient();

// SplashScreen hide management in on src/app/index.tsx
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <FicusProvider theme={theme}>
        <Box flex={1} bg="white" _dark={{ bg: 'neutral.950' }}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <Slot />
              <Sonner />
              <ThemeManager />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </Box>
      </FicusProvider>
    </QueryClientProvider>
  );
}
