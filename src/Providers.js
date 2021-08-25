import React, {useEffect, useRef, useState} from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';

import {ToastProvider} from './contexts/ToastContext';

import {GlobalProvider} from './contexts/GlobalContext';

import THEMES from './theme/themes';
import {ThemeProvider} from 'react-native-magnus';
import {useUserConnected} from './services/userService';
import {SafeAreaView} from 'react-native';
import {displayStyles} from './styles/display.style';

const queryClient = new QueryClient();

const Providers = ({children}) => {
  const {reloadUserInformations} = useUserConnected();

  return (
    <ThemeProvider theme={THEMES.default}>
      <ToastProvider>
        <GlobalProvider
          value={{
            reloadUserInformations,
          }}>
          <QueryClientProvider client={queryClient}>
            <SafeAreaView style={displayStyles.safeArea}>
              {children}
            </SafeAreaView>
          </QueryClientProvider>
        </GlobalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Providers;
