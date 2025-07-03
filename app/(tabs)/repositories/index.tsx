import { useTranslation } from 'react-i18next';
import { Box, Text } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

const Repositories = () => {
  const { t } = useTranslation();
  const { colorModeValue } = useDarkMode();

  return (
    <Box p={20}>
      <Box py="md">
        <Text
          fontSize="xl"
          fontWeight="600"
          color={colorModeValue('black', 'white')}
        >
          {t('repositories:title')}
        </Text>
      </Box>
    </Box>
  );
};

export default Repositories;
