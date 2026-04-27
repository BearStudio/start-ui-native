import AsyncStorage from '@react-native-async-storage/async-storage';
import { LucideSunMoon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { Uniwind, useResolveClassNames, useUniwind } from 'uniwind';

import { useDisclosure } from '@/hooks/use-disclosure';

import {
  IconCheck,
  IconChevronsUpDown,
  IconMoon,
  IconSun,
} from '@/components/icons/generated';
import { Icon } from '@/components/icons/icon';
import { BottomSheet, BottomSheetContent } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import { STORAGE_KEY_THEME } from '@/features/theme/constants';

export const ThemeSwitcher = (props: { minimize?: boolean }) => {
  const { t } = useTranslation(['common']);

  const { theme, hasAdaptiveThemes } = useUniwind();
  const mutedStyle = useResolveClassNames('text-muted-foreground');
  const iconColor = mutedStyle.color;

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
          {hasAdaptiveThemes ? (
            <DisplayIcon size={20} color={iconColor} />
          ) : (
            <Icon
              icon={ColorModeIcon}
              className="text-muted-foreground size-5"
            />
          )}
        </Button>
      ) : (
        <Button
          variant="link"
          className="-mx-4 self-start"
          onPress={sheet.onOpen}
        >
          {hasAdaptiveThemes ? (
            <DisplayIcon size={16} color={iconColor} />
          ) : (
            <Icon icon={ColorModeIcon} className="text-muted-foreground" />
          )}
          <Text>
            {t(`common:themes.values.${hasAdaptiveThemes ? 'system' : theme}`)}
          </Text>
          {!!theme && (
            <Icon icon={IconChevronsUpDown} className="text-muted-foreground" />
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
                  <Icon icon={IconCheck} className="text-muted-foreground" />
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
