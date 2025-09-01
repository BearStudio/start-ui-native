import { LucideChevronsUpDown, Monitor, Moon, Sun } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Appearance } from 'react-native';
import {
  Box,
  BoxProps,
  Button,
  IconButton,
  Select,
  useColorMode,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { LucideIcon } from '@/components/LucideIcon';
import useSessionStore from '@/modules/auth/stores/auth.store';

export const ThemeSelect = ({
  type = 'icon',
  ...rest
}: BoxProps & {
  type?: 'select' | 'icon';
}) => {
  const { t } = useTranslation(['components']);
  const modeTheme = useSessionStore((state) => state.theme);
  const { setColorMode } = useColorMode();

  const handleChangeTheme = (value: 'light' | 'dark' | 'system') => {
    const systemColorScheme = Appearance.getColorScheme();
    const newColorMode = value === 'system' ? systemColorScheme : value;
    if (newColorMode) {
      Appearance.setColorScheme(newColorMode);
      setColorMode(newColorMode);
      useSessionStore.getState().setTheme(value);
    }
  };

  const themeOptions = [
    { label: t('ThemeSwitcher.light'), value: 'light', icon: Sun },
    { label: t('ThemeSwitcher.dark'), value: 'dark', icon: Moon },
    { label: t('ThemeSwitcher.system'), value: 'system', icon: Monitor },
  ] as const;
  return (
    <Box {...rest}>
      <Select
        value={modeTheme}
        onValueChange={handleChangeTheme}
        items={themeOptions.map((option) => ({
          label: option.label,
          value: option.value,
          icon: <LucideIcon icon={option.icon} size={16} />,
        }))}
        placeholder={{ label: t('HeaderAuth.selectTheme'), value: null }}
      >
        {type === 'icon' ? (
          <IconButton
            variant="ghost"
            px={0}
            icon={
              <LucideIcon
                icon={themeOptions.find((i) => i.value === modeTheme)?.icon}
                size={20}
              />
            }
            aria-label="Toggle theme"
          />
        ) : (
          <Button variant="ghost" gap="sm" px={0} color="neutral.950">
            <LucideIcon
              icon={themeOptions.find((i) => i.value === modeTheme)?.icon}
              color={useColorModeValue('neutral.900', 'white')}
              opacity={0.8}
              size="md"
            />
            {themeOptions.find((i) => i.value === modeTheme)?.label}
            <LucideIcon
              icon={LucideChevronsUpDown}
              color={useColorModeValue('neutral.900', 'white')}
              opacity={0.8}
              size="md"
            />
          </Button>
        )}
      </Select>
    </Box>
  );
};
