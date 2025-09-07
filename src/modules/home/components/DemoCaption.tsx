import React from 'react';

import { useTranslation } from 'react-i18next';
import { Box, Text } from 'react-native-ficus-ui';

const DemoCaption = () => {
  const { t } = useTranslation('home');
  return (
    <>
      <Box flex={1} />
      <Box mt="md" align="center">
        <Text
          textAlign="center"
          fontSize="xs"
          color="neutral.600"
          _dark={{
            color: 'neutral.300',
          }}
          w="60%"
        >
          {t('demo.caption')}
        </Text>
      </Box>
    </>
  );
};

export default DemoCaption;
