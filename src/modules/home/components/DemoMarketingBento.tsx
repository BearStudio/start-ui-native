import React from 'react';

import { Linking, TouchableOpacity } from 'react-native';
import { Box, Image } from 'react-native-ficus-ui';

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

const DemoMarketingBento: React.FC = () => (
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

export default DemoMarketingBento;
