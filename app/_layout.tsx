import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from 'react-native-ficus-ui';

import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { AuthProvider } from '@/modules/auth/AuthContext';
import theme from '@/theme';
import React from 'react';
import ProtectedRoutesProvider from '@/modules/auth/ProtectedRoutesProvider';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProtectedRoutesProvider>
          <ThemeProvider theme={theme.light}>
            <Slot />
          </ThemeProvider>
        </ProtectedRoutesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

registerRootComponent(App);

export default App;
