import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Logo } from '@/components/icons/generated';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

export const AuthHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute left-0 right-0 flex flex-row items-center justify-between p-6"
      style={{ top: insets.top }}
    >
      <Logo color="black" width={96} height={22} />
      <View className="flex flex-row gap-4">
        <ThemeSwitcher minimize />
        <LocaleSwitcher />
      </View>
    </View>
  );
};
