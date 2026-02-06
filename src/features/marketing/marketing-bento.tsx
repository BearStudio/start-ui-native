import { Linking, TouchableOpacity } from 'react-native';

import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

const MarketingTile = ({
  href,
  src,
  aspectRatio,
  blurhash,
}: {
  href: string;
  src: string;
  blurhash?: string;
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
      <Image source={src} placeholder={{ blurhash }} />
    </TouchableOpacity>
  );
};

export const MarketingBento = () => (
  <Stack spacing={8} className="mt-6">
    <Text className="text-center text-[0.625rem] text-neutral-600 dark:text-neutral-300">
      Shameless plug 😅 Remember that 🚀 Start UI is free and Open Source 😉
    </Text>
    <Box className="flex flex-1 flex-row gap-2">
      <Box className="flex flex-1 flex-col gap-2">
        <MarketingTile
          href="https://bear.studio/assets-start-ui-bento-01"
          src="https://raw.githubusercontent.com/BearStudio/assets/main/start-ui/marketing-bento-01.jpg"
          aspectRatio={0.7}
          blurhash="S671r^-:~p%LM+ax02IU"
        />

        <MarketingTile
          href="https://bear.studio/assets-start-ui-bento-05"
          src="https://raw.githubusercontent.com/BearStudio/assets/main/start-ui/marketing-bento-05.jpg"
          aspectRatio={1.45}
          blurhash="L36kL=$|4TEQ~UxV4:NL=@oIIoWs"
        />
      </Box>

      <Box className="flex flex-1 flex-col gap-2">
        <MarketingTile
          href="https://bear.studio/assets-start-ui-bento-04"
          src="https://raw.githubusercontent.com/BearStudio/assets/main/start-ui/marketing-bento-04.jpg"
          aspectRatio={1.45}
          blurhash="L57w~T0d4m?I9W^,D;I9?dD~s6xd"
        />

        <MarketingTile
          href="https://bear.studio/assets-start-ui-bento-03"
          src="https://raw.githubusercontent.com/BearStudio/assets/main/start-ui/marketing-bento-03.jpg"
          aspectRatio={0.7}
          blurhash="SC8zlJs:0nxZ~6s,E2WB"
        />
      </Box>
    </Box>
    <Box>
      <MarketingTile
        href="https://ficus-ui.com/"
        src="https://raw.githubusercontent.com/BearStudio/react-native-ficus-ui/refs/heads/main/apps/docs/static/img/banner.png"
        aspectRatio={2}
      />
    </Box>
  </Stack>
);
