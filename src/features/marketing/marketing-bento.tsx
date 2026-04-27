import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';

const tileStyles = StyleSheet.create({
  base: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

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
    <Pressable
      onPress={() => handleOpenUrl(href)}
      accessibilityRole="link"
      style={[tileStyles.base, { aspectRatio }]}
    >
      <Image source={src} placeholder={blurhash ? { blurhash } : undefined} />
    </Pressable>
  );
};

export const MarketingBento = () => (
  <View className="mt-6 gap-2">
    <Text className="text-muted-foreground text-center text-[0.625rem]">
      Shameless plug 😅 Remember that 🚀 Start UI is free and Open Source 😉
    </Text>
    <View className="flex flex-1 flex-row gap-2">
      <View className="flex flex-1 flex-col gap-2">
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
      </View>

      <View className="flex flex-1 flex-col gap-2">
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
      </View>
    </View>
  </View>
);
