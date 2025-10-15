import { Linking, TouchableOpacity } from 'react-native';
import { Box, Image, Stack, Text } from 'react-native-ficus-ui';

const MarketingTile = ({
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

export const MarketingBento = () => (
  <Stack spacing={8} mt={24}>
    <Text
      textAlign="center"
      fontSize="2xs"
      color="neutral.600"
      _dark={{ color: 'neutral.300' }}
    >
      Shameless plug 😅 Remember that 🚀 Start UI is free and Open Source 😉
    </Text>
    <Box flexDirection="row" gap={8}>
      <Box flex={1} gap={8}>
        <MarketingTile
          href="https://bear.studio/assets-start-ui-bento-01"
          uri="https://raw.githubusercontent.com/BearStudio/assets/main/start-ui/marketing-bento-01.jpg"
          aspectRatio={0.7}
        />

        <MarketingTile
          href="https://github.com/BearStudio/start-ui-web"
          uri="https://start-ui.com/_next/image?url=%2Fweb.jpg&w=3840&q=75"
          aspectRatio={1.45}
        />
      </Box>

      <Box flex={1} gap={8}>
        <MarketingTile
          href="https://bear.studio/assets-start-ui-bento-04"
          uri="https://raw.githubusercontent.com/BearStudio/assets/main/start-ui/marketing-bento-04.jpg"
          aspectRatio={1.45}
        />

        <MarketingTile
          href="https://bear.studio/assets-start-ui-bento-03"
          uri="https://raw.githubusercontent.com/BearStudio/assets/main/start-ui/marketing-bento-03.jpg"
          aspectRatio={0.7}
        />
      </Box>
    </Box>
    <Box>
      <MarketingTile
        href="https://ficus-ui.com/"
        uri="https://raw.githubusercontent.com/BearStudio/react-native-ficus-ui/refs/heads/main/apps/docs/static/img/banner.png"
        aspectRatio={2}
      />
    </Box>
  </Stack>
);
