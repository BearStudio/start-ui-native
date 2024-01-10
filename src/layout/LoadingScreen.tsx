import React from 'react';

import { ActivityIndicator } from 'react-native';
import { Box, useTheme } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

export const LoadingScreen = () => {
  const { theme } = useTheme();

  const { colorModeValue } = useDarkMode();

  return (
    <Box h="100%" p={5} justifyContent="center" alignItems="center">
      <ActivityIndicator
        color={colorModeValue(
          theme.colors?.brand?.[600],
          theme.colors?.brand?.[400]
        )}
        size="large"
      />
    </Box>
  );
};
