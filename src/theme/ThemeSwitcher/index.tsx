import { useTranslation } from 'react-i18next';
import { HStack, Switch, Text, useColorMode } from 'react-native-ficus-ui';

import { useAppColorMode } from '../hooks';

export default function ThemeSwitcher() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const { updateColorMode } = useAppColorMode();

  return (
    <HStack mt="lg" alignItems="center" spacing={8}>
      <Text fontSize="lg" fontWeight="500">
        {t('components:ThemeSwitcher.light')}
      </Text>
      <Switch
        isChecked={colorMode === 'dark'}
        onPress={updateColorMode}
        colorScheme="brand"
      />
      <Text fontSize="lg" fontWeight="500">
        {t('components:ThemeSwitcher.dark')}
      </Text>
    </HStack>
  );
}
