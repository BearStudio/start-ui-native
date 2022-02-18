import React from 'react';

import { Box, useTheme, VStack } from 'native-base';
import { ActivityIndicator } from 'react-native';

export const LoadingScreen = () => {
  const theme = useTheme();

  return (
    <Box h="100%" p={5} justifyContent="center" alignItems="center">
      <VStack justifyContent="center" space="xl">
        <ActivityIndicator color={theme.colors.primary['500']} size="large" />
      </VStack>
    </Box>
  );
};
