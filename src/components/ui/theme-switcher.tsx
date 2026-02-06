import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { LucideSunMoon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Appearance, Pressable } from 'react-native';

import { STORAGE_KEY_THEME } from '@/lib/theme';
import { useDisclosure } from '@/hooks/use-disclosure';
import { themeQueryKey, useThemeMode } from '@/hooks/use-theme-mode';

import {
  IconCheck,
  IconChevronsUpDown,
  IconMoon,
  IconSun,
} from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { BottomSheet, BottomSheetBox } from '@/components/ui/bottom-sheet';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

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
        <Button variant="ghost" size="icon" onPress={sheet.onOpen}>
          <Icon icon={DisplayIcon} size={20} color="#737373" />
        </Button>
      ) : (
        <Button variant="link" className="gap-2" onPress={sheet.onOpen}>
          <Icon icon={DisplayIcon} size={16} color="#737373" />
          <Text>{t(`common:themes.values.${currentTheme}`)}</Text>
          {!!currentTheme && (
            <IconChevronsUpDown width={16} height={16} color="#737373" />
          )}
        </Button>
      )}
      <BottomSheet isOpen={sheet.isOpen} onClose={sheet.onClose}>
        <BottomSheetBox gap={24}>
          {(['system', 'light', 'dark'] as const).map((mode) => (
            <Pressable
              key={mode}
              onPress={() => {
                updateColorMode(mode);
                sheet.onClose();
              }}
              className="flex flex-row items-center py-1"
            >
              <Box className="w-8">
                {mode === currentTheme && (
                  <IconCheck width={16} height={16} color="#737373" />
                )}
              </Box>
              <Box>
                <Text className="font-bold">
                  {t(`common:themes.values.${mode}`)}
                </Text>
              </Box>
            </Pressable>
          ))}
        </BottomSheetBox>
      </BottomSheet>
    </>
  );
};
