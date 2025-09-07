import { useTranslation } from 'react-i18next';
import { HStack, Switch, Text, useColorMode } from 'react-native-ficus-ui';

import { useAppColorMode } from '../hooks';

export default function ThemeSwitcher() {
  // ✅ Hooks must be called unconditionally at the top level
  const { t } = useTranslation(['components']);
  const { colorMode } = useColorMode();
  const { updateColorMode } = useAppColorMode();

  return (
    <HStack mt="lg" alignItems="center" spacing={8}>
      <Text fontSize="lg" fontWeight="500">
        {t('ThemeSwitcher.light')}
      </Text>
      <Switch
        isChecked={colorMode === 'dark'}
        onPress={updateColorMode}
        colorScheme="neutral"
      />
      <Text fontSize="lg" fontWeight="500">
        {t('ThemeSwitcher.dark')}
      </Text>
    </HStack>
  );
}
