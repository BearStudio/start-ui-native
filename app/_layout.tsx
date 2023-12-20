import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from 'react-native-ficus-ui';

import registerRootComponent from 'expo/build/launch/registerRootComponent';
import theme from '@/theme';
import React from 'react';
import ProtectedRoutesProvider from '@/modules/auth/ProtectedRoutesProvider';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProtectedRoutesProvider>
        <ThemeProvider theme={theme.light}>
          <Slot />
        </ThemeProvider>
      </ProtectedRoutesProvider>
    </QueryClientProvider>
  );
};

registerRootComponent(App);

export default App;
