import AsyncStorage from '@react-native-async-storage/async-storage';
import { LucideSunMoon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';

import { useDisclosure } from '@/hooks/use-disclosure';

import {
  IconCheck,
  IconChevronsUpDown,
  IconMoon,
  IconSun,
} from '@/components/icons/generated';
import { BottomSheet, BottomSheetContent } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import { STORAGE_KEY_THEME } from '@/features/theme/constants';

export const ThemeSwitcher = (props: { minimize?: boolean }) => {
  const { t } = useTranslation(['common']);

  const { theme, hasAdaptiveThemes } = useUniwind();

  const sheet = useDisclosure();

  const ColorModeIcon = theme === 'light' ? IconSun : IconMoon;
  const DisplayIcon = hasAdaptiveThemes ? LucideSunMoon : ColorModeIcon;

  const updateColorMode = (value: 'light' | 'dark' | 'system') => {
    AsyncStorage.setItem(STORAGE_KEY_THEME, value);

    Uniwind.setTheme(value);
  };

  return (
    <>
      {props.minimize ? (
        <Button variant="ghost" size="icon" onPress={sheet.onOpen}>
          <DisplayIcon size={20} color="#737373" />
        </Button>
      ) : (
        <Button variant="link" className="gap-2" onPress={sheet.onOpen}>
          <DisplayIcon size={16} color="#737373" />
          <Text>{t(`common:themes.values.${theme}`)}</Text>
          {!!theme && (
            <IconChevronsUpDown width={16} height={16} color="#737373" />
          )}
        </Button>
      )}
      <BottomSheet isOpen={sheet.isOpen} onClose={sheet.onClose}>
        <BottomSheetContent>
          {(['system', 'light', 'dark'] as const).map((mode) => (
            <Pressable
              key={mode}
              onPress={() => {
                updateColorMode(mode);
                sheet.onClose();
              }}
              className="flex flex-row items-center py-1"
            >
              <View className="w-8">
                {((hasAdaptiveThemes && mode === 'system') ||
                  (!hasAdaptiveThemes && mode === theme)) && (
                  <IconCheck width={16} height={16} color="#737373" />
                )}
              </View>
              <View>
                <Text className="font-bold">
                  {t(`common:themes.values.${mode}`)}
                </Text>
              </View>
            </Pressable>
          ))}
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
};
