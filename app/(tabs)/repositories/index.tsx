import { useTranslation } from 'react-i18next';
import { Box, Text } from 'react-native-ficus-ui';

const Repositories = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Text>{t('repositories:title')}</Text>
    </Box>
  );
};

export default Repositories;
