import appConfig from 'app.config';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Linking, TouchableOpacity } from 'react-native';
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  ScrollBox,
  Stack,
  Text,
  VStack,
} from 'react-native-ficus-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ViewTabContent } from '@/layout/view-tab-content';

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
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    }
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

const MarketingLinks = () => (
  <VStack spacing={8} mt="2xl">
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
    <Box>
      <Tile
        href="https://ficus-ui.com/"
        uri="https://raw.githubusercontent.com/BearStudio/react-native-ficus-ui/refs/heads/main/apps/docs/static/img/banner.png"
        aspectRatio={2}
      />
    </Box>
  </VStack>
);

export const ViewHome = () => {
  const { t } = useTranslation(['home']);
  const insets = useSafeAreaInsets();

  return (
    <ViewTabContent mt={insets.top} gap={16}>
      <ScrollBox flex={1}>
        <Stack gap={8}>
          <Text fontWeight="bold" fontSize="xl">
            {t('home:welcome.title')}
          </Text>
          <Text fontWeight="medium">{t('home:welcome.description')}</Text>
        </Stack>
        <HStack gap={8} mt="md">
          <Link href={appConfig.githubUrl} asChild>
            <Button size="sm" variant="@secondary">
              GitHub
            </Button>
          </Link>
          <Link href={`${appConfig.githubUrl}/issues/new`} asChild>
            <Button size="sm" variant="@secondary">
              {t('home:welcome.openIssue')}
            </Button>
          </Link>
        </HStack>
        <MarketingLinks />
        <Center mt="xl" mb={100}>
          <Text
            textAlign="center"
            fontSize="xs"
            color="neutral.600"
            _dark={{ color: 'neutral.300' }}
          >
            {t('welcome.caption')}
          </Text>
        </Center>
      </ScrollBox>
    </ViewTabContent>
  );
};
