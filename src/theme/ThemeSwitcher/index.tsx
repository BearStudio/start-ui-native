import React from 'react';

import { useTranslation } from 'react-i18next';
import { Stack, Switch, Text } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

export default function ThemeSwitcher() {
  const { t } = useTranslation();
  const { colorMode, toggleColorMode, colorModeValue } = useDarkMode();

  return (
    <Stack mt="lg" direction="row" alignItems="center" spacing={8}>
      <Text
        fontSize="lg"
        fontWeight="500"
        color={colorModeValue('gray.900', 'gray.400')}
      >
        {t('components:ThemeSwitcher.light')}
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
        {t('components:ThemeSwitcher.dark')}
      </Text>
    </Stack>
  );
}
