import LogoBlack from '@assets/logo-black.svg';
import LogoWhite from '@assets/logo-white.svg';
import {
  LucideChevronsUpDown,
  LucideLanguages,
  Monitor,
  Moon,
  Sun,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { StatusBar, useColorScheme } from 'react-native';
import {
  Box,
  Button,
  IconButton,
  Select,
  useColorMode,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { LucideIcon } from '@/components/LucideIcon';

export const HeaderAuth = () => {
  const { i18n } = useTranslation();
  const { colorMode, setColorMode } = useColorMode();

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Français', value: 'fr' },
  ];
  const systemColorScheme = useColorScheme();
  const themeOptions = [
    { label: 'Light', value: 'light', icon: Sun },
    { label: 'Dark', value: 'dark', icon: Moon },
    { label: 'System', value: systemColorScheme, icon: Monitor },
  ] as const;

  return (
    <Box flexDirection="row" px="xl" alignItems="center" gap="xl" py="xl">
      <StatusBar
        backgroundColor={useColorModeValue('white', 'black')}
        barStyle={useColorModeValue('dark-content', 'light-content')}
      />
      {/* Logo */}
      {colorMode === 'dark' ? <LogoWhite /> : <LogoBlack />}

      {/* Spacer */}
      <Box flex={1} />

      {/* Theme selector */}
      <Select
        value={colorMode}
        onValueChange={(val) => setColorMode(val)}
        items={themeOptions.map((option) => ({
          label: option.label,
          value: option.value,
          icon: <LucideIcon icon={option.icon} size={16} />,
        }))}
      >
        <IconButton
          variant="ghost"
          px={0}
          icon={
            <LucideIcon
              icon={themeOptions?.find((i) => i.value === colorMode)?.icon}
              size={20}
            />
          }
          aria-label="Toggle theme"
        />
      </Select>

      {/* Language selector */}
      <Select
        value={i18n.language}
        onValueChange={(val) => i18n.changeLanguage(val)}
        items={languageOptions}
        placeholder="Language"
      >
        <Button variant="ghost" gap="sm" px={0}>
          <LucideIcon
            icon={LucideLanguages}
            color={useColorModeValue('brand.900', 'white')}
            size={16}
          />
          {languageOptions.find((i) => i.value === i18n.language)?.label}
          <LucideIcon
            icon={LucideChevronsUpDown}
            color={useColorModeValue('brand.900', 'white')}
            size={16}
          />
        </Button>
      </Select>
    </Box>
  );
};
