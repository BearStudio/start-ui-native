import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { LucideSunMoon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Appearance } from 'react-native';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Pressable,
  Text,
  useDisclosure,
} from 'react-native-ficus-ui';

import { STORAGE_KEY_THEME } from '@/lib/ficus-ui/theme';
import { themeQueryKey, useThemeMode } from '@/hooks/use-theme-mode';

import {
  IconCheck,
  IconChevronsUpDown,
  IconMoon,
  IconSun,
} from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { BottomSheet, BottomSheetBox } from '@/components/ui/bottom-sheet';

export const ThemeSwitcher = (props: { minimize?: boolean }) => {
  const { t } = useTranslation(['common']);
  const queryClient = useQueryClient();

  const themeQuery = useThemeMode();
  const currentTheme = themeQuery.data ?? 'system';

  const sheet = useDisclosure();

  const ColorModeIcon = currentTheme === 'light' ? IconSun : IconMoon;
  const DisplayIcon = currentTheme === 'system' ? LucideSunMoon : ColorModeIcon;

  const updateColorMode = (value: 'light' | 'dark' | 'system') => {
    AsyncStorage.setItem(STORAGE_KEY_THEME, value);
    queryClient.setQueryData(themeQueryKey, value);
    Appearance.setColorScheme(value === 'system' ? null : value);
  };

  return (
    <>
      {props.minimize ? (
        <IconButton
          icon={<Icon icon={DisplayIcon} />}
          variant="@ghost"
          color="neutral.500"
          onPress={sheet.onOpen}
          size="lg"
        />
      ) : (
        <Button variant="@link" gap={8} onPress={sheet.onOpen}>
          <Icon icon={DisplayIcon} size={16} color="neutral.500" />
          <Text>{t(`common:themes.values.${currentTheme}`)}</Text>
          {!!currentTheme && (
            <IconChevronsUpDown width={16} height={16} color="neutral.500" />
          )}
        </Button>
      )}
      <BottomSheet {...sheet}>
        <BottomSheetBox gap={24}>
          {(['system', 'light', 'dark'] as const).map((mode) => (
            <HStack
              key={mode}
              as={Pressable}
              onPress={() => {
                updateColorMode(mode);
                sheet.onClose();
              }}
              py={4}
            >
              <Box w={32}>
                {mode === currentTheme && (
                  <IconCheck width={16} height={16} color="neutral.500" />
                )}
              </Box>
              <Box>
                <Text fontWeight="bold">
                  {t(`common:themes.values.${mode}`)}
                </Text>
              </Box>
            </HStack>
          ))}
        </BottomSheetBox>
      </BottomSheet>
    </>
  );
};
