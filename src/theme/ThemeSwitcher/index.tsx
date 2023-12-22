import React from 'react';

import { Stack, Switch, Text } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

export default function ThemeSwitcher() {
  const { colorMode, toggleColorMode, colorModeValue } = useDarkMode();

  return (
    <Stack mt="lg" direction="row" alignItems="center" spacing={8}>
      <Text
        fontSize="lg"
        fontWeight="500"
        color={colorModeValue('gray.900', 'gray.400')}
      >
        Light mode
      </Text>
      <Switch
        on={colorMode === 'dark'}
        onPress={toggleColorMode}
        colorScheme="brand"
      />
      <Text
        fontSize="lg"
        fontWeight="500"
        color={colorModeValue('gray.500', 'gray.100')}
      >
        Dark mode
      </Text>
    </Stack>
  );
}
