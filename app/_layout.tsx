import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { ThemeProvider } from 'react-native-ficus-ui';

import { queryClient } from '@/api/query-client';
import useProtectedRoute from '@/modules/auth/auth.hook';
import theme from '@/theme';

export default function RootLayout() {
  useProtectedRoute();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme.light}>
        <Slot />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
