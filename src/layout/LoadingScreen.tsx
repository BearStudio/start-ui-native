import React from 'react';

import { ActivityIndicator } from 'react-native';
import { Div, useTheme } from 'react-native-magnus';

export const LoadingScreen = () => {
  const { theme } = useTheme();

  return (
    <Div bg="body" h="100%" p={5} justifyContent="center" alignItems="center">
      <ActivityIndicator color={theme.colors?.['primary500']} size="large" />
    </Div>
  );
};
