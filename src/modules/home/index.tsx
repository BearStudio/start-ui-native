import React from 'react';

import { useTranslation } from 'react-i18next';
import { Linking, TouchableOpacity } from 'react-native';
import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from 'react-native-ficus-ui';

import { Container } from '@/layout/Container';
import { Content } from '@/layout/Content';

const HomePage = () => {
  return (
    <Container>
      <Content>
        <VStack spacing="lg">
          <DemoWelcome />
          <DemoMarketingBento />
        </VStack>
        <DemoCaption />
      </Content>
    </Container>
  );
};

export const DemoCaption = () => {
  const { t } = useTranslation('home');
  return (
    <>
      <Box flex={1} />
      <Box mt="md" align="center">
        <Text
          textAlign="center"
          fontSize="sm"
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

const DemoWelcome: React.FC = () => {
  const { t } = useTranslation('home');

  return (
    <VStack spacing="md" py="md">
      <VStack spacing="xs">
        <Text
          fontSize="2xl"
          fontWeight="600"
          color={useColorModeValue('black', 'white')}
        >
          {t('home:welcome.title')}
        </Text>
        <Text
          fontSize="md"
          color={useColorModeValue('neutral.600', 'neutral.300')}
        >
          {t('home:welcome.description')}
        </Text>
      </VStack>
      <HStack spacing="xl">
        <Button
          variant="outline"
          size="sm"
          onPress={() =>
            Linking.openURL('https://github.com/BearStudio/start-ui-native')
          }
        >
          {t('demo.github')}
        </Button>
        <Button
          variant="outline"
          size="sm"
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

const Tile = ({
  href,
  uri,
  aspectRatio,
}: {
  href: string;
  uri: string;
  aspectRatio: number;
}) => {
  const handleOpenUrl = async (url: string) => {
    const canOpen = await Linking.canOpenURL(href);
    if (canOpen) {
      Linking.openURL(href);
      return;
    }
    console.log('error while trying opening link');
  };
  return (
    <TouchableOpacity
      onPress={() => handleOpenUrl(href)}
      accessibilityRole="link"
      style={{
        aspectRatio,

        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.2)',
      }}
    >
      <Image source={{ uri }} w="100%" h="100%" resizeMode="cover" />
    </TouchableOpacity>
  );
};

export const DemoMarketingBento: React.FC = () => (
  <Box flexDirection="row" gap={8}>
    <Box flex={1} gap={8}>
      <Tile
        href="https://bear.studio/assets-start-ui-bento-01"
        uri="https://raw.githubusercontent.com/BearStudio/assets/main/start-ui/marketing-bento-01.jpg"
        aspectRatio={0.7}
      />

      <Tile
        href="https://github.com/BearStudio/start-ui-web"
        uri="https://start-ui.com/_next/image?url=%2Fweb.jpg&w=3840&q=75"
        aspectRatio={1.45}
      />
    </Box>

    <Box flex={1} gap={8}>
      <Tile
        href="https://bear.studio/assets-start-ui-bento-04"
        uri="https://raw.githubusercontent.com/BearStudio/assets/main/start-ui/marketing-bento-04.jpg"
        aspectRatio={1.45}
      />

      <Tile
        href="https://bear.studio/assets-start-ui-bento-03"
        uri="https://raw.githubusercontent.com/BearStudio/assets/main/start-ui/marketing-bento-03.jpg"
        aspectRatio={0.7}
      />
    </Box>
  </Box>
);

export default HomePage;
