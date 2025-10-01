import { Appearance } from 'react-native';
import { IconButton, useColorMode } from 'react-native-ficus-ui';

import { IconMoon, IconSun } from '@/components/icons/generated';

export const ThemeToggle = () => {
  const colorMode = useColorMode();

  const Icon = colorMode.colorMode === 'light' ? IconSun : IconMoon;

  return (
    <IconButton
      icon={<Icon />}
      variant="@ghost"
      onPress={() => {
        const newColorMode = colorMode.colorMode === 'light' ? 'dark' : 'light';
        Appearance.setColorScheme(newColorMode);
        colorMode.setColorMode(newColorMode);
      }}
    />
  );
};
