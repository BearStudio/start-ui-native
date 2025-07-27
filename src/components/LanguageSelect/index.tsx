import { LucideChevronsUpDown, LucideLanguages } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import {
  Box,
  BoxProps,
  Button,
  Select,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { LucideIcon } from '@/components/LucideIcon';

export const LanguageSelect = (props: BoxProps) => {
  const { t, i18n } = useTranslation(['components']);

  // Dynamically translated language labels
  const supportedLanguages = ['en', 'fr'];
  const languageOptions = supportedLanguages.map((lang) => ({
    label: t(`languages.${lang}`),
    value: lang,
  }));

  return (
    <Box>
      <Select
        value={i18n.language}
        onValueChange={(val) => i18n.changeLanguage(val)}
        items={languageOptions}
        placeholder={{ label: t('HeaderAuth.selectLanguage'), value: null }}
      >
        <Button variant="ghost" gap="sm" px={0}>
          <LucideIcon
            icon={LucideLanguages}
            color={useColorModeValue('neutral.900', 'white')}
            size={16}
          />
          {languageOptions.find((i) => i.value === i18n.language)?.label}
          <LucideIcon
            icon={LucideChevronsUpDown}
            color={useColorModeValue('neutral.900', 'white')}
            size={16}
          />
        </Button>
      </Select>
    </Box>
  );
};
