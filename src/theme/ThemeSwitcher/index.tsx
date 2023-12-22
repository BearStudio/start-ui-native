import React from 'react';

import { Box } from 'react-native-ficus-ui';

import { ButtonIcon } from '@/components/ButtonIcon';
import { useDarkMode } from '@/theme/useDarkMode';

export default function ThemeSwitcher() {
  const { colorMode, toggleColorMode, colorModeValue, getThemeColor } =
    useDarkMode();

  return (
    <Box mt="lg">
      <ButtonIcon
        icon={colorMode === 'light' ? 'moon' : 'sun'}
        iconFamily="Feather"
        onPress={toggleColorMode}
        full
        iconColor={colorModeValue('gray.500', 'gray.300')}
        color={colorModeValue(
          getThemeColor('gray.500'),
          getThemeColor('gray.200')
        )}
        bg={colorModeValue('white', 'gray.700')}
        borderWidth={1}
        borderColor={colorModeValue('gray.200', 'gray.600')}
      >
        {colorMode === 'light' ? 'Dark mode' : 'Light mode'}
      </ButtonIcon>
    </Box>
  );
}
