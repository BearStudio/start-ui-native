import React from 'react';

import { Box, Text, useTheme, VStack } from 'native-base';
import { ActivityIndicator } from 'react-native';

import Logo from '@/components/Logo';

const SplashScreen = () => {
  const theme = useTheme();

  return (
    <Box h="100%" p={5} justifyContent="center" alignItems="center">
      <VStack justifyContent="center" space="xl">
        <Logo maxWidth="100%" />
        <Text fontSize="2xl" textAlign="center">
          Loading...
        </Text>
        <ActivityIndicator color={theme.colors.primary['500']} size="large" />
      </VStack>
    </Box>
  );
};

export default SplashScreen;
