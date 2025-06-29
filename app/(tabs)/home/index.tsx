import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { Text, VStack } from 'react-native-ficus-ui';

import { useDarkMode } from '@/theme/useDarkMode';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <VStack spacing="lg">
        <DemoWelcome />
      </VStack>
    </ScrollView>
  );
}

const DemoWelcome: React.FC = () => {
  const { t } = useTranslation('demo');
  const { colorModeValue } = useDarkMode();

  return (
    <VStack spacing="md" py="md">
      <VStack spacing="xs">
        <Text
          fontSize="xl"
          fontWeight="600"
          color={colorModeValue('black', 'white')}
        >
          {t('demo:welcome.title')}
        </Text>
        <Text fontSize="sm" color={colorModeValue('gray.600', 'gray.300')}>
          {t('demo:welcome.description')}
        </Text>
      </VStack>
    </VStack>
  );
};
