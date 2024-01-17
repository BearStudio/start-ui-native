import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-ficus-ui';

import { queryClient } from '@/api/query-client';
import { Stack } from '@/layout/Stack';
import theme from '@/theme';

export const unstable_settings = {
  initialRouteName: '(app)',
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme.light}>
        <View style={{ marginTop: 20 }}>
          <Text>Test</Text>
        </View>
        <Slot />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
