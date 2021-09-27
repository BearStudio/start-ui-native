import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import {ToastProvider} from './contexts/ToastContext';

import THEMES from './theme/themes';
import {ThemeProvider} from 'react-native-magnus';
import {SafeAreaView} from 'react-native';
import {displayStyles} from './styles/display.style';
import AuthProvider from './contexts/AuthContext';

const queryClient = new QueryClient();

const Providers = ({children}) => {
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
