import React from 'react';
import { Box } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';
import { ButtonIcon } from '@/components/ButtonIcon';

export default function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useDarkMode();

  return (
    <Box mt="lg">
      <ButtonIcon
        icon={colorMode === 'light' ? 'moon' : 'sun'}
        iconFamily="Feather"
        onPress={toggleColorMode}
        full
      >
        {colorMode === 'light' ? 'Dark mode' : 'Light mode'}
      </ButtonIcon>
    </Box>
  );
}
