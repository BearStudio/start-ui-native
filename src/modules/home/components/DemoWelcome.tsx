import React from 'react';

import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import {
  Button,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from 'react-native-ficus-ui';

const DemoWelcome: React.FC = () => {
  const { t } = useTranslation('home');

  return (
    <VStack spacing="md" py="md">
      <VStack spacing="xs">
        <Text
          fontSize="md"
          fontWeight="600"
          color={useColorModeValue('black', 'white')}
        >
          {t('home:welcome.title')}
        </Text>
        <Text
          fontSize="sm"
          color={useColorModeValue('neutral.600', 'neutral.300')}
        >
          {t('home:welcome.description')}
        </Text>
      </VStack>
      <HStack spacing="xl">
        <Button
          variant="outline"
          size="xs"
          onPress={() =>
            Linking.openURL('https://github.com/BearStudio/start-ui-native')
          }
        >
          {t('demo.github')}
        </Button>
        <Button
          variant="outline"
          size="xs"
          onPress={() =>
            Linking.openURL(
              'https://github.com/BearStudio/start-ui-native/issues'
            )
          }
        >
          {t('demo.openIssue')}
        </Button>
      </HStack>
    </VStack>
  );
};

export default DemoWelcome;
