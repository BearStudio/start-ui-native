import React from 'react';

import { Factory, NativeBaseProvider } from 'native-base';
import { SafeAreaView as SafeAreaViewNative } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '@/modules/auth/AuthContext';
import { BluetoothProvider } from '@/modules/bluetooth/BluetoothContext';
import { theme } from '@/theme';

const queryClient = new QueryClient();

const SafeAreaView = Factory(SafeAreaViewNative);

const Providers = ({ children }) => {
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BluetoothProvider>
            <SafeAreaView bg="white" flex="1">
              {children}
            </SafeAreaView>
          </BluetoothProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default Providers;
