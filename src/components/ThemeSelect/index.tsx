import { LucideChevronsUpDown, Monitor, Moon, Sun } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
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

export const ThemeSelect = ({
  type = 'icon',
  ...rest
}: BoxProps & {
  type?: 'select' | 'icon';
}) => {
  const { t } = useTranslation(['components']);
  const { colorMode, setColorMode } = useColorMode();
  const systemColorScheme = useColorScheme();

  const themeOptions = [
    { label: t('ThemeSwitcher.light'), value: 'light', icon: Sun },
    { label: t('ThemeSwitcher.dark'), value: 'dark', icon: Moon },
    { label: 'System', value: systemColorScheme, icon: Monitor },
  ] as const;
  return (
    <Box {...rest}>
      <Select
        value={colorMode}
        onValueChange={(val) => setColorMode(val)}
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
                icon={themeOptions.find((i) => i.value === colorMode)?.icon}
                size={20}
              />
            }
            aria-label="Toggle theme"
          />
        ) : (
          <Button variant="ghost" gap="sm" px={0}>
            <LucideIcon
              icon={themeOptions.find((i) => i.value === colorMode)?.icon}
              color={useColorModeValue('neutral.900', 'white')}
              size="md"
            />
            {themeOptions.find((i) => i.value === colorMode)?.label}
            <LucideIcon
              icon={LucideChevronsUpDown}
              color={useColorModeValue('neutral.900', 'white')}
              size="md"
            />
          </Button>
        )}
      </Select>
    </Box>
  );
};
