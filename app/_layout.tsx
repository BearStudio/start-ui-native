import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'react-native-ficus-ui';
import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from 'react-native-reanimated';

import { queryClient } from '@/api/query-client';
import '@/config/dayjs';
import i18n from '@/lib/i18n';
import useProtectedRoute from '@/modules/auth/auth.hook';
import theme from '@/theme';

export default function RootLayout() {
  useProtectedRoute();

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme.light}>
        <I18nextProvider i18n={i18n}>
          <Slot />
        </I18nextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
