import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from 'react-native-magnus';

import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { AuthProvider } from '@/modules/auth/AuthContext';
import { theme } from '@/theme';
import { ToastProvider } from '@/modules/toast/ToastContext';
import React from 'react';
import ProtectedRoutesProvider from '@/modules/auth/ProtectedRoutesProvider';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProtectedRoutesProvider>
          <ToastProvider>
            <ThemeProvider theme={theme.light}>
              <Slot />
            </ThemeProvider>
          </ToastProvider>
        </ProtectedRoutesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

registerRootComponent(App);

export default App;
