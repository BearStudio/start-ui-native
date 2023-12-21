import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { ThemeProvider } from 'react-native-ficus-ui';

import { queryClient } from '@/api/query-client';
import ProtectedRoutesProvider from '@/modules/auth/ProtectedRoutesProvider';
import theme from '@/theme';

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
