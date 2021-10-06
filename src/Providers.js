import React from 'react';

import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'react-native-magnus';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '@/auth/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { displayStyles } from '@/styles/display.style';
import THEMES from '@/theme';

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={THEMES.default}>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SafeAreaView style={displayStyles.safeArea}>
              {children}
            </SafeAreaView>
          </AuthProvider>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Providers;
