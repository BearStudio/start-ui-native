import React from 'react';
import { Button, Text, Box, Icon } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

export default function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useDarkMode();

  return (
    <Box mt="lg">
      <Button onPress={toggleColorMode} full>
        <Icon
          name={colorMode === 'light' ? 'moon' : 'sun'}
          fontSize="lg"
          fontFamily="Feather"
          color="gray.50"
        />
        <Text ml={10} fontSize="lg" color="gray.50">
          {colorMode === 'light' ? 'Dark mode' : 'Light mode'}
        </Text>
      </Button>
    </Box>
  );
}
