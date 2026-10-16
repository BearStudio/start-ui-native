import { View } from 'react-native';
import { useResolveClassNames } from 'uniwind';

import { Logo } from '@/components/icons/generated';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

import { ViewSafeContent } from '@/layout/view-safe-content';

export const AuthHeader = () => {
  const mutedStyle = useResolveClassNames('text-primary');
  const logoColor = mutedStyle.color;

  return (
    <ViewSafeContent className="absolute top-0 right-0 left-0 flex flex-row items-center justify-between p-safe-offset-6">
      <Logo color={logoColor} width={96} height={22} />
      <View className="flex flex-row gap-4">
        <ThemeSwitcher minimize />
        <LocaleSwitcher />
      </View>
    </ViewSafeContent>
  );
};
