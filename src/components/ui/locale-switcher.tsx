import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import { AVAILABLE_LANGUAGES } from '@/lib/i18n/constants';
import { useDisclosure } from '@/hooks/use-disclosure';

import {
  IconCheck,
  IconChevronsUpDown,
  IconLanguages,
} from '@/components/icons/generated';
import { BottomSheet, BottomSheetBox } from '@/components/ui/bottom-sheet';
import { Box } from '@/components/ui/box';
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
        <BottomSheetBox gap={24}>
          {AVAILABLE_LANGUAGES.map((language) => (
            <Pressable
              key={language.key}
              onPress={() => {
                i18n.changeLanguage(language.key);
                sheet.onClose();
              }}
              className="flex flex-row items-center py-1"
            >
              <Box className="w-8">
                {language.key === i18n.language && (
                  <IconCheck width={16} height={16} color="#737373" />
                )}
              </Box>
              <Box>
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
              </Box>
            </Pressable>
          ))}
        </BottomSheetBox>
      </BottomSheet>
    </>
  );
};
