import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  HStack,
  Pressable,
  Text,
  useDisclosure,
} from 'react-native-ficus-ui';

import { AVAILABLE_LANGUAGES } from '@/lib/i18n/constants';

import {
  IconCheck,
  IconChevronsUpDown,
  IconLanguages,
} from '@/components/icons/generated';
import { BottomSheet, BottomSheetBox } from '@/components/ui/bottom-sheet';

export const LocaleSwitcher = () => {
  const { t, i18n } = useTranslation(['common']);
  const sheet = useDisclosure();

  return (
    <>
      <Button variant="@link" gap={8} onPress={sheet.onOpen}>
        <IconLanguages width={16} height={16} color="neutral.500" />
        <Text>{t(`common:languages.values.${i18n.language}`)}</Text>
        <IconChevronsUpDown width={16} height={16} color="neutral.500" />
      </Button>
      <BottomSheet {...sheet}>
        <BottomSheetBox gap={24}>
          {AVAILABLE_LANGUAGES.map((language) => (
            <HStack
              key={language.key}
              as={Pressable}
              onPress={() => {
                i18n.changeLanguage(language.key);
                sheet.onClose();
              }}
              py={4}
            >
              <Box w={32}>
                {language.key === i18n.language && (
                  <IconCheck width={16} height={16} color="neutral.500" />
                )}
              </Box>
              <Box>
                <Text fontWeight="bold">
                  {t(`common:languages.values.${language.key}`)}
                </Text>
                {language.key !== i18n.language && (
                  <Text fontSize="sm" variant="muted">
                    {t(`common:languages.values.${language.key}`, {
                      lng: language.key,
                    })}
                  </Text>
                )}
              </Box>
            </HStack>
          ))}
        </BottomSheetBox>
      </BottomSheet>
    </>
  );
};
