import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { AVAILABLE_LANGUAGES } from '@/lib/i18n/constants';
import { useDisclosure } from '@/hooks/use-disclosure';

import {
  IconCheck,
  IconChevronsUpDown,
  IconLanguages,
} from '@/components/icons/generated';
import { BottomSheet, BottomSheetContent } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export const LocaleSwitcher = () => {
  const { t, i18n } = useTranslation(['common']);
  const sheet = useDisclosure();

  return (
    <>
      <Button variant="link" className="gap-2" onPress={sheet.onOpen}>
        <IconLanguages width={16} height={16} color="#737373" />
        <Text>{t(`common:languages.values.${i18n.language}`)}</Text>
        <IconChevronsUpDown width={16} height={16} color="#737373" />
      </Button>
      <BottomSheet isOpen={sheet.isOpen} onClose={sheet.onClose}>
        <BottomSheetContent>
          {AVAILABLE_LANGUAGES.map((language) => (
            <Pressable
              key={language.key}
              onPress={() => {
                i18n.changeLanguage(language.key);
                sheet.onClose();
              }}
              className="flex flex-row items-center py-1"
            >
              <View className="w-8">
                {language.key === i18n.language && (
                  <IconCheck width={16} height={16} color="#737373" />
                )}
              </View>
              <View>
                <Text className="font-bold">
                  {t(`common:languages.values.${language.key}`)}
                </Text>
                {language.key !== i18n.language && (
                  <Text className="text-sm" variant="muted">
                    {t(`common:languages.values.${language.key}`, {
                      lng: language.key,
                    })}
                  </Text>
                )}
              </View>
            </Pressable>
          ))}
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
};
